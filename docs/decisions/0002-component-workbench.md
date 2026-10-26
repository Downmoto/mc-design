# Component workbench

Status: Accepted

Date: 2026-10-23

## Decision

- Structure the repository as a SvelteKit component-library project
- Keep `src/lib` as the public package surface and `src/routes` as the
  component workbench
- Use SvelteKit routing for the catalogue and component pages
- Use `@sveltejs/adapter-static` to prerender the workbench
- Publish its static output at `/design/library/` on memorycore.dev
- Give each component a stable path under `/design/library/components/`
- Use the production components and generated tokens directly from `src/lib`
- Keep theme and registered consumer controls available on every page
- Use persistent component navigation on large screens and a native disclosure on
  smaller screens
- Keep component pages focused on a playground, variants, states, and guidance
- Place API and token mappings in a collapsed reference section
- Keep consumer-colour previews global instead of repeating comparison matrices
  on every component page
- Keep the workbench outside the `@memorycore/design` package exports

## Rationale

The workbench makes the implemented components the review surface, which
prevents a separate design artefact from drifting away from production
behaviour. SvelteKit is the documented package structure for a Svelte component
library: `src/lib` is packaged for consumers while `src/routes` provides the
accompanying documentation and demo site.

The route sits alongside the planned `/design/brand/` and `/design/product/`
sections while retaining a narrower focus on reusable library components.

## Consequences

- `npm run dev` starts the local workbench
- `npm run build` creates the prerendered site in `build/`
- `npm run package` creates the consumer package in `dist/`
- The memorycore.dev deployment mounts the contents of `build/` at
  `/design/library/`
- Each component adds one catalogue entry, one navigation entry, and one
  SvelteKit route through the shared catalogue data
- The complete repository check includes the production workbench build
- Browser interaction and visual-regression tooling can use the stable
  component URLs when it is introduced
