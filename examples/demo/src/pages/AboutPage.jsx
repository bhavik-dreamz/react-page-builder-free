import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { basePath } from '../site-config.js';
import SEOHead from '../components/SEOHead.jsx';

export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      <SEOHead
        title="About the Page Builder — Open Source React Visual Editor"
        description="Learn about the page builder project, its Gutenberg-inspired visual editor, responsive page support, and developer-friendly React integration."
        pathname="/about/"
      />
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Home', url: basePath },
              { name: 'About', url: `${basePath}about/` },
            ]}
          />
          <SectionHeading
            eyebrow="About the project"
            title="A visual page builder built for React applications"
            description="This open-source builder delivers block-based editing, reusable page sections, and SSR-compatible rendering for modern static and React-hosted websites."
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">What this project is for</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                React Page Builder Free is made for teams who want visual page editing without replacing their React architecture or relying on a separate CMS.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                It supports reusable page blocks, content templates, and a website experience that can be deployed to static hosting like GitHub Pages.
              </p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">What it is not</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This project is not a hosted website builder service. It is an open-source React package for integrating a visual editor into your own website or app.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                The demo is a static website example that shows how the editor works and how content can be restored from page data.
              </p>
            </article>
          </div>

          <section className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Who should use this builder?</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
              <li>Developers building React websites that need a visual content editor.</li>
              <li>Design teams looking for reusable landing page sections.</li>
              <li>Marketing teams that want SEO-friendly page structure without coding.</li>
            </ul>
            <div className="mt-10">
              <a
                href={`${basePath}demo/`}
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                Explore the demo editor
              </a>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
