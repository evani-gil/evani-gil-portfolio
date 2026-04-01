# Evani Gil Portfolio

A production-ready personal portfolio built with Next.js, React, TypeScript, and Tailwind CSS. The site preserves the visual direction from the Stitch-generated concept while refactoring it into a maintainable, secure, and deployment-ready application.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zod validation
- Resend for contact email delivery
- Vitest for lightweight tests
- GitHub Actions for CI
- Vercel-ready deployment

## Features

- Responsive single-page portfolio with accessible navigation and active section highlighting
- Data-driven sections for skills, projects, and experience
- Configurable hero content and intro video support
- Resume download section with graceful missing-file handling
- Secure contact form with client-side and server-side validation
- Honeypot and in-memory rate limiting for basic bot mitigation
- Health endpoint at `/api/health`
- Security headers configured in Next.js

## Project Structure

- `app/` Next.js routes, layout, global styles, and API handlers
- `components/` reusable UI pieces and section components
- `data/` editable portfolio content
- `lib/` validation, utilities, rate limiting, and contact logic
- `public/` static assets, images, and the optional `resume.pdf`
- `test/` validation and backend behavior tests
- `.github/workflows/` CI workflow for linting, typechecking, tests, audit, and build

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Fill in the contact email settings:

- `NEXT_PUBLIC_SITE_URL`: public site URL used for metadata and absolute references
- `RESEND_API_KEY`: API key for Resend
- `CONTACT_FROM_EMAIL`: verified sender for outgoing contact form email
- `CONTACT_TO_EMAIL`: destination inbox for form submissions

4. Start the development server:

```bash
npm run dev
```

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Updating Content

- Edit basic identity and social links in `data/site.ts`
- Update the professional story in `data/about.ts`
- Update categorized skills in `data/skills.ts`
- Add or remove projects in `data/projects.ts`
- Update career history in `data/experience.ts`
- Add your resume file at `public/resume.pdf`
- Add your intro video embed URL in `data/site.ts` by setting `introVideoUrl`

## Contact Form Notes

- The contact form posts to `app/api/contact/route.ts`
- Validation is shared between client and server through `lib/validation.ts`
- Inputs are sanitized before use
- Secrets stay on the server through environment variables
- If Resend is not configured, the route returns a safe service-unavailable response

## Deployment on Vercel

Vercel can handle deployment automatically from the connected Git repository. No custom `vercel.json` file is required for this app.

Add these environment variables in Vercel:

- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

Recommended Vercel setup:

- Framework preset: Next.js
- Install command: `npm install`
- Build command: `npm run build`

## CI

The GitHub Actions workflow runs on push and pull request:

- `npm ci`
- `npm audit --omit=dev`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Assumptions

- The portfolio currently ships with an intentional empty-state project layout so new projects can be added later without redesigning the section.
- The intro video placeholder remains in place until a real embed URL is added.
- The resume download experience is enabled once `public/resume.pdf` exists.
