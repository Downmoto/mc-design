<script lang="ts">
  import {
    Checkbox,
    RadioGroup,
    Select,
    TextInput,
    Typography,
    type RadioGroupSize,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const themeOptions = [
    { label: 'Dark', value: 'dark' },
    { label: 'Light', value: 'light' },
    {
      description: 'Follow the operating system setting',
      label: 'System',
      value: 'system',
    },
  ];
  const themeOptionsWithoutDescriptions = themeOptions.map(
    ({ label, value }) => ({ label, value }),
  );
  const tokenMapping = [
    {
      role: 'Circle and mark sizes',
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
    { role: 'Spacing', tokens: ['space-1', 'space-2'] },
    {
      role: 'Response',
      tokens: ['motion-duration-direct', 'motion-easing-default'],
    },
  ];

  let label = $state('Theme');
  let value = $state('system');
  let size = $state<RadioGroupSize>('standard');
  let disabled = $state(false);
  let required = $state(false);
  let showError = $state(false);
  let error = $derived(showError ? 'Choose a theme' : '');
  let exampleCode = $derived(
    [
      '<RadioGroup',
      `  label="${label || 'Label'}"`,
      '  options={themeOptions}',
      '  bind:value',
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
  <title>Radio group · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Inputs"
  title="Radio group"
  description="Chooses one option from a visible set of mutually exclusive choices"
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
      <div class="radio-group-sample">
        <RadioGroup
          bind:value
          {label}
          options={themeOptions}
          {size}
          {disabled}
          {required}
          {error}
        />
      </div>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <TextInput label="Label" bind:value={label} maxlength={40} />
      <Select label="Selected value" bind:value>
        {#each themeOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
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
      <div class="radio-group-sample">
        <RadioGroup label="Theme" options={themeOptions} value="dark" />
      </div>
    </article>
    <article class="specimen">
      <div class="radio-group-sample">
        <RadioGroup
          label="Theme"
          options={themeOptions}
          value="light"
          size="compact"
        />
      </div>
    </article>
    <article class="specimen">
      <div class="radio-group-sample">
        <RadioGroup
          label="Theme"
          options={themeOptionsWithoutDescriptions}
          value="system"
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
      <div class="radio-group-sample">
        <RadioGroup label="Theme" options={themeOptions} value="system" />
      </div>
    </article>
    <article class="specimen">
      <div class="radio-group-sample">
        <RadioGroup
          label="Theme"
          options={themeOptions}
          error="Choose a theme"
          required
        />
      </div>
    </article>
    <article class="specimen">
      <div class="radio-group-sample">
        <RadioGroup
          label="Theme"
          options={themeOptions}
          value="dark"
          disabled
        />
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
        <li>Use Radio group when one choice must be made from a visible set</li>
        <li>Use Select when the option set is long or space is constrained</li>
        <li>Write options so each label is distinct and concise</li>
        <li>Provide a default when one option is safe for most people</li>
        <li>Keep options in a predictable order</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>The native fieldset and legend provide the group name</li>
        <li>Arrow keys move selection within the native radio group</li>
        <li>Each visible option label is a pointer target</li>
        <li>Descriptions and errors are connected with aria-describedby</li>
        <li>Selection includes a persistent dot inside the radio circle</li>
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
        aria-label="Radio group API table"
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
              <td>Provides the visible group name</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">options</Typography></th
              >
              <td
                ><Typography variant="inline-code">RadioOption[]</Typography
                ></td
              >
              <td>Required</td>
              <td
                >Defines option labels, values, descriptions, and disabled
                states</td
              >
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">value</Typography></th
              >
              <td><Typography variant="inline-code">string</Typography></td>
              <td>Unset</td>
              <td>Supports two-way selected-value binding</td>
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
                ><Typography variant="inline-code">size</Typography></th
              >
              <td
                ><Typography variant="inline-code"
                  >'compact' | 'standard'</Typography
                ></td
              >
              <td><Typography variant="inline-code">'standard'</Typography></td>
              <td>Sets the option circle and mark sizes</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Typography class="table-note" variant="muted">
        Native fieldset attributes and event handlers pass through to the group
      </Typography>

      <Typography variant="h3">Token mapping</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Radio group token mapping table"
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
  .radio-group-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }
</style>
