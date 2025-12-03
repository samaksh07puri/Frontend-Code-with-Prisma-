import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white dark:bg-white dark:text-gray-900">
      <App />
    </div>
  </React.StrictMode>
);
