import { chromium } from 'playwright';
import { readFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(process.cwd(), 'dist-demo');
const baseUrl = process.env.VITE_PUBLIC_URL || 'http://localhost:4173';

function findIndexFiles(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      const indexPath = resolve(p, 'index.html');
      if (fs.existsSync(indexPath)) result.push(indexPath);
      // also descend to find nested index.html
      result.push(...findIndexFiles(p));
    } else if (entry.isFile() && entry.name === 'index.html' && dir === outDir) {
      result.push(resolve(dir, 'index.html'));
    }
  }
  return Array.from(new Set(result));
}

async function prerender() {
  const indexFiles = findIndexFiles(outDir);
  if (!indexFiles.length) {
    console.error('prerender-playwright: no index.html files found in', outDir);
    process.exit(1);
  }

  console.log('prerender-playwright: found', indexFiles.length, 'pages');

  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const file of indexFiles) {
    // compute route path from dist-demo index files
    const rel = file.replace(outDir, '').replace(/\\/g, '/');
    const route = rel === '/index.html' || rel === '' ? '/' : rel.replace(/\/index.html$/, '/') ;
    const url = new URL(route, baseUrl).toString();
    console.log('prerender-playwright: visiting', url);
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // wait for network to be idle
      try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch (e) {
        // ignore
      }
      // wait for #root to have content (hydrated) or timeout
      try {
        await page.waitForFunction(() => {
          const r = document.querySelector('#root');
          return r && r.innerHTML && r.innerHTML.trim().length > 0;
        }, { timeout: 10000 });
      } catch (e) {
        // fallback
      }

      const html = await page.content();
      // write back to dist-demo path
      await writeFile(file, html, 'utf8');

      // log canonical / og:url for verification
      const canonical = await page.$$eval('link[rel="canonical"]', els => els.map(e => e.href).join(',') );
      const ogUrl = await page.$$eval('meta[property="og:url"]', els => els.map(e => e.content).join(',') );
      console.log('prerender-playwright: saved', file, 'canonical=', canonical || '(none)', 'og:url=', ogUrl || '(none)');
    } catch (err) {
      console.warn('prerender-playwright: failed to prerender', url, err.message);
    }
  }

  await browser.close();
  console.log('prerender-playwright: done');
}

prerender().catch((err) => { console.error(err); process.exit(1); });
