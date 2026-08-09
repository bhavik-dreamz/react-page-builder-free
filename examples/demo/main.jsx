/**
 * Demo app — not published with the package.
 * Renders the marketing homepage and the live page builder demo.
 */
import 'react-page-builder-free/styles';
import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { initBlocks } from 'react-page-builder-free/editor';
import App from './App.jsx';

initBlocks();

function renderApp() {
  const rootEl = document.getElementById('root');
  if (!rootEl) return;
  ReactDOM.createRoot(rootEl).render(<App />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
