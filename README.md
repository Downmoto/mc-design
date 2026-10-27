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

Load the complete token and shared component styles, including the approved
fonts:

```ts
import '@memorycore/design/styles.css';
```

Component consumers must import `styles.css` even when fonts are loaded
separately because it includes shared component styling. `tokens.css` remains
available only for token-only integrations.

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

Import the shared styles once, then import only the components a view uses:

```svelte
<script lang="ts">
  import '@memorycore/design/styles.css';
  import { Button, TextInput } from '@memorycore/design';

  let email = $state('');
</script>

<Button>Save changes</Button>

<TextInput
  label="Email address"
  description="Used for account notices"
  type="email"
  bind:value={email}
/>
```

Button renders a native button by default and a native anchor when `href` is
provided. It supports primary, secondary, ghost, and link appearances; compact,
standard, large, and matching icon-only sizes; decorative leading and trailing
icon snippets; disabled state; and a loading state that preserves its dimensions
and accessible name.

ActionGroup arranges related controls with consistent spacing. Set `joined` to
connect direct Button children into one control, and nest joined groups inside
a default ActionGroup to separate related clusters. Horizontal and vertical
orientations preserve standard Tab navigation.

Typography provides Display, H1 through H4, paragraph, blockquote, list,
inline code, lead, large, small, and muted patterns. Each pattern renders its
corresponding semantic element and uses approved MemoryCore tokens.

TextInput renders a labelled native input for a single line of text. It supports
standard and compact sizes, text-like native input types, description and error
messages, two-way value binding, and native required, read-only, and disabled
states. Decorative icon snippets may appear before or after the value.

TextArea renders a labelled native textarea for multiline values. It supports
standard and compact sizes, description and error messages, configurable rows,
two-way value binding, vertical resizing, and native required, read-only, and
disabled states.

NumericInput renders a labelled native number input. It supports standard and
compact sizes, numeric minimum, maximum, and step constraints, two-way value
binding, text prefixes and suffixes, description and error messages, and native
required, read-only, and disabled states.

Select renders a labelled select-only combobox for choosing one value from a
known set. Its listbox reuses the Menu surface while a native select preserves
option markup, form submission, and input and change events. It supports
standard and compact sizes, two-way value binding, description and error
messages, and required and disabled states.

Checkbox renders a labelled native checkbox for an independent option. It
supports checked, unchecked, and indeterminate states, standard and compact
sizes, two-way state binding, error messages, and native required and disabled
states.

RadioGroup renders a native fieldset of mutually exclusive radio inputs. It
supports option labels and descriptions, standard and compact sizes, two-way
value binding, error messages, per-option disabling, and native required and
disabled states.

Switch renders a labelled native checkbox with switch semantics for settings
that take effect immediately. It supports standard and compact sizes, two-way
state binding, description and error messages, and native required and disabled
states.

Slider renders a labelled native range input with an optional visible value.
It supports numeric bounds and steps, standard and compact sizes, two-way value
binding, optional unit suffixes, value visibility, error messages, and the native
disabled state.

Disclosure renders native details and summary elements for optional content or
compact navigation. It supports standard and compact sizes, two-way open-state
binding, native keyboard behaviour, and registered consumer colour mappings.

Tooltip provides concise supporting text for controls. It opens on pointer
hover and keyboard focus after 500 ms, remains available for pointer hover,
closes with Escape, and links its content to the trigger through
`aria-describedby`. Standard and compact sizes adjust its text and padding.

Badge labels concise metadata, categories, and attributes as static inline
content. It supports standard and compact sizes, neutral and semantic tones,
an optional decorative leading icon, and registered consumer colour mappings.

Alert presents persistent contextual information near related content. It
supports standard and compact sizes, neutral and semantic tones, an optional
title, an optional decorative leading icon, and native live-region attributes.

Toast announces temporary background results through a polite live region. It
supports standard and compact sizes, Alert tones and content, two-way visibility
binding, optional automatic dismissal, timeout pausing, and manual dismissal.

Tabs switches between related panels in the same context. It supports standard
and compact sizes, two-way value binding, disabled tabs, automatic selection,
and established arrow, Home, and End keyboard behaviour.

Menu presents commands and navigation links from a button or contextual target.
Its component family supports labelled groups, separators, disabled and
destructive items, checkbox items, radio groups, nested submenus, shortcut
hints, standard and compact sizes, two-way open-state binding, typeahead,
viewport-aware positioning, and established menu keyboard behaviour.

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
dedicated component pages with live playgrounds, variants, interactions, usage
guidance, accessibility requirements, and collapsed API and token references.
Global theme and consumer controls update every preview through the public
component APIs.

See [the component workbench decision](./docs/decisions/0002-component-workbench.md)
for the route and deployment contract.

## Project direction

`CONTEXT.md` is the design and accessibility authority. `PLAN.md` tracks the
implementation sequence. The old React package has no compatibility surface in
this replacement.
