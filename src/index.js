import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./assets/fonts/Neo Sans Arabic Regular.woff";
import "./assets/fonts/Neo_Sans_Medium.woff";
import "./assets/fonts/NeoSansArabic.woff";
import "./assets/fonts/NeoSansArabicBlack.woff";

// Bold
import "./assets/fonts/NeoSansArabicBold.woff";

import "./assets/fonts/NeoSansArabicLight.woff";
import "./assets/fonts/NeoSansArabicMedium.woff";
import "./assets/fonts/NeoSansArabicUltra.woff";

import "./index.css";

import { HelmetProvider } from "react-helmet-async";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
