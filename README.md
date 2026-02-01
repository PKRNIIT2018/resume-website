# Prasanth K Ramesh - Professional Resume Website

A modern, professional resume and portfolio website built with Astro. Features a clean design, fast performance, and an AI-powered resume and cover letter generator.

---

## 🚀 Quick Start

Get your website running locally in 2 minutes:

1.  **Clone and Install**:
    ```bash
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
3.  **View Site**: Open `http://localhost:4321` in your browser.

---

## 📁 Project Structure

```
resume-website/
├── public/
│   ├── favicon.svg
│   ├── resume.pdf          # Your resume PDF (to be added)
│   └── images/             # Profile and project images
├── src/
│   ├── components/         # Reusable UI components (Header, Footer)
│   ├── layouts/            # BaseLayout for all pages
│   ├── pages/              # Individual pages (Home, About, Portfolio, Contact)
│   │   ├── admin.astro     # Admin panel for doc generation
│   │   └── api/            # Backend API routes
│   └── styles/             # Global CSS and design tokens
├── astro.config.mjs        # Astro configuration
└── package.json            # Project dependencies
```

---

## ✏️ Customization Guide

Update these files with your personal details:

1.  **Identity**: Update your name in `src/components/Header.astro` and `src/components/Footer.astro`.
2.  **Work History**: Modify `src/pages/about.astro` to reflect your experience, education, and certifications.
3.  **Portfolio**: Update the `projects` array in `src/pages/portfolio.astro`.
4.  **Contact**: Add your Formspree ID to `src/pages/contact.astro` (Line 28).

---

## 📄 Resume PDF Creation

The easiest way to create your resume PDF is to use the dedicated print-ready layout:

1.  Start the dev server (`npm run dev`).
2.  Navigate to `http://localhost:4321/resume.html` (if available) or simply use the "Print" function on any page.
3.  Press `Cmd+P` (Mac) or `Ctrl+P` (Windows).
4.  Select **"Save as PDF"** as the destination.
5.  Enable **"Background graphics"** and save as `public/resume.pdf`.

---

## 🛠️ Admin Panel (AI Document Generator)

This website includes a private admin panel (`/admin`) that helps you customize your resume and cover letter for specific job applications using AI.

### Setup:
1.  Set `ADMIN_PASSWORD` in your `.env` file for secure access.
2.  Set `PERPLEXITY_API_KEY` to enable the AI generation feature.
3.  Access the panel at `your-site.com/admin` to tailor your profile to any job description.

---

## 🚀 Deployment

### Vercel (Recommended)
1.  Push your code to a GitHub repository.
2.  Import the repository into [Vercel](https://vercel.com).
3.  Vercel will auto-detect Astro and deploy your site instantly.
4.  Add your environment variables (`ADMIN_PASSWORD`, `PERPLEXITY_API_KEY`) in the Vercel dashboard.

### Alternatives
You can also deploy to **Netlify**, **Cloudflare Pages**, or **GitHub Pages**. See the respective documentation for specific build settings (`npm run build`).

---

## 🆘 Support & Troubleshooting

- **Build Errors**: Ensure you are using Node is 18+.
- **Port Conflict**: If port 4321 is busy, run `npm run dev -- --port 3000`.
- **Form Issues**: Double-check your Formspree ID in the contact page.

Built with ❤️ using [Astro](https://astro.build)
