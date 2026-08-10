import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

const outDir = resolve(process.cwd(), 'dist-demo');
const pages = ['', 'demo', 'features', 'faq', 'about'];

const publicUrl = process.env.VITE_PUBLIC_URL || (await import('../package.json', { assert: { type: 'json' } })).default.homepage || '';
const baseUrl = process.env.VITE_BASE_URL || '/';

if (!publicUrl) {
  console.warn('fix-meta: VITE_PUBLIC_URL not set and package.json.homepage empty — leaving placeholders as-is');
}

for (const p of pages) {
  const file = p ? resolve(outDir, p, 'index.html') : resolve(outDir, 'index.html');
  try {
    let html = await readFile(file, 'utf8');
    if (publicUrl) {
      html = html.replace(/%VITE_PUBLIC_URL%\/?/g, publicUrl.replace(/\/$/, '') + '/');
      html = html.replace(/https?:\/\/localhost:4173\/?/g, publicUrl.replace(/\/$/, '') + '/');
      html = html.replace(/http:\/\/localhost:4173\/?/g, publicUrl.replace(/\/$/, '') + '/');
    }
    if (baseUrl) html = html.replace(/%VITE_BASE_URL%/g, baseUrl);
    await writeFile(file, html, 'utf8');
    console.log('Patched', file);
  } catch (err) {
    console.warn('fix-meta: skipping', file, err.message);
  }
}

console.log('fix-meta: done');
