# 🚀 Deployment Steps - Prasanth's Resume Website

Complete step-by-step guide to deploy your website to Vercel.

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [x] Website is working locally (http://localhost:4321)
- [x] All pages load correctly (Home, About, Portfolio, Contact)
- [x] Personal information is updated
- [ ] Resume PDF is created and saved to `public/resume.pdf`
- [ ] Contact form Formspree ID is added (optional, can do after deployment)
- [ ] All content reviewed and finalized

---

## 📋 Step-by-Step Deployment

### Step 1: Commit Your Changes (5 minutes)

```bash
# Navigate to project directory
cd /Users/prasanthramesh/Desktop/resume-website

# Add all files to git
git add .

# Commit with a message
git commit -m "Complete Prasanth's professional resume website"

# Verify commit
git log --oneline -1
```

**Expected Output**: Should show your commit message

---

### Step 2: Create GitHub Repository (3 minutes)

#### Option A: Using GitHub Website (Recommended)

1. **Go to GitHub**: https://github.com
2. **Sign in** to your account (or create one if needed)
3. **Click** the "+" icon (top-right) → "New repository"
4. **Repository settings**:
   - **Name**: `resume-website` or `prasanth-portfolio`
   - **Description**: "Professional resume and portfolio website"
   - **Visibility**: Public (recommended) or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. **Click** "Create repository"

#### Option B: Using GitHub CLI (if installed)

```bash
gh repo create resume-website --public --source=. --remote=origin
```

---

### Step 3: Push to GitHub (2 minutes)

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/resume-website.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Expected Output**: 
```
Enumerating objects: XX, done.
Writing objects: 100% (XX/XX), done.
```

**Verify**: Go to your GitHub repository URL and see all files uploaded

---

### Step 4: Deploy to Vercel (5 minutes)

#### 4.1: Sign Up / Sign In to Vercel

1. **Go to**: https://vercel.com
2. **Click**: "Sign Up" (or "Log In" if you have an account)
3. **Choose**: "Continue with GitHub"
4. **Authorize**: Vercel to access your GitHub account

#### 4.2: Import Your Repository

1. **Click**: "Add New..." → "Project"
2. **Find**: Your `resume-website` repository in the list
3. **Click**: "Import"

#### 4.3: Configure Project

Vercel will auto-detect Astro. Verify these settings:

- **Framework Preset**: Astro (auto-detected)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)
- **Install Command**: `npm install` (auto-filled)

**Environment Variables**: None needed for now

#### 4.4: Deploy

1. **Click**: "Deploy"
2. **Wait**: 1-2 minutes for deployment
3. **Success**: You'll see "Congratulations!" with your live URL

**Your website will be live at**: `https://resume-website-xxx.vercel.app`

---

### Step 5: Configure Custom Domain (Optional - 10 minutes)

If you have a custom domain (e.g., `prasanthramesh.com`):

#### 5.1: In Vercel Dashboard

1. **Go to**: Your project → "Settings" → "Domains"
2. **Add**: Your domain name
3. **Vercel provides**: DNS configuration instructions

#### 5.2: Update DNS Records

At your domain registrar (GoDaddy, Namecheap, etc.):

**For root domain** (`prasanthramesh.com`):
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain** (`www.prasanthramesh.com`):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### 5.3: Wait for DNS Propagation

- **Time**: 5 minutes to 48 hours (usually 15-30 minutes)
- **Check**: https://dnschecker.org
- **Vercel**: Will auto-provision SSL certificate

---

### Step 6: Update Site URL in Code (2 minutes)

After deployment, update your site URL:

```bash
# Edit astro.config.mjs
# Change line 6 from:
site: 'https://yourname.com',

# To your actual Vercel URL:
site: 'https://resume-website-xxx.vercel.app',
# OR your custom domain:
site: 'https://prasanthramesh.com',
```

Then commit and push:

```bash
git add astro.config.mjs
git commit -m "Update site URL"
git push
```

**Vercel will auto-deploy** the update in 1-2 minutes!

---

### Step 7: Set Up Contact Form (5 minutes)

