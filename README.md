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

The shared `--mc-colour-interactive` role uses a neutral pair by default.
Registered consumer themes can set `--mc-product-primary` separately for light
and dark themes. Component users select these mappings through the `consumer`
prop or `Consumer` component documented below. Token-only integrations can
apply a packaged mapping with `data-mc-product`.

See [the token reference](./docs/tokens.md) for the complete generated list and
[the implementation decision](./docs/decisions/0001-implementation-contract.md)
for the package contract.

## Using components

Import the shared styles once, then import components from the package:

```svelte
<script lang="ts">
  import '@memorycore/design/styles.css';
  import { ActionGroup, Button } from '@memorycore/design';
</script>

<Button>Save changes</Button>
<Button appearance="link" href="/about">About MemoryCore</Button>
<Button size="icon" aria-label="Add item" title="Add item">
  <!-- Phosphor Regular icon -->
</Button>

<ActionGroup joined aria-label="Pagination">
  <Button appearance="secondary">Previous</Button>
  <Button appearance="secondary">Next</Button>
</ActionGroup>
```

Button renders a native button by default and a native anchor when `href` is
provided. It supports primary, secondary, and link appearances; compact,
standard, large, and matching icon-only sizes; decorative leading and trailing
icon snippets; disabled state; and a loading state that preserves its
dimensions and accessible name.

ActionGroup arranges related controls with consistent spacing. Set `joined` to
connect direct Button children into one control, and nest joined groups inside
a default ActionGroup to separate related clusters. Horizontal and vertical
orientations preserve standard Tab navigation.

Set a consumer on one component with its `consumer` prop:

```svelte
<Button consumer="website">Save changes</Button>
```

Use `Consumer` to provide a consumer to every nested library component. A
component-level prop takes precedence over the nearest provider.

```svelte
<script lang="ts">
  import { Button, Consumer } from '@memorycore/design';
</script>

<Consumer consumer="dithertool">
  <Button>Process image</Button>
  <Button
    consumer="aetheltool"
    size="icon"
    aria-label="Add layer"
    title="Add layer"
  >
    <!-- icon -->
  </Button>
</Consumer>
```

Omit both APIs to use the neutral default. The components manage the generated
consumer attributes internally. Direct token overrides remain available for
fine-grained control.

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
dedicated Consumer, Button, and Action group pages with live playgrounds,
variants, interactions, usage guidance, accessibility requirements, and
collapsed API and token references. Global theme and consumer controls update
every preview through the public component APIs.

See [the component workbench decision](./docs/decisions/0002-component-workbench.md)
for the route and deployment contract.

## Project direction

`CONTEXT.md` is the design and accessibility authority. `PLAN.md` tracks the
implementation sequence. The old React package has no compatibility surface in
this replacement.
