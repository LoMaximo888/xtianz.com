# Xtianz.com Website

This is a free static website built for GitHub Pages.

## Upload to GitHub Pages
1. Go to GitHub and create a new repository, for example `xtianz`.
2. Upload `index.html` and the `assets` folder.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose `main` and `/root`, then Save.
6. Your free site will appear at `https://YOURGITHUBUSERNAME.github.io/xtianz/`.

## Connect xtianz.com
In GitHub Pages, add your custom domain: `xtianz.com`.

At your domain registrar, add these DNS records for the root/apex domain:

A 185.199.108.153
A 185.199.109.153
A 185.199.110.153
A 185.199.111.153

For www, add:

CNAME www YOURGITHUBUSERNAME.github.io

Then enable **Enforce HTTPS** in GitHub Pages after DNS verifies.

## Edit Content
Open `index.html` and change any wording, watchlist items, or sections.
