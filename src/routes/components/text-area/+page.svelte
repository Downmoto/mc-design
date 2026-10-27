<script lang="ts">
  import {
    Checkbox,
    Select,
    TextArea,
    TextInput,
    Typography,
    type TextAreaSize,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let value = $state('');
  let label = $state('Project notes');
  let description = $state('Add context for collaborators');
  let placeholder = $state('Describe the project');
  let size = $state<TextAreaSize>('standard');
  let disabled = $state(false);
  let readonly = $state(false);
  let required = $state(false);
  let showError = $state(false);
  let error = $derived(showError ? 'Add a short project description' : '');
</script>

<svelte:head>
  <title>Text area · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Inputs"
  title="Text area"
  description="Collects multiple lines of text with a visible label and nearby guidance or validation feedback"
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
      <div class="text-area-sample">
        <TextArea
          bind:value
          {label}
          {description}
          {placeholder}
          {size}
          {disabled}
          {readonly}
          {required}
          {error}
        />
      </div>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <TextInput label="Label" bind:value={label} maxlength={40} />
      <TextInput label="Description" bind:value={description} maxlength={80} />
      <TextInput label="Placeholder" bind:value={placeholder} maxlength={80} />
      <Select label="Size" bind:value={size}>
        <option value="standard">Standard</option>
        <option value="compact">Compact</option>
      </Select>
      <Checkbox label="Required" size="compact" bind:checked={required} />
      <Checkbox label="Read only" size="compact" bind:checked={readonly} />
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
        <li>Use Text area when the response may span multiple lines</li>
        <li>Keep the visible label concise and specific</li>
        <li>Use description text for format or consequence guidance</li>
        <li>Set rows when the expected response needs more initial space</li>
        <li>Allow vertical resizing so people can reveal more of their text</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>
          The visible label is programmatically associated with the control
        </li>
        <li>Description and error text are connected with aria-describedby</li>
        <li>Errors set aria-invalid and are announced politely</li>
        <li>The message area keeps the field height stable across states</li>
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
    aria-label="Text area API table"
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
            ><Typography variant="inline-code">size</Typography></th
          >
          <td
            ><Typography variant="inline-code"
              >'compact' | 'standard'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'standard'</Typography></td>
          <td>Sets the default visible rows and minimum height</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">rows</Typography></th
          >
          <td><Typography variant="inline-code">number</Typography></td>
          <td>Four or two by size</td>
          <td>Overrides the default number of visible lines</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">value</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Empty</td>
          <td>Supports two-way binding</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native textarea attributes and event handlers pass through to the control
  </Typography>
</section>

<style>
  .text-area-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }
</style>
