import React from 'react';

function escapeJsonLd(value) {
  return JSON.stringify(value);
}

export default function JsonLd({ data }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: escapeJsonLd(data) }} />
  );
}
