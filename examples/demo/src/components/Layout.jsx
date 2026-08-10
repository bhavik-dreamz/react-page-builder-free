import Footer from './Footer.jsx';
import Header from './Header.jsx';
import JsonLd from './JsonLd.jsx';
import { siteName, siteUrl } from '../site-config.js';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
};

export default function Layout({ children }) {
  return (
    <div className="bg-slate-50 text-slate-950 min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
      <JsonLd data={websiteJsonLd} />
    </div>
  );
}
