import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);

  if (!body) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, subject, message } = body as Record<string, string>;

  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
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
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
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
