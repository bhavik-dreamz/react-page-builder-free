/**
 * Demo app — not published with the package.
 * Shows BlockEditor + local persistence via onSave / onLoad.
 */
import 'react-page-builder-free/styles';
import './styles.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BlockEditor, initBlocks } from 'react-page-builder-free/editor';
import FrontendPage from './FrontendPage.jsx';
import { savePage, loadPage } from './api.js';
import { demoMediaHandlers } from './mediaHandlers.js';
import { demoActions } from './actionsConfig.js';

initBlocks();

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

function DemoHome({ onOpenBuilder, onOpenSite }) {
  return (
    <div className="demo-home">
      <header className="demo-hero">
        <p className="demo-eyebrow">React Page Builder</p>
        <h1>SEO-friendly landing pages and builder demo</h1>
        <p className="demo-subtitle">
          Explore the page builder with a polished single-page layout, product information, and geo-aware SEO content. Use the demo builder to launch a ready-made page and preview it instantly.
        </p>
        <div className="demo-cta-row">
          <button className="demo-btn demo-btn--primary" onClick={onOpenBuilder}>
            Open the Demo Builder
          </button>
          <button className="demo-btn" onClick={onOpenSite}>
            View Saved Demo Pages
          </button>
        </div>
      </header>

      <section className="demo-features">
        <article className="demo-feature-card">
          <h2>Built for SEO</h2>
          <p>Structured page content with headings, descriptions, and marketing copy that search engines can understand.</p>
        </article>
        <article className="demo-feature-card">
          <h2>Single page layout</h2>
          <p>A clean, elegant homepage-style product section with feature highlights and contact messaging.</p>
        </article>
        <article className="demo-feature-card">
          <h2>Demo builder page</h2>
          <p>The builder opens with auto-filled content so you can see the editor workflow immediately.</p>
        </article>
        <article className="demo-feature-card">
          <h2>Global-friendly content</h2>
          <p>SEO and geo-aware text designed for broad marketing relevance and better page discovery.</p>
        </article>
      </section>
    </div>
  );
}

async function loadBuilderPage(id) {
  const existing = await loadPage(id);
  if (existing) {
    return existing;
  }
  return {
    id,
    title: 'Demo Landing Page',
    html: DEMO_BUILDER_HTML,
  };
}

function Root() {
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

  return <DemoHome onOpenBuilder={() => setView('builder')} onOpenSite={() => setView('site')} />;
}

function renderApp() {
  const rootEl = document.getElementById('root');
  if (!rootEl) return;
  ReactDOM.createRoot(rootEl).render(<Root />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
