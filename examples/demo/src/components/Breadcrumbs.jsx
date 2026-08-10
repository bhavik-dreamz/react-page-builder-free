import React from 'react';
import JsonLd from './JsonLd.jsx';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">→</span>}
            <a href={item.url} className="text-slate-600 transition hover:text-slate-900">
              {item.name}
            </a>
          </li>
        ))}
      </ol>
      <JsonLd data={jsonLd} />
    </nav>
  );
}
