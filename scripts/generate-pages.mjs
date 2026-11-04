import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const site = 'https://flametofable.ariyo.in/';
const output = path.join(root, 'dist/flametofable/browser');
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Read the actual component data without executing application code. Fail on
// computed values so a future data refactor cannot silently publish stale URLs.
export async function readDictionary(file, property) {
  const source = ts.createSourceFile(file, await fs.readFile(path.join(root, file), 'utf8'), ts.ScriptTarget.Latest, true);
  let initializer;
  function visit(node) {
    if (ts.isPropertyDeclaration(node) && node.name.getText(source) === property) initializer = node.initializer;
    ts.forEachChild(node, visit);
  }
  visit(source);
  function literal(node) {
    if (!node) throw new Error(`Missing ${property} in ${file}`);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
    if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(p => {
      if (!ts.isPropertyAssignment(p)) throw new Error(`Expected literal data in ${file}`);
      return [p.name.text, literal(p.initializer)];
    }));
    throw new Error(`Unsupported computed ${property} data in ${file}: ${node.getText(source)}`);
  }
  return literal(initializer);
}

export async function readRoutes() {
  const products = await readDictionary('src/product-detail/product-detail.component.ts', 'products');
  const catalogue = await readDictionary('src/catalogue/catalogue.component.ts', 'products');
  const posts = await readDictionary('src/blog/blog.component.ts', 'blogPosts');
  for (const id of Object.keys(catalogue)) {
    if (!products[id]) throw new Error(`Catalogue product has no detail page: ${id}`);
  }
  const productRoutes = Object.values(products).map(product => ({
    path: `product/${product.id}/`,
    title: `${product.name} - Premium Handmade Candles | Flame to Fable`,
    description: product.description || `${product.name}. Premium handmade candle by Flame to Fable. Best candles in Kerala for home decor, gifting, and return gifts.`,
    image: new URL(product.image, site).href,
    type: 'product',
    product
  }));
  const blogRoutes = Object.values(posts).map(post => ({
    path: `blog/${post.id}/`,
    title: `${post.title} - Flame to Fable Blog`,
    description: `Read ${post.title} on Flame to Fable blog. Expert tips about candles, home decor, and creating perfect ambiance.`,
    image: new URL('favicon.png', site).href,
    type: 'article',
    post
  }));
  const routes = [...productRoutes, ...blogRoutes];
  if (new Set(routes.map(route => route.path)).size !== routes.length) throw new Error('Duplicate page URLs');
  for (const route of routes) {
    if (!/^(product|blog)\/[a-z0-9-]+\/$/.test(route.path)) throw new Error(`Invalid page path: ${route.path}`);
  }
  return routes;
}

export function createSitemap(routes) {
  const urls = [{ path: '' }, ...routes].map(route => `  <url>
    <loc>${escapeHtml(new URL(route.path, site).href)}</loc>${route.type === 'product' ? `
    <image:image>
      <image:loc>${escapeHtml(route.image)}</image:loc>
      <image:title>${escapeHtml(route.product.name)}</image:title>
    </image:image>` : ''}
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>\n`;
}

export function createPage(shell, route) {
  const url = new URL(route.path, site).href;
  let html = shell.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = html.replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '');
  html = html.replace(/<meta\b[^>]*rel=["']canonical["'][^>]*>/gi, '');
  html = html.replace(/<meta\b[^>]*property=["']og:image:(?:width|height)["'][^>]*>/gi, '');
  const meta = { description: route.description, 'og:title': route.title, 'og:description': route.description, 'og:url': url, 'og:image': route.image, 'og:type': route.type, 'twitter:title': route.title, 'twitter:description': route.description, 'twitter:image': route.image, 'og:image:alt': route.product?.name || route.post.title, 'twitter:image:alt': route.product?.name || route.post.title };
  for (const [name, value] of Object.entries(meta)) {
    const pattern = new RegExp(`<meta\\b[^>]*(?:name|property)=["']${name}["'][^>]*>`, 'gi');
    html = html.replace(pattern, '');
    const attribute = name.startsWith('og:') ? 'property' : 'name';
    html = html.replace('</head>', `<meta ${attribute}="${name}" content="${escapeHtml(value)}">\n</head>`);
  }
  html = html.replace('</head>', `<link rel="canonical" href="${escapeHtml(url)}">\n</head>`);
  let content;
  if (route.product) {
    const p = route.product;
    // Quote-only catalogue pages do not claim Product/Offer rich-result eligibility.
    const data = { '@context': 'https://schema.org', '@type': 'WebPage', name: p.name, description: route.description, image: route.image, url, publisher: { '@id': site + '#organization' } };
    html = html.replace('</head>', `<script type="application/ld+json" data-product="true">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>\n</head>`);
    const enquiry = 'https://wa.me/917994209092?text=' + encodeURIComponent(`Hi! I'm interested in the ${p.name}. Can you provide more details about availability and delivery?`);
    content = `<h1>${escapeHtml(p.name)}</h1><img src="${escapeHtml(route.image)}" alt="${escapeHtml(p.name)}" width="360" style="max-width:100%;height:auto"><p>${escapeHtml(route.description)}</p><a href="${escapeHtml(enquiry)}">Enquire on WhatsApp</a>`;
  } else {
    content = `<h1>${escapeHtml(route.post.title)}</h1><p>${escapeHtml(route.post.author)} · ${escapeHtml(route.post.date)}</p>${route.post.content}`;
  }
  // This crawlable content is also useful before Angular loads. Angular replaces
  // its host contents when it bootstraps; this is not an SSR hydration payload.
  const fallback = `<app-root><main style="max-width:900px;margin:40px auto;padding:24px;font-family:system-ui,sans-serif"><a href="/">Flame to Fable — Home</a>${content}<p><a href="/#catalogue">Browse our candle collection</a></p></main></app-root>`;
  return html.replace(/<app-root>[\s\S]*?<\/app-root>/i, () => fallback);
}

export async function generatePages(sitemapOnly = false) {
  const routes = await readRoutes();
  // Reject missing assets (including wrong filename case on Windows).
  for (const route of routes.filter(route => route.product)) {
    for (const image of [route.product.image, ...(route.product.images || [])]) {
      const relative = decodeURIComponent(new URL(image, site).pathname).slice(1);
      const directory = path.join(root, 'public', path.dirname(relative));
      if (!(await fs.readdir(directory)).includes(path.basename(relative))) throw new Error(`Missing or incorrectly cased image: ${image}`);
    }
  }
  const sitemap = createSitemap(routes);
  await fs.writeFile(path.join(root, 'public/sitemap.xml'), sitemap);
  if (!sitemapOnly) {
    const shell = await fs.readFile(path.join(output, 'index.html'), 'utf8');
    if (!/<base href="\/">/.test(shell)) throw new Error('Custom-domain Pages build must use base href="/"');
    for (const route of routes) {
      const directory = path.join(output, route.path);
      await fs.mkdir(directory, { recursive: true });
      await fs.writeFile(path.join(directory, 'index.html'), createPage(shell, route));
    }
    await fs.writeFile(path.join(output, 'sitemap.xml'), sitemap);
  }
  console.log(`Generated ${routes.length} route${sitemapOnly ? ' sitemap entries' : ' HTML pages'} and a matching sitemap.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generatePages(process.argv.includes('--sitemap-only'));
}
