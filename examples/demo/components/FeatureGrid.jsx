const features = [
  {
    title: 'Drag & Drop Editor',
    description: 'Build pages visually with Gutenberg-inspired blocks and inline rich text editing.',
  },
  {
    title: 'Responsive Preview',
    description: 'Preview your pages across desktop, tablet, and mobile widths.',
  },
  {
    title: 'SSR / RSC Safe',
    description: 'Render public pages safely on the server without touching the DOM.',
  },
  {
    title: 'Bring Your Own Database',
    description: 'Save HTML and JSON using your own API, database, or persistence layer.',
  },
  {
    title: 'Custom Blocks',
    description: 'Extend the builder with blocks created specifically for your application.',
  },
  {
    title: 'Templates',
    description: 'Create reusable page templates and layouts for your projects.',
  },
  {
    title: 'Custom Media Library',
    description: 'Connect your own media API for image browsing, search, pagination, and uploads.',
  },
  {
    title: 'Custom Actions',
    description: 'Connect buttons to URLs, products, collections, or application-specific actions.',
  },
  {
    title: 'SEO-Friendly Pages',
    description: 'Create structured public-facing pages suitable for landing pages, product pages, and content.',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">Powerful blocks. Simple architecture.</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Powerful blocks. Simple architecture.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Build modern React pages with a developer-first page builder that keeps your app structure clean and extensible.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
