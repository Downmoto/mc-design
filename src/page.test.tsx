import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Page } from "./page";

describe("Page", () => {
  it("composes a floating page body over its root background", () => {
    const markup = renderToStaticMarkup(
      <Page.Root className="custom-root">
        <Page.Body aria-label="Workbench" className="custom-body">
          Content
        </Page.Body>
      </Page.Root>,
    );

    expect(markup).toContain('class="mc-page custom-root"');
    expect(markup).toContain('class="mc-page__body custom-body"');
    expect(markup).toContain('aria-label="Workbench"');
    expect(markup).toContain("Content");
  });
});
