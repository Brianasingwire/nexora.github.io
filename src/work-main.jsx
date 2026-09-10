import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Page.jsx';
import Work from './components/Work.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page>
      <Work />
    </Page>
  </React.StrictMode>
);
