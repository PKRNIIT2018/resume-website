import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const MAX_JOB_URL_LENGTH = 2_048;
const MAX_JOB_PAGE_BYTES = 512 * 1024;
const MAX_REDIRECTS = 3;

function isPrivateIpv4(address: string): boolean {
  const [first, second] = address.split(".").map(Number);
  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    first === 169 && second === 254 ||
    first === 172 && second >= 16 && second <= 31 ||
    first === 192 && second === 168 ||
    first === 100 && second >= 64 && second <= 127 ||
    first >= 224
  );
}

function isPrivateIp(address: string): boolean {
  const family = isIP(address);
  if (family === 4) return isPrivateIpv4(address);
  if (family !== 6) return true;

  const normalized = address.toLowerCase();
  const mappedIpv4 = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)?.[1];
  return (
    normalized === "::" ||
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe8") ||
    normalized.startsWith("fe9") ||
    normalized.startsWith("fea") ||
    normalized.startsWith("feb") ||
    (mappedIpv4 !== undefined && isPrivateIpv4(mappedIpv4))
  );
}

async function assertPublicHost(hostname: string): Promise<void> {
  if (hostname === "localhost" || (isIP(hostname) !== 0 && isPrivateIp(hostname))) {
    throw new Error("private host");
  }

  const addresses = await lookup(hostname, { all: true, verbatim: true });
  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateIp(address))) {
    throw new Error("private address");
  }
}

function parseHttpUrl(rawUrl: string, base?: URL): URL {
  if (rawUrl.length > MAX_JOB_URL_LENGTH) throw new Error("URL too long");

  const url = new URL(rawUrl, base);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("invalid protocol");
  }
  if (url.username || url.password) throw new Error("credentials not allowed");
  return url;
}

async function readLimitedBody(response: Response): Promise<string> {
  const contentLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_JOB_PAGE_BYTES) {
    throw new Error("response too large");
  }
  if (!response.body) throw new Error("empty response");

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_JOB_PAGE_BYTES) throw new Error("response too large");
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export async function fetchPublicHtml(rawUrl: string): Promise<string> {
  let url = parseHttpUrl(rawUrl);

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    await assertPublicHost(url.hostname);
    const response = await fetch(url, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "Mozilla/5.0 (compatible; CoverLetterBot/1.0)",
      },
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location || redirectCount === MAX_REDIRECTS) throw new Error("invalid redirect");
      url = parseHttpUrl(location, url);
      continue;
    }
    if (!response.ok) throw new Error(`fetch failed: ${response.status}`);

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("text/html")) throw new Error("not HTML");
    return readLimitedBody(response);
  }

  throw new Error("too many redirects");
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
