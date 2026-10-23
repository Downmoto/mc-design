# Project context: MemoryCore design library

Status: Current
Last reviewed: 2026-10-23
Source: MemoryCore operations wiki

## Purpose

The project provides the shared design tokens and Svelte components used across MemoryCore interfaces as `@memorycore/design`. It turns the approved brand and unified product-design MVB into a reusable implementation package.

The first production consumer is memorycore.dev. DitherTool and AethelTool will consume the library after the website and styled guide pages are complete.

## Relationship to MemoryCore

MemoryCore creates commercial creative software and the open-source Rust libraries powering it.

- DitherTool is powered by `ditherlib`.
- AethelTool is powered by `aethellib`.
- MemoryCore application names use PascalCase with the `Tool` suffix.
- memorycore.dev is the first product consumer and testing ground for the shared system.
- The current `@mc-design/react` package is a legacy predecessor.

## Current state

- MemoryCore Brand Style Guide 1.2.0 and Unified Product Design Guide 1.1.0 are the approved MVB sources represented in this pack.
- Svelte is the accepted interface framework for the library, website, and future Tool frontends.
- The approved package name is `@memorycore/design`.
- The replacement design library is in foundation development.
- The repository is `https://github.com/Downmoto/mc-design`, which is the sole distribution location for the package.
- The package structure, supported Svelte version, token formats, and initial build, test, and documentation tooling are recorded in the implementation contract.
- Desktop shells remain an implementation choice for future Tool development.
- Product-specific Tool patterns remain deferred.

## Decisions and constraints

- Implement the replacement library in Svelte.
- Keep the shared package named `@memorycore/design` and distribute it solely through GitHub.
- Keep the approved MVB as the visual, interaction, content, and accessibility authority.
- Build tokens before shared components.
- Add components as their designs are approved and real consumers require them.
- Support memorycore.dev first, then future Tool frontends.
- Keep Tool-specific patterns, accents, and desktop-shell choices outside the current implementation scope.

## Development sequence

1. Build this replacement shared design library.
2. Rebuild memorycore.dev using the library.
3. Publish styled brand and product-guide pages on memorycore.dev.
4. Resume DitherTool and AethelTool development.

## Operational design principles

- Prioritise the primary task.
- Prefer shared patterns.
- Reveal complexity progressively.
- Communicate every applicable state.
- Support the full operating range.

## Token architecture

Canonical token names use lowercase kebab case in the form `category-role-variant`. A registered scope appears after the category as `category-scope-role-variant`. Generated outputs may add a platform prefix such as `--mc-colour-text-primary`.

Use four layers:

1. Foundation tokens hold approved raw values.
2. Semantic tokens assign meaning within light and dark themes.
3. Component tokens provide narrower roles when a shared component requires them.
4. Consumer themes map documented semantic interactive and accent roles to their registered primary pair.

Rules:

- Components reference semantic or component tokens.
- Consumer formats are generated from one version-controlled structured source.
- Add a token for a recurring need, semantic distinction, or documented accessibility requirement.
- Keep product overrides limited to documented semantic roles.
- Product repositories consume packaged outputs and do not depend on the MemoryCore operations wiki.

## Core foundation colours

| Token                 | Value     | Role                            |
| --------------------- | --------- | ------------------------------- |
| `brand-dark`          | `#050507` | Default dark background         |
| `brand-dark-surface`  | `#1C1A20` | Secondary dark surface          |
| `brand-dark-neutral`  | `#2D2D2D` | Neutral dark surface            |
| `brand-light`         | `#E8E1D2` | Default light foreground        |
| `brand-light-surface` | `#F3EBDD` | Alternate light background      |
| `brand-warm-muted`    | `#B8AE9D` | Muted warm foreground           |
| `brand-cool-muted`    | `#8C8791` | Muted cool foreground or accent |

## Consumer primary colours and website contexts

Consumer primary pairs use `colour-consumer-{consumer}-primary-{theme}`. Include approved values in generated token outputs.

