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

The shared `--mc-colour-interactive` role maps to the registered memorycore.dev
primary pair. Registered consumer themes can set `--mc-product-primary`
separately for light and dark themes. Apply the packaged website mapping by
setting `data-mc-product="website"` on the same document element as
`data-mc-theme`.

See [the token reference](./docs/tokens.md) for the complete generated list and
[the implementation decision](./docs/decisions/0001-implementation-contract.md)
for the package contract.

## Using components

Import the shared styles once, then import components from the package:

```svelte
<script lang="ts">
  import '@memorycore/design/styles.css';
  import { Button, IconButton } from '@memorycore/design';
</script>

<Button>Save changes</Button>
<IconButton label="Add item">
  <!-- Phosphor Regular icon -->
</IconButton>
```

Button supports primary and secondary appearances, compact, standard, and
large sizes, decorative leading and trailing icon snippets, disabled state,
and a loading state that preserves its dimensions and accessible name.

Icon Button uses the same appearances and sizes while remaining square. Its
required `label` supplies the accessible name and default native tooltip.

## Component workbench

Start the local component library:

```sh
npm run dev
```

Create the static build intended for `memorycore.dev/design/library/`:

```sh
npm run build
```

Create the distributable `@memorycore/design` package:

```sh
npm run package
```

The SvelteKit static output is `build/`. It contains a catalogue home page and
dedicated Button and Icon Button pages with live playgrounds, variants,
interactions, usage guidance, accessibility requirements, and collapsed API and
token references. Global theme and consumer controls update every preview.

See [the component workbench decision](./docs/decisions/0002-component-workbench.md)
for the route and deployment contract.

## Project direction

`CONTEXT.md` is the design and accessibility authority. `PLAN.md` tracks the
implementation sequence. The old React package has no compatibility surface in
this replacement.
