# MemoryCore design

`@memorycore/design` is MemoryCore's shared Svelte design library. It provides
design tokens, theming utilities, and approved interface components for
memorycore.dev and future MemoryCore products.

The replacement library is currently in foundation development. Components are
added only after their designs are approved and a consumer requires them.

## Requirements

- Node.js 22.17 or newer
- npm 11 or newer
- Svelte 5.57 or newer

## Development

Install dependencies and run the complete verification suite:

```sh
npm install
npm run check
```

Regenerate CSS, TypeScript, and documentation from the canonical token source:

```sh
npm run tokens:generate
```

The source is `tokens/tokens.json`. Generated files are committed so package
consumers and reviewers can inspect changes without running the generator.

## Using tokens

Load the complete foundation, including the approved fonts:

```ts
import '@memorycore/design/styles.css';
```

Consumers that load fonts separately can import only the token properties:

```ts
import '@memorycore/design/tokens.css';
```

The default theme is dark. Set `data-mc-theme` on the document root to `dark`,
`light`, or `system`. The theme helpers persist and apply this setting:

```ts
import { initialiseTheme, setTheme } from '@memorycore/design';

initialiseTheme();
setTheme('system');
```

Product themes can override `--mc-product-primary` separately in each theme.
The shared `--mc-colour-interactive` role uses that value with the MemoryCore
colour as its fallback.

See [the token reference](./docs/tokens.md) for the complete generated list and
[the implementation decision](./docs/decisions/0001-implementation-contract.md)
for the package contract.

## Project direction

`CONTEXT.md` is the design and accessibility authority. `PLAN.md` tracks the
implementation sequence. The old React package has no compatibility surface in
this replacement.
