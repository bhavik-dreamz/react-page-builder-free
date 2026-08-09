import { useState } from 'react';
import Homepage from './Homepage.jsx';
import FrontendPage from './FrontendPage.jsx';
import { BlockEditor, initBlocks } from 'react-page-builder-free/editor';
import { savePage, loadPage } from './api.js';
import { demoMediaHandlers } from './mediaHandlers.js';
import { demoActions } from './actionsConfig.js';

const DEMO_BUILDER_HTML = `
<h1>SEO-Friendly Product Landing Page</h1>
<p>Welcome to the react-page-builder-free demo. This page is prefilled with SEO-friendly content, product information, and geo-aware marketing language for a clean single-page layout.</p>
<h2>Why this page works</h2>
<ul>
  <li>Structured headings and paragraphs for better SEO.</li>
  <li>Clear product benefits and conversion-focused content.</li>
  <li>Geo-friendly language for global marketing relevance.</li>
</ul>
<h2>Featured capabilities</h2>
<ul>
  <li>Drag-and-drop Gutenberg blocks</li>
  <li>SSR-safe renderer for Next.js, Remix, and Vite</li>
  <li>OnSave / onLoad persistence for live demo pages</li>
</ul>
<h2>About react-page-builder-free</h2>
<p>This demo builder page shows how to create a home page, product page, or demo page using the same editor. Edit the content, save your page, and preview it in the demo site viewer.</p>
<h2>Contact and site details</h2>
<p>Build your website content with modern React architecture, SEO-friendly page structure, and a user-friendly builder experience.</p>
`;

async function loadBuilderPage(id) {
  const saved = await loadPage(id);
  if (saved) {
    return saved;
  }

  return {
    id,
    title: 'Demo Landing Page',
    html: DEMO_BUILDER_HTML,
  };
}

export default function App() {
  const [view, setView] = useState('home');

  if (view === 'site') {
    return <FrontendPage onBackToEditor={() => setView('home')} />;
  }

  if (view === 'builder') {
    return (
      <BlockEditor
        media={demoMediaHandlers}
        actions={demoActions}
        onViewSite={() => setView('site')}
        onSave={({ id, title, html, json }) => savePage(id, title, html, json)}
        onLoad={(id) => loadBuilderPage(id)}
        initialTitle="Demo Landing Page"
        initialPageId="demo-page"
      />
    );
  }

  return <Homepage onTryDemo={() => setView('builder')} />;
}
