import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import SEOHead from '../components/SEOHead.jsx';
import { basePath } from '../site-config.js';

const features = [
  {
    heading: 'Visual Editing',
    content: 'Edit page sections directly in a visual interface so content updates feel fast and intuitive, while keeping the final output compatible with React rendering.',
  },
  {
    heading: 'Block-Based Editing',
    content: 'Build pages from reusable blocks such as headings, paragraphs, images, buttons, columns, and layout sections. Each block becomes a structured element in the page.',
  },
  {
    heading: 'Responsive Design',
    content: 'Create layouts that adapt to desktop, tablet, and mobile screens so your public pages look polished on every device.',
  },
  {
    heading: 'Reusable Sections',
    content: 'Save and reuse page sections to reduce repetitive work and keep landing pages consistent across campaigns and product pages.',
  },
  {
    heading: 'Rich Text Editing',
    content: 'Format headings, body copy, lists, links, and emphasis directly within blocks to provide clear structure for visitors and search engines.',
  },
  {
    heading: 'Developer-Friendly',
    content: 'Extend the builder with custom blocks, templates, and media handlers that fit your application architecture without locking you into a specific CMS.',
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-slate-50">
      <SEOHead
        title="Page Builder Features — Visual Editor, Blocks, and Responsive Pages"
        description="Explore feature details for the React page builder, including visual editing, reusable sections, responsive layouts, rich text support, and developer customization."
        pathname="/features/"
      />
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Home', url: basePath },
              { name: 'Features', url: `${basePath}features/` },
            ]}
          />
          <SectionHeading
            eyebrow="Feature details"
            title="Detailed features for a modern page builder"
            description="Learn how the React page builder supports visual layout construction, reusable content, responsive pages, and developer extensibility."
          />

          <div className="grid gap-10 lg:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.heading} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">{feature.heading}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{feature.content}</p>
              </article>
            ))}
          </div>

          <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">How the builder works</h2>
            <div className="mt-6 space-y-6 text-sm leading-7 text-slate-600">
              <p>
                The builder combines preconfigured blocks and inline editing so content teams can change page copy without touching application code. Developers can still add custom blocks and connect media or action handlers to the editor.
              </p>
              <p>
                Public pages are rendered as HTML from serialized block data. This makes the page builder suitable for static sites, SSR frameworks, and React-based applications.
              </p>
              <p>
                If you want a quick preview, open the demo page and inspect the editable page structure inside the editor.
              </p>
            </div>
            <div className="mt-10">
              <a
                href={`${basePath}demo/`}
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                Open the interactive demo
              </a>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
