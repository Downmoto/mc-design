import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Demo from "./demo";
import { Page } from "./page";
import "./styles.css";
import "./demo.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing #root element");
}

createRoot(root).render(
  <StrictMode>
    <Page.Root>
      <Demo />
    </Page.Root>
  </StrictMode>,
);
