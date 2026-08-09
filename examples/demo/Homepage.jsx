import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import BuilderPreview from './components/BuilderPreview.jsx';
import FeatureGrid from './components/FeatureGrid.jsx';
import TechStack from './components/TechStack.jsx';
import CodeExample from './components/CodeExample.jsx';
import ArchitectureDiagram from './components/ArchitectureDiagram.jsx';
import TemplateShowcase from './components/TemplateShowcase.jsx';
import OpenSourceCTA from './components/OpenSourceCTA.jsx';
import Footer from './components/Footer.jsx';

const positions = [
  {
    title: 'Visual Editing',
    description: 'Give content teams a familiar drag-and-drop editing experience.',
  },
  {
    title: 'Modern React',
    description: 'Works with Next.js, Remix, and Vite — no WordPress or PHP required.',
  },
  {
    title: 'Production Ready',
    description: 'Render pages server-side with an SSR/RSC-safe renderer.',
  },
];

export default function Homepage({ onTryDemo }) {
  return (
    <div className="bg-slate-50 text-slate-950">
      <Header onTryDemo={onTryDemo} />
      <main>
        <Hero onTryDemo={onTryDemo} />

        <section className="py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">Everything you need to build pages in React.</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Everything you need to build pages in React.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                Developers should never choose between visual editing and modern React architecture. Use a page builder that preserves your stack while making content easy to create.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {positions.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BuilderPreview />
        <FeatureGrid />
        <TechStack />
        <CodeExample />
        <ArchitectureDiagram />
        <TemplateShowcase />
        <OpenSourceCTA />

        <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] bg-white/10 p-10 shadow-2xl shadow-indigo-700/10 backdrop-blur-sm sm:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-100">Ready to build your next React page?</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Start with a visual editor. Keep the freedom of React.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
                    React Page Builder Free gives your team a polished builder experience without locking your app into a specific backend.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onTryDemo}
                    className="inline-flex min-w-[11rem] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/10 transition hover:bg-slate-100"
                  >
                    Try Live Demo →
                  </button>
                  <a
                    href="#docs"
                    className="inline-flex min-w-[11rem] items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
