import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Page.jsx';
import Services from './components/Services.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page>
      <Services />
    </Page>
  </React.StrictMode>
);
