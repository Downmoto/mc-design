<script lang="ts">
  import {
    Checkbox,
    Select,
    TextInput,
    Typography,
    type SelectSize,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const tokenMapping = [
    {
      role: 'Control heights',
      tokens: ['size-control-compact', 'size-control-standard'],
    },
    {
      role: 'Indicator sizes',
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

  let value = $state('system');
  let label = $state('Theme');
  let description = $state('Choose how the interface sets its appearance');
  let size = $state<SelectSize>('standard');
  let disabled = $state(false);
  let required = $state(false);
  let showError = $state(false);
  let error = $derived(showError ? 'Choose a theme' : '');
  let exampleCode = $derived(
    [
      '<Select',
      `  label="${label || 'Label'}"`,
      description ? `  description="${description}"` : '',
      size === 'compact' ? '  size="compact"' : '',
      disabled ? '  disabled' : '',
      required ? '  required' : '',
      error ? `  error="${error}"` : '',
      '>',
      '  <option value="dark">Dark</option>',
      '  <option value="light">Light</option>',
      '  <option value="system">System</option>',
      '</Select>',
    ]
      .filter(Boolean)
      .join('\n'),
  );
</script>

<svelte:head>
  <title>Select · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Inputs"
  title="Select"
  description="Chooses one value from a known set through the platform-native option menu"
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
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <TextInput label="Label" bind:value={label} maxlength={40} />
      <TextInput label="Description" bind:value={description} maxlength={80} />
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
      <div class="select-sample">
        <Select label="Theme" description="Standard size" value="system">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="system">System</option>
        </Select>
      </div>
    </article>
    <article class="specimen">
      <div class="select-sample">
        <Select
          label="Theme"
          description="Matches compact controls"
          size="compact"
          value="dark"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="system">System</option>
        </Select>
      </div>
    </article>
    <article class="specimen">
      <div class="select-sample">
        <Select label="Export format" description="Options may be grouped">
          <optgroup label="Images">
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </optgroup>
          <optgroup label="Documents">
            <option value="pdf">PDF</option>
          </optgroup>
        </Select>
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
      <div class="select-sample">
        <Select label="Default" value="a">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </Select>
      </div>
    </article>
    <article class="specimen">
      <div class="select-sample">
        <Select label="Required" required value="">
          <option value="" disabled>Choose an option</option>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </Select>
      </div>
    </article>
    <article class="specimen">
      <div class="select-sample">
        <Select
          label="Format"
          error="Choose an export format"
          required
          value=""
        >
          <option value="" disabled>Choose a format</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
        </Select>
      </div>
    </article>
    <article class="specimen">
      <div class="select-sample">
        <Select label="Disabled" disabled value="a">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </Select>
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
        <li>The platform supplies keyboard and touch menu behaviour</li>
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
        Native select attributes and event handlers pass through to the control
      </Typography>

      <Typography variant="h3">Token mapping</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Select token mapping table"
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
  .select-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }
</style>
