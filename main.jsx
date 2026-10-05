import React from 'react';
import ReactDOM from 'react-dom/client';
import LuxuryWatchStore, { AppErrorBoundary } from './LuxuryWatchStore.jsx';

const rootEl = document.getElementById('root');
if (rootEl) {
  try {
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <AppErrorBoundary>
          <LuxuryWatchStore />
        </AppErrorBoundary>
      </React.StrictMode>
    );
  } catch (err) {
    console.error("GBG Cabs Mount Error:", err);
    rootEl.innerHTML = `<div style="padding:2rem;font-family:sans-serif;color:#dc2626;background:#fff;border-radius:12px;margin:2rem auto;max-width:600px;border:1px solid #fecaca;box-shadow:0 4px 12px rgba(0,0,0,0.05)"><h2>GBG Cabs Display Notice</h2><p>An initialization error occurred. Please refresh the page.</p><pre style="background:#fee2e2;padding:1rem;border-radius:8px;font-size:12px;overflow:auto">${err?.message || err}</pre></div>`;
  }
}
