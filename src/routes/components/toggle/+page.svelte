<script lang="ts">
  import BoldIcon from 'phosphor-svelte/lib/TextBIcon';

  import {
    Card,
    CardContent,
    CardHero,
    Checkbox,
    Select,
    Toggle,
    Typography,
    type ToggleAppearance,
    type ToggleSize,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  type LabelledSize = 'compact' | 'standard' | 'large';
  type IconSize = Extract<ToggleSize, `icon${string}`>;

  let pressed = $state(false);
  let appearance = $state<ToggleAppearance>('secondary');
  let disabled = $state(false);
  let iconOnly = $state(false);
  let size = $state<LabelledSize>('standard');
  let iconSize = $derived<IconSize>(
    size === 'compact'
      ? 'icon-compact'
      : size === 'large'
        ? 'icon-large'
        : 'icon',
  );
</script>

<svelte:head>
  <title>Toggle · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Actions"
  title="Toggle"
  description="Turns an independent action state on or off while keeping that state visible"
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
      {#if iconOnly}
        <Toggle
          aria-label="Bold"
          {appearance}
          size={iconSize}
          {disabled}
          bind:pressed
        >
          <BoldIcon />
        </Toggle>
      {:else}
        <Toggle {appearance} {size} {disabled} bind:pressed>Bold</Toggle>
      {/if}
      <Typography class="interaction-result" aria-live="polite">
        Bold is {pressed ? 'on' : 'off'}
      </Typography>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <Select label="Size" bind:value={size}>
          <option value="compact">Compact</option>
          <option value="standard">Standard</option>
          <option value="large">Large</option>
        </Select>
        <Select label="Appearance" bind:value={appearance}>
          <option value="ghost">Ghost</option>
          <option value="secondary">Secondary</option>
        </Select>
        <Checkbox label="Pressed" size="compact" bind:checked={pressed} />
        <Checkbox label="Icon only" size="compact" bind:checked={iconOnly} />
        <Checkbox label="Disabled" size="compact" bind:checked={disabled} />
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
        <li>Use Toggle for an independent action with a persistent on state</li>
        <li>Use Button for an action that completes immediately</li>
        <li>Use Switch for a setting that takes effect immediately</li>
        <li>Keep the label stable when the pressed state changes</li>
        <li>Use icon-only toggles for familiar actions with clear names</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Renders a native button with its state in aria-pressed</li>
        <li>Space and Enter change the pressed state</li>
        <li>Icon-only toggles require an accessible label</li>
        <li>State remains visible through colour and button shape</li>
        <li>Forced-colour mode maps the pressed state to system colours</li>
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
    aria-label="Toggle API table"
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
            ><Typography variant="inline-code">pressed</Typography></th
          >
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">false</Typography></td>
          <td>Supports two-way pressed-state binding</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">appearance</Typography></th
          >
          <td
            ><Typography variant="inline-code">'ghost' | 'secondary'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'ghost'</Typography></td>
          <td>Uses the matching Button appearance</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">size</Typography></th
          >
          <td><Typography variant="inline-code">ToggleSize</Typography></td>
          <td><Typography variant="inline-code">'standard'</Typography></td>
          <td>Sets labelled or icon-only Button sizing</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">disabled</Typography></th
          >
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">false</Typography></td>
          <td>Prevents interaction while preserving state</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">children</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Required</td>
          <td>Provides the visible label or icon</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native button attributes and event handlers pass through to the control
  </Typography>
</section>
