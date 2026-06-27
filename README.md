# XTIANZ v15 — GitHub Pages + AdSense Head Script

This version removes the visible “AdSense Ready” homepage section and keeps only the Google AdSense script inside the `<head>` tags, plus `ads.txt`, privacy/about/contact/disclaimer pages, and a legacy search page.

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
4. Commit with: `Deploy XTIANZ v15 remove AdSense Ready section`.
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

The internal Google site-search box and the hardcoded 300x250/728x90 visible AdSense units have been removed. Only the AdSense loader script remains in the `<head>` section of every HTML page.

## v14 change

Removed the visible AdSense unit from `index.html` and kept this script in the `<head>`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9242762673194411" crossorigin="anonymous"></script>
```


## v15 change

Removed the visible “AdSense Ready” section from the homepage while keeping the AdSense script in the `<head>` tags.
