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

  const { name, email, message } = body as Record<string, string>;
  const subject = "Contact from Resume Website";

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const FREE_DOMAINS = new Set([
    "gmail.com","googlemail.com","yahoo.com","yahoo.co.uk","yahoo.co.in","yahoo.fr",
    "yahoo.de","yahoo.es","yahoo.it","yahoo.ca","yahoo.com.au","ymail.com","rocketmail.com",
    "hotmail.com","hotmail.co.uk","hotmail.fr","hotmail.de","hotmail.it","hotmail.es",
    "outlook.com","outlook.co.uk","outlook.fr","outlook.de","live.com","live.co.uk",
    "live.fr","live.de","msn.com","icloud.com","me.com","mac.com","aol.com","aim.com",
    "protonmail.com","proton.me","protonmail.ch","tutanota.com","tutanota.de","tuta.io",
    "mail.com","email.com","gmx.com","gmx.net","gmx.de","gmx.at","gmx.ch",
    "zohomail.com","zoho.com","yandex.com","yandex.ru","mail.ru","inbox.ru","bk.ru",
    "list.ru","rambler.ru","rediffmail.com","sify.com","indiatimes.com",
    "fastmail.com","fastmail.fm","hushmail.com","guerrillamail.com","temp-mail.org",
    "dispostable.com","mailinator.com","trashmail.com","sharklasers.com","guerrillamailblock.com",
  ]);

  const ALLOWED_EMAILS = new Set(["pkrniit@gmail.com"]);
  const emailDomain = email.split("@")[1]?.toLowerCase();
  if (!ALLOWED_EMAILS.has(email.toLowerCase()) && (!emailDomain || FREE_DOMAINS.has(emailDomain))) {
    return new Response(JSON.stringify({ error: "Please use a work or business email address." }), {
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
