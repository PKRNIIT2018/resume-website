# How to Create Your Resume PDF

I've created your resume in two formats that you can easily convert to PDF. Choose the method that works best for you:

## 📄 Option 1: Print HTML to PDF (Recommended - Easiest)

### Steps:
1. **Open the HTML resume in your browser:**
   - Navigate to: http://localhost:4321/resume.html
   - OR open the file directly: `/Users/prasanthramesh/Desktop/resume-website/public/resume.html`

2. **Click the "Print to PDF" button** (blue button in top-right corner)
   - OR use keyboard shortcut: `Cmd+P` (Mac) or `Ctrl+P` (Windows)

3. **In the print dialog:**
   - **Destination**: Select "Save as PDF"
   - **Layout**: Portrait
   - **Margins**: Default or None
   - **Background graphics**: Enabled (to show colors)

4. **Save the PDF:**
   - Choose location: `/Users/prasanthramesh/Desktop/resume-website/public/resume.pdf`
   - Click "Save"

**Done!** Your professional PDF resume is ready.

---

## 📝 Option 2: Convert Markdown to PDF

### Method A: Using Online Tools (No Installation)

1. **Open the Markdown file:**
   - Location: `/Users/prasanthramesh/Desktop/resume-website/RESUME.md`

2. **Go to one of these free online converters:**
   - [Markdown to PDF](https://www.markdowntopdf.com/)
   - [Dillinger](https://dillinger.io/) - Click "Export as" → "PDF"
   - [PDF.co](https://pdf.co/markdown-to-pdf)

3. **Upload or paste your RESUME.md content**

4. **Download the generated PDF**

5. **Save it as:**
   - `/Users/prasanthramesh/Desktop/resume-website/public/resume.pdf`

### Method B: Using VS Code Extension

1. **Install Extension:**
   - Open VS Code
   - Go to Extensions (Cmd+Shift+X)
   - Search for "Markdown PDF"
   - Install "Markdown PDF" by yzane

2. **Convert:**
   - Open `RESUME.md` in VS Code
   - Right-click in the editor
   - Select "Markdown PDF: Export (pdf)"
   - PDF will be created in the same folder

3. **Move the PDF:**
   ```bash
   mv /Users/prasanthramesh/Desktop/resume-website/RESUME.pdf /Users/prasanthramesh/Desktop/resume-website/public/resume.pdf
   ```

### Method C: Using Command Line (Mac/Linux)

If you have `pandoc` installed:

```bash
cd /Users/prasanthramesh/Desktop/resume-website
pandoc RESUME.md -o public/resume.pdf --pdf-engine=xelatex
```

If you don't have pandoc, install it:
```bash
brew install pandoc
brew install basictex  # For PDF generation
```

---

## ✅ Verify Your PDF

After creating the PDF, verify it contains:
- ✅ Your name and contact information
- ✅ All work experience (IBM, NVSSoft, APTECH, etc.)
- ✅ All 8 certifications
- ✅ Skills and competencies
- ✅ Professional endorsements
- ✅ Education
- ✅ Proper formatting and readability

---

## 🎨 Customizing the Resume

### To Edit the HTML Resume:
Edit: `/Users/prasanthramesh/Desktop/resume-website/public/resume.html`

### To Edit the Markdown Resume:
Edit: `/Users/prasanthramesh/Desktop/resume-website/RESUME.md`

After editing, regenerate the PDF using the same method.

---

## 📍 Final PDF Location

Your resume PDF should be saved at:
```
/Users/prasanthramesh/Desktop/resume-website/public/resume.pdf
```

This location is important because:
- The website's "Download Resume" button links to `/resume.pdf`
- When you deploy, this file will be publicly accessible
- Users can download it directly from your website

---

## 🚀 After Creating the PDF

1. **Test the download link:**
   - Go to http://localhost:4321/
   - Click "Download Resume" button
   - Verify the PDF downloads correctly

2. **Check the About page:**
   - Go to http://localhost:4321/about
   - Click "Download Resume" button
   - Verify it works

3. **Deploy your website:**
   - The PDF will be included in the deployment
   - Users can download it from your live site

---

## 💡 Quick Recommendation

**Use Option 1 (HTML to PDF)** - It's the easiest and gives you the best-looking result with proper formatting, colors, and layout. Just open http://localhost:4321/resume.html and click "Print to PDF"!

---

## 🆘 Need Help?

If you have any issues:
1. Make sure your development server is running (`npm run dev`)
2. Try opening the HTML file directly in your browser
3. Use Chrome or Firefox for best PDF printing results
4. Check that the file paths are correct

Your resume is ready to be converted to PDF! 🎉