import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { IconButton } from "./icon-button";

describe("IconButton", () => {
  it("renders an accessible icon-only button", () => {
    const markup = renderToStaticMarkup(
      <IconButton aria-label="Add effect">
        <svg aria-hidden="true" />
      </IconButton>,
    );

    expect(markup).toContain('aria-label="Add effect"');
    expect(markup).toContain("mc-icon-button");
    expect(markup).toContain('type="button"');
  });

  it("supports Button variants and native props", () => {
    const markup = renderToStaticMarkup(
      <IconButton aria-label="Delete effect" disabled variant="danger">
        ×
      </IconButton>,
    );

    expect(markup).toContain("mc-button--danger");
    expect(markup).toContain('disabled=""');
  });
});
