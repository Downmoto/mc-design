import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Select } from "./select";

describe("Select", () => {
  it("renders a labelled native select", () => {
    const markup = renderToStaticMarkup(
      <Select aria-label="Algorithm" defaultValue="bayer" name="algorithm">
        <option value="bayer">Bayer</option>
        <option value="floyd-steinberg">Floyd-Steinberg</option>
      </Select>,
    );

    expect(markup).toContain("<select");
    expect(markup).toContain('aria-label="Algorithm"');
    expect(markup).toContain('name="algorithm"');
    expect(markup).toContain("mc-select");
  });

  it("forwards native state and custom classes", () => {
    const markup = renderToStaticMarkup(
      <Select className="algorithm-select" disabled>
        <option>Unavailable</option>
      </Select>,
    );

    expect(markup).toContain("algorithm-select");
    expect(markup).toContain('disabled=""');
  });
});
