import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import {Auth0Provider} from '@auth0/auth0-react';
import {BrowserRouter} from "react-router-dom";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

if (!domain || !clientId) {
  throw new Error("Missing Auth0 environment variables");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience
      }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
    
  </StrictMode>,
);
