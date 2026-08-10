# XTIANZ v43 deployment

## Recommended deployment
1. Replace/upload every file in this package, including `.github/`, `scripts/`, `articles/`, and `assets/`.
2. In GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Commit/push the release. The workflow builds an allowlisted `_site` artifact and publishes only approved pages.

## Retired files
If these files still exist in the repository from an older release, delete them when convenient. The v43 GitHub Actions workflow excludes them from the live site even before repository cleanup:
- articles/top-ai-search-questions.html
- articles/ai-stock-movers-watchlist.html
- articles/private-ai-companies-openai-anthropic-spacex.html
- articles/claude-models-opus-sonnet-guide.html
- articles/claude-safety-constitution.html
- articles/claude-economic-index-work.html

## Verify after deploy
- `https://xtianz.com/release.json` must show `v43-2026-08-09`.
- Each retired URL above should return the site 404 page / not be present in the Pages artifact.
- `https://xtianz.com/ads.txt` must remain authorized.

Do not request another AdSense review until the v43 release is live and Google Search Console has recrawled the homepage plus several flagship articles.
