const templates = [
  { name: 'Landing Page', description: 'Hero, features, and CTA layout for product launches.' },
  { name: 'SaaS Homepage', description: 'Modern sections built for product storytelling.' },
  { name: 'Product Page', description: 'Highlight functionality, pricing, and conversion flows.' },
  { name: 'Contact Page', description: 'Clean information layout for support and sales.' },
  { name: 'Documentation Page', description: 'Organized guides, features, and navigation.' },
  { name: 'Marketing Page', description: 'Campaign-ready sections with messaging and visuals.' },
];

export default function TemplateShowcase() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">Templates</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Templates for every React page type.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Start from a reusable page layout and customize it with your brand, blocks, and content.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <div key={template.name} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-slate-950 p-4 text-white">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-300">Template</p>
                <h3 className="mt-3 text-xl font-semibold">{template.name}</h3>
              </div>
              <div className="space-y-3 p-5">
                <p className="text-sm leading-6 text-slate-600">{template.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">React</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">SSR</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#docs"
            className="inline-flex rounded-full border border-transparent bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Create your own templates →
          </a>
        </div>
      </div>
    </section>
  );
}
