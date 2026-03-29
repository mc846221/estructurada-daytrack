// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./styles.css";
import Modal from "react-modal"; // 👈 importa react-modal

// Configura el root para los modales (se hace global una sola vez)
Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
