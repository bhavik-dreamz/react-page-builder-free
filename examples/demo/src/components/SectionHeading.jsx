export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <header className="mb-8 max-w-3xl">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>}
    </header>
  );
}
