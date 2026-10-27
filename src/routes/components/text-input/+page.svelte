<script lang="ts">
  import ArrowRightIcon from 'phosphor-svelte/lib/ArrowRightIcon';
  import MagnifyingGlassIcon from 'phosphor-svelte/lib/MagnifyingGlassIcon';

  import {
    Checkbox,
    Select,
    TextInput,
    Typography,
    type TextInputSize,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  type IconPosition = 'both' | 'leading' | 'none' | 'trailing';

  let value = $state('');
  let label = $state('Email address');
  let description = $state('Used for account notices');
  let placeholder = $state('name@example.com');
  let size = $state<TextInputSize>('standard');
  let disabled = $state(false);
  let readonly = $state(false);
  let required = $state(false);
  let showError = $state(false);
  let iconPosition = $state<IconPosition>('none');
  let error = $derived(showError ? 'Enter a valid email address' : '');
</script>

<svelte:head>
  <title>Text input · MemoryCore component library</title>
</svelte:head>

{#snippet searchIcon()}<MagnifyingGlassIcon />{/snippet}
{#snippet arrowIcon()}<ArrowRightIcon />{/snippet}

<ComponentHeader
  category="Inputs"
  title="Text input"
  description="Collects a single line of text with a visible label and nearby guidance or validation feedback"
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
      <div class="text-input-sample">
        <TextInput
          bind:value
          {label}
          {description}
          {placeholder}
          {size}
          leadingIcon={iconPosition === 'leading' || iconPosition === 'both'
            ? searchIcon
            : undefined}
          trailingIcon={iconPosition === 'trailing' || iconPosition === 'both'
            ? arrowIcon
            : undefined}
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
      <Select label="Icons" bind:value={iconPosition}>
        <option value="none">None</option>
        <option value="leading">Leading</option>
        <option value="trailing">Trailing</option>
        <option value="both">Both</option>
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
        <li>Use a concise label that remains visible while typing</li>
        <li>Use description text for format or consequence guidance</li>
        <li>Use the compact size only in dense Tool interfaces</li>
        <li>
          Choose the native text-like type that matches the expected value
        </li>
        <li>Use leading or trailing icons as concise visual reinforcement</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>The visible label is programmatically associated with the input</li>
        <li>Description and error text are connected with aria-describedby</li>
        <li>Errors set aria-invalid and are announced politely</li>
        <li>The message area keeps the field height stable across states</li>
        <li>Input icons are decorative and hidden from assistive technology</li>
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
    aria-label="Text input API table"
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
          <td>Selects the control height</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">leadingIcon</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Empty</td>
          <td>Adds a decorative icon before the value</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">trailingIcon</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Empty</td>
          <td>Adds a decorative icon after the value</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">type</Typography></th
          >
          <td><Typography variant="inline-code">TextInputType</Typography></td>
          <td><Typography variant="inline-code">'text'</Typography></td>
          <td>Selects a native text-like input type</td>
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
    Native input attributes and event handlers pass through to the control
  </Typography>
</section>

<style>
  .text-input-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }
</style>
