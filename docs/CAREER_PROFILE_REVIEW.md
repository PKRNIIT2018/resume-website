# Career profile editorial decisions and verification

## Target positioning
Senior Technical Business Analyst | Product Owner | PMP® | Enterprise Applications & Systems Integration

## Scope of this branch
- Consolidated enterprise business-analysis and delivery positioning across shared data, homepage, About, Portfolio, metadata and PDF source data.
- Replaced unsupported percentage-based AI impact claims and absolute SME/onboarding claims with cautious, reviewable statements.
- Corrected the misleading EU-wide work authorization claim to Slovakia-specific wording.
- Allowed legitimate personal email addresses to contact the owner (browser and server validation).
- Removed unverified 24–48 hour response guarantees.

## Items requiring human verification before publication
1. **IBM employment date**: earlier background supplied April 2018, repository stated April 2019; displayed as April 2018 *pending verification*. Confirm the official date and whether the NVSSoft overlap through May 2018 is accurate.
2. **IBM formal title**: functional responsibilities do not prove the official HR job title. Keep this distinction in LinkedIn and CV.
3. **Certifications**: validate current PMP, MCT, Scrum and other credential statuses and linked badges.
4. **Projects and impact**: verify actual ownership, deployment status and measurable outcomes for each portfolio entry; no unsubstantiated percentages.
5. **Work authorization**: reconfirm the precise Slovak work authorization wording before publication.
6. **LinkedIn**: the public profile was unavailable for complete review. Compare an exported LinkedIn PDF before editing LinkedIn.
7. **CV download**: dynamic PDF generator already exists in the repository; check that its entry point is discoverable and run extraction tests before calling it ATS-compliant.

## Acceptance checklist
- Run npm ci, npm run build, and npx astro check (install @astrojs/check if necessary).
- Check homepage, About, Portfolio, Contact, /api/contact and download/PDF routes on desktop/mobile.
- Test contact emails from gmail.com and corporate domains; verify valid requests and spam/rate limiting behavior.
- Inspect generated PDF text extraction and page breaks, and ensure no unverified facts appear.
- Verify OG metadata, Person JSON-LD, accessible navigation, content consistency.
- Never merge into main or deploy production without owner review.
