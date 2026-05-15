# SEV Laser Clone — Customizable Service Business Template

**Date:** 2026-05-15
**Owner:** Jax
**Status:** Design — pending implementation

## Goal

Build a static website that visually clones [sevlaser.com](https://sevlaser.com), structured as a **business-agnostic template** that a non-technical recipient can customize by editing a single content file and dropping their own images into a folder.

Jax can hand the same template to multiple people (different businesses, different brand colors), and each recipient can produce a finished, deployable website without writing code.

## Non-goals (out of scope for v1)

- Per-service sub-pages (single-page site only)
- Loyalty / app-download sections
- Multi-language switcher
- Accessibility toolbar
- Integrated booking system (CTAs link out to whatever booking URL the recipient uses)
- A visual CMS dashboard (Decap, Sanity, etc.) — explicitly deferred; v1 ships with file-based editing only

## Architecture

**Stack:**
- **Astro** static site generator
- **Tailwind CSS** for styling
- All content lives in `src/data/content.json`
- All images live in `public/images/`
- Output is plain static HTML/CSS/JS — deployable on any static host

**Editing model:**
- Every piece of text on the site (headlines, paragraphs, button labels, testimonials, location names, etc.) reads from `content.json`
- Every image is referenced in `content.json` by filename only (e.g. `"hero.jpg"`); the file lives in `public/images/`
- Brand name and primary color are also in `content.json` — no CSS edits needed to rebrand
- Optional sections (special-offer banner, before/after gallery, locations) hide themselves when their config block is set to `null` in JSON

**Deployment model:**
- Recipient connects the GitHub repo to **Netlify** (one-time, ~5 min)
- Recipient edits `content.json` via GitHub's web UI (no local install)
- Commit triggers automatic Netlify rebuild and deploy (~60 sec)

## Page sections

Cloned from SEV Laser with simplifications. All sections render conditionally on JSON presence.

1. **Header** — logo (text-based, brand name from JSON), nav links, "Book Now" CTA
2. **Hero** — uppercase headline, subhead, two CTA buttons, background image
3. **Special offer banner** *(optional, hides if null)* — headline, offer text, terms, CTA
4. **Our Approach** — 4 pillar cards (icon name + headline + body)
5. **Services grid** — configurable 2–8 cards; each has image, name, short description, "Learn more" and "Book now" links
6. **How We Compare** — table with "[Brand]" column vs "Others" column; configurable rows with checkmark/X
7. **Testimonials** — grid of 1–N cards (name, location, quote)
8. **Intro Offers** *(optional)* — up to 3 offer cards with CTA
9. **Before/After Gallery** *(optional)* — image grid, any count
10. **Locations** *(optional)* — single-location mode (just address + map link) OR multi-location mode (grouped by region/state with clickable links)
11. **Footer** — quick links columns, social icons (configurable list), contact info

## `content.json` shape (illustrative)

```json
{
  "brand": {
    "name": "YOUR BRAND",
    "primaryColor": "#000000",
    "logoText": "BRAND"
  },
  "header": {
    "nav": [{ "label": "Services", "href": "#services" }],
    "ctaLabel": "Book Now",
    "ctaUrl": "https://your-booking-link.com"
  },
  "hero": {
    "headline": "CONFIDENCE STARTS HERE",
    "subhead": "Advanced aesthetics accessible to all",
    "primaryCta": { "label": "Explore Services", "url": "#services" },
    "secondaryCta": { "label": "Book Appointment", "url": "https://..." },
    "backgroundImage": "hero.jpg"
  },
  "offerBanner": null,
  "approach": [
    { "headline": "CLINICALLY-PROVEN", "body": "..." }
  ],
  "services": [
    { "name": "Laser Hair Removal", "description": "...", "image": "service-1.jpg", "learnMoreUrl": "#", "bookUrl": "#" }
  ],
  "compare": {
    "yourLabel": "SEV",
    "rows": [{ "label": "First treatment free", "you": true, "others": false }]
  },
  "testimonials": [
    { "name": "Jane D.", "location": "Miami, FL", "quote": "..." }
  ],
  "introOffers": [
    { "title": "Free Session", "description": "...", "ctaLabel": "Book Now", "ctaUrl": "#" }
  ],
  "gallery": ["before-after-1.jpg", "before-after-2.jpg"],
  "locations": {
    "mode": "single",
    "address": "123 Main St, Miami FL",
    "mapUrl": "https://..."
  },
  "footer": {
    "columns": [{ "title": "Company", "links": [...] }],
    "social": [{ "platform": "instagram", "url": "..." }],
    "contact": { "email": "hi@brand.com", "phone": "..." }
  }
}
```

## File layout

```
sev-clone-template/
├── public/
│   └── images/                     ← recipient drops photos here
│       ├── hero.jpg
│       ├── service-1.jpg
│       └── ...
├── src/
│   ├── components/                 ← one .astro file per section
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── OfferBanner.astro
│   │   ├── Approach.astro
│   │   ├── Services.astro
│   │   ├── Compare.astro
│   │   ├── Testimonials.astro
│   │   ├── IntroOffers.astro
│   │   ├── Gallery.astro
│   │   ├── Locations.astro
│   │   └── Footer.astro
│   ├── data/
│   │   └── content.json            ← recipient edits this (single source of truth)
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   └── index.astro             ← composes all sections
│   └── styles/
│       └── global.css              ← Tailwind + brand color CSS variable
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md                       ← step-by-step handoff guide
```

## Visual design

Match SEV's aesthetic:
- Sans-serif (Inter or similar), uppercase headlines with letter-spacing
- Generous whitespace, neutral palette by default (white/black/gray)
- Card-based grids with subtle borders/shadows
- Brand color from JSON applied to: CTA buttons, link hover states, accent underlines
- Fully responsive (mobile → desktop)

## Handoff README

The README is the linchpin of the non-coder handoff. It must cover:

1. **What this site is** (one paragraph)
2. **How to preview it locally** (optional, requires Node — skip if recipient doesn't want to install)
3. **How to edit text** — open `content.json` on GitHub, edit fields, commit. Screenshot of the GitHub edit UI.
4. **How to swap images** — upload to `public/images/` on GitHub, keep filenames matching `content.json`
5. **How to change brand color** — edit `brand.primaryColor` in `content.json`
6. **How to deploy to Netlify** — step-by-step with screenshots, one-time setup
7. **How to add a custom domain** — Netlify domain settings walkthrough
8. **Common gotchas** — image dimensions, JSON syntax (commas/quotes), what happens if you break the JSON

## Testing approach

- Manual: build the site locally, view in browser at multiple breakpoints (mobile, tablet, desktop)
- Manual: produce one fully-filled `content.json` representing a realistic service business (e.g. dental clinic), deploy to a test Netlify URL, verify it looks correct end-to-end
- Manual: test optional-section hiding by setting `offerBanner`, `gallery`, `introOffers` to `null` and confirming layout stays clean
- No automated tests in v1 — this is a static template; design correctness is visual

## Open questions / decisions deferred

- Whether to add Decap CMS later (Option B from brainstorming) — not in v1, but file layout is structured so it can be added without rewriting components
- Whether to support multiple pages — not in v1; single-page site is the explicit scope
- Image optimization — Astro's built-in `<Image />` component will be used where helpful, but recipient drops images at the size they want displayed (no transformation pipeline)

## Success criteria

- A recipient with zero coding experience but a GitHub account can, by following the README:
  1. Fork or clone the repo
  2. Edit `content.json` to put their business's text in
  3. Drop their images in `public/images/`
  4. Connect the repo to Netlify
  5. See their finished, branded website live on a public URL
- Total time from "received the link" to "site is live" should be under 1 hour for someone following the README.
