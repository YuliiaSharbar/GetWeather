import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import './App.css';
import App from "./App.jsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("❌ Помилка: елемент #root не знайдено!");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
