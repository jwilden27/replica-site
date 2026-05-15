# Your Website Template

A clean, modern single-page website for your business. Edit **one file** to change all text and brand colors; drop images in **one folder** to change all photos. Deploy free on Netlify.

---

## What's in here

- **`src/data/content.json`** — all text, all image filenames, brand color. This is the file you'll edit.
- **`public/images/`** — all photos. Drop yours in here with the filenames listed below.
- Everything else is the website's source code. You don't need to touch it.

---

## How to edit text and content

1. Open `src/data/content.json` in any text editor (or directly on GitHub.com — click the file, then the pencil icon).
2. Find the field you want to change. Each section of the website has its own block.
3. Change the text **between the quote marks**. Do **not** change the field names (the words to the left of the colon).
4. Save the file (or "Commit changes" on GitHub).

### Example

```json
"hero": {
  "headline": "CONFIDENCE STARTS HERE",
  "subhead": "Replace this with..."
}
```

Change to:

```json
"hero": {
  "headline": "BEAUTIFUL SMILES START HERE",
  "subhead": "Family dentistry you can trust."
}
```

### Hiding a section

To hide the special offer banner, the gallery, the intro offers, the compare table, or the locations section: set its whole block to `null`.

```json
"offerBanner": null,
"gallery": null
```

---

## How to change brand color

In `content.json`, find:

```json
"primaryColor": "#111111"
```

Change the hex code. The new color is used everywhere — buttons, accent borders, the offer banner background.

| Color | Hex |
|-------|-----|
| Black (default) | `#111111` |
| Deep blue | `#1E3A8A` |
| Forest green | `#15803D` |
| Burgundy | `#7C2D12` |
| Hot pink | `#DB2777` |

---

## How to swap images

1. Drop your image files into `public/images/`.
2. Make sure the filenames match what's in `content.json`.

Default filenames the template uses:

| Where | Filename | Recommended size |
|-------|----------|------------------|
| Hero background | `hero.jpg` | 1920 × 1080 |
| Service cards | `service-1.jpg` … `service-4.jpg` | 800 × 600 |
| Before/After gallery | `gallery-1.jpg` … `gallery-6.jpg` | 800 × 800 (square) |

If you'd rather use different filenames (e.g. `dental-cleaning.jpg`), just update both the filename in `public/images/` **and** the matching field in `content.json`.

---

## How to preview locally (optional)

Skip this if you don't want to install anything — Netlify will preview for you.

If you have Node.js 22+ installed:

```sh
npm install
npm run dev
```

Then open <http://localhost:4321>.

---

## How to deploy to Netlify (free)

1. Sign up at <https://netlify.com> (free).
2. Click **Add new site** → **Import from Git** → connect your GitHub account → pick this repo.
3. Build settings (Netlify auto-detects, but in case it doesn't):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy**. Your site is live in ~60 seconds at a random `*.netlify.app` URL.
5. **Custom domain:** in Netlify → Site → **Domain management** → **Add custom domain** → follow Netlify's DNS instructions.

After the first deploy, **every time you save changes to `content.json` or upload new images to `public/images/`, Netlify automatically rebuilds and redeploys your site in ~60 seconds.**

---

## Common gotchas

- **Site looks broken after editing JSON?** You probably removed a quote mark, comma, or curly brace. Paste your `content.json` into <https://jsonlint.com> and it'll tell you exactly which line broke.
- **Image not showing?** Filename in `content.json` must match the file in `public/images/` exactly — including capitalization and the extension (`.jpg` vs `.JPG`).
- **Field disappeared entirely?** You probably set it to `null` instead of an empty string. Use `""` for an empty field, `null` only to hide a whole section.
- **Brand color didn't change?** Make sure the hex code starts with `#` and has 6 characters after it.

---

## Sections in the site

| # | Section | Editable in `content.json` |
|---|---------|----------------------------|
| 1 | Header (logo + nav + Book Now) | `header`, `brand` |
| 2 | Hero (big headline + 2 buttons) | `hero` |
| 3 | Special offer banner *(optional)* | `offerBanner` |
| 4 | Our Approach (4 pillars) | `approach` |
| 5 | Services grid | `services` |
| 6 | How We Compare table | `compare` |
| 7 | Testimonials | `testimonials` |
| 8 | Intro Offers *(optional)* | `introOffers` |
| 9 | Before/After Gallery *(optional)* | `gallery` |
| 10 | Locations *(optional)* | `locations` |
| 11 | Footer | `footer` |

---

## Need help?

Open an issue on this repo, or contact whoever sent you this template.
