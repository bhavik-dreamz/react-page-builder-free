export default function BuilderPreview() {
  return (
    <section id="demo" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">Live design preview</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                A developer-friendly visual editor preview.
              </h2>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              Desktop • Tablet • Mobile • Preview • Save
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-inner shadow-slate-200/80">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-3.5 w-3.5 rounded-full bg-rose-500" />
                <span className="inline-flex h-3.5 w-3.5 rounded-full bg-amber-400" />
                <span className="inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span>React Page Builder</span>
                <span className="hidden sm:inline">•</span>
                <span>Draft 1.0</span>
              </div>
            </div>

            <div className="grid min-h-[560px] gap-4 px-5 py-6 lg:grid-cols-[260px_minmax(0,1fr)_300px]">
              <aside className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Blocks</p>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="rounded-2xl bg-slate-100 px-4 py-3">Heading</div>
                  <div className="rounded-2xl px-4 py-3 transition hover:bg-slate-100">Paragraph</div>
                  <div className="rounded-2xl px-4 py-3 transition hover:bg-slate-100">Image</div>
                  <div className="rounded-2xl px-4 py-3 transition hover:bg-slate-100">Button</div>
                  <div className="rounded-2xl px-4 py-3 transition hover:bg-slate-100">Columns</div>
                  <div className="rounded-2xl px-4 py-3 transition hover:bg-slate-100">Gallery</div>
                  <div className="rounded-2xl px-4 py-3 transition hover:bg-slate-100">Hero</div>
                  <div className="rounded-2xl px-4 py-3 transition hover:bg-slate-100">CTA</div>
                </div>
              </aside>

              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-sm text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1">Desktop</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Tablet</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Mobile</span>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-600">Preview</span>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-600">Save</span>
                </div>
                <div className="space-y-6">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-100 p-6">
                    <p className="text-sm font-semibold text-slate-900">Landing page preview</p>
                    <h3 className="mt-4 text-2xl font-semibold text-slate-950">React Page Builder Free</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Create a home page, product page, or demo page with custom block content and SEO-friendly structure.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">Hero</span>
                      <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">Features</span>
                      <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">CTA</span>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Section</p>
                      <h4 className="mt-3 text-lg font-semibold text-slate-950">Product details</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">Clean marketing sections that render beautifully across devices.</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Section</p>
                      <h4 className="mt-3 text-lg font-semibold text-slate-950">Editor settings</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">Inline text editing, block controls, and layout customization in one place.</p>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Block settings</p>
                <div className="space-y-4 text-sm text-slate-700">
                  <div className="rounded-2xl bg-slate-100 p-4">
                    <p className="font-semibold text-slate-900">Heading</p>
                    <p className="mt-2 text-slate-600">Font size, alignment, and color options.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 p-4">
                    <p className="font-semibold text-slate-900">Button</p>
                    <p className="mt-2 text-slate-600">Target, label, and style controls.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 p-4">
                    <p className="font-semibold text-slate-900">Spacing</p>
                    <p className="mt-2 text-slate-600">Padding, margin, and layout settings.</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
