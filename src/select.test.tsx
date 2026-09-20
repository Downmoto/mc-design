import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getNextEnabledIndex, Select } from "./select";

describe("Select", () => {
  it("renders a labelled custom trigger and form value", () => {
    const markup = renderToStaticMarkup(
      <Select aria-label="Algorithm" defaultValue="bayer" name="algorithm">
        <Select.Option value="bayer">Bayer</Select.Option>
        <Select.Option value="floyd-steinberg">Floyd-Steinberg</Select.Option>
      </Select>,
    );

    expect(markup).toContain('aria-haspopup="listbox"');
    expect(markup).not.toContain("<select");
    expect(markup).toContain('aria-label="Algorithm"');
    expect(markup).toContain(">Bayer</span>");
    expect(markup).toContain('name="algorithm"');
    expect(markup).toContain('value="bayer"');
  });

  it("renders disabled and placeholder states", () => {
    const markup = renderToStaticMarkup(
      <Select className="algorithm-select" disabled placeholder="Choose one">
        <Select.Option value="bayer">Bayer</Select.Option>
      </Select>,
    );

    expect(markup).toContain("algorithm-select");
    expect(markup).toContain('disabled=""');
    expect(markup).toContain("Choose one");
  });

  it("moves past disabled options and wraps", () => {
    const options = [{}, { disabled: true }, {}];

    expect(getNextEnabledIndex(options, 0, 1)).toBe(2);
    expect(getNextEnabledIndex(options, 2, 1)).toBe(0);
    expect(getNextEnabledIndex(options, 0, -1)).toBe(2);
  });
});
