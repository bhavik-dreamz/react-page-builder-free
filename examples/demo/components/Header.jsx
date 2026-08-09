import { useState } from 'react';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Documentation', href: '#docs' },
  { label: 'Demo', href: '#demo' },
  { label: 'GitHub', href: 'https://github.com/bhavik-dreamz/react-page-builder-free' },
];

export default function Header({ onTryDemo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="#hero" className="flex items-center gap-3 text-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/10 text-white">
            <span className="text-lg font-semibold">RP</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] uppercase text-slate-500">React Page Builder</p>
            <p className="text-xs text-slate-400">Free • Open Source</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://github.com/bhavik-dreamz/react-page-builder-free"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
          >
            GitHub
          </a>
          <button
            onClick={onTryDemo}
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/15 transition hover:bg-indigo-700"
          >
            Try Live Demo
          </button>
        </div>

        <button
          type="button"
          className="lg:hidden rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="block h-0.5 w-5 bg-current transition duration-300" />
          <span className="block mt-1 h-0.5 w-5 bg-current transition duration-300" />
          <span className="block mt-1 h-0.5 w-5 bg-current transition duration-300" />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 px-4 py-4 sm:px-6 lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                onTryDemo();
                setMenuOpen(false);
              }}
              className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Try Live Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
