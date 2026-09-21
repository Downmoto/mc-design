import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ToggleButton } from "./toggle-button";

describe("ToggleButton", () => {
  it("renders an unchecked switch by default", () => {
    const markup = renderToStaticMarkup(<ToggleButton>Show grid</ToggleButton>);

    expect(markup).toContain('type="button"');
    expect(markup).toContain('role="switch"');
    expect(markup).toContain('aria-checked="false"');
    expect(markup).toContain("mc-toggle-button");
    expect(markup).toContain("mc-toggle-button__thumb");
  });

  it("supports default and controlled checked states", () => {
    expect(
      renderToStaticMarkup(<ToggleButton defaultChecked>Grid</ToggleButton>),
    ).toContain('aria-checked="true"');
    expect(
      renderToStaticMarkup(
        <ToggleButton defaultChecked checked={false} disabled>
          Grid
        </ToggleButton>,
      ),
    ).toContain('aria-checked="false"');
  });
});
