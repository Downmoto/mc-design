# Implementation contract

Status: Accepted

Date: 2026-10-23

## Decision

- Keep the repository at `https://github.com/Downmoto/mc-design`
- Distribute `@memorycore/design` solely from the GitHub repository
- Keep the package marked private to prevent publication to a package registry
- Use Svelte 5.57 or newer within the Svelte 5 major version
- Use npm, Vite, TypeScript, `@sveltejs/package`, Vitest, Testing Library, and
  axe-core
- Keep `tokens/tokens.json` as the canonical ordered token source
- Generate version-controlled CSS custom properties, TypeScript values, and a
  Markdown token reference with a small Node.js script
- Add an internal Svelte workbench when the first approved components are ready
- Add Svelte component diagnostics with the first component
- Add browser-level and visual-regression tooling when interactive components
  provide scenarios for those tools to exercise

## Rationale

The package follows Svelte's library structure and keeps the initial toolchain
small. Ordered token collections allow validation to reject duplicate names,
missing references, incomplete theme mappings, and inaccessible approved colour
pairings before consumer files are generated.

The workbench, browser automation, and visual regression remain deferred until
component designs exist. This avoids maintaining an empty application surface.

## Consequences

- `src/lib` is the public package surface
- There is no React compatibility layer
- Generated files must match `tokens/tokens.json` for checks to pass
- Product themes may override `--mc-product-primary` and must verify their own
  light and dark contrast
- Release automation and timing require a later decision
