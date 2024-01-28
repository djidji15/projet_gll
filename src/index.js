import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import EspaceAvocatPage from './Pages/espaceavocatpage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='placeholder-client-id'>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
