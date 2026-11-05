import fs from 'node:fs/promises';
import path from 'node:path';
const { default: sharp } = await import(process.env.SHARP_MODULE_PATH || 'sharp');
const root = path.resolve('public');
let before = 0, after = 0, count = 0;
async function visit(directory) {
 for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
  if (entry.name === 'optimized') continue;
  const source = path.join(directory, entry.name);
  if (entry.isDirectory()) { await visit(source); continue; }
  if (!/\.jpe?g$/i.test(entry.name)) continue;
  const relative = path.relative(root, source);
  const target = path.join(root, 'optimized', relative + '.webp');
  await fs.mkdir(path.dirname(target), { recursive: true });
  await sharp(source).rotate().resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(target);
  before += (await fs.stat(source)).size; after += (await fs.stat(target)).size; count++;
 }
}
await visit(root);
console.log(JSON.stringify({ count, originalBytes: before, optimizedBytes: after, savedPercent: Math.round((1-after/before)*100) }));
