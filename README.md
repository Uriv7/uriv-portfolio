# Uriv — Virender Gupta's Portfolio

A single-page portfolio built with Next.js 14 (App Router) and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Push this folder to a GitHub repo, then import it at vercel.com — no config needed.
Or, from this folder:

```bash
npx vercel
```

## Structure

- `app/page.js` — the entire single-page site (hero, about, skills, work, background, contact)
- `app/layout.js` — root layout and page metadata
- `app/globals.css` — Tailwind directives
- `public/profile.jpg` — profile photo
- `public/resume.pdf` — downloadable resume (linked from the Contact section)

## Notes

- Colors, fonts, and effects are defined inline in `app/page.js` (see the `colors` object) plus `app/portfolio.css` for hover states, keyframes, and the gradient/mask effects — CSS lives in a real stylesheet rather than a JSX `<style>` tag on purpose, since injecting raw CSS text as a React child causes server/client hydration mismatches in Next.js.
- `public/resume.pdf` is the CV that lists URIV-GEOSCALE as a project — swap the file (keep the same name) to update what visitors download.
- `app/icon.png` and `app/opengraph-image.png` are auto-detected by Next.js as the favicon and social-share preview image. Once deployed, set `NEXT_PUBLIC_SITE_URL` (in Vercel's project settings, or a `.env.local` file) to your real domain so shared links resolve the preview image correctly — it currently falls back to a placeholder URL.
