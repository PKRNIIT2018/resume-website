import type { APIRoute } from 'astro';

// Resume template based on RESUME.md
const RESUME_TEMPLATE = `# PRASANTH KUNNUMAL RAMESH, PMP®

**Product Owner | Senior Technical Business Analyst | Project Manager**

📍 Pezinok, Slovakia  
📧 prasanth.k.ramesh@gmail.com  
📱 +421 944 016 820  
🔗 [linkedin.com/in/prasanthkr](https://linkedin.com/in/prasanthkr)

---

## EXECUTIVE SUMMARY

Dynamic and result-oriented Project Management Professional (PMP®) with over 20 years of IT expertise. A rare blend of technical depth (Software Development & Data Science) and leadership excellence (Product Ownership & Team Management). Proven track record at IBM and NVSSoft in delivering high-impact global applications, managing cross-functional teams of 30+, and fostering agile transformation.

---

## CORE COMPETENCIES

### Strategic Leadership & Management
- Agile (Scrum/Kanban), DevOps, Waterfall
- Team Leadership (30+ members), Stakeholder Management
- Project Planning, Change Management, Negotiation
- Process Improvement, IT Service Management (ITSM)
- Business Development, Consulting

### Technical & Product Ownership
- Product Vision & Strategy, Backlog Prioritization
- User Story Mapping, Technical Documentation
- IBM Cloud, IBM Cloud Object Storage, SharePoint
- Jira, Trello, MURAL, monday.com
- Microsoft Excel (Expert), MS SQL Server, Oracle

### Data Science & Analytics
- Python, Pandas, Jupyter Notebooks
- PostgreSQL, SQL, Data Analysis
- KPI Tracking, User Adoption Metrics

### Software Development
- .NET, C#, ASP.NET, JavaScript, HTML, Java
- Software Development Life Cycle (SDLC)
- Electronic Health Records (EHR)
- Document Management Systems

---

## PROFESSIONAL EXPERIENCE

### IBM | Bratislava, Slovakia

**Business Analyst** | *September 2024 – Present*
- Leading on-site Scrum initiatives and project management for strategic business units
- Facilitating agile transformation and process improvements
- Managing stakeholder relationships and requirements gathering

**Senior Technical Business Analyst / Product Owner** | *April 2019 – October 2023*
- Managed development of a worldwide IBM application for invoice access across multiple billing tools
- Facilitated all Scrum ceremonies; managed technical debt, security compliance, and feature roadmaps
- Leveraged PostgreSQL, Pandas, and Jupyter to track user adoption and KPI metrics
- Led cross-functional teams in delivering high-impact solutions for global users

### NVSSoft | Riyadh, Saudi Arabia

**Account Project Manager / Team Lead** | *June 2013 – May 2018*
- Led cross-functional teams of 30+ to deliver enterprise document management solutions
- Negotiated with external suppliers and managed vendor relationships
- Implemented rigorous document control and traceability processes

### APTECH EUROPE / QATAR | Slovakia & Qatar

**Training Manager / Assistant Academic Head** | *August 2008 – April 2012*
- Managed a team of 7 certified trainers across multiple locations
- Designed curricula for programming and project management courses
- Awarded "Best Trainer of Aptech Qatar" (2008-2009)

---

## EDUCATION

**Bachelor of Science in Computer Science**  
University Name | 2000 – 2004

---

## LICENSES & CERTIFICATIONS

- **PMP® (Project Management Professional)** – Project Management Institute (PMI)
- **Microsoft Certified Trainer (MCT)** – Microsoft
- **Microsoft Certified Application Developer (MCAD: .NET)** – Microsoft
- **Scrum Fundamentals Certified** – Udemy
- **ICDL (International Computer Driving License)** – ICDL Foundation

---

## TECHNICAL SKILLS SUMMARY

**Languages & Frameworks:** .NET, C#, ASP.NET, JavaScript, HTML, Java, Python  
**Databases:** PostgreSQL, MS SQL Server, Oracle, MongoDB  
**Tools & Platforms:** Jira, Trello, MURAL, IBM Cloud, SharePoint, Jupyter, Pandas  
**Methodologies:** Agile/Scrum, Kanban, DevOps, Waterfall, SDLC

---

## LANGUAGES

- **English:** Fluent (Professional Working Proficiency)
- **Hindi:** Native
- **Malayalam:** Native

---

*References available upon request*`;

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

    const coverLetterPrompt = `Based on the following job description and resume, write a compelling cover letter for Prasanth K Ramesh.

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

