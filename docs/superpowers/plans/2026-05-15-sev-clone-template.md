# SEV Clone Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Astro+Tailwind site that visually clones sevlaser.com, where every text and image is driven by a single `src/data/content.json` file, ready to hand off to a non-technical recipient.

**Architecture:** Astro static site generator outputs plain HTML/CSS. Each page section is one `.astro` component that imports `content.json` and renders the matching block. Optional sections render `null` if their JSON config is missing. Tailwind handles styling; a CSS variable `--brand` reads the primary color from JSON so the recipient can rebrand without touching CSS.

**Tech Stack:** Astro 4.x, Tailwind CSS, TypeScript-flavored JS (Astro's default), Node 20+ for build, Netlify for hosting.

**Working directory:** `/Users/jaxwilden/sev-clone-template`

**Testing approach:** Manual visual verification — run `npm run build` after each component is added, then `npm run preview` and view in browser. No automated tests in v1 (static template).

---

## Task 1: Initialize Astro project with Tailwind

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `.gitignore`

- [ ] **Step 1: Scaffold Astro project non-interactively**

Run from `/Users/jaxwilden/sev-clone-template`:
```bash
npm create astro@latest . -- --template minimal --install --no-git --typescript strict --skip-houston --yes
```

Expected: creates `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `public/favicon.svg`, installs deps.

- [ ] **Step 2: Add Tailwind integration**

Run:
```bash
npx astro add tailwind --yes
```

Expected: installs `@astrojs/tailwind` and `tailwindcss`, updates `astro.config.mjs`, creates `tailwind.config.mjs`.

- [ ] **Step 3: Verify dev server starts**

Run:
```bash
npm run dev -- --port 4321 &
sleep 5
curl -s http://localhost:4321/ | head -20
kill %1
```

Expected: HTML output with `<html>` tag. If failure, stop and investigate.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "scaffold: init Astro + Tailwind project"
```

---

## Task 2: Create content.json with full sample data

**Files:**
- Create: `src/data/content.json`
- Create: `src/data/types.ts`

- [ ] **Step 1: Write the content.json file**

Create `src/data/content.json`:
```json
{
  "brand": {
    "name": "YOUR BRAND",
    "logoText": "BRAND",
    "primaryColor": "#111111",
    "tagline": "Tagline goes here"
  },
  "header": {
    "nav": [
      { "label": "Services", "href": "#services" },
      { "label": "About", "href": "#approach" },
      { "label": "Locations", "href": "#locations" },
      { "label": "Reviews", "href": "#testimonials" }
    ],
    "ctaLabel": "Book Now",
    "ctaUrl": "#book"
  },
  "hero": {
    "headline": "CONFIDENCE STARTS HERE",
    "subhead": "Replace this with the one-line promise your business makes to its customers.",
    "primaryCta": { "label": "Explore Services", "url": "#services" },
    "secondaryCta": { "label": "Book Appointment", "url": "#book" },
    "backgroundImage": "hero.jpg"
  },
  "offerBanner": {
    "eyebrow": "SPECIAL OFFER",
    "headline": "BUY 6, GET 2 FREE",
    "body": "Terms and conditions apply. Edit this text in content.json.",
    "ctaLabel": "Book Now",
    "ctaUrl": "#book"
  },
  "approach": [
    { "headline": "CLINICALLY-PROVEN", "body": "Edit this pillar in content.json." },
    { "headline": "EXPERT TEAM", "body": "Edit this pillar in content.json." },
    { "headline": "FOR EVERYONE", "body": "Edit this pillar in content.json." },
    { "headline": "TRANSPARENT PRICING", "body": "Edit this pillar in content.json." }
  ],
  "services": [
    { "name": "Service One", "description": "Short description of this service.", "image": "service-1.jpg", "learnMoreUrl": "#", "bookUrl": "#book" },
    { "name": "Service Two", "description": "Short description of this service.", "image": "service-2.jpg", "learnMoreUrl": "#", "bookUrl": "#book" },
    { "name": "Service Three", "description": "Short description of this service.", "image": "service-3.jpg", "learnMoreUrl": "#", "bookUrl": "#book" },
    { "name": "Service Four", "description": "Short description of this service.", "image": "service-4.jpg", "learnMoreUrl": "#", "bookUrl": "#book" }
  ],
  "compare": {
    "yourLabel": "YOUR BRAND",
    "othersLabel": "Others",
    "rows": [
      { "label": "First treatment free", "you": true, "others": false },
      { "label": "Prices available online", "you": true, "others": false },
      { "label": "Memberships & packages", "you": true, "others": false },
      { "label": "Transparent pricing", "you": true, "others": false }
    ]
  },
  "testimonials": [
    { "name": "Customer One", "location": "City, ST", "quote": "Replace with a real testimonial quote." },
    { "name": "Customer Two", "location": "City, ST", "quote": "Replace with a real testimonial quote." },
    { "name": "Customer Three", "location": "City, ST", "quote": "Replace with a real testimonial quote." },
    { "name": "Customer Four", "location": "City, ST", "quote": "Replace with a real testimonial quote." },
    { "name": "Customer Five", "location": "City, ST", "quote": "Replace with a real testimonial quote." },
    { "name": "Customer Six", "location": "City, ST", "quote": "Replace with a real testimonial quote." }
  ],
  "introOffers": [
    { "title": "Free First Session", "description": "Edit this offer.", "ctaLabel": "Book Now", "ctaUrl": "#book" },
    { "title": "Loyalty Discount", "description": "Edit this offer.", "ctaLabel": "Learn More", "ctaUrl": "#" },
    { "title": "Refer a Friend", "description": "Edit this offer.", "ctaLabel": "Get Started", "ctaUrl": "#" }
  ],
  "gallery": ["gallery-1.jpg", "gallery-2.jpg", "gallery-3.jpg", "gallery-4.jpg", "gallery-5.jpg", "gallery-6.jpg"],
  "locations": {
    "mode": "single",
    "headline": "VISIT US",
    "single": { "address": "123 Main Street, Your City, ST 00000", "phone": "(555) 555-5555", "mapUrl": "https://maps.google.com" },
    "multi": null
  },
  "footer": {
    "columns": [
      { "title": "Company", "links": [ { "label": "About", "href": "#approach" }, { "label": "Contact", "href": "#book" } ] },
      { "title": "Legal", "links": [ { "label": "Terms", "href": "#" }, { "label": "Privacy", "href": "#" } ] }
    ],
    "social": [
      { "platform": "instagram", "url": "https://instagram.com" },
      { "platform": "facebook", "url": "https://facebook.com" }
    ],
    "contact": { "email": "hello@yourbrand.com", "phone": "(555) 555-5555" },
    "copyright": "© 2026 Your Brand. All rights reserved."
  }
}
```

- [ ] **Step 2: Add TypeScript types for content**

Create `src/data/types.ts`:
```typescript
export type Link = { label: string; href: string };
export type Cta = { label: string; url: string };

export type Content = {
  brand: { name: string; logoText: string; primaryColor: string; tagline: string };
  header: { nav: Link[]; ctaLabel: string; ctaUrl: string };
  hero: { headline: string; subhead: string; primaryCta: Cta; secondaryCta: Cta; backgroundImage: string };
  offerBanner: null | { eyebrow: string; headline: string; body: string; ctaLabel: string; ctaUrl: string };
  approach: { headline: string; body: string }[];
  services: { name: string; description: string; image: string; learnMoreUrl: string; bookUrl: string }[];
  compare: null | { yourLabel: string; othersLabel: string; rows: { label: string; you: boolean; others: boolean }[] };
  testimonials: { name: string; location: string; quote: string }[];
  introOffers: null | { title: string; description: string; ctaLabel: string; ctaUrl: string }[];
  gallery: null | string[];
  locations: null | {
    mode: "single" | "multi";
    headline: string;
    single: null | { address: string; phone: string; mapUrl: string };
    multi: null | { region: string; locations: { name: string; href: string }[] }[];
  };
  footer: {
    columns: { title: string; links: Link[] }[];
    social: { platform: string; url: string }[];
    contact: { email: string; phone: string };
    copyright: string;
  };
};

import data from "./content.json";
export const content = data as Content;
```

- [ ] **Step 3: Commit**

```bash
git add src/data
git commit -m "data: add content.json schema with sample data"
```

---

## Task 3: Base layout with brand-color CSS variable and global styles

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global.css**

Create `src/styles/global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand: #111111;
}

html { scroll-behavior: smooth; }
body { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Inter", sans-serif; color: #111; background: #fff; }

.brand-bg { background-color: var(--brand); }
.brand-text { color: var(--brand); }
.brand-border { border-color: var(--brand); }
.brand-btn { background-color: var(--brand); color: #fff; }
.brand-btn:hover { opacity: 0.9; }
```

- [ ] **Step 2: Create Base layout**

Create `src/layouts/Base.astro`:
```astro
---
import "../styles/global.css";
import { content } from "../data/types";
const { title } = Astro.props;
const pageTitle = title ?? content.brand.name;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{pageTitle}</title>
    <meta name="description" content={content.brand.tagline} />
    <style set:html={`:root { --brand: ${content.brand.primaryColor}; }`}></style>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts src/styles
git commit -m "layout: add base layout with brand color CSS variable"
```

---

## Task 4: Header component

**Files:**
- Create: `src/components/Header.astro`

- [ ] **Step 1: Create Header.astro**

```astro
---
import { content } from "../data/types";
const { header, brand } = content;
---
<header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-neutral-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
    <a href="/" class="font-black tracking-widest text-xl brand-text">{brand.logoText}</a>
    <nav class="hidden md:flex items-center gap-8">
      {header.nav.map((item) => (
        <a href={item.href} class="text-sm uppercase tracking-wider hover:opacity-70">{item.label}</a>
      ))}
    </nav>
    <a href={header.ctaUrl} class="brand-btn px-4 py-2 text-sm uppercase tracking-wider font-semibold rounded">
      {header.ctaLabel}
    </a>
  </div>
</header>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add Header component"
```

---

## Task 5: Hero component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create Hero.astro**

```astro
---
import { content } from "../data/types";
const { hero } = content;
const bgUrl = `/images/${hero.backgroundImage}`;
---
<section class="relative overflow-hidden">
  <div class="absolute inset-0 bg-cover bg-center" style={`background-image: url('${bgUrl}'); filter: brightness(0.65);`}></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-32 md:py-48 text-white">
    <h1 class="text-4xl md:text-7xl font-black tracking-tight uppercase max-w-3xl">{hero.headline}</h1>
    <p class="mt-6 text-lg md:text-xl max-w-xl">{hero.subhead}</p>
    <div class="mt-10 flex flex-wrap gap-4">
      <a href={hero.primaryCta.url} class="brand-btn px-6 py-3 uppercase tracking-wider text-sm font-semibold rounded">{hero.primaryCta.label}</a>
      <a href={hero.secondaryCta.url} class="bg-white text-black px-6 py-3 uppercase tracking-wider text-sm font-semibold rounded hover:opacity-90">{hero.secondaryCta.label}</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero component"
```

---

## Task 6: OfferBanner component (renders only when not null)

**Files:**
- Create: `src/components/OfferBanner.astro`

- [ ] **Step 1: Create OfferBanner.astro**

```astro
---
import { content } from "../data/types";
const offer = content.offerBanner;
---
{offer && (
  <section class="brand-bg text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <div class="text-xs uppercase tracking-widest opacity-80">{offer.eyebrow}</div>
        <div class="mt-2 text-2xl md:text-4xl font-black uppercase">{offer.headline}</div>
        <p class="mt-3 text-sm opacity-80 max-w-2xl">{offer.body}</p>
      </div>
      <a href={offer.ctaUrl} class="bg-white text-black px-6 py-3 uppercase tracking-wider text-sm font-semibold rounded self-start md:self-auto hover:opacity-90">{offer.ctaLabel}</a>
    </div>
  </section>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/OfferBanner.astro
git commit -m "feat: add OfferBanner component"
```

---

## Task 7: Approach component (4 pillars)

**Files:**
- Create: `src/components/Approach.astro`

- [ ] **Step 1: Create Approach.astro**

```astro
---
import { content } from "../data/types";
const { approach } = content;
---
<section id="approach" class="py-20 md:py-28">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-16">Our Approach</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {approach.map((p) => (
        <div class="border-t-2 brand-border pt-6">
          <h3 class="text-lg font-black uppercase tracking-wider">{p.headline}</h3>
          <p class="mt-3 text-sm text-neutral-600 leading-relaxed">{p.body}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Approach.astro
git commit -m "feat: add Approach component"
```

---

## Task 8: Services grid component

**Files:**
- Create: `src/components/Services.astro`

- [ ] **Step 1: Create Services.astro**

```astro
---
import { content } from "../data/types";
const { services } = content;
---
<section id="services" class="py-20 md:py-28 bg-neutral-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-16">Our Services</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((s) => (
        <article class="bg-white rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
          <div class="aspect-[4/3] bg-neutral-200 bg-cover bg-center" style={`background-image: url('/images/${s.image}');`}></div>
          <div class="p-6">
            <h3 class="text-lg font-bold uppercase tracking-wider">{s.name}</h3>
            <p class="mt-2 text-sm text-neutral-600">{s.description}</p>
            <div class="mt-4 flex gap-4 text-sm">
              <a href={s.learnMoreUrl} class="brand-text font-semibold hover:underline">Learn more →</a>
              <a href={s.bookUrl} class="font-semibold hover:underline">Book now</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Services.astro
git commit -m "feat: add Services grid component"
```

---

## Task 9: Compare table component

**Files:**
- Create: `src/components/Compare.astro`

- [ ] **Step 1: Create Compare.astro**

```astro
---
import { content } from "../data/types";
const compare = content.compare;
---
{compare && (
  <section class="py-20 md:py-28">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-16">How We Compare</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-neutral-900">
            <th class="text-left py-4"></th>
            <th class="py-4 text-sm uppercase tracking-wider brand-text">{compare.yourLabel}</th>
            <th class="py-4 text-sm uppercase tracking-wider text-neutral-400">{compare.othersLabel}</th>
          </tr>
        </thead>
        <tbody>
          {compare.rows.map((row) => (
            <tr class="border-b border-neutral-200">
              <td class="py-4 text-sm">{row.label}</td>
              <td class="py-4 text-center brand-text font-bold">{row.you ? "✓" : "—"}</td>
              <td class="py-4 text-center text-neutral-400">{row.others ? "✓" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Compare.astro
git commit -m "feat: add Compare table component"
```

---

## Task 10: Testimonials component

**Files:**
- Create: `src/components/Testimonials.astro`

- [ ] **Step 1: Create Testimonials.astro**

```astro
---
import { content } from "../data/types";
const { testimonials } = content;
---
<section id="testimonials" class="py-20 md:py-28 bg-neutral-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-16">Testimonials & Reviews</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t) => (
        <figure class="bg-white p-6 rounded shadow-sm">
          <blockquote class="text-sm text-neutral-700 leading-relaxed">"{t.quote}"</blockquote>
          <figcaption class="mt-4 text-xs uppercase tracking-wider">
            <span class="font-bold">{t.name}</span>
            <span class="text-neutral-500"> · {t.location}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Testimonials.astro
git commit -m "feat: add Testimonials component"
```

---

## Task 11: IntroOffers component

**Files:**
- Create: `src/components/IntroOffers.astro`

- [ ] **Step 1: Create IntroOffers.astro**

```astro
---
import { content } from "../data/types";
const offers = content.introOffers;
---
{offers && offers.length > 0 && (
  <section class="py-20 md:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-16">Introductory Offers</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((o) => (
          <div class="border border-neutral-200 rounded p-8 flex flex-col">
            <h3 class="text-xl font-black uppercase tracking-wider">{o.title}</h3>
            <p class="mt-3 text-sm text-neutral-600 flex-1">{o.description}</p>
            <a href={o.ctaUrl} class="brand-btn mt-6 px-4 py-2 text-sm uppercase tracking-wider font-semibold rounded text-center">{o.ctaLabel}</a>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/IntroOffers.astro
git commit -m "feat: add IntroOffers component"
```

---

## Task 12: Gallery component

**Files:**
- Create: `src/components/Gallery.astro`

- [ ] **Step 1: Create Gallery.astro**

```astro
---
import { content } from "../data/types";
const gallery = content.gallery;
---
{gallery && gallery.length > 0 && (
  <section class="py-20 md:py-28 bg-neutral-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-16">Before & After</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {gallery.map((img) => (
          <div class="aspect-square bg-neutral-200 bg-cover bg-center rounded" style={`background-image: url('/images/${img}');`}></div>
        ))}
      </div>
    </div>
  </section>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Gallery.astro
git commit -m "feat: add Gallery component"
```

---

## Task 13: Locations component (single + multi mode)

**Files:**
- Create: `src/components/Locations.astro`

- [ ] **Step 1: Create Locations.astro**

```astro
---
import { content } from "../data/types";
const loc = content.locations;
---
{loc && (
  <section id="locations" class="py-20 md:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-16">{loc.headline}</h2>

      {loc.mode === "single" && loc.single && (
        <div class="max-w-xl mx-auto text-center">
          <p class="text-lg">{loc.single.address}</p>
          <p class="mt-2 text-neutral-600">{loc.single.phone}</p>
          <a href={loc.single.mapUrl} class="brand-btn inline-block mt-6 px-6 py-3 text-sm uppercase tracking-wider font-semibold rounded">Get Directions</a>
        </div>
      )}

      {loc.mode === "multi" && loc.multi && (
        <div class="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {loc.multi.map((region) => (
            <div>
              <h3 class="text-sm font-black uppercase tracking-wider brand-text mb-3">{region.region}</h3>
              <ul class="space-y-2">
                {region.locations.map((l) => (
                  <li><a href={l.href} class="text-sm hover:underline">{l.name}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Locations.astro
git commit -m "feat: add Locations component (single + multi mode)"
```

---

## Task 14: Footer component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Footer.astro**

```astro
---
import { content } from "../data/types";
const { footer, brand } = content;
---
<footer class="bg-neutral-900 text-neutral-300 py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <div class="col-span-2 md:col-span-1">
        <div class="text-2xl font-black tracking-widest text-white">{brand.logoText}</div>
        <p class="mt-3 text-sm text-neutral-400">{brand.tagline}</p>
      </div>
      {footer.columns.map((col) => (
        <div>
          <h4 class="text-xs uppercase tracking-widest text-white font-bold">{col.title}</h4>
          <ul class="mt-3 space-y-2">
            {col.links.map((l) => (
              <li><a href={l.href} class="text-sm hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h4 class="text-xs uppercase tracking-widest text-white font-bold">Contact</h4>
        <ul class="mt-3 space-y-2 text-sm">
          <li><a href={`mailto:${footer.contact.email}`} class="hover:text-white">{footer.contact.email}</a></li>
          <li><a href={`tel:${footer.contact.phone}`} class="hover:text-white">{footer.contact.phone}</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between gap-4">
      <p class="text-xs text-neutral-500">{footer.copyright}</p>
      <div class="flex gap-4">
        {footer.social.map((s) => (
          <a href={s.url} class="text-xs uppercase tracking-wider hover:text-white">{s.platform}</a>
        ))}
      </div>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer component"
```

---

## Task 15: Compose all sections in index.astro

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace index.astro**

```astro
---
import Base from "../layouts/Base.astro";
import Header from "../components/Header.astro";
import Hero from "../components/Hero.astro";
import OfferBanner from "../components/OfferBanner.astro";
import Approach from "../components/Approach.astro";
import Services from "../components/Services.astro";
import Compare from "../components/Compare.astro";
import Testimonials from "../components/Testimonials.astro";
import IntroOffers from "../components/IntroOffers.astro";
import Gallery from "../components/Gallery.astro";
import Locations from "../components/Locations.astro";
import Footer from "../components/Footer.astro";
---
<Base>
  <Header />
  <main>
    <Hero />
    <OfferBanner />
    <Approach />
    <Services />
    <Compare />
    <Testimonials />
    <IntroOffers />
    <Gallery />
    <Locations />
  </main>
  <Footer />
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: compose all sections in index page"
```

---

## Task 16: Add placeholder images

**Files:**
- Create: `public/images/*.jpg` (placeholders) and `public/images/README.txt`

- [ ] **Step 1: Create placeholder images directory and README**

```bash
mkdir -p public/images
cat > public/images/README.txt <<'EOF'
Drop your images in this folder. Filenames must match what's referenced in src/data/content.json.

Default filenames the template expects:
  hero.jpg              - hero background, 1920x1080 recommended
  service-1.jpg ... service-4.jpg  - service cards, 800x600 recommended
  gallery-1.jpg ... gallery-6.jpg  - before/after gallery, square 800x800 recommended

To add or remove images, edit content.json and update the filenames here.
EOF
```

- [ ] **Step 2: Generate solid-color placeholder JPGs with ImageMagick if available, else skip**

```bash
if command -v magick >/dev/null 2>&1; then
  magick -size 1920x1080 xc:#333333 public/images/hero.jpg
  for i in 1 2 3 4; do magick -size 800x600 xc:#cccccc public/images/service-$i.jpg; done
  for i in 1 2 3 4 5 6; do magick -size 800x800 xc:#dddddd public/images/gallery-$i.jpg; done
elif command -v convert >/dev/null 2>&1; then
  convert -size 1920x1080 xc:#333333 public/images/hero.jpg
  for i in 1 2 3 4; do convert -size 800x600 xc:#cccccc public/images/service-$i.jpg; done
  for i in 1 2 3 4 5 6; do convert -size 800x800 xc:#dddddd public/images/gallery-$i.jpg; done
else
  echo "ImageMagick not available — placeholders skipped. Site will still build; image sections will show empty/gray boxes."
fi
```

- [ ] **Step 3: Commit**

```bash
git add public/images
git commit -m "assets: add placeholder images and image README"
```

---

## Task 17: README handoff guide

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README.md**

```markdown
# Your Website Template

A clean, modern single-page website for your business. Edit one file to change all text and brand colors; drop images in a folder to change all photos.

## What's in here

- `src/data/content.json` — **all text, all image filenames, brand color**. This is the file you'll edit.
- `public/images/` — **all photos**. Drop yours in here with the filenames listed below.
- Everything else is the website code. You don't need to touch it.

## How to edit text and content

1. Open `src/data/content.json` in any text editor (or directly on GitHub.com — click the file, then the pencil icon).
2. Find the field you want to change. Each section of the website has its own block.
3. Change the text between the quote marks. **Don't change the field names** (the words to the left of the colon).
4. Save the file (or "Commit changes" on GitHub).

**Example:**
```json
"hero": {
  "headline": "CONFIDENCE STARTS HERE",   ← change this
  "subhead": "Replace this with..."        ← and this
}
```

### Hiding a section
To hide the special offer banner, the gallery, intro offers, or locations: set its whole block to `null`.

Example:
```json
"offerBanner": null
```

## How to change brand color

In `content.json`, find `"primaryColor": "#111111"` and change the hex code. Examples:
- Blue: `#1E3A8A`
- Green: `#15803D`
- Burgundy: `#7C2D12`
- Black: `#000000`

## How to swap images

1. Drop your image files into `public/images/`.
2. Make sure the filenames match what's in `content.json`. The default filenames the template uses:
   - `hero.jpg` — main hero background (1920×1080 looks best)
   - `service-1.jpg` through `service-4.jpg` — service cards (800×600)
   - `gallery-1.jpg` through `gallery-6.jpg` — before/after gallery (800×800 square)
3. If you want different filenames, edit them in `content.json` to match.

## How to preview locally (optional)

Skip this if you don't want to install anything — Netlify will preview for you.

If you have Node.js 20+:
```
npm install
npm run dev
```
Then open http://localhost:4321

## How to deploy to Netlify

1. Sign up free at https://netlify.com.
2. Click "Add new site" → "Import from Git" → connect your GitHub account → pick this repo.
3. Build command: `npm run build`. Publish directory: `dist`. Click Deploy.
4. Your site is live in ~60 seconds at a random `*.netlify.app` URL.
5. Custom domain: in Netlify, Site → Domain management → Add custom domain → follow the DNS instructions.

After the first deploy, **every time you save changes to `content.json` or upload images, Netlify rebuilds your site automatically.**

## Common gotchas

- **Broken site after editing JSON?** You probably removed a quote mark or comma. Paste the content into https://jsonlint.com to find the error.
- **Image not showing?** The filename in `content.json` must match the file in `public/images/` exactly, including capitalization and extension (`.jpg` vs `.JPG` matters).
- **Field disappears entirely?** You probably set it to `null` instead of an empty string. Use `""` to show an empty field.

## Need help?
Open an issue on this repo or contact whoever sent you this template.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add handoff README guide for non-technical recipients"
```

---

## Task 18: Final build verification

**Files:** None (verification only)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: exits 0, produces `dist/` directory with `index.html`.

- [ ] **Step 2: Verify build output exists and contains rendered content**

```bash
test -f dist/index.html && grep -q "CONFIDENCE STARTS HERE" dist/index.html && echo "BUILD OK"
```

Expected: prints `BUILD OK`. If not, investigate the build error before continuing.

- [ ] **Step 3: Start preview server, smoke test the rendered page**

```bash
npm run preview -- --port 4322 &
sleep 3
curl -s http://localhost:4322/ | grep -E "(CONFIDENCE|YOUR BRAND|Services|Testimonials)" | head -5
kill %1
```

Expected: all four marker strings appear in the output.

- [ ] **Step 4: Optional null-section test**

Edit `src/data/content.json`, set `offerBanner` and `gallery` to `null`. Run `npm run build`. Confirm those sections do not appear in `dist/index.html`. Revert.

- [ ] **Step 5: Commit any final adjustments**

```bash
git status
git add -A
git diff --cached --quiet || git commit -m "final: verification adjustments"
```

---

## Self-Review

- **Spec coverage:** Every section in the spec (Header, Hero, OfferBanner, Approach, Services, Compare, Testimonials, IntroOffers, Gallery, Locations, Footer) has a dedicated task. Brand color CSS var ✓ (Task 3). Optional-section hiding ✓ (Tasks 6, 11, 12, 13). Handoff README ✓ (Task 17).
- **Placeholder scan:** No TBDs, no "implement appropriately", no "similar to" references. All component code is complete.
- **Type consistency:** All components import `content` from `../data/types`. The `Content` type in Task 2 matches the shape used everywhere. Brand color variable is consistent (`--brand`, `brand-bg`, `brand-text`, `brand-btn`).
