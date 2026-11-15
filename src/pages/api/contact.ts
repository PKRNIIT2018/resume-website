import type { APIRoute } from "astro";
import { Resend } from "resend";
import { isRateLimited } from "../../utils/rateLimit";

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (isRateLimited(`contact:${clientAddress}`, 5, 15 * 60 * 1000)) {
    return new Response(JSON.stringify({ error: "Too many requests. Try again later." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, message, requestCV } = body as Record<string, string>;
  const cvRequested = requestCV === true || requestCV === "true";
  const subject = cvRequested ? "CV Request from Resume Website" : "Contact from Resume Website";

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Personal and business email addresses are both valid contact channels.
  // Keep client validation mirrored here; prevent header misuse and oversized payloads.
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email)) && String(email).length <= 254;
  if (!emailValid || String(name).trim().length < 2 || String(name).length > 160 || String(message).trim().length < 10 || String(message).length > 5000) {
    return new Response(JSON.stringify({ error: "Invalid contact details" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Email service not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resend = new Resend(apiKey);
  const recipient = "prasanth.k.ramesh" + "\u0040" + "gmail.com";

  const { error } = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: recipient,
    replyTo: email,
    subject: `[Resume Site] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n${cvRequested ? "CV Requested: Yes\n" : ""}\nMessage:\n${message}`,
  });

  if (error) {
    return new Response(JSON.stringify({ error: "Failed to send message" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
