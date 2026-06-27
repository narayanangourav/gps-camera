import React from "react";
import { createRoot } from "react-dom/client";

import App from "./web/App";
import "./web/styles/global.css";

window.__gpsCameraEnv = {
  tileUrlTemplate: import.meta.env.VITE_TILE_URL_TEMPLATE,
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container was not found.");
}

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
