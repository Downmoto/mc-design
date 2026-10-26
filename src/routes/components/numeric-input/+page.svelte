<script lang="ts">
  import {
    Checkbox,
    NumericInput,
    Select,
    Typography,
    type NumericInputSize,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const tokenMapping = [
    {
      role: 'Control heights',
      tokens: ['size-control-compact', 'size-control-standard'],
    },
    {
      role: 'Stepper icons',
      tokens: ['size-icon-compact', 'size-icon-standard'],
    },
    {
      role: 'Text',
      tokens: [
        'typography-body-*',
        'typography-label-*',
        'typography-caption-*',
      ],
    },
    {
      role: 'Surface',
      tokens: ['colour-background', 'colour-surface'],
    },
    {
      role: 'Content',
      tokens: ['colour-text-primary', 'colour-text-secondary'],
    },
    { role: 'Product colour', tokens: ['colour-interactive'] },
    { role: 'Error', tokens: ['colour-danger'] },
    {
      role: 'Boundary',
      tokens: [
        'colour-border',
        'border-width-default',
        'border-width-emphasised',
      ],
    },
    { role: 'Shape', tokens: ['radius-1'] },
    { role: 'Spacing', tokens: ['space-1', 'space-2', 'space-3'] },
    {
      role: 'Response',
      tokens: ['motion-duration-direct', 'motion-easing-default'],
    },
  ];

  let value = $state<number | undefined>(50);
  let label = $state('Opacity');
  let description = $state('Enter a value from 0 to 100');
  let prefix = $state('');
  let suffix = $state('%');
  let minimum = $state(0);
  let maximum = $state(100);
  let step = $state(1);
  let size = $state<NumericInputSize>('standard');
  let disabled = $state(false);
  let readonly = $state(false);
  let required = $state(false);
  let showError = $state(false);
  let error = $derived(showError ? 'Enter a value from 0 to 100' : '');
  let exampleCode = $derived(
    [
      '<NumericInput',
      `  label="${label || 'Label'}"`,
      description ? `  description="${description}"` : '',
      prefix ? `  prefix="${prefix}"` : '',
      suffix ? `  suffix="${suffix}"` : '',
      `  min={${minimum}}`,
      `  max={${maximum}}`,
      `  step={${step}}`,
      size === 'compact' ? '  size="compact"' : '',
      disabled ? '  disabled' : '',
      readonly ? '  readonly' : '',
      required ? '  required' : '',
      error ? `  error="${error}"` : '',
      '/>',
    ]
      .filter(Boolean)
      .join('\n'),
  );
</script>

<svelte:head>
  <title>Numeric input · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Inputs"
  title="Numeric input"
  description="Collects a numeric value with native constraints, stepping, and field feedback"
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
      <div class="numeric-input-sample">
        <NumericInput
          bind:value
          {label}
          {description}
          {prefix}
          {suffix}
          min={minimum}
          max={maximum}
          {step}
          {size}
          {disabled}
          {readonly}
          {required}
          {error}
        />
      </div>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <label>
        <span>Label</span>
        <input bind:value={label} maxlength="40" />
      </label>
      <label>
        <span>Description</span>
        <input bind:value={description} maxlength="80" />
      </label>
      <label>
        <span>Prefix</span>
        <input bind:value={prefix} maxlength="8" />
      </label>
      <label>
        <span>Suffix</span>
        <input bind:value={suffix} maxlength="8" />
      </label>
      <label>
        <span>Minimum</span>
        <input type="number" bind:value={minimum} />
      </label>
      <label>
        <span>Maximum</span>
        <input type="number" bind:value={maximum} />
      </label>
      <label>
        <span>Step</span>
        <input type="number" min="0.01" step="0.01" bind:value={step} />
      </label>
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

  <CodeExample code={exampleCode} />
</section>

<section
  class="workbench-section"
  id="variants"
  aria-labelledby="variants-title"
>
  <div class="section-heading">
    <Typography id="variants-title" variant="h2">Variants</Typography>
  </div>

  <div class="matrix">
    <article class="specimen">
      <div class="numeric-input-sample">
        <NumericInput
          label="Quantity"
          description="Whole numbers from 1 to 99"
          min={1}
          max={99}
          value={3}
        />
      </div>
    </article>
    <article class="specimen">
      <div class="numeric-input-sample">
        <NumericInput
          label="Compact quantity"
          description="Matches compact controls"
          min={1}
          size="compact"
          suffix="px"
          value={3}
        />
      </div>
    </article>
    <article class="specimen">
      <div class="numeric-input-sample">
        <NumericInput
          label="Price"
          description="Prefixes and decimal steps are supported"
          min={0}
          prefix="$"
          step={0.01}
          value={12.5}
        />
      </div>
    </article>
  </div>
</section>

<section class="workbench-section" id="states" aria-labelledby="states-title">
  <div class="section-heading">
    <Typography id="states-title" variant="h2">States</Typography>
  </div>

  <div class="matrix">
    <article class="specimen">
      <div class="numeric-input-sample">
        <NumericInput label="Default" value={12} />
      </div>
    </article>
    <article class="specimen">
      <div class="numeric-input-sample">
        <NumericInput label="Required" required min={1} />
      </div>
    </article>
    <article class="specimen">
      <div class="numeric-input-sample">
        <NumericInput
          label="Quantity"
          value={0}
          min={1}
          error="Enter a value of 1 or more"
        />
      </div>
    </article>
    <article class="specimen">
      <div class="numeric-input-sample">
        <NumericInput label="Read only" value={12} readonly />
      </div>
    </article>
    <article class="specimen">
      <div class="numeric-input-sample">
        <NumericInput label="Disabled" value={12} disabled />
      </div>
    </article>
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
        <li>Use Numeric input when only numeric values are valid</li>
        <li>Set minimum, maximum, and step constraints where they are known</li>
        <li>Use short prefixes and suffixes for familiar units or symbols</li>
        <li>Explain unfamiliar units in the label or description</li>
        <li>
          Use Text input for numeric-looking identifiers such as postal codes
        </li>
        <li>Allow direct typing alongside the browser step controls</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>
          The visible label is programmatically associated with the control
        </li>
        <li>The native spinbutton supports keyboard stepping</li>
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

  <details class="reference-details">
    <summary>API and token reference</summary>
    <div class="reference-details__content">
      <Typography variant="h3">API</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Numeric input API table"
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
              <td>Sets the control height</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">value</Typography></th
              >
              <td><Typography variant="inline-code">number</Typography></td>
              <td>Empty</td>
              <td>Supports two-way numeric value binding</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">prefix</Typography></th
              >
              <td><Typography variant="inline-code">string</Typography></td>
              <td>Empty</td>
              <td>Adds text before the value</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">suffix</Typography></th
              >
              <td><Typography variant="inline-code">string</Typography></td>
              <td>Empty</td>
              <td>Adds text after the value</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">min</Typography></th
              >
              <td><Typography variant="inline-code">number</Typography></td>
              <td>Unbounded</td>
              <td>Sets the native minimum constraint</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">max</Typography></th
              >
              <td><Typography variant="inline-code">number</Typography></td>
              <td>Unbounded</td>
              <td>Sets the native maximum constraint</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">step</Typography></th
              >
              <td
                ><Typography variant="inline-code">number | 'any'</Typography
                ></td
              >
              <td>One</td>
              <td>Sets the native keyboard and stepper increment</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Typography class="table-note" variant="muted">
        Native number input attributes and event handlers pass through to the
        control
      </Typography>

      <Typography variant="h3">Token mapping</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Numeric input token mapping table"
        tabindex="0"
      >
        <table>
          <thead>
            <tr><th scope="col">Role</th><th scope="col">Token</th></tr>
          </thead>
          <tbody>
            {#each tokenMapping as mapping}
              <tr>
                <th scope="row">{mapping.role}</th>
                <td>
                  {#each mapping.tokens as token, index}
                    <Typography variant="inline-code">{token}</Typography
                    >{#if index < mapping.tokens.length - 1},
                    {/if}
                  {/each}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </details>
</section>

<style>
  .numeric-input-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }
</style>
