import HomePage from './src/pages/HomePage.jsx';
import DemoPage from './src/pages/DemoPage.jsx';
import FeaturesPage from './src/pages/FeaturesPage.jsx';
import FAQPage from './src/pages/FAQPage.jsx';
import AboutPage from './src/pages/AboutPage.jsx';
import Layout from './src/components/Layout.jsx';

export default function App({ page }) {
  let pageContent = <HomePage />;

  if (page === 'demo') {
    pageContent = <DemoPage />;
  } else if (page === 'features') {
    pageContent = <FeaturesPage />;
  } else if (page === 'faq') {
    pageContent = <FAQPage />;
  } else if (page === 'about') {
    pageContent = <AboutPage />;
  }

  return <Layout>{pageContent}</Layout>;
}
