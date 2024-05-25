import './App.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-c4kefl5b4yqln0kd.us.auth0.com"
    clientId="ASyy91F5UbqmVymYAXtjsxezRhjbBzV1"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);

reportWebVitals();