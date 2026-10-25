<script lang="ts">
  import { TextArea, Typography, type TextAreaSize } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const tokenMapping = [
    {
      role: 'Minimum heights',
      tokens: ['size-control-compact', 'size-control-large'],
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
  let label = $state('Project notes');
  let description = $state('Add context for collaborators');
  let placeholder = $state('Describe the project');
  let size = $state<TextAreaSize>('standard');
  let disabled = $state(false);
  let readonly = $state(false);
  let required = $state(false);
  let showError = $state(false);
  let error = $derived(showError ? 'Add a short project description' : '');
  let exampleCode = $derived(
    [
      '<TextArea',
      `  label="${label || 'Label'}"`,
      description ? `  description="${description}"` : '',
      placeholder ? `  placeholder="${placeholder}"` : '',
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
      <label>
        <span>Label</span>
        <input bind:value={label} maxlength="40" />
      </label>
      <label>
        <span>Description</span>
        <input bind:value={description} maxlength="80" />
      </label>
      <label>
        <span>Placeholder</span>
        <input bind:value={placeholder} maxlength="80" />
      </label>
      <label>
        <span>Size</span>
        <select bind:value={size}>
          <option value="standard">Standard</option>
          <option value="compact">Compact</option>
        </select>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" bind:checked={required} />
        <span>Required</span>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" bind:checked={readonly} />
        <span>Read only</span>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" bind:checked={disabled} />
        <span>Disabled</span>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" bind:checked={showError} />
        <span>Error</span>
      </label>
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
      <div class="text-area-sample">
        <TextArea
          label="Project notes"
          description="Four lines by default"
          placeholder="Describe the project"
        />
      </div>
    </article>
    <article class="specimen">
      <div class="text-area-sample">
        <TextArea
          label="Compact notes"
          description="Two lines by default"
          placeholder="Add a note"
          size="compact"
        />
      </div>
    </article>
    <article class="specimen">
      <div class="text-area-sample">
        <TextArea
          label="Long response"
          description="Native rows override the size default"
          placeholder="Share detailed feedback"
          rows={6}
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
      <div class="text-area-sample">
        <TextArea label="Default" value="Editable project context" />
      </div>
    </article>
    <article class="specimen">
      <div class="text-area-sample">
        <TextArea label="Required" required placeholder="Required response" />
      </div>
    </article>
    <article class="specimen">
      <div class="text-area-sample">
        <TextArea
          label="Project description"
          value="Too short"
          error="Add a short project description"
        />
      </div>
    </article>
    <article class="specimen">
      <div class="text-area-sample">
        <TextArea label="Read only" value="Approved project context" readonly />
      </div>
    </article>
    <article class="specimen">
      <div class="text-area-sample">
        <TextArea label="Disabled" value="Unavailable" disabled />
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

  <details class="reference-details">
    <summary>API and token reference</summary>
    <div class="reference-details__content">
      <Typography variant="h3">API</Typography>
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
        Native textarea attributes and event handlers pass through to the
        control
      </Typography>

      <Typography variant="h3">Token mapping</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Text area token mapping table"
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
  .text-area-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }
</style>
