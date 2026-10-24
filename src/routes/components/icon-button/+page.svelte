<script lang="ts">
  import {
    type ButtonAppearance,
    type ButtonSize,
    IconButton,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';
  import PlusIcon from '../../_components/icons/PlusIcon.svelte';

  const appearances: { label: string; value: ButtonAppearance }[] = [
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
  ];
  const sizes: { label: string; value: ButtonSize; pixels: string }[] = [
    { label: 'Compact', value: 'compact', pixels: '32 × 32' },
    { label: 'Standard', value: 'standard', pixels: '40 × 40' },
    { label: 'Large', value: 'large', pixels: '48 × 48' },
  ];

  let label = $state('Add item');
  let appearance = $state<ButtonAppearance>('primary');
  let size = $state<ButtonSize>('standard');
  let disabled = $state(false);
  let loading = $state(false);
  let activationCount = $state(0);
  let exampleCode = $derived.by(
    () =>
      `<IconButton label="${label || 'Add item'}"${appearance !== 'primary' ? ` appearance="${appearance}"` : ''}${size !== 'standard' ? ` size="${size}"` : ''}${disabled ? ' disabled' : ''}${loading ? ' loading' : ''}>\n  <PlusIcon />\n</IconButton>`,
  );

  function selectAppearance(event: Event): void {
    appearance = (event.currentTarget as HTMLSelectElement)
      .value as ButtonAppearance;
  }

  function selectSize(event: Event): void {
    size = (event.currentTarget as HTMLSelectElement).value as ButtonSize;
  }
</script>

<svelte:head>
  <title>Icon button · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Actions"
  title="Icon button"
  description="Provides a compact, square action when the icon is widely understood. Every instance requires an accessible name and tooltip"
/>

<section
  class="workbench-section"
  id="playground"
  aria-labelledby="playground-title"
>
  <div class="section-heading">
    <h2 id="playground-title">Playground</h2>
  </div>

  <div class="playground">
    <div class="playground__preview">
      <IconButton
        {appearance}
        {disabled}
        label={label || 'Add item'}
        {loading}
        {size}
        onclick={() => (activationCount += 1)}
      >
        <PlusIcon />
      </IconButton>
      <p class="interaction-result" aria-live="polite">
        Activations: {activationCount}
      </p>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <label>
        <span>Accessible name and tooltip</span>
        <input bind:value={label} maxlength="80" />
      </label>
      <label>
        <span>Appearance</span>
        <select value={appearance} onchange={selectAppearance}>
          {#each appearances as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </label>
      <label>
        <span>Size</span>
        <select value={size} onchange={selectSize}>
          {#each sizes as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" bind:checked={disabled} />
        <span>Disabled</span>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" bind:checked={loading} />
        <span>Loading</span>
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
    <h2 id="variants-title">Variants</h2>
  </div>

  <div class="matrix">
    {#each appearances as appearanceOption}
      {#each sizes as sizeOption}
        <div class="specimen">
          <span class="specimen__label">
            {appearanceOption.label} · {sizeOption.label} · {sizeOption.pixels}
          </span>
          <IconButton
            appearance={appearanceOption.value}
            label={`Add item, ${sizeOption.label.toLowerCase()}`}
            size={sizeOption.value}
          >
            <PlusIcon />
          </IconButton>
        </div>
      {/each}
    {/each}
  </div>
</section>

<section class="workbench-section" id="states" aria-labelledby="states-title">
  <div class="section-heading">
    <h2 id="states-title">States and interactions</h2>
  </div>

  <div class="matrix">
    <div class="specimen">
      <span class="specimen__label">Default</span>
      <IconButton label="Add item"><PlusIcon /></IconButton>
    </div>
    <div class="specimen">
      <span class="specimen__label">Disabled</span>
      <IconButton label="Add item" disabled><PlusIcon /></IconButton>
    </div>
    <div class="specimen">
      <span class="specimen__label">Loading</span>
      <IconButton label="Adding item" loading><PlusIcon /></IconButton>
    </div>
    <div class="specimen specimen--instruction">
      <span class="specimen__label">Interactive</span>
      <IconButton label="Try interactions"><PlusIcon /></IconButton>
      <p>Hover, press, or use Tab followed by Enter or Space</p>
    </div>
  </div>
</section>

<section
  class="workbench-section"
  id="guidance"
  aria-labelledby="guidance-title"
>
  <div class="section-heading">
    <h2 id="guidance-title">Guidance</h2>
  </div>

  <div class="prose-grid">
    <div>
      <h3>Usage</h3>
      <ul>
        <li>Use an icon that is widely understood in the current context</li>
        <li>
          Use Button when a visible text label would improve comprehension
        </li>
        <li>Keep icon buttons square at every supported size</li>
        <li>Place related icon buttons in an action group or toolbar</li>
        <li>Use the Regular Phosphor icon style by default</li>
      </ul>
    </div>
    <div>
      <h3>Accessibility</h3>
      <ul>
        <li>Requires a concise <code>label</code> for its accessible name</li>
        <li>Uses the label as a native tooltip unless one is provided</li>
        <li>Preserves its accessible name and square geometry while loading</li>
        <li>Uses the native button element and keyboard behaviour</li>
        <li>Respects reduced-motion and forced-colour preferences</li>
      </ul>
    </div>
  </div>
</section>

<section
  class="workbench-section"
  id="reference"
  aria-labelledby="reference-title"
>
  <div class="section-heading">
    <h2 id="reference-title">Reference</h2>
  </div>

  <details class="reference-details">
    <summary>API and token reference</summary>
    <div class="reference-details__content">
      <h3>API</h3>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Icon button API table"
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
              <th scope="row"><code>label</code></th>
              <td><code>string</code></td>
              <td>Required</td>
              <td>Sets the accessible name and default tooltip</td>
            </tr>
            <tr>
              <th scope="row"><code>tooltip</code></th>
              <td><code>string</code></td>
              <td><code>label</code></td>
              <td>Overrides tooltip text</td>
            </tr>
            <tr>
              <th scope="row"><code>appearance</code></th>
              <td><code>'primary' | 'secondary'</code></td>
              <td><code>'primary'</code></td>
              <td>Sets visual emphasis</td>
            </tr>
            <tr>
              <th scope="row"><code>size</code></th>
              <td><code>'compact' | 'standard' | 'large'</code></td>
              <td><code>'standard'</code></td>
              <td>Sets equal width and height</td>
            </tr>
            <tr>
              <th scope="row"><code>loading</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Shows progress and prevents activation</td>
            </tr>
            <tr>
              <th scope="row"><code>disabled</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disables the native control</td>
            </tr>
            <tr>
              <th scope="row"><code>children</code></th>
              <td><code>Snippet</code></td>
              <td>Required</td>
              <td>Provides the decorative icon</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="table-note">
        Native button attributes and event handlers pass through
      </p>

      <h3>Token mapping</h3>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Icon button token mapping table"
        tabindex="0"
      >
        <table>
          <thead>
            <tr><th scope="col">Role</th><th scope="col">Token</th></tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Square dimensions</th>
              <td>
                <code>size-control-compact</code>,
                <code>size-control-standard</code>,
                <code>size-control-large</code>
              </td>
            </tr>
            <tr>
              <th scope="row">Icon sizes</th>
              <td>
                <code>size-icon-compact</code>,
                <code>size-icon-standard</code>,
                <code>size-icon-primary</code>
              </td>
            </tr>
            <tr>
              <th scope="row">Product colour</th>
              <td><code>colour-interactive</code></td>
            </tr>
            <tr>
              <th scope="row">Boundary</th>
              <td>
                <code>colour-border</code>,
                <code>border-width-default</code>,
                <code>border-width-emphasised</code>
              </td>
            </tr>
            <tr>
              <th scope="row">Shape</th>
              <td><code>radius-1</code></td>
            </tr>
            <tr>
              <th scope="row">Response</th>
              <td>
                <code>motion-duration-direct</code>,
                <code>motion-easing-default</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>
</section>
