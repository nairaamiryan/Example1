import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

ReactDOM.render(
    <Auth0Provider
        domain="dev-euxwfhw80ges67ji.au.auth0.com"
        clientId="GU55pj3yUwAZ5GIpcb5I3IAEBloSspV0"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);
