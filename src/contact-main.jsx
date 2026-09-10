import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Page.jsx';
import Contact from './components/Contact.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page>
      <Contact />
    </Page>
  </React.StrictMode>
);
