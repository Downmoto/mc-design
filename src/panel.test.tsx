import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Panel } from "./panel";

describe("Panel", () => {
  it("renders a composable surface", () => {
    const markup = renderToStaticMarkup(
      <Panel aria-label="Effect settings" className="custom-panel">
        Settings
      </Panel>,
    );

    expect(markup).toContain('class="mc-panel custom-panel"');
    expect(markup).toContain('aria-label="Effect settings"');
    expect(markup).toContain("Settings");
  });
});
