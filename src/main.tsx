import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Demo from "./demo";
import "./styles.css";
import "./demo.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing #root element");
}

createRoot(root).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
);