| Token                                            | Value     | Role                                                                   |
| ------------------------------------------------ | --------- | ---------------------------------------------------------------------- |
| `colour-consumer-website-primary-light`          | `#2F6892` | Website primary in the light theme                                     |
| `colour-consumer-website-primary-dark`           | `#4E8BB7` | Website primary in the dark theme                                      |
| `colour-consumer-dithertool-primary-light`       | `#506A4B` | DitherTool primary in the light theme                                  |
| `colour-consumer-dithertool-primary-dark`        | `#728E6D` | DitherTool primary in the dark theme                                   |
| `colour-consumer-aetheltool-primary-light`       | `#775591` | AethelTool primary in the light theme                                  |
| `colour-consumer-aetheltool-primary-dark`        | `#9676AE` | AethelTool primary in the dark theme                                   |
| `colour-consumer-website-supporting-pale-blue`   | `#D3DAE0` | Website supporting field and high-contrast content on dark backgrounds |
| `colour-consumer-website-resource-primary-light` | `#1547D2` | Resource context primary in the light theme                            |
| `colour-consumer-website-resource-primary-dark`  | `#6D98FF` | Resource context primary in the dark theme                             |

Use the website consumer pair for default website interactions. Use the Resource pair only within approved Resource contexts. Do not use light-theme primary values as small text on `brand-dark`; use the corresponding dark-theme token.

## Semantic colours

| Token                   | Light theme           | Dark theme           | Purpose                                            |
| ----------------------- | --------------------- | -------------------- | -------------------------------------------------- |
| `colour-background`     | `#F3EBDD`             | `#050507`            | Root background                                    |
| `colour-surface`        | `#E8E1D2`             | `#1C1A20`            | Panels, cards, menus, and grouped regions          |
| `colour-text-primary`   | `#050507`             | `#E8E1D2`            | Primary text and neutral icons                     |
| `colour-text-secondary` | `#2D2D2D`             | `#B8AE9D`            | Supporting text and neutral icons                  |
| `colour-border`         | `#2D2D2D`             | `#8C8791`            | Meaningful boundaries and separators               |
| `colour-interactive`    | Website primary light | Website primary dark | Links, active controls, focus, and selected states |
| `colour-success`        | `#215C38`             | `#7FC99A`            | Successful or valid state                          |
| `colour-warning`        | `#6B4A00`             | `#E5B968`            | Caution or required attention                      |
| `colour-danger`         | `#8F2525`             | `#E08383`            | Errors, destructive actions, or critical failure   |

Each consumer theme maps `colour-interactive` and other documented accent roles to its approved primary pair. Shared neutral and status colours remain consistent. Resource-specific interaction roles may map to the approved website Resource pair without registering another consumer.

Contrast requirements:

- Standard text: 4.5:1.
- Large text: 3:1.
- Meaningful icons, controls, boundaries, state indicators, and focus indicators: 3:1.
- Colour always has a persistent supporting cue such as text, an icon, shape, or pattern.

## Typography

The root size is 16 px.

| Role            | Family                |  Size |      Rem | Weight | Line height |
| --------------- | --------------------- | ----: | -------: | -----: | ----------: |
| Display         | Manufacturing Consent | 64 px |     4rem |    400 |         1.0 |
| Brand heading 1 | Space Mono            | 48 px |     3rem |    700 |         1.1 |
| Page title      | Space Mono            | 32 px |     2rem |    700 |         1.2 |
| Section title   | Manufacturing Consent | 32 px |     2rem |    400 |         1.2 |
| Body            | Roboto                | 16 px |     1rem |    400 |         1.5 |
| Label           | Roboto                | 14 px | 0.875rem |    500 |         1.4 |
| Caption         | Roboto                | 12 px |  0.75rem |    400 |         1.4 |
| Code and data   | Space Mono            | 14 px | 0.875rem |    400 |         1.5 |

Approved weights:

- Manufacturing Consent: 400.
- Space Mono: 400 and 700.
- Roboto: 400, 500, and 700.

Typography rules:

