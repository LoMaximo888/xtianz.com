# Deploy XTIANZ v39

1. Extract the ZIP.
2. Replace the repository root with every included file and folder.
3. Confirm `.github`, `articles`, `assets`, `scripts`, `ads.txt`, and `release.json` are uploaded.
4. Commit: `Deploy XTIANZ v39 AdSense verification`
5. Confirm both GitHub Actions workflows pass.
6. Verify `https://xtianz.com/release.json` reports `v39-2026-07-29`.
7. Verify `https://xtianz.com/ads.txt` displays exactly:
   `google.com, pub-9242762673194411, DIRECT, f08c47fec0942fa0`
8. Open page source for the homepage and confirm the AdSense script and account meta tag are inside `<head>`.
9. Return to AdSense, confirm ownership, expand **Request review**, and submit the site.

Google may take time to crawl the updated site. Do not add visible ad units until approval unless AdSense specifically instructs you to do so.
