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
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  type IconPosition = 'both' | 'leading' | 'none' | 'trailing';

  const tokenMapping = [
    {
      role: 'Control heights',
      tokens: ['size-control-compact', 'size-control-standard'],
    },
    {
      role: 'Icon sizes',
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
  let exampleCode = $derived(
    `${iconPosition === 'leading' || iconPosition === 'both' ? '{#snippet searchIcon()}<MagnifyingGlassIcon />{/snippet}\n' : ''}${iconPosition === 'trailing' || iconPosition === 'both' ? '{#snippet arrowIcon()}<ArrowRightIcon />{/snippet}\n' : ''}${iconPosition !== 'none' ? '\n' : ''}${[
      '<TextInput',
      `  label="${label || 'Label'}"`,
      description ? `  description="${description}"` : '',
      placeholder ? `  placeholder="${placeholder}"` : '',
      size === 'compact' ? '  size="compact"' : '',
      iconPosition === 'leading' || iconPosition === 'both'
        ? '  leadingIcon={searchIcon}'
        : '',
      iconPosition === 'trailing' || iconPosition === 'both'
        ? '  trailingIcon={arrowIcon}'
        : '',
      disabled ? '  disabled' : '',
      readonly ? '  readonly' : '',
      required ? '  required' : '',
      error ? `  error="${error}"` : '',
      '/>',
    ]
      .filter(Boolean)
      .join('\n')}`,
  );
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
      <div class="text-input-sample">
        <TextInput
          label="Project name"
          description="Shown throughout the workspace"
          placeholder="Untitled project"
          trailingIcon={arrowIcon}
        />
      </div>
    </article>
    <article class="specimen">
      <div class="text-input-sample">
        <TextInput
          label="Search"
          leadingIcon={searchIcon}
          placeholder="Find components"
          size="compact"
          type="search"
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
      <div class="text-input-sample">
        <TextInput label="Default" value="Editable value" />
      </div>
    </article>
    <article class="specimen">
      <div class="text-input-sample">
        <TextInput label="Required" required placeholder="Required value" />
      </div>
    </article>
    <article class="specimen">
      <div class="text-input-sample">
        <TextInput
          label="Email address"
          value="invalid-address"
          error="Enter a valid email address"
          type="email"
        />
      </div>
    </article>
    <article class="specimen">
      <div class="text-input-sample">
        <TextInput label="Read only" value="MemoryCore" readonly />
      </div>
    </article>
    <article class="specimen">
      <div class="text-input-sample">
        <TextInput label="Disabled" value="Unavailable" disabled />
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

  <details class="reference-details">
    <summary>API and token reference</summary>
    <div class="reference-details__content">
      <Typography variant="h3">API</Typography>
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
              <td
                ><Typography variant="inline-code">TextInputType</Typography
                ></td
              >
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

      <Typography variant="h3">Token mapping</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Text input token mapping table"
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
  .text-input-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }
</style>
