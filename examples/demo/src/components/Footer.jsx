import { basePath, githubUrl } from '../site-config.js';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="text-base font-semibold text-slate-950">React Page Builder Free</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">An open-source visual page builder for React.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <div>
            <p className="text-sm font-semibold text-slate-900">Links</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href={`${basePath}features/`} className="transition hover:text-slate-900">Features</a></li>
              <li><a href={`${basePath}faq/`} className="transition hover:text-slate-900">FAQ</a></li>
              <li><a href={`${basePath}demo/`} className="transition hover:text-slate-900">Demo</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Community</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href={githubUrl} target="_blank" rel="noreferrer" className="transition hover:text-slate-900">GitHub</a></li>
              <li><a href="https://www.npmjs.com/package/react-page-builder-free" target="_blank" rel="noreferrer" className="transition hover:text-slate-900">npm</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Legal</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">Free and MIT licensed.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
