const installCommand = `npm install react-page-builder-free react react-dom`;
const exampleCode = `import { BlockEditor } from 'react-page-builder-free/editor';

export default function PageEditor() {
  return (
    <BlockEditor
      initialTitle="Home"
      onSave={async ({ id, title, html, json }) => {
        // Save to your API or database
      }}
    />
  );
}
`;

export default function CodeExample() {
  return (
    <section id="docs" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">Install in seconds.</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Your app. Your database. Your content.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              React Page Builder Free doesn’t force you into a specific CMS or database. Use onSave and onLoad to connect your own persistence layer.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-900 p-6 shadow-lg shadow-slate-900/10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Install</p>
            <pre className="mt-3 overflow-x-auto rounded-3xl bg-slate-950 px-4 py-4 text-sm text-slate-200 shadow-inner">
              <code>{installCommand}</code>
            </pre>
          </div>
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 shadow-xl shadow-slate-900/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">React example</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                Embed the editor in your React route and keep full control over how content is saved and displayed.
              </p>
            </div>
            <div className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200">
              React + Vite ready
            </div>
          </div>

          <pre className="mt-6 overflow-x-auto rounded-3xl bg-slate-900 px-5 py-5 text-sm leading-6 text-slate-200">
            <code>{exampleCode}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