- Use Manufacturing Consent for short website hero phrases, display statements, major editorial moments, and prominent Tool section titles.
- Do not use Manufacturing Consent for controls, navigation, long titles, or body copy.
- Use Space Mono for page titles, code, measurements, and aligned technical data.
- Use Roboto for body copy, controls, labels, and supporting interface text.
- Applications may define responsive type scales while preserving these roles and usage limits.
- Keep editable web form controls at 16 px or larger.
- Do not set interface text below 12 px.
- Use tabular numerals for tables, measurements, and changing values.
- Limit reading columns to 640 px and body lines to approximately 65 characters.
- Underline links in body copy.

Font sources:

- Manufacturing Consent: <https://github.com/googlefonts/manufacturing-consent-font>
- Space Mono: <https://github.com/google/fonts/tree/main/ofl/spacemono>
- Roboto: <https://github.com/google/fonts/tree/main/ofl/roboto>

All three font families use the SIL Open Font License 1.1.

## Spacing

The base unit is 8 px. The 4 px half-step is reserved for compact details, optical corrections, and cases where 8 px is too coarse.

| Token     | Value | Typical use                                        |
| --------- | ----: | -------------------------------------------------- |
| `space-1` |  4 px | Compact internal gaps and optical adjustments      |
| `space-2` |  8 px | Closely related inline elements and icon gaps      |
| `space-3` | 12 px | Compact control padding and dense field groups     |
| `space-4` | 16 px | Standard component padding and field spacing       |
| `space-5` | 24 px | Related components, cards, and content groups      |
| `space-6` | 32 px | Distinct groups within a section or panel          |
| `space-7` | 48 px | Large component regions and page-level transitions |
| `space-8` | 64 px | Major sections on narrow layouts                   |
| `space-9` | 96 px | Major website sections on wider layouts            |

Approved website compositions may use 128 px between major editorial sections on large layouts. Keep this application-specific value in the website unless a reusable library requirement establishes a shared token.

Density modes:

- Standard is the default for memorycore.dev and general product layouts.
- Compact is available for Tool workspaces, property panels, tables, and toolbars.
- Density changes may reduce padding and gaps while preserving typography and minimum targets.

## Size and layout

Control heights:

- Compact: 32 px.
- Standard: 40 px.
- Large: 48 px.

Icon sizes:

- Compact and dense contexts: 16 px.
- Standard controls: 20 px.
- Primary controls and navigation: 24 px.
- Large features and empty states: 32 px.

Targets and containers:

- Minimum pointer target: 24 × 24 CSS px.
- Preferred touch target: 44 × 44 CSS px.
- Maximum content width: 1,280 px.
- Maximum reading width: 640 px.
- Navigation sidebar: 240 px.
- Properties sidebar: 320 px default, resizable from 280 to 400 px.
- Dialog widths: 400, 560, and 720 px, constrained by the viewport.

Responsive layout:

| Size   | Range              | Columns | Margin | Gutter |
| ------ | ------------------ | ------: | -----: | -----: |
| Small  | 320 to 767 px      |       4 |  24 px |  16 px |
| Medium | 768 to 1,199 px    |       8 |  32 px |  24 px |
| Large  | 1,200 px and above |      12 |  48 px |  24 px |

Centre the fluid container and cap it at 1,280 px. `clamp(24px, 5vw, 48px)` may be used for continuous page margins.

## Borders, radius, shadow, and layers

Border widths:

- Default boundaries: 1 px.
- Selected, emphasised, and focus-visible boundaries: 2 px.
- Focus replaces the default boundary with a flush 2 px interactive-colour border and has no offset.

