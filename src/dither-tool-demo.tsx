import { useState } from "react";

import { Button } from "./button";
import { Card } from "./card";
import { IconButton } from "./icon-button";
import { NumberField } from "./number-field";
import { Panel } from "./panel";
import { Select } from "./select";
import { Slider } from "./slider";
import { Tooltip } from "./tooltip";

export function DitherToolDemo() {
  const [pixelSize, setPixelSize] = useState<number | "">(8);
  const [strength, setStrength] = useState(72);
  const [view, setView] = useState<"before" | "after">("after");

  return (
    <div aria-label="Dither Tool interface prototype" className="dither-tool">
      <header className="dither-tool__toolbar">
        <div className="dither-tool__identity">
          <span className="dither-tool__mark" aria-hidden="true" />
          <div>
            <strong>Dither Tool</strong>
            <span>mountain-lake.png · 2400 × 1600</span>
          </div>
        </div>
        <div className="dither-tool__toolbar-actions">
          <Button>Open image</Button>
          <Button variant="primary">Export</Button>
        </div>
      </header>

      <div className="dither-tool__workspace">
        <Panel aria-label="Effect pipeline" className="dither-tool__pipeline">
          <div className="dither-tool__panel-heading">
            <div>
              <span>Pipeline</span>
              <strong>Effects</strong>
            </div>
            <Tooltip content="Add effect">
              <IconButton aria-label="Add effect" variant="ghost">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </IconButton>
            </Tooltip>
          </div>

          <div className="dither-tool__effect-list">
            <Card className="dither-tool__effect" aria-current="true">
              <Card.Eyebrow>Effect 01</Card.Eyebrow>
              <Card.Title>Bayer 8×8</Card.Title>
              <Card.Body>Ordered dithering</Card.Body>
            </Card>
            <Card className="dither-tool__effect">
              <Card.Eyebrow>Effect 02</Card.Eyebrow>
              <Card.Title>Palette</Card.Title>
              <Card.Body>Polar monochrome</Card.Body>
            </Card>
          </div>
        </Panel>

        <Panel aria-label="Image preview" className="dither-tool__preview">
          <div className="dither-tool__preview-toolbar">
            <div className="dither-tool__view-switcher">
              <Button
                aria-pressed={view === "before"}
                onClick={() => setView("before")}
                variant={view === "before" ? "primary" : "ghost"}
              >
                Before
              </Button>
              <Button
                aria-pressed={view === "after"}
                onClick={() => setView("after")}
                variant={view === "after" ? "primary" : "ghost"}
              >
                After
              </Button>
            </div>
            <span>100%</span>
          </div>
          <div
            aria-label={`${view} dithering preview`}
            className={`dither-tool__image dither-tool__image--${view}`}
            role="img"
          >
            <span>Preview · {view}</span>
          </div>
          <div className="dither-tool__preview-status">
            <span>sRGB</span>
            <span>1.8 MB</span>
          </div>
        </Panel>

        <Panel aria-label="Effect settings" className="dither-tool__settings">
          <div className="dither-tool__panel-heading">
            <div>
              <span>Selected effect</span>
              <strong>Bayer 8×8</strong>
            </div>
            <Button variant="ghost">Reset</Button>
          </div>

          <div className="dither-tool__fields">
            <div className="dither-tool__field">
              <span id="prototype-algorithm-label">Algorithm</span>
              <Select
                aria-labelledby="prototype-algorithm-label"
                defaultValue="bayer"
              >
                <Select.Option value="bayer">Bayer</Select.Option>
                <Select.Option value="floyd-steinberg">
                  Floyd-Steinberg
                </Select.Option>
                <Select.Option value="atkinson">Atkinson</Select.Option>
              </Select>
            </div>

            <div className="dither-tool__field">
              <span id="prototype-palette-label">Palette</span>
              <Select
                aria-labelledby="prototype-palette-label"
                defaultValue="polar"
              >
                <Select.Option value="polar">Polar monochrome</Select.Option>
                <Select.Option value="slate">Slate blue</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>
            </div>

            <div className="dither-tool__field">
              <span
                className="dither-tool__field-heading"
                id="prototype-strength-label"
              >
                Strength <output>{strength}%</output>
              </span>
              <Slider
                aria-labelledby="prototype-strength-label"
                onValueChange={setStrength}
                value={strength}
              />
            </div>

            <div className="dither-tool__field">
              <span
                className="dither-tool__field-heading"
                id="prototype-pixel-size-label"
              >
                Pixel size <output>{pixelSize || "—"} px</output>
              </span>
              <NumberField
                aria-labelledby="prototype-pixel-size-label"
                decrementLabel="Decrease pixel size"
                incrementLabel="Increase pixel size"
                max={64}
                min={1}
                onValueChange={(value) => setPixelSize(value ?? "")}
                value={pixelSize}
              />
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
