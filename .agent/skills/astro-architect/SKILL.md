# 🚀 Astro Architect — Antigravity Protocol

**Astro & Node.js Master Ruleset**

A strict, opinionated implementation protocol designed to:
- Minimize shipped JavaScript
- Preserve Astro’s Islands Architecture purity
- Enforce zero-tolerance security
- Prevent architectural and process drift
- Require human approval for releases

This document is the **single source of truth** for all Astro projects governed by Antigravity.

---

## 1. 🎯 Core Mission

- Optimize for the **lowest possible Ship-to-JS ratio**
- Prefer **static rendering by default**
- Hydrate only when interaction is unavoidable
- Maintain a **zero-vulnerability dependency posture**
- Enforce deterministic builds and audited releases

---

## 2. 🧱 Rendering & Component Architecture

### Component Scoping Rules
- `.astro` components are **mandatory** for all static UI.
- UI frameworks (React / Svelte / Vue) are allowed **only** for:
  - User input
  - State-driven UI
  - Real-time or reactive interactivity
- Layouts, shells, wrappers, and page components **MUST NOT** be hydrated.

### Project Structure Contract
- `/components`  
  → Presentational, non-hydrated components only
- `/islands`  
  → Hydrated components only
- `/lib`  
  → Server-only utilities (DB, auth, helpers)

### Naming Convention
- All hydrated components **MUST** end with `Island`  
  Example: `ThemeToggleIsland.astro`

---

## 3. 🧠 Hydration Strategy (Island Hygiene)

### Allowed Hydration Directives
- `client:load`  
  - **Only** for critical, above-the-fold UI (e.g. navigation)
- `client:visible`  
  - Default for interactive UI below the fold
- `client:only`  
  - Reserved strictly for browser-only APIs (`window`, `localStorage`)

### Hydration Constraints
- Every hydrated component **MUST** include a one-line comment explaining *why hydration is required*.
- Wrapper or container islands are **strictly prohibited**.
- Pages containing **more than 3 islands** must be flagged for review.

---

## 4. 🔬 Performance & Output Guarantees

### JavaScript Budget Rule
- Any change that increases shipped client JavaScript by **more than 10 KB (gzipped)**:
  - MUST be justified
  - MUST receive explicit user approval

### Asset Discipline
- All images **MUST** use `astro:assets` or `<Image />`
- Raw `<img>` tags are prohibited unless explicitly justified

### Font Policy
- Fonts must be **self-hosted**
- Third-party font CDNs (e.g. Google Fonts) are prohibited

---

## 5. 🛡️ Security Interlocks (Vulnerability Shield)

### Dependency Auditing
- Before **any** `npm install` or dependency update:
  - Running `npm audit` is **mandatory**

### Hard Blocker Rule
- If a **CRITICAL** vulnerability is detected:
  - STOP immediately
  - DO NOT proceed
  - Alert the user
  - Provide the full audit log for manual intervention

### Dependency Minimalism
- Every new dependency requires justification:
  - Why native JavaScript is insufficient
  - Expected runtime and bundle impact
- Utility libraries (`lodash`, `moment`, etc.) are banned unless strictly required

---

## 6. 🔐 Environment & Secrets Safety

- Only environment variables prefixed with `PUBLIC_` may be used in client code
- Secrets, tokens, and credentials are **strictly prohibited** in source files
- `.env.example` **MUST** be updated whenever environment variables change

---

## 7. 📡 Data Fetching & Server Rules

- All API calls and database queries **MUST** execute in Astro frontmatter (`---`)
- Client-side data fetching is prohibited unless explicitly approved
- Server code must be deterministic:
  - No random values
  - No timestamps
  - No side effects without justification

---

## 8. 🧪 Build & Runtime Validation

- `astro build` **MUST pass** before any merge
- Every new route must define failure behavior:
  - `404`
  - Redirect
- SSR code **MUST NOT** rely on browser globals

---

## 9. 📝 Documentation & Release Protocol (README Rule)

### Synchronization Requirement
Before merging into `master`, `README.md` **MUST** be updated with:

- **New Features**
  - Added components, routes, or capabilities
- **Security Status**
  - Confirmation of `npm audit` results
- **Hydration Changes**
  - Any new client-side JavaScript shipped

### Formatting Rule
- A **“Recent Changes”** or **“Changelog”** section must appear at the top of the README

---

## 10. 👥 Human-in-the-Loop Verification

### Branch Discipline
- Direct pushes to `master` are **strictly prohibited**

### Release Flow
1. Create a feature branch
2. Implement changes
3. Update `README.md`
4. Present a clear summary of changes to the user
5. **WAIT for explicit approval**  
   (e.g. “Approved”, “Looks good”)
6. Only then may the merge or push occur

---

## 11. 🧾 Antigravity Self-Enforcement Rule

If any request or change violates this protocol:

1. STOP
2. Explain the violation
3. Propose a compliant alternative

Antigravity acts as an **active reviewer**, not a passive assistant.

---

## ⛔ Absolute Constraints

- DO NOT bypass `npm audit`
- DO NOT hydrate invisible or wrapper components
- DO NOT increase client JavaScript without justification
- DO NOT merge without documentation updates and explicit approval

---

**This protocol is non-negotiable.**  
Optimization, security, and clarity take precedence over convenience.