| Token           |                          Value | Typical use                                   |
| --------------- | -----------------------------: | --------------------------------------------- |
| `radius-0`      |                              0 | Internal geometric details and canvas content |
| `radius-1`      |                           8 px | Controls and compact containers               |
| `radius-2`      |                          16 px | Panels, cards, menus, and popovers            |
| `radius-3`      |                          24 px | Dialogs and large framing containers          |
| `shadow-1`      |   `0 2px 8px rgb(0 0 0 / 24%)` | Slightly raised controls and local overlays   |
| `shadow-2`      |  `0 8px 24px rgb(0 0 0 / 32%)` | Menus, popovers, and elevated panels          |
| `shadow-3`      | `0 16px 48px rgb(0 0 0 / 40%)` | Dialogs and major temporary surfaces          |
| `layer-base`    |                              0 | Normal document flow                          |
| `layer-sticky`  |                            100 | Sticky interface regions                      |
| `layer-overlay` |                            200 | Menus and popovers                            |
| `layer-modal`   |                            300 | Dialogs and modal backdrops                   |
| `layer-toast`   |                            400 | Time-sensitive notifications                  |

Use shadows to communicate depth. Do not apply shadows to flat controls, text, icons, or decorative elements.

Functional masks and fades may use approved colours and transparency. Keep computational textures, dithering, blend modes, filters, decorative display effects, and editorial imagery in consumer compositions. Do not apply these treatments to controls, body text, logos, or information-critical content.

## Motion

Default easing: `cubic-bezier(0.2, 0, 0, 1)`.

| Token or interaction     |    Duration | Behaviour                              |
| ------------------------ | ----------: | -------------------------------------- |
| Direct response          |      100 ms | Hover and immediate state feedback     |
| Standard transition      |      160 ms | Menus and determinate progress changes |
| Large transition         |      240 ms | Dialogs, panels, and layout changes    |
| Indeterminate processing | 800 ms loop | Restrained linear rotation             |

Use opacity with no more than 8 px of entrance movement. Reduced-motion mode uses immediate changes or opacity transitions no longer than 100 ms, stops non-essential loops, and removes translation and scale effects.

A single website hero or media entrance may last up to 400 ms as a website-owned composition. Shared component transitions use the 100 ms, 160 ms, and 240 ms scale.

## Themes

- Supported themes: dark and light.
- Default theme: dark.
- Settings: `Dark`, `Light`, and `System`.
- `System` follows operating-system changes.
- Theme changes apply without reloading or resetting the current task.
- Store the selected theme locally on the device.
- Preserve forced-colour and high-contrast behaviour.
- Validate contrast independently in both themes.

## Iconography

- Use Phosphor Icons under the MIT licence.
- Use Regular outline icons by default.
- Use Fill only for selected or active states.
- Do not use Thin, Light, Bold, or Duotone in the standard system.
- Preserve the native 256 × 256 viewBox and geometry for raw SVGs.
- Use current text colour for actionable icons.
- Pair unfamiliar icons with text.
- Give icon-only controls an accessible name and tooltip.
- Do not duplicate the complete icon package in the repository.

## Interaction states

Every interactive component defines each applicable state:

| State         | Treatment and behaviour                                                |
| ------------- | ---------------------------------------------------------------------- |
| Default       | Neutral surface and a 1 px boundary where needed                       |
| Hover         | Surface or border change over 100 ms without layout movement           |
| Focus-visible | Flush 2 px interactive-colour border                                   |
| Active        | Stronger surface or border while pressed                               |
| Selected      | Interactive colour paired with text, an icon, or a checkmark           |
| Disabled      | Muted treatment with no hover or active response                       |
| Loading       | Preserve dimensions and label, add progress, prevent repeat activation |
| Error         | Danger border with nearby recovery text and an icon where useful       |

Keyboard conventions:

- `Tab` moves between controls.
- Arrow keys move within composite controls.
- `Enter` and `Space` activate controls according to platform conventions.
- `Escape` closes the current temporary layer, menu, or dialog.
- Opening a dialog moves focus into it; closing returns focus to its trigger.
- Background updates do not steal focus.

## Component scope

### First-consumer baseline

Design and implement these shared capabilities for memorycore.dev before broader Tool-oriented components:

- Actions: link, button, icon button, and action-group foundations.
- Navigation: menu and disclosure behaviour for small-screen navigation.
- Feedback: dialog or equivalent accessible preview surface, alert, status, progress indicator, and empty state.
- Structure: card, list, table, and responsive-overflow foundations where the approved website designs require them.

