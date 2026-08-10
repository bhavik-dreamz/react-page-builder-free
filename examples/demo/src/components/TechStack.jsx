const stack = [
  { name: 'React', accent: 'text-cyan-600 bg-cyan-50' },
  { name: 'Next.js', accent: 'text-slate-950 bg-slate-100' },
  { name: 'Remix', accent: 'text-violet-700 bg-violet-50' },
  { name: 'Vite', accent: 'text-amber-700 bg-amber-50' },
  { name: 'Node.js', accent: 'text-emerald-700 bg-emerald-50' },
];

export default function TechStack() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">Built for the React ecosystem.</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Built for the React ecosystem.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Drop the page builder into the stack you already use. It’s designed to sit inside modern React apps without forcing a CMS or framework lock-in.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {stack.map((item) => (
              <div key={item.name} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className={`inline-flex rounded-full px-3 py-2 text-sm font-semibold ${item.accent}`}>
                  {item.name}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.name === 'Node.js'
                    ? 'Part of the broader JavaScript ecosystem for modern web apps.'
                    : `Built to integrate with ${item.name} applications.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
