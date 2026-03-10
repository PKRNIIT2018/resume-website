import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.password !== "string") {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }

  const adminPassword = import.meta.env.ADMIN_RESUME_PASSWORD;

  if (!adminPassword || body.password !== adminPassword) {
    return new Response(JSON.stringify({ ok: false }), { status: 401 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
