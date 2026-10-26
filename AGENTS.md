# MemoryCore design-library instructions

## Purpose

This repository implements MemoryCore's shared design tokens and Svelte components as `@memorycore/design`. Read `CONTEXT.md` before making design or architecture decisions. Follow `PLAN.md` for the current implementation sequence.

## Product role

- The library serves memorycore.dev first, followed by DitherTool and AethelTool.
- Svelte is the approved interface framework.
- The package name is `@memorycore/design`.
- `@mc-design/react` is a legacy predecessor and does not define the replacement architecture.
- MemoryCore Brand Style Guide 1.2.0 and Unified Product Design Guide 1.1.0 govern visual and interaction decisions.
- Product-specific Tool workspace patterns remain deferred.

## Implementation rules

- Implement foundation tokens before shared components.
- Keep one version-controlled structured token source and generate consumer formats from it.
- Use semantic tokens inside components. Do not duplicate foundation values or add raw design values to component styles.
- Use lowercase kebab-case token names in the form `category-role-variant`; registered scopes appear after the category.
- Support dark, light, and system theme settings. Dark is the default when no preference has been stored.
- Register consumer primaries through `colour-consumer-{consumer}-primary-{theme}` and map them through documented semantic roles.
- Include the approved website, DitherTool, and AethelTool consumer-primary colours and website contextual colours in generated token outputs.
- Add component tokens only when a shared component needs a narrower semantic role.
- Reuse and extend shared component styles in `src/lib/styles.css`; keep component files limited to styles unique to that component.
- Add components and variants when an approved design or a real consumer requires them.
- Implement the website-required shared-component baseline before broader Tool-oriented MVB components.
- Keep website shells, page templates, route-aware wrappers, editorial treatments, and page compositions outside this package.
- Prefer native semantic controls and established keyboard behaviour.
- Preserve component dimensions across loading, error, and selected states.
- Do not add a React compatibility layer without a new approved decision.
- Keep repository location, registry, build tooling, testing tooling, and desktop-shell choices visible until explicitly decided.

## Quality requirements

- Target WCAG 2.2 Level AA.
- Meet the approved contrast, target-size, focus, reduced-motion, reflow, and high-contrast rules in `CONTEXT.md`.
- Test applicable states, keyboard behaviour, accessible names, and focus management for every component.
- Verify dark and light themes independently.
- Treat failures that block an accessibility requirement or primary workflow as release blockers.

## Collaboration

- When ambiguity could materially change scope, architecture, or the public API, ask for clarification.
- Make progress autonomously when a choice is safe, reversible, and local to the current implementation.
- Preserve unrelated changes and prefer focused, maintainable solutions.
- Treat this context pack as a dated snapshot. Request updated MemoryCore context when it may be stale.
- Do not make this repository depend directly on the private MemoryCore operations wiki.

## Writing

- Use Canadian spelling.
- Refer to the organisation as `MemoryCore`; avoid `we`, `us`, and `our` as substitutes.
- Use sentence case in interface copy.
- Omit terminal punctuation from headings, navigation, buttons, labels, status text, and brief callouts.
- Avoid corrective contrast constructions that negate one framing in favour of another.
- Do not use em dashes.

## Git

- Use Conventional Commit messages with one of: `fix:`, `feat:`, `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, or `test:`.
- Prefix branch names by intent, usually `feat/`, `refactor/`, or `docs/`.
- Prefer descriptive branch names such as `feat/add-foundation-tokens`.
