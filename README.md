# Boyajian Wholesale — Prototype

A clickable static prototype of the updated **wholesale section** for boyajianinc.com, built for client review. This is **not** the production build — it's a design/messaging reference intended to be rebuilt in WordPress by the dev team (WEBDOGS).

## View it

Open `index.html` in any browser, or visit the published preview link (GitHub Pages / Netlify). No build step, no dependencies.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Wholesale hub / overview |
| `pizza.html` | Pizza & Foodservice segment |
| `bakery.html` | Commercial Bakeries segment |
| `manufacturers.html` | Food Manufacturers segment |
| `snack.html` | Snack Producers segment |
| `resources.html` | Resource library (sell sheets, guides, briefs) |
| `assets/style.css` | All styling + design tokens (brand colors, type) |
| `assets/main.js` | Mobile nav, form tabs, FAQ accordions, smooth scroll |
| `assets/images/` | Photos, logo, generated sell-sheet cover thumbnails (`sheets/`) |

## Notes for reviewers

- Top-nav links for **About, Shop, Recipes, Contact** point to the existing live site; only **Wholesale** and **Resources** are part of this prototype.
- "**Download**" links and "**Coming soon**" resource cards are placeholders — real PDFs/Drive links get wired in when those assets exist.
- The **Our Story** resource cover loads the heritage photo from the live site; everything else is local.
- The page pulls Google Fonts and the intro video (Vimeo) from the web, so view it online.

## Handoff notes for WEBDOGS

- Plain HTML/CSS/JS, no framework or build step — meant to be translated into the existing WordPress theme.
- Brand tokens (colors, fonts, spacing) live at the top of `assets/style.css` as CSS custom properties. Fonts: **Playfair Display** (display) + **Lato** (body).
- HTML comments flag WordPress integration points (e.g. `<!-- WP: replace with theme header.php + wp_nav_menu -->`).
- Sell-sheet cover thumbnails in `assets/images/sheets/` are generated SVGs — usable as a design direction or replaceable with photography.
