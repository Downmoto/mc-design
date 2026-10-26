<script lang="ts">
  import {
    Checkbox,
    Select,
    TextInput,
    Typography,
    type CheckboxSize,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const tokenMapping = [
    {
      role: 'Control heights',
      tokens: ['size-control-compact', 'size-control-standard'],
    },
    {
      role: 'Box and mark sizes',
      tokens: ['size-icon-compact', 'size-icon-standard'],
    },
    {
      role: 'Text',
      tokens: ['typography-label-*', 'typography-caption-*'],
    },
    { role: 'Surface', tokens: ['colour-background'] },
    {
      role: 'Content',
      tokens: ['colour-text-primary', 'colour-text-secondary'],
    },
    { role: 'Selection', tokens: ['colour-interactive'] },
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
    { role: 'Spacing', tokens: ['space-1', 'space-2'] },
    {
      role: 'Response',
      tokens: ['motion-duration-direct', 'motion-easing-default'],
    },
  ];

  let checked = $state(true);
  let indeterminate = $state(false);
  let label = $state('Include metadata');
  let size = $state<CheckboxSize>('standard');
  let disabled = $state(false);
  let required = $state(false);
  let showError = $state(false);
  let error = $derived(showError ? 'Choose whether to include metadata' : '');
  let exampleCode = $derived(
    [
      '<Checkbox',
      `  label="${label || 'Label'}"`,
      checked ? '  checked' : '',
      indeterminate ? '  indeterminate' : '',
      size === 'compact' ? '  size="compact"' : '',
      disabled ? '  disabled' : '',
      required ? '  required' : '',
      error ? `  error="${error}"` : '',
      '/>',
    ]
      .filter(Boolean)
      .join('\n'),
  );
</script>

<svelte:head>
  <title>Checkbox · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Inputs"
  title="Checkbox"
  description="Toggles an independent option between selected and unselected states"
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
      <div class="checkbox-sample">
        <Checkbox
          bind:checked
          bind:indeterminate
          {label}
          {size}
          {disabled}
          {required}
          {error}
        />
      </div>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <TextInput label="Label" bind:value={label} maxlength={40} />
      <Select label="Size" bind:value={size}>
        <option value="standard">Standard</option>
        <option value="compact">Compact</option>
      </Select>
      <Checkbox label="Checked" size="compact" bind:checked />
      <Checkbox
        label="Indeterminate"
        size="compact"
        bind:checked={indeterminate}
      />
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
      <div class="checkbox-sample">
        <Checkbox label="Include metadata" checked />
      </div>
    </article>
    <article class="specimen">
      <div class="checkbox-sample">
        <Checkbox label="Include metadata" size="compact" checked />
      </div>
    </article>
    <article class="specimen">
      <div class="checkbox-sample">
        <Checkbox label="Select all files" indeterminate />
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
      <div class="checkbox-sample">
        <Checkbox label="Unchecked" />
      </div>
    </article>
    <article class="specimen">
      <div class="checkbox-sample">
        <Checkbox label="Checked" checked />
      </div>
    </article>
    <article class="specimen">
      <div class="checkbox-sample">
        <Checkbox label="Indeterminate" indeterminate />
      </div>
    </article>
    <article class="specimen">
      <div class="checkbox-sample">
        <Checkbox label="Accept licence" required />
      </div>
    </article>
    <article class="specimen">
      <div class="checkbox-sample">
        <Checkbox
          label="Accept licence"
          error="Accept the licence to continue"
          required
        />
      </div>
    </article>
    <article class="specimen">
      <div class="checkbox-sample">
        <Checkbox label="Disabled" checked disabled />
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
        <li>Use Checkbox for an independent option that may be on or off</li>
        <li>Write the label as a clear affirmative statement</li>
        <li>Use indeterminate only for a parent controlling mixed children</li>
        <li>Keep the entire visible label clickable</li>
        <li>Use Radio group when one option must be chosen from a set</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>The native checkbox preserves Space key behaviour</li>
        <li>
          The visible label provides the accessible name and pointer target
        </li>
        <li>Error text is connected with aria-describedby</li>
        <li>Errors set aria-invalid and are announced politely</li>
        <li>Selection always includes a persistent check or mixed mark</li>
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
        aria-label="Checkbox API table"
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
                ><Typography variant="inline-code">error</Typography></th
              >
              <td><Typography variant="inline-code">string</Typography></td>
              <td>Empty</td>
              <td>Provides validation feedback</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">checked</Typography></th
              >
              <td><Typography variant="inline-code">boolean</Typography></td>
              <td>False</td>
              <td>Supports two-way selected-state binding</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">indeterminate</Typography
                ></th
              >
              <td><Typography variant="inline-code">boolean</Typography></td>
              <td>False</td>
              <td>Represents a parent with mixed child selection</td>
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
              <td>Sets the pointer target, box, and mark sizes</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Typography class="table-note" variant="muted">
        Native checkbox attributes and event handlers pass through to the
        control
      </Typography>

      <Typography variant="h3">Token mapping</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Checkbox token mapping table"
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
  .checkbox-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }

  .playground__preview .checkbox-sample {
    display: grid;
    align-content: start;
    min-block-size: calc(
      var(--mc-size-target-minimum) + var(--mc-typography-caption-size) *
        var(--mc-typography-caption-line-height)
    );
  }
</style>
