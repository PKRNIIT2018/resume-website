# Deployment Guide

This guide will walk you through deploying your resume website to Vercel (recommended) and alternative platforms.

## 🚀 Deploy to Vercel (Recommended)

Vercel is the recommended hosting platform for this Astro website. It offers:
- ✅ Free hosting with unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Automatic deployments on git push
- ✅ Edge network for global performance
- ✅ Zero configuration needed

### Step-by-Step Vercel Deployment

#### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Resume website"

# Create a new repository on GitHub
# Then add the remote and push
git remote add origin https://github.com/yourusername/resume-website.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel

**Option A: Using Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect Astro
5. Click "Deploy" (no configuration needed!)
6. Wait 1-2 minutes for deployment to complete
7. Your site is live! 🎉

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? resume-website
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

#### 3. Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `yourname.com`)
4. Follow DNS configuration instructions:
   - **For root domain**: Add A record pointing to Vercel's IP
   - **For subdomain**: Add CNAME record pointing to `cname.vercel-dns.com`
5. Wait for DNS propagation (5-30 minutes)
6. Vercel will automatically provision SSL certificate

#### 4. Update Site URL

Update `astro.config.mjs` with your actual domain:

```javascript
export default defineConfig({
  site: 'https://yourname.com', // Your actual domain
});
```

Commit and push:
```bash
git add astro.config.mjs
git commit -m "Update site URL"
git push
```

Vercel will automatically redeploy!

### Environment Variables (If Needed)

If you need to add environment variables (e.g., API keys):

1. Go to Vercel dashboard → Your project
2. Click "Settings" → "Environment Variables"
3. Add your variables
4. Redeploy the project

---

## 🌐 Alternative: Deploy to Netlify

Netlify is another excellent option with similar features.

### Step-by-Step Netlify Deployment

#### 1. Prepare Repository (Same as Vercel)

Push your code to GitHub (see Vercel step 1)

#### 2. Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and authorize
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty)
6. Click "Deploy site"
7. Wait for deployment to complete

#### 3. Configure Custom Domain

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration:
   - Add CNAME record: `www` → `your-site.netlify.app`
   - Add A record: `@` → Netlify's IP (provided)
5. Enable HTTPS (automatic)

### Netlify Configuration File (Optional)

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

---

## 📄 Alternative: Deploy to GitHub Pages

Free hosting directly from your GitHub repository.

### Step-by-Step GitHub Pages Deployment

#### 1. Update Astro Config

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/resume-website', // Your repo name
});
```

#### 2. Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

#### 3. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: "GitHub Actions"
3. Save

#### 4. Deploy

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push
```

Your site will be live at `https://yourusername.github.io/resume-website/`

---

## 🔧 Alternative: Deploy to Cloudflare Pages

Fast, free hosting with global CDN.

### Step-by-Step Cloudflare Pages Deployment

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up/login
3. Click "Create a project"
4. Connect to GitHub
5. Select your repository
6. Configure build:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. Click "Save and Deploy"

---

## 📊 Post-Deployment Checklist

After deploying, verify everything works:

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Images display properly
- [ ] Contact form submits (test it!)
- [ ] Resume PDF downloads
- [ ] Links open correctly
- [ ] Mobile responsive design works
- [ ] HTTPS is enabled
- [ ] Custom domain works (if configured)

## 🔍 SEO Setup

After deployment, submit your site to search engines:

### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Verify ownership
4. Submit sitemap: `https://yoursite.com/sitemap.xml`

### Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

## 📈 Analytics Setup (Optional)

### Google Analytics

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get tracking ID
3. Add to `BaseLayout.astro` before `</head>`:

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

### Vercel Analytics (Recommended for Vercel)

1. In Vercel dashboard, go to your project
2. Click "Analytics" tab
3. Enable analytics (free tier available)
4. No code changes needed!

## 🚨 Troubleshooting

### Build Fails

- Check Node.js version (18+ required)
- Run `npm install` to ensure dependencies are installed
- Check build logs for specific errors

### 404 Errors

- Verify `astro.config.mjs` has correct `site` and `base` URLs
- Check that all internal links are correct
- Ensure files are in the correct directories

### Styles Not Loading

- Verify `global.css` is imported in `BaseLayout.astro`
- Check browser console for CSS errors
- Clear browser cache

### Contact Form Not Working

- Verify Formspree form ID is correct
- Check form action URL
- Test form submission
- Check Formspree dashboard for submissions

## 🔄 Continuous Deployment

With Vercel/Netlify/GitHub Pages, every push to main branch automatically deploys:

```bash
# Make changes
git add .
git commit -m "Update content"
git push

# Deployment happens automatically!
```

## 📝 Update Workflow

To update your live site:

1. Make changes locally
2. Test with `npm run dev`
3. Commit changes: `git commit -m "Description"`
4. Push to GitHub: `git push`
5. Automatic deployment triggers
6. Site updates in 1-2 minutes

---

## 🎉 You're Live!

Congratulations! Your resume website is now live and accessible to the world.

**Next Steps:**
- Share your URL on LinkedIn, Twitter, etc.
- Add the link to your email signature
- Include it on your business cards
- Update your GitHub profile README

**Need Help?**
- [Astro Documentation](https://docs.astro.build)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)