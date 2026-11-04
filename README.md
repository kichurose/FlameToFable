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

## Google Search Console

1. Open https://search.google.com/search-console/ and sign in with the Google
   account that should own the website property. Google Business Profile/Maps
   verification is separate from Search Console verification.
2. Click **Add a website** (or **Add property**), choose **URL prefix**, enter
   `https://flametofable.ariyo.in/`, and click **Continue**. If this property is
   already verified, skip to the sitemap step.
3. Under verification methods, expand **HTML tag**. Copy the generated
   `google-site-verification` tag and replace the existing verification tag in
   `src/index.html`; keep only one tag for this verification method.
4. Run `npm run deploy:pages`. Wait until the live homepage's page source includes
   the exact token Google supplied, then return to Search Console and click
   **Verify**. Keep the tag in the source after verification succeeds so later
   deployments preserve ownership verification.
5. Open **Sitemaps**, enter `sitemap.xml` under **Add a new sitemap**, and submit.
   The full sitemap URL is `https://flametofable.ariyo.in/sitemap.xml`.
   Check that its status becomes **Success**. The Pages build automatically
   regenerates it from the current product and blog routes.
6. Use the top **URL inspection** bar to inspect the homepage and important
   product pages, such as `https://flametofable.ariyo.in/product/trio-jar/`.
   Click **Test live URL** and, if available to Google, **Request indexing**.
7. Monitor the **Page indexing** and **Performance** reports for crawl issues,
   indexed pages, search queries, and clicks. Sitemap submission and indexing
   requests do not guarantee indexing, ranking, or an immediate appearance in Search.

Google's documentation:
- Ownership verification: https://support.google.com/webmasters/answer/9008080
- Sitemap submission: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Indexing requests: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
