import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { clampModalPosition, Modal } from "./modal";

describe("Modal", () => {
  it("renders the target and labelled dialog", () => {
    const markup = renderToStaticMarkup(
      <Modal.Root dimBg={false} variant="movable">
        <Modal.Target>Open</Modal.Target>
        <Modal.Content aria-label="Settings">
          Settings <Modal.Close>Close</Modal.Close>
        </Modal.Content>
      </Modal.Root>,
    );

    expect(markup).toContain("mc-modal--movable");
    expect(markup).not.toContain("mc-modal--dimmed");
    expect(markup).toContain('aria-label="Settings"');
    expect(markup).toContain('<button type="button">Open</button>');
  });

  it("keeps a dragged dialog within the viewport", () => {
    expect(clampModalPosition(-20, 900, 300, 200, 800, 600)).toEqual({
      x: 0,
      y: 400,
    });
    expect(clampModalPosition(700, -10, 300, 200, 800, 600)).toEqual({
      x: 500,
      y: 0,
    });
    expect(clampModalPosition(100, 100, 900, 700, 800, 600)).toEqual({
      x: 0,
      y: 0,
    });
  });
});
