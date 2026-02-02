# 👔 Prasanth Kunnumal Ramesh - AI-Augmented Professional Portfolio

A state-of-the-art, professional resume and portfolio website designed as a **High-Velocity Delivery Engine**. Built with **Astro** and **Vercel**, this platform bridges 20+ years of IT excellence with modern **Agentic AI workflows**.

---

## 🚀 Core Features & AI Strategy

This is not just a static portfolio; it's an **intelligent career platform**:

- **Expert AI Document Generator**: Leverages a bespoke **Executive Career Coach & Technical Recruiter** persona to generate highly refined, persona-driven resumes and cover letters.
- **Recruiter Risk Assessment (Gap Analysis)**: Automatically identifies mismatches between Job Descriptions and the candidate's profile (e.g., language gaps, missing tools) *before* applying.
- **Agentic Workflow Integration**: Highlights expertise in **AntiGravity**, **IBM BOB**, and local LLMs via **Ollama** for privacy-first AI orchestration.
- **LinkedIn Skill Optimizer**: A one-click tool to synchronize your technical skills and meta-skills with recruiter-friendly keywords.
- **Legal Status Integrated**: Transparently manages EU hiring requirements (Permanent Resident of Slovakia).

---

## 🏗️ Technical Architecture

The site uses a robust **Server-Side Rendering (SSR)** approach powered by **Astro** and **Vercel Serverless**.

### How it Works:
1.  **Astro (Frontend/Orchestration)**: 
    - **Islands Architecture**: Public pages are pre-rendered for maximum speed, while the Admin Panel uses interactive components.
    - **Single Source of Truth**: All dynamic content is driven by a central `src/data/resumeData.ts` file, ensuring consistency across the UI, generated PDFs, and AI prompts.
2.  **Vercel (Compute/Hosting)**:
    - **Edge & Serverless**: API routes run on Vercel Serverless Functions (Node.js 24), handling secure authentication and AI API calls.
    - **Global CDN**: Static assets and public pages are delivered via Vercel's global edge network.
3.  **AI Orchestration**:
    - Calls the **Perplexity Sonar Pro (Llama 3.1 based)** model for deep research and document customization.
    - Uses multi-step prompts for **Gap Analysis -> Resume Tailoring -> Cover Letter Hooking**.

---

## 📂 Key Pages & Functionality

| Page | URL | Description |
| :--- | :--- | :--- |
| **Home** | `/` | Luxury hero section with dynamic glassmorphism and core CTA. |
| **About** | `/about` | Professional deep-dive including "AI-Augmented Workflows" and detailed experience. |
| **Portfolio** | `/portfolio` | Visual showcase of strategic projects and engineering impact. |
| **Admin Panel** | `/admin` | **Secured Dashboard** for generating documents and profile optimization. |

---

## 🛠️ API Reference

### `POST /api/generate-documents`
The backbone of the AI generation feature.
- **Payload**: `{ jobUrl: string, jobDescription: string }`
- **Output**: 
  - `resume`: Customized Markdown resume.
  - `coverLetter`: Persona-driven "Problem/Solution" letter.
  - `gapAnalysis`: List of mismatches and recruiter risks.
- **Auth**: Protected by `admin_auth` httpOnly cookies.

---

## ⚙️ Setup & Customization

1.  **Environment Variables**:
    Create a `.env` file with:
    ```env
    ADMIN_PASSWORD=your_secure_password
    PERPLEXITY_API_KEY=pplx-your-key
    ```
2.  **Run Locally**:
    ```bash
    npm install
    npm run dev
    ```
3.  **Deploy**:
    Push to GitHub -> Link to Vercel. Ensure environment variables are added in Vercel Dashboard.

---

Built with ❤️ using [Astro](https://astro.build) & [Vercel](https://vercel.com)
