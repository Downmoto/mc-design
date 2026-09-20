import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Divider } from "./divider";

describe("Divider", () => {
  it("renders horizontally by default", () => {
    const markup = renderToStaticMarkup(<Divider />);

    expect(markup).toContain('aria-orientation="horizontal"');
    expect(markup).toContain('class="mc-divider mc-divider--horizontal"');
  });

  it("renders vertically", () => {
    const markup = renderToStaticMarkup(<Divider orientation="vertical" />);

    expect(markup).toContain('aria-orientation="vertical"');
    expect(markup).toContain('class="mc-divider mc-divider--vertical"');
  });
});
