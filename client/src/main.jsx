import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-qxegfammz372ryl7.us.auth0.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-qxegfammz372ryl7.us.auth0.com"
        clientId="Lo6wDm6jDrYxBwxviYJYZ6436QWtoMeN"
        authorizationParams={{
          redirect_uri: "http://localhost:5173/",
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user update:current_user_metadata",
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
