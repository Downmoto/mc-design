# Plan: MemoryCore design library

Status: Current
Last reviewed: 2026-10-08
Owner: Arad Fadaei

## Objective

Create the replacement Svelte design library by implementing approved tokens first, then adding shared components as their designs are approved and required by real consumers.

## Stage 1: Establish the implementation contract

- [x] Confirm the repository and package name before publishing package metadata.
- [x] Choose and document the supported Svelte version.
- [x] Choose the minimal package, build, test, and documentation tooling.
- [x] Choose the structured token source format and generated consumer formats.
- [x] Record consequential choices in project decision documents.

Token implementation may begin while package publishing and documentation choices are still being resolved.

## Stage 2: Implement foundation tokens

- [x] Create one version-controlled structured token source.
- [x] Add foundation colour tokens.
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
- [x] Support semantic `product-primary` overrides without defining product values.
- [x] Preserve operating-system high-contrast and forced-colour behaviour.
- [x] Verify every documented semantic colour pairing against its contrast requirement.

## Stage 4: Build components as designs are approved

For each approved component:

- [ ] Confirm purpose, anatomy, variants, sizes, states, and content rules.
- [ ] Map every visual value to an approved token.
- [ ] Start with native semantic elements where available.
- [ ] Implement keyboard behaviour and focus management.
- [ ] Implement accessible naming, state, and status communication.
- [ ] Verify dark, light, standard-density, and applicable compact-density treatments.
- [ ] Test loading, error, disabled, selected, and responsive behaviour where applicable.
- [ ] Add usage documentation and focused examples.

MVB component inventory:

- Actions: link, button, icon button.
- Inputs: text input, text area, numeric input, select or combobox, checkbox, radio group, switch, slider.
- Navigation: tabs, menu, disclosure.
- Feedback: tooltip, alert, toast, progress indicator, dialog.
- Structure: toolbar, sidebar, panel, card, table or list, empty state.

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

- [ ] Publish or link a consumable pre-release of the library.
- [ ] Integrate the baseline into the memorycore.dev overhaul.
- [ ] Treat website integration findings as input to shared tokens and components.
- [ ] Stabilise the first public package release after the website validates the baseline.

## Deferred

- DitherTool and AethelTool interface development.
- Product-specific workspace patterns.
- Product accent values.
- Desktop-shell and platform-packaging choices.
- Styled public guide pages, which follow the website overhaul.
