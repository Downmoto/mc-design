import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getSliderPercentage, Slider } from "./slider";

describe("Slider", () => {
  it("renders a labelled native range with its fill value", () => {
    const markup = renderToStaticMarkup(
      <Slider aria-label="Strength" max={200} min={0} value={50} />,
    );

    expect(markup).toContain('type="range"');
    expect(markup).toContain('aria-label="Strength"');
    expect(markup).toContain("--mc-slider-value:25%");
  });

  it("clamps fill percentages", () => {
    expect(getSliderPercentage(-10, 0, 100)).toBe(0);
    expect(getSliderPercentage(50, 0, 100)).toBe(50);
    expect(getSliderPercentage(110, 0, 100)).toBe(100);
    expect(getSliderPercentage(1, 1, 1)).toBe(0);
  });
});
