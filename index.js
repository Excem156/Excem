import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// This is the entry point of your web app.
// It renders your main App component (where all pages connect).

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
