# XTIANZ v16 — GitHub Pages + AdSense 728x90 Leaderboard

This version keeps the old visible AdSense setup/placeholder section removed, keeps the Google AdSense loader script inside the `<head>` tags, and adds a 728x90 leaderboard ad unit near the top of the homepage using ad slot `9217823721`.

## Files included

- `index.html` — homepage
- `search.html` — legacy redirect page to avoid old site-search behavior
- `about.html` — About page
- `contact.html` — Contact page
- `privacy.html` — Privacy Policy with Google AdSense/cookie language
- `disclaimer.html` — Investing, referral, and ad disclosure
- `ads.txt` — Google AdSense authorized seller file
- `CNAME` — custom domain file for xtianz.com
- `robots.txt` and `sitemap.xml`
- `assets/` — CSS, JS, logo, favicon

## Upload to GitHub

1. Extract the ZIP.
2. Upload all extracted files and folders to `github.com/lomaximo888/xtianz.com`.
3. Replace existing files.
4. Commit with: `Deploy XTIANZ v16 AdSense leaderboard`.
5. After deployment, verify:
   - `https://xtianz.com/ads.txt`
   - `https://xtianz.com/privacy.html`
   - `https://xtianz.com/search.html`

## Google AdSense

The Auto Ads script is already included in the `<head>` of every HTML page using publisher ID `ca-pub-9242762673194411`.

The `ads.txt` file includes:

```txt
google.com, pub-9242762673194411, DIRECT, f08c47fec0942fa0
```

## Search and visible ad units

The internal Google site-search box remains removed. The homepage includes a single visible 728x90 AdSense leaderboard unit near the top. The AdSense loader script remains in the `<head>` section of every HTML page.

## v14 change

Removed the visible AdSense unit from `index.html` and kept this script in the `<head>`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9242762673194411" crossorigin="anonymous"></script>
```


## v15 change

The visible AdSense setup/placeholder section is not present on the homepage; only the clean sponsored leaderboard placement appears near the top.


## v16 visible ad unit

Added a 728x90 Google AdSense unit near the top of `index.html`:

- Publisher ID: `ca-pub-9242762673194411`
- Ad slot: `9217823721`
- Placement: near the top of the homepage, after the hero/ticker area and before the Start Here section

The loader script is kept once in the `<head>` to avoid duplicate loading.


## XTIANZ v18 Search Fix

This version removes the blank Google CSE widget that used `ca-pub-9242762673194411` as the `cx` value. That value is your AdSense publisher ID, not a Google Programmable Search Engine ID.

What is included now:

- A visible Google search form near the top of the homepage.
- A working `search.html` page.
- The AdSense script remains in the `<head>` of each page.
- The 728x90 AdSense leaderboard from v16 remains near the top of the homepage.

To use the true embedded Google Programmable Search widget later, create a Programmable Search Engine in Google and replace the form with Google’s generated code using the real Search Engine ID.
