import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import { Button } from "./button";
import { Card } from "./card";
import { Container } from "./container";
import { Divider } from "./divider";
import { IconButton } from "./icon-button";
import { NumberField } from "./number-field";
import { Panel } from "./panel";
import { Select } from "./select";
import { Slider } from "./slider";
import { Tooltip } from "./tooltip";

type Token = {
  label: string;
  variable: `--mc-${string}`;
};

const colours: Token[] = [
  { label: "Background", variable: "--mc-colour-background" },
  { label: "Canvas", variable: "--mc-colour-canvas" },
  { label: "Surface", variable: "--mc-colour-surface" },
  { label: "Surface raised", variable: "--mc-colour-surface-raised" },
  { label: "Surface hover", variable: "--mc-colour-surface-hover" },
  { label: "Surface active", variable: "--mc-colour-surface-active" },
  { label: "Border", variable: "--mc-colour-border" },
  { label: "Border strong", variable: "--mc-colour-border-strong" },
  { label: "Text", variable: "--mc-colour-text" },
  { label: "Text muted", variable: "--mc-colour-text-muted" },
  { label: "Text disabled", variable: "--mc-colour-text-disabled" },
  { label: "Accent", variable: "--mc-colour-accent" },
  { label: "Accent hover", variable: "--mc-colour-accent-hover" },
  { label: "Accent active", variable: "--mc-colour-accent-active" },
  { label: "On accent", variable: "--mc-colour-on-accent" },
  { label: "Danger", variable: "--mc-colour-danger" },
  { label: "Warning", variable: "--mc-colour-warning" },
  { label: "Success", variable: "--mc-colour-success" },
  { label: "Overlay", variable: "--mc-colour-overlay" },
  { label: "Focus", variable: "--mc-colour-focus" },
];

const fontFamilies: (Token & { sample: string })[] = [
  {
    label: "Interface",
    variable: "--mc-font-family",
    sample: "Open Sans keeps controls calm and readable.",
  },
  {
    label: "Monospace",
    variable: "--mc-font-family-mono",
    sample: "Geist Mono 0123456789 / pipeline-01",
  },
  {
    label: "Display",
    variable: "--mc-font-family-display",
    sample: "Manufacturing Consent",
  },
];

const fontSizes: Token[] = [
  { label: "Extra small", variable: "--mc-font-size-xs" },
  { label: "Small", variable: "--mc-font-size-sm" },
  { label: "Medium", variable: "--mc-font-size-md" },
  { label: "Large", variable: "--mc-font-size-lg" },
  { label: "Extra large", variable: "--mc-font-size-xl" },
  { label: "2× extra large", variable: "--mc-font-size-2xl" },
];

const fontWeights: Token[] = [
  { label: "Regular", variable: "--mc-font-weight-regular" },
  { label: "Medium", variable: "--mc-font-weight-medium" },
  { label: "Semibold", variable: "--mc-font-weight-semibold" },
];

const lineHeights: Token[] = [
  { label: "Tight", variable: "--mc-line-height-tight" },
  { label: "Normal", variable: "--mc-line-height-normal" },
];

const spacing: Token[] = [
  { label: "Space 0", variable: "--mc-space-0" },
  { label: "Space 1", variable: "--mc-space-1" },
  { label: "Space 2", variable: "--mc-space-2" },
  { label: "Space 3", variable: "--mc-space-3" },
  { label: "Space 4", variable: "--mc-space-4" },
  { label: "Space 5", variable: "--mc-space-5" },
  { label: "Space 6", variable: "--mc-space-6" },
  { label: "Space 7", variable: "--mc-space-7" },
  { label: "Space 8", variable: "--mc-space-8" },
];

const radii: Token[] = [
  { label: "Small", variable: "--mc-radius-sm" },
  { label: "Medium", variable: "--mc-radius-md" },
  { label: "Large", variable: "--mc-radius-lg" },
  { label: "Full", variable: "--mc-radius-full" },
];

const shadows: Token[] = [
  { label: "Small", variable: "--mc-shadow-sm" },
  { label: "Medium", variable: "--mc-shadow-md" },
  { label: "Large", variable: "--mc-shadow-lg" },
];

const durations: Token[] = [
  { label: "Fast", variable: "--mc-duration-fast" },
  { label: "Normal", variable: "--mc-duration-normal" },
  { label: "Slow", variable: "--mc-duration-slow" },
];

const value = (variable: Token["variable"]) => `var(${variable})`;

function TokenName({ token }: { token: Token }) {
  return (
    <div className="token-name">
      <span>{token.label}</span>
      <code>{token.variable}</code>
    </div>
  );
}

