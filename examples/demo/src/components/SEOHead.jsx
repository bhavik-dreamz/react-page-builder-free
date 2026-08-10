import { useEffect } from 'react';
import { siteName, siteDescription, siteUrl, themeColor } from '../site-config.js';

export default function SEOHead({ title, description, pathname, image, type = 'website' }) {
  useEffect(() => {
    const head = document.head;
    document.title = title ? `${title} | ${siteName}` : siteName;

    const setMeta = (name, value, attr = 'name') => {
      if (!value) return;
      const selector = `[${attr}="${name}"]`;
      let element = head.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    setMeta('description', description || siteDescription);
    setMeta('og:title', title || siteName, 'property');
    setMeta('og:description', description || siteDescription, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', `${siteUrl.replace(/\/$/, '')}${pathname}`, 'property');
    if (image) setMeta('og:image', image, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title || siteName);
    setMeta('twitter:description', description || siteDescription);
    if (image) setMeta('twitter:image', image);

    const themeMeta = head.querySelector('meta[name="theme-color"]') || (() => {
      const tag = document.createElement('meta');
      tag.setAttribute('name', 'theme-color');
      head.appendChild(tag);
      return tag;
    })();
    themeMeta.setAttribute('content', themeColor);
  }, [title, description, pathname, image]);

  return null;
}
