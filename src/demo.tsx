import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing #root element");
}

createRoot(root).render(
  <StrictMode>
    <main>
      <h1>MC Design</h1>
      <p>The component workbench will be built here.</p>
    </main>
  </StrictMode>,
);
