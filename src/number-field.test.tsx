import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { NumberField, clampNumber } from "./number-field";

describe("clampNumber", () => {
  it("constrains values to the supplied range", () => {
    expect(clampNumber(100, 1, 64)).toBe(64);
    expect(clampNumber(0, 1, 64)).toBe(1);
    expect(clampNumber(8)).toBe(8);
  });
});

describe("NumberField", () => {
  it("renders a labelled numeric input and step controls", () => {
    const markup = renderToStaticMarkup(
      <NumberField
        aria-label="Pixel size"
        decrementLabel="Decrease pixel size"
        incrementLabel="Increase pixel size"
        max={64}
        min={1}
        value={8}
      />,
    );

    expect(markup).toContain('type="number"');
    expect(markup).toContain('aria-label="Pixel size"');
    expect(markup).toContain('aria-label="Decrease pixel size"');
    expect(markup).toContain('aria-label="Increase pixel size"');
    expect(markup).toContain('value="8"');
  });

  it("disables the input and both controls", () => {
    const markup = renderToStaticMarkup(
      <NumberField aria-label="Pixel size" disabled />,
    );

    expect(markup.match(/disabled=""/g)).toHaveLength(3);
  });
});
