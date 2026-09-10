import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Page.jsx';
import About from './components/About.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page>
      <About />
    </Page>
  </React.StrictMode>
);
