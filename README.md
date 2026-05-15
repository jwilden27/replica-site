# Your Website Template

A clean, modern single-page website with a **visual editor at `/admin`** — log in, fill in forms, upload images, hit Save. No code. Site auto-updates in about a minute.

---

## How the recipient edits the site

After it's deployed (see "First-time setup" below), they go to:

```
https://yoursite.netlify.app/admin
```

They log in with their GitHub account, then they see a left sidebar with sections like **Hero**, **Services**, **Testimonials**, **Locations** — exactly like Webflow's CMS or Wix's editor. Click a section, fill in the form fields, drag-drop image uploads, click **Save** and **Publish**. The live site rebuilds itself in ~60 seconds.

That's the whole editing experience. Nothing else to learn.

---

## First-time setup (do this once)

You'll do this part once, then hand off the live `/admin` URL to whoever's editing the site.

### 1. Create a GitHub repo and push this code

```sh
gh repo create my-website --public --source=. --remote=origin --push
```

Or do it through github.com manually: create a new repo, then `git remote add origin <url>` and `git push -u origin main`.

### 2. Open `public/admin/config.yml` and fix the `repo` line

Change:
```yaml
repo: OWNER/REPO
```
to your actual repo, e.g.:
```yaml
repo: jwilden27/my-website
```

Commit and push that change.

### 3. Deploy to Netlify (free)

1. Sign up at <https://netlify.com>.
2. **Add new site** → **Import from Git** → connect your GitHub → pick this repo.
3. Build command and publish directory are auto-detected (`npm run build` → `dist`).
4. Click **Deploy**. Site is live in ~60 seconds.

### 4. Enable the GitHub login bridge on Netlify

Sveltia CMS uses Netlify's free OAuth bridge to let people log in with GitHub. To turn it on:

1. In your Netlify site → **Site settings** → **OAuth applications** (or **Identity** → **GitHub provider**) → click **Install provider** for GitHub.
2. Netlify walks you through clicking "Register OAuth Application" on github.com. Use these values:
   - **Homepage URL:** your Netlify URL (e.g. `https://my-site.netlify.app`)
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. Copy the **Client ID** and **Client Secret** that GitHub gives you, paste them into Netlify's GitHub-provider form, hit Install.

This is a one-time setup. The recipient never has to do it.

### 5. Test the editor

Visit `https://your-site.netlify.app/admin` and log in with GitHub. You should see the editing UI. Make a small text change, hit Save & Publish, and watch the live site update in ~60 seconds.

### 6. Hand off

Send the recipient:
- The live URL of the site
- The `/admin` URL
- A note telling them to log in with their GitHub account (make sure that GitHub user has push access to the repo — invite them as a collaborator on the repo if needed)

---

## What the recipient can edit

Every text, image, link, and brand color on the site is editable through the form. Specifically:

| Section | What's editable |
|---------|-----------------|
| Brand | Business name, logo text, brand color (color picker), tagline |
| Header | Nav links, "Book Now" button label + URL |
| Hero | Big headline, subhead, both buttons, background image |
| Special offer | Eyebrow, headline, body, button — or hide the whole section |
| Our Approach | 4+ pillar headlines and bodies |
| Services | Service cards (add/remove/reorder), each with image, name, description, links |
| Compare table | Your column label, competitor label, rows with ✓/✗ toggles |
| Testimonials | Add/remove customer quotes with name + location |
| Intro offers | Up to 3 offer cards — or hide the section |
| Gallery | Drag-drop image grid — or hide the section |
| Locations | Single-address mode OR multi-location with regions — or hide the section |
| Footer | Link columns, social links, contact info, copyright line |

---

## Adding a custom domain

In Netlify → **Site** → **Domain management** → **Add custom domain**. Netlify shows the DNS records to add at your domain registrar (GoDaddy, Namecheap, etc.). Once DNS propagates, the site is live at your domain with free HTTPS.

---

## If something goes wrong

**Recipient can't log in to `/admin`**
- They need a GitHub account, and they need to be a collaborator on the repo (or own it). Invite them: GitHub repo → **Settings** → **Collaborators** → **Add**.

**Recipient saved a change but the site didn't update**
- Check Netlify → **Deploys**. Each save triggers a deploy. If a deploy failed, the log explains why (usually a broken image upload — retry the save).

**The `/admin` page is blank**
- The `repo:` line in `public/admin/config.yml` doesn't match the actual repo. Fix and push.

**Need to roll back a bad edit**
- GitHub shows every save as a commit. Find the last good commit, click "Revert", and Netlify rebuilds the old version.

---

## Local development (optional, for you the setup person)

```sh
npm install
npm run dev
```
Then open <http://localhost:4321>. Hot reload as you tweak source files.

Note: the `/admin` page only works on a live deploy with GitHub OAuth set up — not on localhost.
