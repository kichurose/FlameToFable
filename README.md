# Flame to Fable

## Run locally

Use Node.js 20.19+ or 22.12+.

```powershell
npm ci
npm start
```

## GitHub Pages (custom domain)

The site is hosted at https://flametofable.ariyo.in/ from the `gh-pages` branch.
Keep the base href as `/` for this custom domain. Do not add `/FlameToFable/`.

```powershell
npm run build:pages
npx angular-cli-ghpages --dir=dist/flametofable/browser --cname=flametofable.ariyo.in
```

Or build and publish in one step:

```powershell
npm run deploy:pages
```

`public/CNAME` preserves the custom domain in every build. The publishing tool
also creates `404.html` as a fallback and `.nojekyll` for GitHub Pages.
The build writes a real `index.html` for each product and blog route, so direct
visits resolve as normal pages. Each has route-specific metadata and a canonical
URL ending in `/`. GitHub Pages redirects the version without `/` to that page.
The sitemap is regenerated from the product and blog data on every build.
The build output in `dist/` is ignored on `master`; the publishing tool pushes
the compiled site to `gh-pages`. Commit and push source changes to `master` separately.
