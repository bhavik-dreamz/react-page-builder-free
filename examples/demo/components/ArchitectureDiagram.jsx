const steps = [
  { label: 'React Application', description: 'Your app owns the editor and page routes.' },
  { label: 'Visual Editor', description: 'Build pages with drag-and-drop blocks.' },
  { label: 'HTML + JSON', description: 'Save structured content that is easy to render.' },
  { label: 'Your API / Database', description: 'Persist content to your own backend.' },
  { label: 'SSR Renderer', description: 'Render public pages safely on the server.' },
  { label: 'Public Website', description: 'Deliver content as a fast, SEO-friendly site.' },
];

export default function ArchitectureDiagram() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">The architecture</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            The editor manages content. Your application owns the data.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Keep the user experience visual while preserving a clean React architecture and server-rendered output.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 lg:grid-cols-6 lg:items-center">
            {steps.map((step, index) => (
              <div key={step.label} className="group relative rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-slate-950">{step.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-2 hidden lg:block">
                    <div className="mx-auto h-0.5 w-full max-w-[calc(100%_-_4rem)] bg-slate-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
