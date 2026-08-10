export default function Hero({ onTryDemo }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-indigo-100 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Open Source • React • MIT Licensed
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Build React Pages Visually.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            Drag, drop, design, and publish beautiful pages in React — without WordPress.
          </p>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            React Page Builder Free brings a Gutenberg-inspired visual editor to modern React applications, with SSR-safe rendering and complete control over your content.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onTryDemo}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              Try Live Demo →
            </button>
            <a
              href="../features/"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Get Started
            </a>
          </div>

          <p className="text-sm leading-6 text-slate-500">
            Free & Open Source · MIT Licensed · Next.js · Remix · Vite
          </p>
        </div>
      </div>
    </section>
  );
}
