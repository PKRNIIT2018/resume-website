import type { APIRoute } from "astro";
import { timingSafeEqual } from "node:crypto";
import { ADMIN_SESSION_TTL_SECONDS, createAdminSession } from "../../../utils/adminSession";
import { isRateLimited } from "../../../utils/rateLimit";
import { isSameOriginRequest } from "../../../utils/requestSecurity";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export const POST: APIRoute = async ({ request, clientAddress, cookies }) => {
  if (!isSameOriginRequest(request)) {
    return new Response(JSON.stringify({ ok: false }), { status: 403 });
  }

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

  const session = createAdminSession();
  if (!session) {
    return new Response(JSON.stringify({ ok: false }), { status: 503 });
  }

  cookies.set("admin_session", session, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
