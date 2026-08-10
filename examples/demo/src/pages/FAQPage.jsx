import Breadcrumbs from '../components/Breadcrumbs.jsx';
import JsonLd from '../components/JsonLd.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { faqItems } from '../faqData.js';
import { basePath } from '../site-config.js';
import SEOHead from '../components/SEOHead.jsx';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <div className="bg-slate-50">
      <SEOHead
        title="FAQ — Visual Page Builder and Block Editor"
        description="Read answers about the page builder, block editor, responsive design, reusable sections, and deployment options."
        pathname="/faq/"
      />
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Home', url: basePath },
              { name: 'FAQ', url: `${basePath}faq/` },
            ]}
          />
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Page builder FAQ"
            description="Find clear answers about how the builder works, how it handles responsive pages, and how the demo is configured."
          />
          <div className="grid gap-6">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-950">{item.question}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Still have questions?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Open the demo page to try the editor yourself and see how the builder structures page content with blocks, sections, and reusable layouts.
            </p>
            <a
              href={`${basePath}demo/`}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              Try the demo editor
            </a>
          </div>
        </div>
      </section>
      <JsonLd data={faqJsonLd} />
    </div>
  );
}
