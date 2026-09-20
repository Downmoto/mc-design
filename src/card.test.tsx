import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Card } from "./card";

describe("Card", () => {
  it("renders a self-contained content surface", () => {
    const markup = renderToStaticMarkup(
      <Card aria-label="Bayer preset" className="custom-card">
        <Card.Eyebrow>Preset</Card.Eyebrow>
        <Card.Title>Bayer 8×8</Card.Title>
        <Card.Body>Ordered dithering</Card.Body>
        <Card.Footer>Actions</Card.Footer>
      </Card>,
    );

    expect(markup).toContain('class="mc-card custom-card"');
    expect(markup).toContain('aria-label="Bayer preset"');
    expect(markup).toContain('class="mc-card__eyebrow"');
    expect(markup).toContain('<h3 class="mc-card__title">Bayer 8×8</h3>');
    expect(markup).toContain('class="mc-card__body"');
    expect(markup).toContain(
      '<footer class="mc-card__footer">Actions</footer>',
    );
  });
});
