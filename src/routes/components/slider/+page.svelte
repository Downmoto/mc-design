<script lang="ts">
  import {
    Checkbox,
    NumericInput,
    Select,
    Slider,
    TextInput,
    Typography,
    type SliderSize,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const tokenMapping = [
    {
      role: 'Control and thumb sizes',
      tokens: [
        'size-control-compact',
        'size-control-standard',
        'size-icon-compact',
        'size-icon-standard',
      ],
    },
    {
      role: 'Text',
      tokens: [
        'typography-label-*',
        'typography-caption-*',
        'typography-code-*',
      ],
    },
    { role: 'Surface', tokens: ['colour-surface'] },
    {
      role: 'Content',
      tokens: ['colour-text-primary', 'colour-text-secondary'],
    },
    { role: 'Interaction', tokens: ['colour-interactive'] },
    { role: 'Error', tokens: ['colour-danger'] },
    {
      role: 'Boundary',
      tokens: [
        'colour-border',
        'border-width-default',
        'border-width-emphasised',
      ],
    },
    { role: 'Shape', tokens: ['radius-3'] },
    { role: 'Spacing', tokens: ['space-2'] },
  ];

  let label = $state('Opacity');
  let suffix = $state('%');
  let value = $state(60);
  let min = $state(0);
  let max = $state(100);
  let step = $state(1);
  let showValue = $state(false);
  let size = $state<SliderSize>('standard');
  let disabled = $state(false);
  let showError = $state(false);
  let error = $derived(showError ? 'Choose a value from 20 to 80' : '');
  let exampleCode = $derived(
    [
      '<Slider',
      `  label="${label || 'Label'}"`,
      `  min={${min}}`,
      `  max={${max}}`,
      `  step={${step}}`,
      suffix ? `  suffix="${suffix}"` : '',
      '  bind:value',
      showValue ? '  showValue' : '',
      size === 'compact' ? '  size="compact"' : '',
      disabled ? '  disabled' : '',
      error ? `  error="${error}"` : '',
      '/>',
    ]
      .filter(Boolean)
      .join('\n'),
  );
</script>

<svelte:head>
  <title>Slider · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Inputs"
  title="Slider"
  description="Chooses a numeric value from a bounded continuous range"
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
      <div class="slider-sample">
        <Slider
          bind:value
          {label}
          {suffix}
          {min}
          {max}
          {step}
          {showValue}
          {size}
          {disabled}
          {error}
        />
      </div>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <TextInput label="Label" bind:value={label} maxlength={40} />
      <TextInput label="Suffix" bind:value={suffix} maxlength={8} />
      <NumericInput label="Minimum" bind:value={min} />
      <NumericInput label="Maximum" bind:value={max} />
      <NumericInput label="Step" min={0.01} bind:value={step} />
      <Select label="Size" bind:value={size}>
        <option value="standard">Standard</option>
        <option value="compact">Compact</option>
      </Select>
      <Checkbox label="Disabled" size="compact" bind:checked={disabled} />
      <Checkbox label="Show value" size="compact" bind:checked={showValue} />
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
      <div class="slider-sample">
        <Slider label="Opacity" suffix="%" value={60} showValue />
      </div>
    </article>
    <article class="specimen">
      <div class="slider-sample">
        <Slider
          label="Opacity"
          suffix="%"
          value={60}
          size="compact"
          showValue
        />
      </div>
    </article>
    <article class="specimen">
      <div class="slider-sample">
        <Slider
          label="Brush size"
          min={1}
          max={64}
          suffix=" px"
          value={12}
          showValue
        />
      </div>
    </article>
    <article class="specimen">
      <div class="slider-sample">
        <Slider label="Volume" value={40} />
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
      <div class="slider-sample">
        <Slider label="Minimum" value={0} />
      </div>
    </article>
    <article class="specimen">
      <div class="slider-sample">
        <Slider label="Maximum" value={100} />
      </div>
    </article>
    <article class="specimen">
      <div class="slider-sample">
        <Slider
          label="Opacity"
          error="Choose a value from 20 to 80"
          suffix="%"
          value={10}
        />
      </div>
    </article>
    <article class="specimen">
      <div class="slider-sample">
        <Slider label="Disabled" value={60} disabled />
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
        <li>Use Slider when approximate adjustment within a range is useful</li>
        <li>Use Numeric input when an exact value is the primary task</li>
        <li>Choose bounds and steps that match meaningful values</li>
        <li>Keep the current value visible when precise feedback is useful</li>
        <li>Include units through the suffix when they clarify the value</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>The native range input preserves arrow and paging keys</li>
        <li>The persistent label provides the accessible name</li>
        <li>The value and bounds are exposed through native semantics</li>
        <li>The suffix supplies aria-valuetext for meaningful units</li>
        <li>Errors are connected with aria-describedby</li>
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
        aria-label="Slider API table"
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
                ><Typography variant="inline-code">value</Typography></th
              >
              <td><Typography variant="inline-code">number</Typography></td>
              <td><Typography variant="inline-code">0</Typography></td>
              <td>Supports two-way numeric value binding</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">min / max</Typography></th
              >
              <td><Typography variant="inline-code">number</Typography></td>
              <td><Typography variant="inline-code">0 / 100</Typography></td>
              <td>Sets the inclusive range bounds</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">step</Typography></th
              >
              <td><Typography variant="inline-code">number</Typography></td>
              <td><Typography variant="inline-code">1</Typography></td>
              <td>Sets the value increment</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">suffix</Typography></th
              >
              <td><Typography variant="inline-code">string</Typography></td>
              <td>Empty</td>
              <td>Labels the visible and accessible value unit</td>
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
              <td>Sets the control and thumb sizes</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">showValue</Typography></th
              >
              <td><Typography variant="inline-code">boolean</Typography></td>
              <td><Typography variant="inline-code">false</Typography></td>
              <td>Shows the current value beside the label</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Typography class="table-note" variant="muted">
        Native range attributes and event handlers pass through to the control
      </Typography>

      <Typography variant="h3">Token mapping</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Slider token mapping table"
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
  .slider-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }
</style>
