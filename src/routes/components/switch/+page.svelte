<script lang="ts">
  import {
    Checkbox,
    Select,
    Switch,
    TextInput,
    Typography,
    type SwitchSize,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let checked = $state(true);
  let label = $state('Enable notifications');
  let description = $state('Receive a notice when processing finishes');
  let size = $state<SwitchSize>('standard');
  let disabled = $state(false);
  let required = $state(false);
  let showError = $state(false);
  let error = $derived(showError ? 'Enable this setting to continue' : '');
</script>

<svelte:head>
  <title>Switch · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Inputs"
  title="Switch"
  description="Toggles a setting whose effect applies immediately"
/>

<section
  class="workbench-section"
  id="playground"
  aria-labelledby="playground-title"
>
  <div class="section-heading">
    <Typography id="playground-title" variant="h2">Playground</Typography>
  </div>

  <div class="playground">
    <div class="playground__preview">
      <div class="switch-sample">
        <Switch
          bind:checked
          {label}
          {description}
          {size}
          {disabled}
          {required}
          {error}
        />
      </div>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <TextInput label="Label" bind:value={label} maxlength={40} />
      <TextInput label="Description" bind:value={description} maxlength={80} />
      <Select label="Size" bind:value={size}>
        <option value="standard">Standard</option>
        <option value="compact">Compact</option>
      </Select>
      <Checkbox label="Checked" size="compact" bind:checked />
      <Checkbox label="Required" size="compact" bind:checked={required} />
      <Checkbox label="Disabled" size="compact" bind:checked={disabled} />
      <Checkbox label="Error" size="compact" bind:checked={showError} />
    </form>
  </div>
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
        <li>Use Switch for a setting that takes effect immediately</li>
        <li>Use Checkbox for selections applied through form submission</li>
        <li>Write the label as a clear affirmative statement</li>
        <li>
          Show the current state without requiring separate On and Off text
        </li>
        <li>Keep the entire visible label clickable</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>The native checkbox preserves Space key behaviour</li>
        <li>The switch role communicates on and off state</li>
        <li>The visible label provides the accessible name</li>
        <li>Descriptions and errors are connected with aria-describedby</li>
        <li>Position and colour both communicate the selected state</li>
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
    aria-label="Switch API table"
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
            ><Typography variant="inline-code">label</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Required</td>
          <td>Provides the visible accessible name</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">description</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Empty</td>
          <td>Provides supporting guidance</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">error</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Empty</td>
          <td>Replaces the description with validation feedback</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">checked</Typography></th
          >
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td>False</td>
          <td>Supports two-way on/off state binding</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">size</Typography></th
          >
          <td
            ><Typography variant="inline-code"
              >'compact' | 'standard'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'standard'</Typography></td>
          <td>Sets the track and thumb sizes</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native checkbox attributes and event handlers pass through to the control
  </Typography>
</section>

<style>
  .switch-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }

  .playground__preview .switch-sample {
    display: grid;
    align-content: start;
    min-block-size: calc(
      var(--mc-size-target-minimum) + var(--mc-space-1) +
        var(--mc-typography-caption-size) *
        var(--mc-typography-caption-line-height)
    );
  }
</style>
