# espinalservicesllc.com

Website for Espinal Services LLC — notary, translation & interpretation, appointment navigation, referral resources, and small business support in Chester, VA.

Static HTML/CSS/JS site, no build step or dependencies required.

## Structure

```
index.html        Home
services.html      Our Services (all 7 offerings, with anchors)
about.html         About / values / service area
contact.html        Contact info, map, and message form
thank-you.html      Post-submission confirmation
404.html            Not found page
css/styles.css      Shared stylesheet
js/main.js           Mobile nav, EN/ES language toggle, form handling
images/              Optimized site images and icons
robots.txt, sitemap.xml, site.webmanifest
```

Pages are linked with clean URLs (`/services`, not `/services.html`) — see **Deployment** below for the hosting setting this depends on.

## Features

- **Bilingual (EN/ES)** — toggle in the header swaps all page content client-side.
- **SEO** — per-page metadata, Open Graph tags, canonical URLs, `LocalBusiness`/`Service` structured data, sitemap.
- **Accessible (WCAG-minded)** — skip link, semantic landmarks, keyboard-operable nav, labeled form fields, visible focus states.
- **Responsive** — tested at 375px, 560px, and 1440px+.

## Local preview

```
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

Hosted on **Cloudflare Pages**, connected to this repo (build command: none — static site, output directory: `/`). Cloudflare Pages defaults to `html_handling: auto-trailing-slash`, which serves `services.html` at the clean URL `/services` and 301-redirects `/services.html` → `/services` automatically — no `_redirects` file needed. Confirm this setting is on under the Pages project's build settings if clean URLs ever stop resolving.

Once the Pages project exists, add `espinalservicesllc.com` as a custom domain in the Pages project settings (Cloudflare will handle DNS automatically if the domain's nameservers are already on Cloudflare).

The contact form submits via [FormSubmit.co](https://formsubmit.co) to `espinalservices1@gmail.com` — the first live submission triggers a one-time confirmation email that must be clicked to activate it.