#### 7.1: Create Formspree Account

1. **Go to**: https://formspree.io
2. **Sign up**: Free account
3. **Create**: New form
4. **Copy**: Your form ID (looks like `xyzabc123`)

#### 7.2: Update Contact Page

```bash
# Edit src/pages/contact.astro
# Line 28, replace YOUR_FORM_ID with your actual ID:
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

#### 7.3: Deploy Update

```bash
git add src/pages/contact.astro
git commit -m "Add Formspree contact form"
git push
```

**Vercel auto-deploys** in 1-2 minutes!

---

## ✅ Post-Deployment Checklist

After deployment, verify everything works:

### Test Your Live Website

Visit your Vercel URL and check:

- [ ] **Home page** loads correctly
- [ ] **About page** shows all your information
- [ ] **Portfolio page** displays projects
- [ ] **Contact page** loads
- [ ] **Navigation** works on all pages
- [ ] **Mobile responsive** (test on phone or resize browser)
- [ ] **Resume download** works (if PDF is uploaded)
- [ ] **Contact form** submits successfully (if Formspree is set up)
- [ ] **All links** work correctly
- [ ] **Images** load (if any added)

### Performance Check

1. **Go to**: https://pagespeed.web.dev
2. **Enter**: Your Vercel URL
3. **Check**: Should score 90+ on all metrics

### SEO Check

1. **Google Search Console**: https://search.google.com/search-console
2. **Add property**: Your website URL
3. **Verify ownership**: Follow instructions
4. **Submit sitemap**: `https://your-site.com/sitemap.xml`

---

## 🔄 Future Updates

### Making Changes to Your Website

```bash
# 1. Make changes locally
# Edit files as needed

# 2. Test locally
npm run dev
# Visit http://localhost:4321 and verify changes

# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Push to GitHub
git push

# 5. Vercel auto-deploys!
# Wait 1-2 minutes, changes are live
```

### Automatic Deployments

Every time you push to GitHub:
- ✅ Vercel automatically builds your site
- ✅ Runs tests and checks
- ✅ Deploys to production
- ✅ Updates your live website
- ⏱️ Takes 1-2 minutes

---

## 🆘 Troubleshooting

### Build Fails on Vercel

**Check**:
1. Build logs in Vercel dashboard
2. Ensure `npm run build` works locally
3. Check for any errors in code

**Fix**:
```bash
# Test build locally
npm run build

# If it works locally, push again
git push
```

### Domain Not Working

**Check**:
1. DNS records are correct
2. Wait 15-30 minutes for propagation
3. Use https://dnschecker.org to verify

### Contact Form Not Working

**Check**:
1. Formspree form ID is correct
2. Form is not in test mode
3. Check Formspree dashboard for submissions

---

## 📊 Monitoring Your Website

### Vercel Analytics (Free)

1. **Go to**: Project → "Analytics" tab
2. **Enable**: Vercel Analytics
3. **View**: Page views, visitors, performance

### Google Analytics (Optional)

Add to `src/layouts/BaseLayout.astro` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎉 You're Live!

Your professional resume website is now:
- ✅ Live on the internet
- ✅ Accessible worldwide
- ✅ Fast and optimized
- ✅ Automatically updated when you push changes
- ✅ Free to host on Vercel

**Share your website**:
- LinkedIn profile
- Email signature
- Business cards
- Resume
- Social media

---

## 📞 Your Live Website

**Vercel URL**: `https://resume-website-xxx.vercel.app`  
**Custom Domain** (if configured): `https://prasanthramesh.com`

**Share it with**:
- Recruiters
- Potential employers
- Professional network
- LinkedIn connections

---

## 🚀 Next Steps

1. ✅ Complete deployment following steps above
2. ✅ Test all functionality
3. ✅ Share your website URL
4. ✅ Update LinkedIn with website link
5. ✅ Add to email signature
6. ✅ Submit to search engines

**Congratulations! Your professional website is live!** 🎉

---

*Need help? Check DEPLOYMENT.md for more detailed information or visit Vercel's documentation.*