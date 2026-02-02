import type { APIRoute } from 'astro';

// Resume template based on RESUME.md
import { resumeData } from '../../data/resumeData';

// Generate raw markdown template from resumeData
const generateRawTemplate = () => {
  let template = `# ${resumeData.personalInfo.name}\n\n`;
  template += `**${resumeData.personalInfo.title}**\n\n`;
  template += `📍 ${resumeData.personalInfo.location}  \n`;
  template += `📧 ${resumeData.personalInfo.email}  \n`;
  template += `📱 ${resumeData.personalInfo.phone}  \n`;
  template += `🔗 [linkedin.com/in/prasanthkr](${resumeData.personalInfo.linkedin})  \n`;
  template += `🇪🇺 Work Status: Permanent Resident of Slovakia (EU Citizen equivalent for legal hiring in SK)\n\n`;
  template += `---\n\n## EXECUTIVE SUMMARY\n\n${resumeData.executiveSummary}\n\n---\n\n## CORE COMPETENCIES\n\n`;

  resumeData.skills.forEach(cat => {
    template += `### ${cat.category}\n- ${cat.items.join('\n- ')}\n\n`;
  });

  template += `---\n\n## PROFESSIONAL EXPERIENCE\n\n`;

  resumeData.experience.forEach(exp => {
    template += `### ${exp.company} | ${exp.location}\n\n`;
    template += `**${exp.role}** | *${exp.period}*\n`;
    exp.achievements.forEach(ach => {
      if (typeof ach === 'string') {
        template += `- ${ach}\n`;
      } else {
        template += `\n**${ach.title}**\n`;
        ach.items.forEach(item => template += `- ${item}\n`);
      }
    });
    template += `\n`;
  });

  template += `---\n\n## EDUCATION\n\n`;
  resumeData.education.forEach(edu => {
    template += `**${edu.degree}**  \n${edu.institution} | ${edu.year}\n\n`;
  });

  template += `---\n\n## LICENSES & CERTIFICATIONS\n\n`;
  resumeData.certifications.forEach(cert => {
    template += `- ${cert}\n`;
  });

  template += `\n---\n\n*References available upon request*`;
  return template;
};

const RESUME_TEMPLATE = generateRawTemplate();
const TECH_STACK = resumeData.skills.flatMap(cat => cat.items).join(', ');

