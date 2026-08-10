import { basePath } from '../site-config.js';

export default function OpenSourceCTA() {
  const badges = ['MIT', 'Open Source', 'React', 'SSR Ready'];

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 p-8 shadow-2xl shadow-slate-950/20 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Own your content. Own your stack.</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                React Page Builder Free is open source and MIT licensed.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Extend it, customize it, and integrate it into your own applications without vendor lock-in.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/bhavik-dreamz/react-page-builder-free"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  View on GitHub
                </a>
                <a
                  href={`${basePath}features/`}
                  className="inline-flex rounded-full border border-slate-300 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Explore features
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {badges.map((badge) => (
                <div key={badge} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-100 shadow-sm backdrop-blur-sm">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
