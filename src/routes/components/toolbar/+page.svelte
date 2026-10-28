<script lang="ts">
  import RedoIcon from 'phosphor-svelte/lib/ArrowClockwiseIcon';
  import UndoIcon from 'phosphor-svelte/lib/ArrowCounterClockwiseIcon';
  import BoldIcon from 'phosphor-svelte/lib/TextBIcon';
  import ItalicIcon from 'phosphor-svelte/lib/TextItalicIcon';
  import TrashIcon from 'phosphor-svelte/lib/TrashIcon';

  import {
    ActionGroup,
    Button,
    Card,
    CardContent,
    CardHero,
    Checkbox,
    Select,
    Toggle,
    Toolbar,
    Typography,
    type ButtonSize,
    type ToolbarOrientation,
    type ToolbarVariant,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let orientation = $state<ToolbarOrientation>('horizontal');
  let variant = $state<ToolbarVariant>('surface');
  let compact = $state(false);
  let bold = $state(false);
  let italic = $state(false);
  let lastAction = $state('None');
  let buttonSize = $derived<ButtonSize>(compact ? 'icon-compact' : 'icon');
</script>

<svelte:head>
  <title>Toolbar · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Structure"
  title="Toolbar"
  description="Groups frequently used controls into one efficiently navigated region"
/>

<section
  class="workbench-section"
  id="playground"
  aria-labelledby="playground-title"
>
  <div class="section-heading">
    <Typography id="playground-title" variant="h2">Playground</Typography>
  </div>

  <Card class="playground" orientation="horizontal">
    <CardHero class="playground__preview">
      <Toolbar aria-label="Document tools" {orientation} {variant}>
        <ActionGroup joined aria-label="History">
          <Button
            appearance="ghost"
            size={buttonSize}
            aria-label="Undo"
            onclick={() => (lastAction = 'Undo')}
          >
            <UndoIcon />
          </Button>
          <Button
            appearance="ghost"
            size={buttonSize}
            aria-label="Redo"
            onclick={() => (lastAction = 'Redo')}
          >
            <RedoIcon />
          </Button>
        </ActionGroup>

        <ActionGroup joined aria-label="Text formatting">
          <Toggle size={buttonSize} aria-label="Bold" bind:pressed={bold}>
            <BoldIcon />
          </Toggle>
          <Toggle size={buttonSize} aria-label="Italic" bind:pressed={italic}>
            <ItalicIcon />
          </Toggle>
        </ActionGroup>

        <Button
          appearance="ghost"
          size={buttonSize}
          aria-label="Delete"
          onclick={() => (lastAction = 'Delete')}
        >
          <TrashIcon />
        </Button>
      </Toolbar>

      <Typography class="interaction-result" aria-live="polite">
        Last action: {lastAction}; bold: {bold ? 'on' : 'off'}; italic: {italic
          ? 'on'
          : 'off'}
      </Typography>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <Select label="Orientation" bind:value={orientation}>
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </Select>
        <Select label="Variant" bind:value={variant}>
          <option value="ghost">Ghost</option>
          <option value="surface">Surface</option>
        </Select>
        <Checkbox
          label="Compact controls"
          size="compact"
          bind:checked={compact}
        />
      </form>
    </CardContent>
  </Card>
</section>

<section
  class="workbench-section"
  id="guidance"
  aria-labelledby="guidance-title"
>
  <div class="section-heading">
    <Typography id="guidance-title" variant="h2">Guidance</Typography>
  </div>

  <div class="prose-grid">
    <div>
      <Typography variant="h3">Usage</Typography>
      <Typography variant="list">
        <li>Use Toolbar for frequently used controls in a shared context</li>
        <li>Use ActionGroup to organise closely related controls</li>
        <li>Keep the number of visible actions focused on the primary task</li>
        <li>Use consistent Button and Toggle sizes within one toolbar</li>
        <li>Choose the orientation that matches the surrounding layout</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Give every toolbar a concise accessible label</li>
        <li>Tab enters at the most recently focused enabled action</li>
        <li>Arrow keys move through enabled actions and wrap at each end</li>
        <li>Home and End move to the first and last enabled actions</li>
        <li>Each child control keeps its accessible name, state, and action</li>
      </Typography>
    </div>
  </div>
</section>

<section
  class="workbench-section"
  id="reference"
  aria-labelledby="reference-title"
>
  <div class="section-heading">
    <Typography id="reference-title" variant="h2">Reference</Typography>
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
  <div
    class="table-scroll"
    role="region"
    aria-label="Toolbar API table"
    tabindex="0"
  >
    <table>
      <thead>
        <tr>
          <th scope="col">Property</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
          <th scope="col">Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">aria-label</Typography> or
            <Typography variant="inline-code">aria-labelledby</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Required</td>
          <td>Provides the toolbar's accessible name</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">orientation</Typography></th
          >
          <td
            ><Typography variant="inline-code"
              >'horizontal' | 'vertical'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'horizontal'</Typography></td>
          <td>Sets layout and Arrow key direction</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">variant</Typography></th
          >
          <td
            ><Typography variant="inline-code">'ghost' | 'surface'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'ghost'</Typography></td>
          <td>Controls whether the toolbar has a visible surface</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">children</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Required</td>
          <td>Provides Button actions or grouped controls</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native div attributes and event handlers pass through to the toolbar
  </Typography>
</section>
