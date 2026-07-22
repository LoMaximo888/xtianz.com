# XTIANZ v36-2026-07-22 deployment

1. Upload the extracted contents to the repository root, including `.github` and `scripts`.
2. In **Settings → Pages**, confirm the source is the `main` branch and the `/ (root)` folder.
3. Commit all replacements together. Do not upload the ZIP itself.
4. Open the repository **Actions** tab and confirm **Validate XTIANZ Site** passes.
5. Verify `https://xtianz.com/release.json` reports `v36-2026-07-22`.
6. View source on `https://xtianz.com/` and search for `XTIANZ RELEASE: v36-2026-07-22`.
7. Hard-refresh once after deployment because the release adds cache-busted assets.

The workflow validates but does not change the configured GitHub Pages publishing source.
