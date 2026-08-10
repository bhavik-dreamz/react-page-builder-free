import { BlockEditor } from 'react-page-builder-free/editor';
import { useState, useEffect } from 'react';
import { demoMediaHandlers } from '../../mediaHandlers.js';
import { demoActions } from '../../actionsConfig.js';
import { savePage, loadPage } from '../../api.js';
import { demoInitialContent } from '../demoContent.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SEOHead from '../components/SEOHead.jsx';
import { basePath } from '../site-config.js';

const pagePath = '/demo/';

export default function DemoPage() {
  const [loaded, setLoaded] = useState(false);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function loadDemo() {
      const saved = await loadPage('demo-page');
      if (saved) {
        setPageData(saved);
      } else {
        setPageData({ id: 'demo-page', title: 'Demo Landing Page', html: demoInitialContent });
      }
      setLoaded(true);
    }
    loadDemo();
  }, []);

  const handleSave = async ({ id, title, html, json }) => {
    await savePage(id, title, html, json);
  };

  return (
    <div className="bg-slate-50">
      <SEOHead
        title="Page Builder Demo — Try the Visual Block Editor"
        description="Try an interactive block-based page builder demo with predefined content, responsive layouts, reusable sections, and rich text blocks."
        pathname={pagePath}
      />
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Home', url: basePath },
              { name: 'Demo', url: `${basePath}demo/` },
            ]}
          />
          <SectionHeading
            eyebrow="Live demo"
            title="Page Builder Demo — Try the Visual Block Editor"
            description="Open the editor to edit predefined content, save pages in local storage, and explore how visual blocks make modern website sections easy to build."
          />
          <div className="grid gap-10 lg:grid-cols-[0.8fr_0.4fr] lg:items-start">
            <div className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">What you can edit</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  The demo initializes with a landing page structure, featuring a hero section, feature cards, responsive content, a quote, statistics, and a final call to action.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li>Headings, paragraphs, lists, and links</li>
                  <li>Buttons and reusable section layouts</li>
                  <li>Responsive page structure for desktop and mobile</li>
                  <li>Editor save/load powered by local storage</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">How to start</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Click into the editor to change block content, add new sections with the inserter, and publish changes using the Save button in the editor header.
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  The demo is a practical example of the same page builder used in production documentation and preview environments.
                </p>
              </div>
            </div>
            <aside className="space-y-6 rounded-3xl border border-slate-200 bg-indigo-600/5 p-8 shadow-sm">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-700">Demo blocks</p>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">Interactive builder examples</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                  <li>Visual Editing</li>
                  <li>Responsive Layouts</li>
                  <li>Reusable Sections</li>
                  <li>Rich Text and Links</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Demo note</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  This content is initialized with predefined page data and updated via the editor. Saving stores page state in the browser.
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {!loaded && <p className="text-sm text-slate-600">Loading editor…</p>}
            {loaded && (
              <BlockEditor
                media={demoMediaHandlers}
                actions={demoActions}
                onSave={handleSave}
                initialContent={pageData?.json || pageData?.html || demoInitialContent}
                initialTitle="Demo Landing Page"
                initialPageId="demo-page"
              />
            )}
          </div>

          <section className="mt-16 rounded-3xl bg-slate-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Demo page FAQ</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <article className="rounded-2xl bg-white p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-950">What can I edit in the demo?</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">You can update text blocks, add new sections, and change layout blocks inside the visual editor.</p>
              </article>
              <article className="rounded-2xl bg-white p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-950">Which blocks are available?</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">The demo supports headings, paragraphs, lists, buttons, and image-friendly content sections.</p>
              </article>
              <article className="rounded-2xl bg-white p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-950">Can I create responsive layouts?</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Yes. The base page structure is responsive and the builder is designed for desktop, tablet, and mobile workflows.</p>
              </article>
              <article className="rounded-2xl bg-white p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-950">Is this a real working editor?</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Yes. The demo loads a functioning visual editor built with the same React page builder package used by the project.</p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
