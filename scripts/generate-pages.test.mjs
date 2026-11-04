import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { root, site, readRoutes, createPage, createSitemap } from './generate-pages.mjs';

const routes = await readRoutes();
const shell = await fs.readFile(path.join(root, 'src/index.html'), 'utf8');

test('all catalogue products and current blog posts have unique static pages', () => {
  assert.equal(new Set(routes.map(route => route.path)).size, routes.length);
  for (const route of ['product/trio-jar/', 'product/tulip-candle/', 'product/reindeer/', 'blog/our-journey/']) {
    assert.ok(routes.some(item => item.path === route), `Missing ${route}`);
  }
  assert.ok(!routes.some(route => route.path === 'blog/our-story/'));
});

test('every route gets one matching canonical, metadata, and crawlable content', () => {
  for (const route of routes) {
    const html = createPage(shell, route);
    const canonical = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g)];
    assert.equal(canonical.length, 1, route.path);
    assert.equal(canonical[0][1], new URL(route.path, site).href);
    assert.ok(!/<meta[^>]*rel="canonical"/.test(html));
    assert.ok(html.includes('<h1>'), route.path);
    assert.ok(html.includes(`content="${new URL(route.path, site).href}"`));
    if (route.product) {
      const schema = JSON.parse(html.match(/<script type="application\/ld\+json" data-product="true">([\s\S]*?)<\/script>/)[1]);
      assert.equal(schema.name, route.product.name);
      assert.equal(schema['@type'], 'WebPage');
      assert.equal(schema.image, route.image);
      assert.equal(schema.url, new URL(route.path, site).href);
      assert.ok(!schema.aggregateRating, 'Unverified ratings must not be generated');
    }
  }
});

test('homepage and generated pages have no prices or incomplete shopping/review markup', () => {
  function check(node) {
    if (!node || typeof node !== 'object') return;
    assert.ok(!['Product', 'Offer', 'AggregateOffer', 'OfferCatalog', 'Review', 'AggregateRating'].includes(node['@type']));
    for (const [key, value] of Object.entries(node)) {
      assert.ok(!['price', 'priceRange', 'priceCurrency', 'offers', 'aggregateRating', 'review'].includes(key), `Unexpected ${key}`);
      if (Array.isArray(value)) value.forEach(check);
      else check(value);
    }
  }
  for (const html of [shell, ...routes.map(route => createPage(shell, route))]) {
    for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) check(JSON.parse(match[1]));
  }
  assert.ok(shell.includes('https://flametofable.ariyo.in/favicon.png'));
  assert.ok(!shell.includes('https://flametofable.ariyo.in/logo.png'));
});

test('sitemap lists exactly the generated routes and current image filenames', () => {
  const sitemap = createSitemap(routes);
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(urls, [site, ...routes.map(route => new URL(route.path, site).href)]);
  assert.ok(sitemap.includes('/Reindeer.jpg'));
  assert.ok(!sitemap.includes('/product/christmas-spice'));
  assert.ok(!sitemap.includes('/blog/our-story'));
});
