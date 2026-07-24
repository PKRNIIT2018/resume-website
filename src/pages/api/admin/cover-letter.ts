import type { APIRoute } from "astro";
import { timingSafeEqual } from "node:crypto";
import { isRateLimited } from "../../../utils/rateLimit";
import { buildResumeContext } from "../../../utils/resumeContext";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// ponytail: regex tag-strip instead of a DOM/HTML parser dependency — good enough
// to turn a job posting page into readable text for the LLM prompt.
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const json = (data: unknown, status: number) =>
    new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

  if (isRateLimited(`cover-letter:${clientAddress}`, 10, 15 * 60 * 1000)) {
    return json({ error: "Too many requests. Try again later." }, 429);
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.password !== "string" || typeof body.jobUrl !== "string") {
    return json({ error: "Invalid request" }, 400);
  }

  const adminPassword = import.meta.env.ADMIN_RESUME_PASSWORD;
  if (!adminPassword || !safeEqual(body.password, adminPassword)) {
    return json({ error: "Unauthorized" }, 401);
  }

  let jobUrl: URL;
  try {
    jobUrl = new URL(body.jobUrl);
    if (jobUrl.protocol !== "http:" && jobUrl.protocol !== "https:") throw new Error("bad protocol");
  } catch {
    return json({ error: "Invalid job URL" }, 400);
  }

  const geminiKey = import.meta.env.GEMINI_API_KEY;
  if (!geminiKey) {
    return json({ error: "Cover letter service not configured" }, 503);
  }

  let jobText: string;
  try {
    const pageRes = await fetch(jobUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; CoverLetterBot/1.0)" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!pageRes.ok) throw new Error(`fetch failed: ${pageRes.status}`);
    const html = await pageRes.text();
    jobText = htmlToText(html).slice(0, 12_000);
    if (!jobText) throw new Error("empty page");
  } catch {
    return json({ error: "Could not fetch the job posting. Paste the job description instead." }, 422);
  }

  const prompt = `You are helping write a personalized, professional cover letter.

Candidate resume:
"""
${buildResumeContext()}
"""

Job posting content (may include site navigation noise, extract the relevant job description):
"""
${jobText}
"""

Write a concise, compelling cover letter (max 350 words) tailored to this job, in the candidate's voice, highlighting the resume experience most relevant to the posting's requirements. Do not invent facts not present in the resume. Output plain text only, no markdown.`;

  const model = import.meta.env.GEMINI_MODEL || "gemini-2.5-flash";
  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        signal: AbortSignal.timeout(30_000),
      }
    );

    if (!geminiRes.ok) {
      return json({ error: "Cover letter generation failed" }, 502);
    }

    const data = await geminiRes.json();
    const coverLetter: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!coverLetter) {
      return json({ error: "No content generated" }, 502);
    }

    return json({ coverLetter }, 200);
  } catch {
    return json({ error: "Cover letter generation failed" }, 502);
  }
};
