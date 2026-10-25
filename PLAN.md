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
- [x] Actions: Button, including link and icon presentations (`website first`)
- [x] Actions: Action group (`website first`)
- [x] Structure: Typography
- [x] Inputs: Text input
- [x] Inputs: Text area
- [x] Inputs: Numeric input
- [ ] Inputs: Select or combobox
- [ ] Inputs: Checkbox
- [ ] Inputs: Radio group
- [ ] Inputs: Switch
- [ ] Inputs: Slider
- [ ] Navigation: Tabs
- [ ] Navigation: Menu (`website first`)
- [ ] Navigation: Disclosure (`website first`)
- [ ] Feedback: Tooltip
- [ ] Feedback: Badge (`website first`)
- [ ] Feedback: Alert (`website first`)
- [ ] Feedback: Toast
- [ ] Feedback: Status (`website first`)
- [ ] Feedback: Progress indicator (`website first`)
- [ ] Feedback: Dialog or equivalent preview surface (`website first`)
- [ ] Structure: Toolbar
- [ ] Structure: Sidebar
- [ ] Structure: Panel
- [ ] Structure: Card (`website first`)
- [ ] Structure: List (`website first`)
- [ ] Structure: Table (`website first`)
- [ ] Structure: Responsive overflow (`website first`, where approved website designs require it)
- [ ] Structure: Empty state (`website first`)

For each approved component:

- [ ] Confirm purpose, anatomy, variants, sizes, states, and content rules.
- [ ] Map every visual value to an approved token.
- [ ] Start with native semantic elements where available.
- [ ] Implement keyboard behaviour and focus management.
- [ ] Implement accessible naming, state, and status communication.
- [ ] Verify dark, light, standard-density, and applicable compact-density treatments.
- [ ] Test loading, error, disabled, selected, and responsive behaviour where applicable.
- [ ] Add usage documentation and focused examples.

Implement components in design-approval and consumer-need order. Avoid speculative variants.

## Stage 5: Verify the library baseline

- [ ] Run automated tests and accessibility checks.
- [ ] Test every component using only a keyboard.
- [ ] Test primary examples with a screen reader.
- [ ] Test text scaling, browser zoom, reduced motion, forced colours, and high contrast.
- [ ] Test responsive behaviour from 320 CSS px upward.
- [ ] Confirm package consumers can override documented semantic accent roles.
- [ ] Confirm consumers do not need raw foundation values in component code.
- [ ] Resolve all release-blocking accessibility and workflow defects.

## Stage 6: Prepare the first consumer

- [ ] Tag or link a consumable pre-release of the library from GitHub.
- [ ] Integrate the baseline into the memorycore.dev overhaul.
- [ ] Treat website integration findings as input to shared tokens and components.
- [ ] Stabilise the first public GitHub release after the website validates the baseline.

## Deferred

- DitherTool and AethelTool interface development.
- Product-specific workspace patterns.
- Desktop-shell and platform-packaging choices.
- Styled public guide pages, which follow the website overhaul.