The package owns each primitive's accessibility behaviour, states, public types, baseline styles, tests, and usage documentation. The website owns its shell, assembled navigation, route-aware wrappers, breadcrumbs, page introductions, action-group compositions, status markers, documentation and Resource compositions, marketing sections, and page templates.

### Complete MVB inventory

The broader approved inventory remains available for implementation when an approved design and current consumer require it:

- Actions: link, button, and icon button.
- Inputs: text input, text area, numeric input, select or combobox, checkbox, radio group, switch, and slider.
- Navigation: tabs, menu, and disclosure.
- Feedback: tooltip, alert, toast, progress indicator, and dialog.
- Structure: toolbar, sidebar, panel, card, table or list, and empty state.

Do not implement the remaining inventory merely to complete the catalogue.

Shared component contract:

- Use approved tokens.
- Support every applicable state.
- Prefer native semantic controls.
- Give controls visible labels unless an icon is widely understood.
- Give icon-only controls an accessible name and tooltip.
- Preserve dimensions across loading, error, and selected states.
- Follow established keyboard conventions.
- Add a component or variant when an approved design or a real consumer requires it.

## Content rules

- Use sentence case.
- Buttons begin with a specific verb and are usually one to three words.
- Fields use persistent visible labels.
- Placeholders provide examples or expected formats and do not replace labels.
- Validation identifies the problem and recovery action while preserving entered data.
- Confirm destructive, irreversible, or costly actions with specific labels.
- Use locale-aware dates and numbers in interfaces and ISO `YYYY-MM-DD` in technical contexts.
- Use decimal file-size units such as `850 kB`, `1.5 MB`, and `12 GB`.
- Refer to the organisation as `MemoryCore` rather than `we`, `us`, or `our`.

## Accessibility requirements

- Target WCAG 2.2 Level AA.
- Make every function keyboard operable with a logical focus order and no keyboard traps.
- Provide a non-dragging alternative for non-essential dragging interactions.
- Expose accessible names, roles, states, and values.
- Include visible label text in accessible names.
- Announce status changes without moving focus.
- Allow website text to scale to 200% without losing content or functionality.
- Reflow web content at 400% zoom to a 320 CSS px-wide viewport, with exceptions for inherently two-dimensional content.
- Respect reduced-motion, high-contrast, and forced-colour preferences.

## Deferred and excluded work

- Product-specific workspace, properties, file, and processing patterns.
- Native mobile applications.
- Desktop-shell selection.
- Website layouts and styled guide pages beyond the reusable library surface.
- Decorative textures, grain, and product-specific illustration.
- React compatibility.

## Open questions

- Component API conventions as approved components are introduced.
- Visual-regression tooling when interactive components provide useful scenarios.
- Release automation and timing.
- Desktop shell and platform packaging, to be addressed when Tool development resumes.

Record consequential answers in durable decision documents before they become difficult to reverse.

## Working conventions

- Follow the project instructions in `AGENTS.md`.
- Use `PLAN.md` as the current implementation sequence.
- Keep this export local and versioned in the destination repository.
- Refresh the pack from the MemoryCore operations wiki when a source decision changes.

## Source provenance

This pack contains the implementation guidance required by the destination repository. These source names and dates identify the snapshot without creating dependencies on files outside the copied pack.

| Upstream source                            | Version or decision date                 |
| ------------------------------------------ | ---------------------------------------- |
| MemoryCore Brand Style Guide               | 1.2.0, reviewed 2026-10-23               |
| MemoryCore Unified Product Design Guide    | 1.1.0, reviewed 2026-10-23               |
| Consumer primary-colour token decision     | Accepted 2026-10-23                      |
| Product interface framework decision       | Accepted 2026-10-08, reviewed 2026-10-21 |
| `@memorycore/design` package-name decision | Accepted 2026-10-21                      |
| Design-system development sequence         | Accepted 2026-10-08                      |
| AethelTool product-name decision           | Accepted 2026-10-08                      |
