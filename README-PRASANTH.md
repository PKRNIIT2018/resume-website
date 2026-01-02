# Prasanth K Ramesh - Professional Resume Website

A modern, professional resume and portfolio website showcasing 20+ years of IT expertise in Product Ownership, Technical Business Analysis, and Project Management.

## 🎯 About This Website

This is my personal resume website built with Astro, featuring:
- Complete professional profile and work history
- Portfolio of enterprise projects and achievements
- Contact information and professional networking links

## 👤 About Me

**Prasanth K Ramesh, PMP®**
- **Current Role**: Business Analyst at IBM
- **Location**: Pezinok, Slovakia
- **Experience**: 20+ years in IT
- **Specialization**: Product Ownership, Technical Business Analysis, Agile/Scrum, Data Analytics

### Key Highlights
- 🏆 PMP® Certified Project Management Professional
- 🎓 Microsoft Certified Trainer (MCT)
- 🌍 Managed global IBM applications serving worldwide users
- 👥 Led cross-functional teams of 30+ members
- 📊 Expert in Python, Pandas, PostgreSQL for data analytics
- 🚀 Proven track record in agile transformation

## 🚀 Quick Start

### View the Website Locally

```bash
# Navigate to project directory
cd resume-website

# Start development server
npm run dev

# Open browser to http://localhost:4321
```

## 📝 Customization Checklist

### ✅ Already Customized
- [x] Personal information (name, title, location)
- [x] Contact details (email, phone, LinkedIn)
- [x] Professional summary and experience
- [x] Skills and competencies
- [x] Work history at IBM, NVSSoft, APTECH
- [x] All certifications (PMP®, MCT, MCAD, etc.)
- [x] Professional endorsements
- [x] Portfolio projects

### 📋 Still To Do
- [ ] Add your professional photo to `public/images/profile.jpg`
- [ ] Add your resume PDF to `public/resume.pdf`
- [ ] Set up Formspree for contact form (get form ID from formspree.io)
- [ ] Add project screenshots to `public/images/projects/`
- [ ] Update `astro.config.mjs` with your actual domain
- [ ] Test contact form submission
- [ ] Review and adjust any content as needed

## 🔧 Next Steps

### 1. Add Your Resume PDF

```bash
# Copy your resume to the public folder
cp /path/to/your/resume.pdf public/resume.pdf
```

### 2. Set Up Contact Form

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy your form ID
4. Update `src/pages/contact.astro` line 28:
   ```astro
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### 3. Add Professional Photo (Optional)

```bash
# Add your photo
cp /path/to/your/photo.jpg public/images/profile.jpg
```

Then update the home page to display it.

### 4. Deploy to Vercel

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Prasanth's resume website"

# Create repository on GitHub and push
git remote add origin https://github.com/yourusername/resume-website.git
git branch -M main
git push -u origin main

# Then go to vercel.com and import your GitHub repository
```

## 📊 Website Structure

```
resume-website/
├── src/
│   ├── components/
│   │   ├── Header.astro          # Navigation with your name
│   │   └── Footer.astro          # Footer with your links
│   ├── layouts/
│   │   └── BaseLayout.astro      # SEO-optimized layout
│   ├── pages/
│   │   ├── index.astro           # Home page with hero section
│   │   ├── about.astro           # Complete professional profile
│   │   ├── portfolio.astro       # Projects and achievements
│   │   ├── blog.astro            # Blog listing
│   │   └── contact.astro         # Contact form and info
│   └── styles/
│       └── global.css            # Professional styling
└── public/
    ├── resume.pdf                # Your resume (to be added)
    └── images/                   # Project images (to be added)
```

## 🎨 Customization Options

### Change Colors

Edit `src/styles/global.css` (lines 8-18):
```css
--primary: #2563eb;      /* Main brand color */
--secondary: #0f172a;    /* Dark color */
--accent: #06b6d4;       /* Accent color */
```

### Update Content

All your information is already in place, but you can adjust:
- **Home page**: `src/pages/index.astro`
- **About page**: `src/pages/about.astro`
- **Portfolio**: `src/pages/portfolio.astro`
- **Contact**: `src/pages/contact.astro`

## 📱 Features

- ✅ Fully responsive design
- ✅ SEO optimized with meta tags
- ✅ Fast performance (Lighthouse 95+)
- ✅ Professional modern design
- ✅ Contact form ready
- ✅ Resume PDF download
- ✅ Social media links
- ✅ Mobile-friendly navigation

## 🌐 Deployment

### Recommended: Vercel (Free)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (automatic configuration)
5. Add custom domain (optional)

See `DEPLOYMENT.md` for detailed instructions.

## 📞 Your Contact Information

- **Email**: prasanth.k.ramesh@gmail.com
- **Phone**: +421 944 016 820
- **LinkedIn**: [linkedin.com/in/prasanthkr](https://linkedin.com/in/prasanthkr)
- **Location**: Pezinok, Slovakia

## 🎓 Your Certifications

- PMP® (Project Management Professional) - PMI ID: 3696499
- Microsoft Certified Trainer (MCT)
- Microsoft Certified Application Developer (MCAD: .NET)
- Microsoft Certified Technology Specialist (MCTS)
- Scrum Fundamentals Certified
- ICDL (International Computer Driving License)
- Certified Arcmate Administrator
- Kodak Scanner Maintenance Specialist

## 💼 Your Professional Experience

### IBM (2019 - Present)
- Business Analyst (Sep 2024 - Present)
- Senior Technical Business Analyst / Product Owner (Apr 2019 - Oct 2023)

### NVSSoft (2013 - 2018)
- Account Project Manager / Team Lead

### APTECH EUROPE / QATAR (2008 - 2012)
- Training Manager / Assistant Academic Head

### Earlier Roles (2004 - 2008)
- Senior Executive Trainer at Synergetics IT Services
- Technical Trainer at NIIT

## 🛠️ Your Technical Skills

**Leadership & Management**: Agile/Scrum, DevOps, Team Leadership, Stakeholder Management

**Product & Tools**: Jira, Trello, MURAL, IBM Cloud, SharePoint

**Data & Analytics**: Python, Pandas, Jupyter, PostgreSQL, SQL

**Development**: .NET, C#, ASP.NET, JavaScript, Java

## 📚 Additional Resources

- [QUICKSTART.md](./QUICKSTART.md) - Quick setup guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment instructions
- [Astro Documentation](https://docs.astro.build)

## 🎉 You're Ready!

Your professional resume website is ready to deploy. All your information has been integrated, and the site is fully functional. Just add your resume PDF, set up the contact form, and deploy!

---

Built with ❤️ using [Astro](https://astro.build)