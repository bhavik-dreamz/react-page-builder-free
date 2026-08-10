import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const publicUrl = process.env.VITE_PUBLIC_URL;
if (!publicUrl) {
  console.error('prerender-from-live: VITE_PUBLIC_URL must be set to fetch rendered pages');
  process.exitCode = 2;
  process.exit();
}

const outDir = resolve(process.cwd(), 'dist-demo');
const pages = ['', 'demo', 'features', 'faq', 'about'];

console.log('prerender-from-live: fetching pages from', publicUrl);
for (const p of pages) {
  const url = new URL(p + '/', publicUrl).toString();
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'prerender/1.0' } });
    if (!res.ok) throw new Error(String(res.status));
    const html = await res.text();
    const path = p ? `${outDir}/${p}/index.html` : `${outDir}/index.html`;
    await writeFile(path, html, 'utf8');
    console.log('Saved', path);
  } catch (err) {
    console.warn('prerender-from-live: failed', url, err.message);
  }
}

console.log('prerender-from-live: done');
