import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./demo.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing #root element");
}

createRoot(root).render(
  <StrictMode>
    <main className="demo">
      <p className="demo__eyebrow">Memory Core</p>
      <h1 className="demo__title">MC Design</h1>
      <p className="demo__description">
        The shared visual foundation for Memory Core applications.
      </p>
      <div className="demo__actions">
        <button className="mc-focus-ring demo__button" type="button">
          Focus convention
        </button>
        <button className="mc-focus-ring demo__button" type="button" disabled>
          Disabled convention
        </button>
      </div>
    </main>
  </StrictMode>,
);
