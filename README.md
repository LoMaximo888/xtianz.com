# XTIANZ.com GitHub Pages Site

This is the upgraded XTIANZ static website package for GitHub Pages.

## What is included

- `index.html` — full homepage
- `assets/styles.css` — modern dark AI/tech styling
- `assets/app.js` — mobile menu, animation, demo newsletter, public AI headline feed
- `assets/logo.svg` and `assets/favicon.svg` — custom XTIANZ logo assets
- `CNAME` — custom domain file for `xtianz.com`
- `.nojekyll` — tells GitHub Pages to serve files normally
- `robots.txt` and `sitemap.xml` — basic SEO files
- `404.html` — custom not-found page

## Upload to GitHub

1. Go to your repository: `https://github.com/lomaximo888/xtianz.com`
2. Click **Add file** → **Upload files**.
3. Drag all files and folders from this package into GitHub.
4. Commit with a message like: `Upgrade XTIANZ site`.
5. Go to **Settings** → **Pages**.
6. Confirm:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
7. Custom domain should be: `xtianz.com`.
8. Enable **Enforce HTTPS** once GitHub allows it.

## DNS for Bluehost

For the root domain, add these A records:

- `@` → `185.199.108.153`
- `@` → `185.199.109.153`
- `@` → `185.199.110.153`
- `@` → `185.199.111.153`

For `www`, add this CNAME:

- `www` → `lomaximo888.github.io`

## Notes

- TradingView stock widgets run from TradingView and need internet access in the browser.
- The AI headline feed uses the public Hacker News Algolia API. If it is unavailable, the site automatically shows fallback cards.
- The newsletter form is a demo only. To collect real emails, connect it to Beehiiv, ConvertKit, Mailchimp, or Formspree.
