import { resumeData } from "../data/resumeData";

function achievementText(a: (typeof resumeData.experience)[number]["achievements"][number]): string {
  if (typeof a === "string") return a.replace(/\*\*/g, "");
  return a.items.map((i) => i.replace(/\*\*/g, "")).join(" ");
}

// Flattened plain-text summary of the resume, used as LLM context for cover letter generation.
export function buildResumeContext(): string {
  const { personalInfo, executiveSummary, skills, experience, education, certifications } = resumeData;

  const skillsText = skills.map((s) => `${s.category}: ${s.items.join(", ")}`).join("\n");

  const experienceText = experience
    .map((exp) => {
      const achievements = exp.achievements.map((a) => `- ${achievementText(a)}`).join("\n");
      return `${exp.role} at ${exp.company} (${exp.period})\n${achievements}`;
    })
    .join("\n\n");

  const educationText = education.map((e) => `${e.degree} - ${e.institution} (${e.year})`).join("\n");

  return `Name: ${personalInfo.name}
Title: ${personalInfo.title}
Location: ${personalInfo.location}

Executive Summary:
${executiveSummary.replace(/\*\*/g, "")}

Skills:
${skillsText}

Experience:
${experienceText}

Education:
${educationText}

Certifications: ${certifications.join(", ")}`;
}
