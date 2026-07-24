import type { APIRoute } from "astro";
import { timingSafeEqual } from "node:crypto";
import { isRateLimited } from "../../../utils/rateLimit";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (isRateLimited(`verify:${clientAddress}`, 5, 15 * 60 * 1000)) {
    return new Response(JSON.stringify({ ok: false }), { status: 429 });
  }

  const body = await request.json().catch(() => null);

  if (!body || typeof body.password !== "string") {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }

  const adminPassword = import.meta.env.ADMIN_RESUME_PASSWORD;

  if (!adminPassword || !safeEqual(body.password, adminPassword)) {
    return new Response(JSON.stringify({ ok: false }), { status: 401 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
