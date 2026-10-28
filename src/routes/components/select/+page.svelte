<script lang="ts">
  import {
    Card,
    CardContent,
    CardHero,
    Checkbox,
    Select,
    TextInput,
    Typography,
    type SelectSize,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let value = $state('system');
  let label = $state('Theme');
  let description = $state('Choose how the interface sets its appearance');
  let size = $state<SelectSize>('standard');
  let disabled = $state(false);
  let required = $state(false);
  let showError = $state(false);
  let error = $derived(showError ? 'Choose a theme' : '');
</script>

<svelte:head>
  <title>Select · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Inputs"
  title="Select"
  description="Chooses one value from a known set through the shared listbox surface"
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
      <div class="select-sample">
        <Select
          bind:value
          {label}
          {description}
          {size}
          {disabled}
          {required}
          {error}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="system">System</option>
        </Select>
      </div>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <TextInput label="Label" bind:value={label} maxlength={40} />
        <TextInput
          label="Description"
          bind:value={description}
          maxlength={80}
        />
        <Select label="Selected option" bind:value>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="system">System</option>
        </Select>
        <Select label="Size" bind:value={size}>
          <option value="standard">Standard</option>
          <option value="compact">Compact</option>
        </Select>
        <Checkbox label="Required" size="compact" bind:checked={required} />
        <Checkbox label="Disabled" size="compact" bind:checked={disabled} />
        <Checkbox label="Error" size="compact" bind:checked={showError} />
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
        <li>Use Select for one choice from a known, manageable option set</li>
        <li>Write options as parallel, concise phrases</li>
        <li>Order options logically or by expected frequency</li>
        <li>Group related options with native optgroup elements</li>
        <li>Use a disabled empty option when an explicit choice is required</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>
          The visible label is programmatically associated with the control
        </li>
        <li>Arrow keys move through options without moving DOM focus</li>
        <li>Enter or Space confirms an option and Escape closes the listbox</li>
        <li>Description and error text are connected with aria-describedby</li>
        <li>Errors set aria-invalid and are announced politely</li>
        <li>The required indicator follows the active consumer colour</li>
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
    aria-label="Select API table"
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
            ><Typography variant="inline-code">children</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Required</td>
          <td>Provides native option and optgroup elements</td>
        </tr>
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
            ><Typography variant="inline-code">size</Typography></th
          >
          <td
            ><Typography variant="inline-code"
              >'compact' | 'standard'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'standard'</Typography></td>
          <td>Sets the control height and indicator size</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">value</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>First option</td>
          <td>Supports two-way value binding</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native select attributes and event handlers pass through to the form
    control; the visible combobox uses the shared Menu surface
  </Typography>
</section>

<style>
  .select-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }
</style>
