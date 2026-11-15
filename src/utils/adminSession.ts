import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_VERSION = "v1";
const SESSION_TTL_SECONDS = 60 * 60;

function sessionSecret(): string | undefined {
  const secret = import.meta.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : undefined;
}

function signature(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function equal(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

export function createAdminSession(now = Date.now()): string | undefined {
  const secret = sessionSecret();
  if (!secret) return undefined;

  const expiresAt = Math.floor(now / 1000) + SESSION_TTL_SECONDS;
  const payload = `${SESSION_VERSION}.${expiresAt}`;
  return `${payload}.${signature(payload, secret)}`;
}

export function isAdminSessionValid(token: string | undefined, now = Date.now()): boolean {
  const secret = sessionSecret();
  if (!token || !secret) return false;

  const [version, expiresAtRaw, receivedSignature, ...extra] = token.split(".");
  if (extra.length > 0 || version !== SESSION_VERSION || !receivedSignature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(now / 1000)) return false;

  const payload = `${version}.${expiresAt}`;
  return equal(receivedSignature, signature(payload, secret));
}

export const ADMIN_SESSION_TTL_SECONDS = SESSION_TTL_SECONDS;