function Group({
  children,
  description,
  id,
  title,
}: {
  children: ReactNode;
  description: string;
  id: string;
  title: string;
}) {
  return (
    <section className="token-group" id={id}>
      <header className="token-group__header">
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      {children}
    </section>
  );
}

function ColourTheme({ theme }: { theme: "dark" | "light" }) {
  return (
    <section className="theme-sample">
      <h3>{theme} theme</h3>
      <div className="swatch-grid" data-mc-theme={theme}>
        {colours.map((token) => (
          <article className="swatch" key={token.variable}>
            <div
              className="swatch__colour"
              style={{ background: value(token.variable) }}
            />
            <TokenName token={token} />
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Demo() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [pixelSize, setPixelSize] = useState<number | "">(8);
  const [strength, setStrength] = useState(60);

  useEffect(() => {
    document.documentElement.dataset.mcTheme = theme;

    return () => {
      delete document.documentElement.dataset.mcTheme;
    };
  }, [theme]);

  return (
    <main className="demo">
      <header className="demo__hero">
        <div className="demo__topbar">
          <p className="demo__eyebrow">Memory Core</p>
          <button
            aria-checked={theme === "light"}
            className="mc-focus-ring theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            role="switch"
            type="button"
          >
            <span aria-hidden="true" className="theme-toggle__track">
              <span />
            </span>
            Light mode
          </button>
        </div>
        <h1 className="demo__title">MC Design</h1>
        <p className="demo__description">
          Every foundational token, rendered in one place.
        </p>
        <nav aria-label="Token groups" className="demo__nav">
          {[
            ["Button", "button"],
            ["IconButton", "icon-button"],
            ["Slider", "slider"],
            ["NumberField", "number-field"],
            ["Panel", "panel"],
            ["Divider", "divider"],
            ["Tooltip", "tooltip"],
            ["Container", "container"],
            ["Card", "card"],
            ["Select", "select"],
            ["Typography", "typography"],
            ["Colour", "colour"],
            ["Spacing", "spacing"],
            ["Shape", "shape"],
            ["Elevation", "elevation"],
            ["Motion", "motion"],
            ["Interaction", "interaction"],
          ].map(([label, anchor]) => (
            <a className="mc-focus-ring" href={`#${anchor}`} key={anchor}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <Group
        description="The standard action control in its supported variants and disabled state."
        id="button"
        title="Button"
      >
        <div className="sample-card button-showcase">
          <section>
            <h3>Variants</h3>
            <div className="button-row">
              <Button variant="primary">Primary</Button>
              <Button>Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </section>
          <section>
            <h3>Disabled</h3>
            <div className="button-row">
              <Button disabled variant="primary">
                Primary
              </Button>
              <Button disabled>Secondary</Button>
              <Button disabled variant="ghost">
                Ghost
              </Button>
              <Button disabled variant="danger">
                Danger
              </Button>
            </div>
          </section>
        </div>
      </Group>

      <Group
        description="A neutral surface for grouping related application content and controls."
        id="panel"
        title="Panel"
      >
        <Panel className="panel-sample">
          <div>
            <h3>Effect settings</h3>
            <p>Controls for the selected dithering effect.</p>
          </div>
          <Button variant="ghost">Reset</Button>
        </Panel>
      </Group>

      <Group
        description="A semantic separator for stacked or side-by-side content."
        id="divider"
        title="Divider"
      >
        <div className="divider-showcase">
          <Panel className="divider-sample divider-sample--horizontal">
            <span>Input</span>
            <Divider />
            <span>Output</span>
          </Panel>
          <Panel className="divider-sample divider-sample--vertical">
            <span>Before</span>
            <Divider orientation="vertical" />
            <span>After</span>
          </Panel>
        </div>
      </Group>

      <Group
        description="Short supporting text revealed by pointer hover or keyboard focus."
        id="tooltip"
        title="Tooltip"
      >
        <Panel className="tooltip-showcase">
          <Tooltip content="Add an effect">
            <IconButton aria-label="Add effect">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </IconButton>
          </Tooltip>
          <Tooltip content="Restore the default settings">
            <Button>Reset</Button>
          </Tooltip>
        </Panel>
      </Group>

      <Group
        description="A centred content boundary with responsive horizontal gutters."
        id="container"
        title="Container"
      >
        <div className="container-showcase">
          <Container>
            <Panel className="container-sample">
              <span>Contained content</span>
              <code>responsive gutters</code>
            </Panel>
          </Container>
        </div>
      </Group>

      <Group
        description="A raised surface for self-contained content."
        id="card"
        title="Card"
      >
        <div className="card-showcase">
          <Card>
            <Card.Eyebrow>Preset</Card.Eyebrow>
            <Card.Title>Bayer 8×8</Card.Title>
            <Card.Body>
              Ordered dithering with a crisp, repeating texture.
            </Card.Body>
            <Card.Footer>
              <Button variant="primary">Select</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Eyebrow>Preset</Card.Eyebrow>
            <Card.Title>Atkinson</Card.Title>
            <Card.Body>
              High-contrast diffusion with preserved highlights.
            </Card.Body>
          </Card>
        </div>
      </Group>

      <Group
        description="Precise numeric entry with keyboard input and step controls."
        id="number-field"
        title="NumberField"
      >
        <div className="sample-card field-showcase">
          <div className="field-sample">
            <div className="field-sample__label">
              <span id="pixel-size-label">Pixel size</span>
              <output>{pixelSize || "—"} px</output>
            </div>
            <NumberField
              aria-labelledby="pixel-size-label"
              decrementLabel="Decrease pixel size"
              incrementLabel="Increase pixel size"
              max={64}
              min={1}
              onValueChange={(nextValue) => setPixelSize(nextValue ?? "")}
              value={pixelSize}
            />
          </div>
          <div className="field-sample">
            <span id="disabled-pixel-size-label">Unavailable</span>
            <NumberField
              aria-labelledby="disabled-pixel-size-label"
              defaultValue={4}
              disabled
            />
          </div>
          <div className="field-sample">
            <span id="invalid-pixel-size-label">Invalid</span>
            <NumberField
              aria-invalid="true"
              aria-labelledby="invalid-pixel-size-label"
              defaultValue={0}
              min={1}
            />
          </div>
        </div>
      </Group>

      <Group
        description="Compact actions that remain understandable to assistive technology."
        id="icon-button"
        title="IconButton"
      >
        <div className="sample-card button-showcase">
          <section>
            <h3>Variants</h3>
            <div className="button-row">
              <IconButton aria-label="Add effect" variant="primary">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </IconButton>
              <IconButton aria-label="Settings">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
                </svg>
              </IconButton>
              <IconButton aria-label="More options" variant="ghost">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="5" cy="12" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                </svg>
              </IconButton>
              <IconButton aria-label="Delete effect" variant="danger">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" />
                </svg>
              </IconButton>
            </div>
          </section>
          <section>
            <h3>Disabled</h3>
            <IconButton aria-label="Add effect unavailable" disabled>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </IconButton>
          </section>
        </div>
      </Group>

      <Group
        description="A continuous value control with native keyboard behaviour."
        id="slider"
        title="Slider"
      >
        <div className="sample-card field-showcase">
          <div className="field-sample slider-sample">
            <div className="field-sample__label">
              <span id="strength-label">Strength</span>
              <output>{strength}%</output>
            </div>
            <Slider
              aria-labelledby="strength-label"
              onValueChange={setStrength}
              value={strength}
            />
          </div>
          <div className="field-sample slider-sample">
            <div className="field-sample__label">
              <span id="disabled-strength-label">Unavailable</span>
              <output>40%</output>
            </div>
            <Slider
              aria-labelledby="disabled-strength-label"
              defaultValue={40}
              disabled
            />
          </div>
        </div>
      </Group>

      <Group
        description="A custom option list with complete keyboard and focus behaviour."
        id="select"
        title="Select"
      >
        <div className="sample-card field-showcase">
          <div className="field-sample">
            <span id="algorithm-label">Algorithm</span>
            <Select aria-labelledby="algorithm-label" defaultValue="bayer">
              <Select.Option value="bayer">Bayer</Select.Option>
              <Select.Option value="floyd-steinberg">
                Floyd-Steinberg
              </Select.Option>
              <Select.Option value="atkinson">Atkinson</Select.Option>
            </Select>
          </div>
          <div className="field-sample">
            <span id="unavailable-algorithm-label">Unavailable</span>
            <Select
              aria-labelledby="unavailable-algorithm-label"
              defaultValue="locked"
              disabled
            >
              <Select.Option value="locked">Requires an image</Select.Option>
            </Select>
          </div>
          <div className="field-sample">
            <span id="invalid-algorithm-label">Invalid</span>
            <Select
              aria-invalid="true"
              aria-labelledby="invalid-algorithm-label"
              defaultValue=""
            >
              <Select.Option disabled value="">
                Choose an algorithm
              </Select.Option>
              <Select.Option value="bayer">Bayer</Select.Option>
            </Select>
          </div>
        </div>
      </Group>

      <Group
        description="Font families, sizes, weights, and line heights."
        id="typography"
        title="Typography"
      >
        <div className="sample-grid sample-grid--families">
          {fontFamilies.map((token) => (
            <article className="sample-card" key={token.variable}>
              <TokenName token={token} />
              <p
                className="family-sample"
                style={{ fontFamily: value(token.variable) }}
              >
                {token.sample}
              </p>
            </article>
          ))}
        </div>

        <div className="type-details">
          <section className="sample-card">
            <h3>Size</h3>
            <div className="type-list">
              {fontSizes.map((token) => (
                <div className="type-row" key={token.variable}>
                  <TokenName token={token} />
                  <span style={{ fontSize: value(token.variable) }}>Ag</span>
                </div>
              ))}
            </div>
          </section>

          <section className="sample-card">
            <h3>Weight</h3>
            <div className="type-list">
              {fontWeights.map((token) => (
                <div className="type-row" key={token.variable}>
                  <TokenName token={token} />
                  <span style={{ fontWeight: value(token.variable) }}>
                    Dithertool
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="sample-card">
            <h3>Line height</h3>
            <div className="line-height-grid">
              {lineHeights.map((token) => (
                <article key={token.variable}>
                  <TokenName token={token} />
                  <p style={{ lineHeight: value(token.variable) }}>
                    Ordered pixels create texture while preserving the image’s
                    structure and rhythm.
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </Group>

      <Group
        description="Semantic colours shown in both supported themes."
        id="colour"
        title="Colour"
      >
        <div className="theme-grid">
          <ColourTheme theme="dark" />
          <ColourTheme theme="light" />
        </div>
      </Group>

      <Group
        description="A compact scale for controls and desktop layouts."
        id="spacing"
        title="Spacing"
      >
        <div className="sample-card spacing-list">
          {spacing.map((token) => (
            <div className="spacing-row" key={token.variable}>
              <TokenName token={token} />
              <div className="spacing-row__track">
                <span style={{ width: value(token.variable) }} />
              </div>
            </div>
          ))}
        </div>
      </Group>

      <Group
        description="Borders and radii for controls, panels, and pills."
        id="shape"
        title="Shape"
      >
        <div className="sample-grid sample-grid--shape">
          {radii.map((token) => (
            <article className="sample-card shape-sample" key={token.variable}>
              <div style={{ borderRadius: value(token.variable) }} />
              <TokenName token={token} />
            </article>
          ))}
          <article className="sample-card border-sample">
            <div />
            <TokenName
              token={{ label: "Border width", variable: "--mc-border-width" }}
            />
          </article>
        </div>
      </Group>

      <Group
        description="Elevation is reserved for elements that genuinely float."
        id="elevation"
        title="Elevation"
      >
        <div className="sample-grid sample-grid--elevation">
          {shadows.map((token) => (
            <article
              className="sample-card elevation-sample"
              key={token.variable}
              style={{ boxShadow: value(token.variable) }}
            >
              <TokenName token={token} />
            </article>
          ))}
        </div>
      </Group>

      <Group
        description="Hover the tracks to compare timing and easing."
        id="motion"
        title="Motion"
      >
        <div className="sample-card motion-list">
          {durations.map((token) => (
            <div className="motion-row" key={token.variable}>
              <TokenName token={token} />
              <div className="motion-track">
                <span
                  style={
                    {
                      transitionDuration: value(token.variable),
                      transitionTimingFunction: "var(--mc-easing-standard)",
                    } as CSSProperties
                  }
                />
              </div>
            </div>
          ))}
          <TokenName
            token={{
              label: "Standard easing",
              variable: "--mc-easing-standard",
            }}
          />
        </div>
      </Group>

      <Group
        description="Keyboard focus, disabled states, and standard control sizing."
        id="interaction"
        title="Interaction"
      >
        <div className="sample-grid sample-grid--interaction">
          <article className="sample-card interaction-sample">
            <Button>Tab to focus</Button>
            <TokenName
              token={{ label: "Focus width", variable: "--mc-focus-width" }}
            />
            <TokenName
              token={{ label: "Focus offset", variable: "--mc-focus-offset" }}
            />
          </article>
          <article className="sample-card interaction-sample">
            <Button disabled>Disabled</Button>
            <TokenName
              token={{
                label: "Disabled opacity",
                variable: "--mc-disabled-opacity",
              }}
            />
          </article>
          <article className="sample-card interaction-sample">
            <div className="control-height-sample">32</div>
            <TokenName
              token={{
                label: "Control height",
                variable: "--mc-control-height",
              }}
            />
          </article>
        </div>
      </Group>
    </main>
  );
}
