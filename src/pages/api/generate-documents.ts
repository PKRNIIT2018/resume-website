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
  template += `🔗 [linkedin.com/in/prasanthkr](${resumeData.personalInfo.linkedin})\n\n`;
  template += `---\n\n## EXECUTIVE SUMMARY\n\n${resumeData.executiveSummary}\n\n---\n\n## CORE COMPETENCIES\n\n`;

  resumeData.skills.forEach(cat => {
    template += `### ${cat.category}\n- ${cat.items.join('\n- ')}\n\n`;
  });

  template += `---\n\n## PROFESSIONAL EXPERIENCE\n\n`;

  resumeData.experience.forEach(exp => {
    template += `### ${exp.company} | ${exp.location}\n\n`;
    template += `**${exp.role}** | *${exp.period}*\n`;
    if (exp.description) template += `${exp.description}\n`;
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
    const resumePrompt = `Based on the following job description, customize this resume to highlight the most relevant skills, experiences, and achievements. Keep the same format and structure, but emphasize aspects that match the job requirements.

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

    const coverLetterPrompt = `Based on the following job description and resume, write a compelling cover letter for Prasanth Kunnumal Ramesh.

Job Description:
${jobDescription}

Resume:
${RESUME_TEMPLATE}

Please write a professional cover letter that:
1. Opens with a strong introduction expressing interest in the position
2. Highlights 2-3 key qualifications that match the job requirements
3. Provides specific examples of relevant achievements
4. Demonstrates knowledge of the company/role
5. Closes with a call to action
6. Is concise (300-400 words)
7. Uses a professional but engaging tone

Return only the cover letter text without any additional commentary.`;

    // Call Perplexity API for resume
    const resumeResponse = await fetch('https://api.perplexity.ai/chat/completions', {
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
            content: 'You are an expert resume writer and career consultant. Provide customized, professional resumes based on job descriptions.'
          },
          {
            role: 'user',
            content: resumePrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!resumeResponse.ok) {
      const errorText = await resumeResponse.text();
      console.error('Perplexity API error (resume):', errorText);
      throw new Error(`Failed to generate resume: ${resumeResponse.status}`);
    }

    const resumeData = await resumeResponse.json();
    const customizedResume = resumeData.choices[0].message.content;

    // Call Perplexity API for cover letter
    const coverLetterResponse = await fetch('https://api.perplexity.ai/chat/completions', {
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
            content: 'You are an expert cover letter writer. Create compelling, personalized cover letters that highlight relevant qualifications.'
          },
          {
            role: 'user',
            content: coverLetterPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!coverLetterResponse.ok) {
      const errorText = await coverLetterResponse.text();
      console.error('Perplexity API error (cover letter):', errorText);
      throw new Error(`Failed to generate cover letter: ${coverLetterResponse.status}`);
    }

    const coverLetterData = await coverLetterResponse.json();
    const customizedCoverLetter = coverLetterData.choices[0].message.content;

    return new Response(JSON.stringify({
      resume: customizedResume,
      coverLetter: customizedCoverLetter,
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

