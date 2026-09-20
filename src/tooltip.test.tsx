import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./button";
import { Tooltip } from "./tooltip";

describe("Tooltip", () => {
  it("describes its trigger without replacing an existing description", () => {
    const markup = renderToStaticMarkup(
      <Tooltip content="Add an effect">
        <Button aria-describedby="shortcut-hint">Add</Button>
      </Tooltip>,
    );

    expect(markup).toContain('role="tooltip"');
    expect(markup).toContain("Add an effect");
    expect(markup).toMatch(/aria-describedby="shortcut-hint [^"]+"/);
  });
});
