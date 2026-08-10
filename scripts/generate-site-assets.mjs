import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const siteUrl = (process.env.VITE_PUBLIC_URL || 'http://localhost:4173').replace(/\/$/, '');
const outDir = resolve(process.cwd(), 'dist-demo');
const pages = ['', 'demo/', 'features/', 'faq/', 'about/'];

const sitemapItems = pages
  .map((path) => {
    const loc = new URL(path, `${siteUrl}/`).toString();
    return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
  })
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapItems}\n</urlset>\n`;
const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;

await writeFile(resolve(outDir, 'sitemap.xml'), sitemapXml, 'utf8');
await writeFile(resolve(outDir, 'robots.txt'), robotsTxt, 'utf8');
console.log('Generated sitemap.xml and robots.txt in', outDir);