export const POST: APIRoute = async ({ request, cookies }) => {
  // Check authentication
  const isAuthenticated = cookies.get('admin_auth')?.value === 'true';

  if (!isAuthenticated) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { jobUrl, jobDescription } = await request.json();

    if (!jobDescription || jobDescription.trim() === '') {
      return new Response(JSON.stringify({ error: 'Job description is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get API key from environment
    const apiKey = import.meta.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({
        error: 'API key not configured. Please set PERPLEXITY_API_KEY in your .env file'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate customized resume using Perplexity API
    const resumePrompt = `Act as an expert Executive Career Coach and Technical Recruiter. Based on the following job description, customize this resume for a Senior IT leader (Prasanth Kunnumal Ramesh) to highlight the most relevant skills, experiences, and achievements. Keep the same format and structure, but emphasize aspects that match the job requirements, especially around AI-augmented workflows and strategic leadership.

Job Description:
${jobDescription}

Current Resume:
${RESUME_TEMPLATE}

Please provide a customized version of the resume that:
1. Emphasizes relevant skills and experiences for this specific job
2. Adjusts the executive summary to align with the job requirements
3. Highlights relevant projects and achievements
4. Maintains professional formatting and structure
5. Keeps all factual information accurate

Return only the customized resume text without any additional commentary.`;

    const coverLetterPrompt = `Role: Act as an expert Executive Career Coach and Technical Recruiter with a touch of wit.

Task: Create a highly refined cover letter for a Senior IT leader (Prasanth Kunnumal Ramesh).

Input Data:

My Resume/Profile:
${RESUME_TEMPLATE}

Target Job Description:
${jobDescription}

The Tech Stack:
${TECH_STACK}

AI Strategy: Mention my use of agentic workflows like AntiGravity, IBM BOB, and local LLMs via Ollama for privacy.

Legal Status: Permanent resident of Slovakia (No permit needed for SK; sponsorship needed for Austria/other EU).

Constraint & Style Guidelines:

- Tone: Adaptive. Match the brand's energy (e.g., bold and direct for Red Bull, corporate and secure for IBM, innovative for a media house).
- Structure: Use a "Problem/Solution" approach. Don't just list duties; explain how my skills solve the company’s specific pain points (e.g., PLM transformation, high-traffic scaling).
- Formatting: Use bolding for key technologies and bullet points for high-impact achievements to ensure scannability.
- The "Hook": Include a subtle, professional nod to the company’s culture or slogan in the closing.
- Technical Accuracy: Use LaTeX only for complex formulas; otherwise, keep it clean and professional.

Goal: Create a letter that proves I am a "low-risk, high-reward" candidate who bridges the gap between R&D/Business and Technical execution.

Return only the cover letter text without any additional commentary.`;

    const gapAnalysisPrompt = `Act as a sharp Technical Recruiter and Risk Analyst. Compare the following Job Description with the Candidate's Resume. 
    
    Identify specific "Gaps" or "Mismatches" where the candidate does NOT meet the requirements.
    Focus on:
    1. Mandatory skills or technologies mentioned in the JD but missing from the resume.
    2. Language requirements (e.g., German, French) mentioned in the JD but not found in the candidate's languages.
    3. Years of experience in specific areas if the candidate falls short.
    4. Certifications required by the JD that the candidate doesn't have.

    Job Description:
    ${jobDescription}

    Candidate Resume:
    ${RESUME_TEMPLATE}

    Return the results as a concise, bulleted list of "Gaps Detected". If no major gaps are found, say "No significant gaps detected."
    
    Keep it professional but direct. Return ONLY the bulleted list.`;

    // Create promise factories for parallel execution
    const generateResume = () => fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: 'Act as an expert Executive Career Coach and Technical Recruiter. Your mission is to provide customized, high-impact professional resumes for senior IT leaders that prove they are "low-risk, high-reward" candidates.'
          },
          {
            role: 'user',
            content: resumePrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    }).then(async res => {
      if (!res.ok) throw new Error(`Resume generation failed: ${res.status}`);
      const data = await res.json();
      return data.choices[0].message.content;
    });

    const generateCoverLetter = () => fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: 'Act as an expert Executive Career Coach and Technical Recruiter with a touch of wit. Your goal is to create a cover letter that proves the candidate is a "low-risk, high-reward" asset who bridges the gap between R&D/Business and Technical execution.'
          },
          {
            role: 'user',
            content: coverLetterPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    }).then(async res => {
      if (!res.ok) throw new Error(`Cover letter generation failed: ${res.status}`);
      const data = await res.json();
      return data.choices[0].message.content;
    });

    const generateGapAnalysis = () => fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: 'You are a sharp Technical Recruiter and Risk Analyst. Your goal is to identify mismatches between a candidate and a job description.'
          },
          {
            role: 'user',
            content: gapAnalysisPrompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1000
      })
    }).then(async res => {
      if (!res.ok) return 'Analysis unavailable (API Error).';
      const data = await res.json();
      return data.choices[0].message.content;
    });

    // Execute in parallel
    const [resumeResult, coverLetterResult, gapAnalysisResult] = await Promise.allSettled([
      generateResume(),
      generateCoverLetter(),
      generateGapAnalysis()
    ]);

    // Handle results
    const customizedResume = resumeResult.status === 'fulfilled' ? resumeResult.value : 'Failed to generate resume.';
    const customizedCoverLetter = coverLetterResult.status === 'fulfilled' ? coverLetterResult.value : 'Failed to generate cover letter.';
    const gapAnalysis = gapAnalysisResult.status === 'fulfilled' ? gapAnalysisResult.value : 'Analysis unavailable.';

    // Log errors if any critical ones failed
    if (resumeResult.status === 'rejected') console.error('Resume Error:', resumeResult.reason);
    if (coverLetterResult.status === 'rejected') console.error('Cover Letter Error:', coverLetterResult.reason);

    return new Response(JSON.stringify({
      resume: customizedResume,
      coverLetter: customizedCoverLetter,
      gapAnalysis: gapAnalysis,
      jobUrl: jobUrl || null
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error generating documents:', error);
    return new Response(JSON.stringify({
      error: 'Failed to generate documents',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

