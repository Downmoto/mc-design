# MC Design roadmap

MC Design is the shared React design system for Memory Core applications. Dither Tool is the foundational application, backed by Ditherlib 1.0.0.

## Phase 1: Establish MC Design

- [x] Initialize a Git repository on `main`.
- [x] Create the `@mc-design/react` React and TypeScript package.
- [x] Use npm and Vite without a monorepo framework.
- [x] Add development, build, type-check, test, and formatting scripts.
- [x] Configure React and React DOM as peer dependencies.
- [x] Review the initial repository.
- [x] Create the first Conventional Commit.

## Phase 2: Create the visual foundation

- [x] Add semantic tokens for colour, typography, spacing, borders, radii, shadows, focus, and motion.
- [x] Create the dark default theme.
- [x] Add the light-theme structure.
- [x] Establish keyboard-focus and disabled-state conventions.

## Phase 3: Build the initial components

- [ ] Button
- [ ] IconButton
- [ ] Select
- [ ] Slider
- [ ] NumberField
- [ ] Panel
- [ ] Divider
- [ ] Tooltip
- [ ] Add types, styles, examples, and focused behavioural checks.

## Phase 4: Build the component workbench

- [ ] Display every component and its important states.
- [x] Display token and colour samples.
- [x] Demonstrate keyboard-focus behaviour.
- [ ] Include a realistic Dither Tool interface prototype.

## Phase 5: Prototype Dither Tool

- [ ] Add the file and export toolbar.
- [ ] Add the effect-pipeline sidebar.
- [ ] Add the image-preview area.
- [ ] Add before-and-after viewing controls.
- [ ] Add the effect-settings panel.
- [ ] Add algorithm, palette, strength, and pixel-size controls.
- [ ] Cover empty, loaded, processing, and error states.

## Phase 6: Verify everything

- [ ] Pass type-checking.
- [ ] Pass automated tests.
- [ ] Pass the production package build.
- [ ] Pass formatting checks.
- [ ] Inspect the interface at several window sizes.
- [ ] Check keyboard navigation.

## Phase 7: Review

- [ ] Review the rendered prototype.
- [ ] Record and apply visual feedback.
- [ ] Approve the foundation for Dither Tool integration.

## After approval: Dither Tool integration

- [ ] Create the Tauri and React application.
- [ ] Install MC Design.
- [ ] Connect Ditherlib 1.0.0.
- [ ] Complete the first workflow: open image, add effect, adjust settings, preview, and export.
