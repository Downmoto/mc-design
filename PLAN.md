# Plan: MemoryCore design library

Status: Current
Last reviewed: 2026-10-23
Owner: Arad Fadaei

## Objective

Create `@memorycore/design` by implementing approved tokens first, then adding shared components as their designs are approved and required by real consumers.

## Stage 1: Establish the implementation contract

- [x] Confirm the package name as `@memorycore/design`.
- [x] Confirm the repository location and GitHub-only distribution approach.
- [x] Choose and document the supported Svelte version.
- [x] Choose the minimal package, build, test, and documentation tooling.
- [x] Choose the structured token source format and generated consumer formats.
- [x] Record consequential choices in project decision documents.

Token implementation may begin while release automation and documentation choices are still being resolved.

## Stage 2: Implement foundation tokens

- [x] Create one version-controlled structured token source.
- [x] Add foundation colour tokens.
- [x] Add the approved website consumer-primary and contextual tokens.
- [x] Add the approved DitherTool and AethelTool consumer-primary pairs.
- [x] Add light and dark semantic colour aliases.
- [x] Add typography families, weights, sizes, and line heights.
- [x] Add spacing, size, radius, border, shadow, motion, breakpoint, and layer tokens.
- [x] Generate the initial Svelte-compatible consumer output.
- [x] Document token names, values, roles, and override rules.
- [x] Add validation that catches missing references, duplicate names, and invalid theme mappings.

## Stage 3: Implement theming

- [x] Implement dark and light themes.
- [x] Use dark as the default when no stored selection exists.
- [x] Add `Dark`, `Light`, and `System` settings support.
- [x] Keep the default `colour-interactive` role neutral and map registered consumers to their primary pairs.
- [x] Support registered consumer-primary mappings while rejecting reserved pairs without values.
- [x] Preserve operating-system high-contrast and forced-colour behaviour.
- [x] Verify every semantic colour pairing against its contrast requirement.

## Stage 4: Build components as designs are approved

Required components are tracked in one list. Items marked `website first` form the shared baseline for memorycore.dev; the remaining items follow consumer demand.

- [x] Configuration: Consumer
- [x] Configuration: Scrollbar
- [x] Actions: Button, including link and icon presentations (`website first`)
- [x] Actions: Action group (`website first`)
- [x] Actions: Toggle
- [x] Structure: Typography
- [x] Inputs: Text input
- [x] Inputs: Text area
- [x] Inputs: Numeric input
- [x] Inputs: Select or combobox
- [x] Inputs: Checkbox
- [x] Inputs: Radio group
- [x] Inputs: Switch
- [x] Inputs: Slider
- [x] Navigation: Tabs
- [x] Navigation: Menu, shared by context menus, selects, and dropdowns (`website first`)
- [x] Navigation: Disclosure (`website first`)
- [x] Feedback: Tooltip
- [x] Feedback: Badge (`website first`)
- [x] Feedback: Alert (`website first`)
- [x] Feedback: Toast
- [x] Feedback: Status (`website first`)
- [x] Feedback: Progress indicator (`website first`)
- [x] Feedback: Dialog or equivalent preview surface (`website first`)
- [x] Structure: Toolbar
- [x] Structure: Sidebar ([specification](docs/decisions/0003-sidebar-component-spec.md))
- [x] Structure: Panel
- [x] Structure: Card (`website first`)
- [x] Structure: List (`website first`)
- [x] Structure: Table (`website first`)
- [x] Structure: Empty state (`website first`)

For each approved component:

- [ ] Confirm purpose, anatomy, variants, sizes, states, and content rules.
- [ ] Map every visual value to an approved token.
- [ ] Start with native semantic elements where available.
- [ ] Implement keyboard behaviour and focus management.
- [ ] Implement accessible naming, state, and status communication.
- [ ] Verify dark, light, standard-density, and applicable compact-density treatments.
- [ ] Test loading, error, disabled, selected, and responsive behaviour where applicable.
- [ ] Add usage documentation in docs/ and focused examples.

Implement components in design-approval and consumer-need order. Avoid speculative variants.

## Stage 5: Verify the library baseline

- [x] Run automated tests and accessibility checks.
- [x] Test every component using only a keyboard.
- [x] Test primary examples with a screen reader.
- [x] Test text scaling and browser zoom.
- [x] Test reduced motion.
- [x] Test responsive behaviour from 320 CSS px upward.
- [x] Confirm package consumers can override documented semantic accent roles.
- [x] Confirm consumers do not need raw foundation values in component code.
- [x] Resolve all identified release-blocking accessibility and workflow defects.

## Stage 6: Prepare the first consumer

- [x] Tag a consumable `0.1.0` release of the library on GitHub.
- [ ] Integrate the baseline into the memorycore.dev overhaul.
- [ ] Treat website integration findings as input to shared tokens and components.
- [ ] Stabilise the first public GitHub release after the website validates the baseline.

## Deferred

- DitherTool and AethelTool interface development.
- Product-specific workspace patterns.
- Desktop-shell and platform-packaging choices.
- Native forced-colour and high-contrast verification.
- Styled public guide pages, which follow the website overhaul.
