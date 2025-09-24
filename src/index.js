import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { DataProvider } from "./context/DataContext"; // ✅ lo importas

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* ✅ aquí lo usas envolviendo <App /> */}
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
