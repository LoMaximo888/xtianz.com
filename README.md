# XTIANZ v13 — GitHub Pages + AdSense Ready

This version adds the Google AdSense Auto Ads script, `ads.txt`, privacy/about/contact/disclaimer pages, and a search page.

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
4. Commit with: `Deploy XTIANZ v13 AdSense and Search`.
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

## Search

This version removes the internal Google site-search box and adds your 300x250 AdSense unit near the top of the homepage using ad slot `2952679985`.

## v13 change

Removed the previous internal search box/728x90 banner approach and added the provided 300x250 AdSense unit near the top of `index.html`. The AdSense loader remains in the `<head>` and the display unit uses publisher `ca-pub-9242762673194411` and slot `2952679985`.
