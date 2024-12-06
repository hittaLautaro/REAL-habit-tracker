import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HabitProvider } from "./components/contexts/HabitContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <HabitProvider>
        <App />
      </HabitProvider>
    </StrictMode>
  </BrowserRouter>
);
