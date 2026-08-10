import FeatureGrid from '../components/FeatureGrid.jsx';
import TechStack from '../components/TechStack.jsx';
import TemplateShowcase from '../components/TemplateShowcase.jsx';
import OpenSourceCTA from '../components/OpenSourceCTA.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { basePath } from '../site-config.js';

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-indigo-100 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
              Visual page builder for React
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Build Beautiful Websites With a Visual Page Builder
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              Create responsive website pages with block-based editing, reusable content sections, and a familiar visual editor that works with React, SSR, and modern static deployment.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`${basePath}demo/`}
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                Try the Page Builder
              </a>
              <a
                href={`${basePath}features/`}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Explore Features
              </a>
            </div>
            <p className="text-sm leading-6 text-slate-500">
              Free, open source, and optimized for static site deployment, public pages, and developer-friendly workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Problem and solution"
            title="Why traditional page editing slows teams down"
            description="Manual page updates, repeated layouts, and weak content structure make modern website updates slow and error-prone. A visual block builder fixes those problems."
          />

          <div className="grid gap-8 lg:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Complicated page editing</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Editing HTML, CSS, or template files takes time and creates risk. A visual editor lets teams update page content directly with familiar blocks.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Repetitive development</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Rebuilding similar sections over and over wastes effort. Reusable content blocks make it faster to keep design consistent across pages.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Limited reusable components</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Without block-based layouts, teams lose flexibility. This builder groups headings, buttons, images, and sections into reusable blocks.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How the page builder helps"
            title="A block-based editor makes page updates easier"
            description="Use content blocks to build website pages, keep reusable layouts, and publish responsive pages without writing code for every change."
          />

          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Visual Editing</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Drag and drop blocks, update text inline, and see page structure in a familiar editor. Visual editing helps teams iterate faster while preserving React compatibility.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Reusable Sections</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Create sections once and reuse them across landing pages, product pages, and marketing layouts. Reusable blocks reduce repetitive work and keep content consistent.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Responsive Design</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Every block is built for desktop, tablet, and mobile. Public pages render with responsive layouts so the same content adapts to every screen size.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Rich Text Editing</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Add headings, paragraphs, lists, links, and formatted content inside blocks. Rich text editing delivers better structure for search engines and reader clarity.
              </p>
            </article>
          </div>

          <div className="mt-12 text-center">
            <a
              href={`${basePath}demo/`}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              Open the interactive demo
            </a>
          </div>
        </div>
      </section>

      <FeatureGrid />
      <TechStack />
      <TemplateShowcase />
      <OpenSourceCTA />
    </div>
  );
}
