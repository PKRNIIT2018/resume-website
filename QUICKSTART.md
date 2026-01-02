# Quick Start Guide

Get your resume website up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Customize Your Information (5 minutes)

Open these files and replace placeholder text with your information:

#### **Header** (`src/components/Header.astro`)
```astro
Line 13: Replace "Your Name" with your actual name
```

#### **Footer** (`src/components/Footer.astro`)
```astro
Lines 4-7: Update social media URLs
Line 17: Update your name and tagline
```

#### **Home Page** (`src/pages/index.astro`)
```astro
Line 13: Your name
Line 14: Your title/role
Lines 15-18: Your introduction
Lines 48-52: Update skills badges
```

#### **About Page** (`src/pages/about.astro`)
```astro
Lines 25-40: Professional summary
Lines 60-110: Your skills
Lines 120-200: Work experience
Lines 210-230: Education
Lines 240-270: Certifications
```

#### **Contact Page** (`src/pages/contact.astro`)
```astro
Line 28: Replace YOUR_FORM_ID with Formspree ID
Lines 70-95: Update contact information
```

### 2. Add Your Content

#### Resume PDF
```bash
# Add your resume PDF to the public folder
cp /path/to/your/resume.pdf public/resume.pdf
```

#### Project Images
```bash
# Add project screenshots
cp /path/to/project-images/* public/images/projects/
```

#### Update Projects
Edit `src/pages/portfolio.astro` lines 7-60 with your actual projects.

### 3. Test Locally

```bash
# Start development server
npm run dev

# Open browser to http://localhost:4321
```

### 4. Deploy to Vercel

```bash
# Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/resume-website.git
git push -u origin main

# Then go to vercel.com and import your GitHub repo
# Vercel will auto-deploy in 2 minutes!
```

## ✅ Checklist

Before deploying, make sure you've:

- [ ] Updated your name everywhere
- [ ] Updated all social media links
- [ ] Added your resume PDF
- [ ] Updated work experience
- [ ] Updated skills
- [ ] Updated education
- [ ] Updated projects with real data
- [ ] Set up Formspree for contact form
- [ ] Added project images
- [ ] Tested all pages locally
- [ ] Updated email addresses

## 🎨 Quick Customization

### Change Colors

Edit `src/styles/global.css` lines 8-18:

```css
--primary: #2563eb;      /* Main brand color */
--secondary: #0f172a;    /* Dark color */
--accent: #06b6d4;       /* Accent color */
```

### Change Fonts

1. Update Google Fonts link in `src/layouts/BaseLayout.astro` line 48
2. Update font family in `src/styles/global.css` line 30

## 🆘 Common Issues

### Port Already in Use
```bash
# Kill process on port 4321
lsof -ti:4321 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles Not Loading
- Make sure `global.css` is imported in `BaseLayout.astro`
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

## 📚 Learn More

- [Full README](./README.md) - Complete documentation
- [Deployment Guide](./DEPLOYMENT.md) - Detailed deployment instructions
- [Astro Docs](https://docs.astro.build) - Astro framework documentation

## 🎉 You're Ready!

Your resume website is ready to customize and deploy. Good luck! 🚀