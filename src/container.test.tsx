import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Container } from "./container";

describe("Container", () => {
  it("renders a centred content boundary", () => {
    const markup = renderToStaticMarkup(
      <Container aria-label="Workspace" className="custom-container">
        Content
      </Container>,
    );

    expect(markup).toContain('class="mc-container custom-container"');
    expect(markup).toContain('aria-label="Workspace"');
    expect(markup).toContain("Content");
  });
});
