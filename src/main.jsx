import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="chaitanya231971.jp.auth0.com"
    clientId="F0FiBaJJrvFYewRS8DDCoXGXSPMYXYi1"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://chaitanya231971.jp.auth0.com/api/v2/", // Add this if you're using API
      scope: "openid profile email"
    }}
    onRedirectCallback={appState => {
      window.history.replaceState(
        {},
        document.title,
        appState && appState.returnTo
          ? appState.returnTo
          : window.location.pathname
      );
    }}
  >
    <App />
  </Auth0Provider>,
);
