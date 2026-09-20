import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("uses safe defaults", () => {
    const markup = renderToStaticMarkup(<Button>Export</Button>);

    expect(markup).toContain('type="button"');
    expect(markup).toContain("mc-button--secondary");
  });

  it("forwards native button props and custom classes", () => {
    const markup = renderToStaticMarkup(
      <Button
        className="export-button"
        disabled
        type="submit"
        variant="primary"
      >
        Export
      </Button>,
    );

    expect(markup).toContain('type="submit"');
    expect(markup).toContain("mc-button--primary");
    expect(markup).toContain("export-button");
    expect(markup).toContain('disabled=""');
  });
});
