# MemoryCore design

`@memorycore/design` is MemoryCore's shared Svelte design library. It provides
design tokens, theme utilities, and accessible interface components for
memorycore.dev and other MemoryCore products.

The library is under active development. The current package includes the
foundation token system and the shared-component baseline required by the
website.

## Requirements

- Node.js 22.17 or newer
- npm 11 or newer
- Svelte 5.57 or newer

## Development

Install dependencies and run the verification suite:

```sh
npm install
npm run check
```

Common commands:

| Command                   | Purpose                         |
| ------------------------- | ------------------------------- |
| `npm run dev`             | Start the component workbench   |
| `npm run build`           | Build the static workbench      |
| `npm run package`         | Build the distributable package |
| `npm run tokens:generate` | Regenerate token outputs        |
| `npm test`                | Run the test suite              |

## Usage

Import the shared styles once, then import the components required by the view:

```svelte
<script lang="ts">
  import '@memorycore/design/styles.css';
  import { Button, TextInput } from '@memorycore/design';

  let email = $state('');
</script>

<TextInput
  label="Email address"
  description="Used for account notices"
  type="email"
  bind:value={email}
/>

<Button>Save changes</Button>
```

`styles.css` includes tokens, approved fonts, and shared component styles.
Token-only integrations can import `@memorycore/design/tokens.css` instead.

### Themes

Dark is the default theme. Use `dark`, `light`, or `system` with the theme
helpers:

```ts
import { initialiseTheme, setTheme } from '@memorycore/design';

initialiseTheme();
setTheme('system');
```

The helpers apply `data-mc-theme` to the document root and persist the selected
setting.

### Consumer colours

Components use neutral interactive colours by default. Set a registered
consumer on one component with its `consumer` prop:

```svelte
<Button consumer="website">Save changes</Button>
```

Use `Consumer` to apply the same consumer colour mapping to a component tree:

```svelte
<script lang="ts">
  import { Button, Consumer } from '@memorycore/design';
</script>

<Consumer consumer="dithertool">
  <Button>Process image</Button>
</Consumer>
```

A component-level `consumer` prop takes precedence over the nearest provider.
Registered consumers are `website`, `dithertool`, and `aetheltool`.

## Components

The package includes:

- Actions and navigation: Button, Toggle, ActionGroup, Tabs, Menu, Disclosure,
  and Toolbar
- Forms: TextInput, TextArea, NumericInput, Select, Checkbox, RadioGroup,
  Switch, and Slider
- Feedback: Alert, Toast, Status, ProgressIndicator, Tooltip, Dialog, and
  EmptyState
- Content and layout: Typography, Badge, Panel, Card, List, Table, and Sidebar
- Configuration: Consumer

Run `npm run dev` for live examples, variants, API details, token references,
and accessibility guidance.

## Tokens

The canonical token source is [`tokens/tokens.json`](./tokens/tokens.json).
Generated CSS, TypeScript, and documentation are committed to the repository.
See the [token reference](./docs/tokens.md) for the complete generated list.
