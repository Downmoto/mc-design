<script lang="ts">
  import {
    Button,
    type ButtonAppearance,
    type ButtonSize,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';
  import ArrowRightIcon from '../../_components/icons/ArrowRightIcon.svelte';
  import PlusIcon from '../../_components/icons/PlusIcon.svelte';

  type IconPosition = 'none' | 'leading' | 'trailing' | 'both';

  const appearances: { label: string; value: ButtonAppearance }[] = [
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
  ];
  const sizes: { label: string; value: ButtonSize }[] = [
    { label: 'Compact', value: 'compact' },
    { label: 'Standard', value: 'standard' },
    { label: 'Large', value: 'large' },
  ];

  let label = $state('Save changes');
  let appearance = $state<ButtonAppearance>('primary');
  let size = $state<ButtonSize>('standard');
  let iconPosition = $state<IconPosition>('none');
  let disabled = $state(false);
  let loading = $state(false);
  let activationCount = $state(0);
  let exampleCode = $derived.by(buildExample);

  function selectAppearance(event: Event): void {
    appearance = (event.currentTarget as HTMLSelectElement)
      .value as ButtonAppearance;
  }

  function selectSize(event: Event): void {
    size = (event.currentTarget as HTMLSelectElement).value as ButtonSize;
  }

  function selectIconPosition(event: Event): void {
    iconPosition = (event.currentTarget as HTMLSelectElement)
      .value as IconPosition;
  }

  function buildExample(): string {
    const properties = [
      appearance !== 'primary' ? `appearance="${appearance}"` : '',
      size !== 'standard' ? `size="${size}"` : '',
      disabled ? 'disabled' : '',
      loading ? 'loading' : '',
      iconPosition === 'leading' || iconPosition === 'both'
        ? 'leadingIcon={plusIcon}'
        : '',
      iconPosition === 'trailing' || iconPosition === 'both'
        ? 'trailingIcon={arrowIcon}'
        : '',
    ].filter(Boolean);
    const snippets = [];

    if (iconPosition === 'leading' || iconPosition === 'both') {
      snippets.push('{#snippet plusIcon()}<PlusIcon />{/snippet}');
    }
    if (iconPosition === 'trailing' || iconPosition === 'both') {
      snippets.push('{#snippet arrowIcon()}<ArrowRightIcon />{/snippet}');
    }

    return `${snippets.length ? `${snippets.join('\n')}\n\n` : ''}<Button${properties.length ? ` ${properties.join(' ')}` : ''}>${label}</Button>`;
  }
</script>

<svelte:head>
  <title>Button · MemoryCore component library</title>
</svelte:head>

{#snippet plusIcon()}
  <PlusIcon />
{/snippet}

{#snippet arrowIcon()}
  <ArrowRightIcon />
{/snippet}

<ComponentHeader
  category="Actions"
  title="Button"
  description="Triggers an immediate action with a visible, specific text label. Use one to three words beginning with a verb"
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
      <Button
        {appearance}
        {disabled}
        leadingIcon={iconPosition === 'leading' || iconPosition === 'both'
          ? plusIcon
          : undefined}
        {loading}
        {size}
        trailingIcon={iconPosition === 'trailing' || iconPosition === 'both'
          ? arrowIcon
          : undefined}
        onclick={() => (activationCount += 1)}
      >
        {label || 'Button'}
      </Button>
      <p class="interaction-result" aria-live="polite">
        Activations: {activationCount}
      </p>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <label>
        <span>Label</span>
        <input bind:value={label} maxlength="40" />
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
      <label>
        <span>Icons</span>
        <select value={iconPosition} onchange={selectIconPosition}>
          <option value="none">None</option>
          <option value="leading">Leading</option>
          <option value="trailing">Trailing</option>
          <option value="both">Both</option>
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

  <div class="variant-group">
    <h3>Appearance and size</h3>
    <div class="matrix">
      {#each appearances as appearanceOption}
        {#each sizes as sizeOption}
          <div class="specimen">
            <span class="specimen__label">
              {appearanceOption.label} · {sizeOption.label}
            </span>
            <Button appearance={appearanceOption.value} size={sizeOption.value}>
              Save changes
            </Button>
          </div>
        {/each}
      {/each}
    </div>
  </div>

  <div class="variant-group">
    <h3>Content</h3>
    <div class="matrix">
      <div class="specimen">
        <span class="specimen__label">Text</span>
        <Button>Save changes</Button>
      </div>
      <div class="specimen">
        <span class="specimen__label">Leading icon</span>
        <Button leadingIcon={plusIcon}>Add item</Button>
      </div>
      <div class="specimen">
        <span class="specimen__label">Trailing icon</span>
        <Button trailingIcon={arrowIcon}>Continue</Button>
      </div>
      <div class="specimen">
        <span class="specimen__label">Both icons</span>
        <Button leadingIcon={plusIcon} trailingIcon={arrowIcon}
          >Add and open</Button
        >
      </div>
    </div>
  </div>
</section>

<section class="workbench-section" id="states" aria-labelledby="states-title">
  <div class="section-heading">
    <h2 id="states-title">States and interactions</h2>
  </div>

  <div class="matrix">
    <div class="specimen">
      <span class="specimen__label">Default</span>
      <Button>Save changes</Button>
    </div>
    <div class="specimen">
      <span class="specimen__label">Disabled</span>
      <Button disabled>Save changes</Button>
    </div>
    <div class="specimen">
      <span class="specimen__label">Loading</span>
      <Button loading>Save changes</Button>
    </div>
    <div class="specimen specimen--instruction">
      <span class="specimen__label">Interactive</span>
      <Button>Try interactions</Button>
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
        <li>Use a specific verb-led label, usually one to three words</li>
        <li>Use Primary for the principal action in the current context</li>
        <li>Use Secondary for supporting or lower-priority actions</li>
        <li>
          Use a leading or trailing icon only when it improves recognition
        </li>
        <li>Use Icon button when the action has no visible text label</li>
      </ul>
    </div>
    <div>
      <h3>Accessibility</h3>
      <ul>
        <li>
          Uses the native button element and established keyboard behaviour
        </li>
        <li>
          Preserves the visible label as the accessible name while loading
        </li>
        <li>Prevents repeat activation while loading and retains focus</li>
        <li>Uses a flush 2 px theme-contrasting focus-visible outline</li>
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
        aria-label="Button API table"
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
              <th scope="row"><code>appearance</code></th>
              <td><code>'primary' | 'secondary'</code></td>
              <td><code>'primary'</code></td>
              <td>Sets visual emphasis</td>
            </tr>
            <tr>
              <th scope="row"><code>consumer</code></th>
              <td><code>ConsumerId</code></td>
              <td>Inherited or neutral</td>
              <td>Sets the consumer colour mapping</td>
            </tr>
            <tr>
              <th scope="row"><code>size</code></th>
              <td><code>'compact' | 'standard' | 'large'</code></td>
              <td><code>'standard'</code></td>
              <td>Sets control height and padding</td>
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
              <th scope="row"><code>leadingIcon</code></th>
              <td><code>Snippet</code></td>
              <td>None</td>
              <td>Places a decorative icon before the label</td>
            </tr>
            <tr>
              <th scope="row"><code>trailingIcon</code></th>
              <td><code>Snippet</code></td>
              <td>None</td>
              <td>Places a decorative icon after the label</td>
            </tr>
            <tr>
              <th scope="row"><code>children</code></th>
              <td><code>Snippet</code></td>
              <td>Required</td>
              <td>Provides the visible label</td>
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
        aria-label="Button token mapping table"
        tabindex="0"
      >
        <table>
          <thead>
            <tr><th scope="col">Role</th><th scope="col">Token</th></tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Control heights</th>
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
              <th scope="row">Text</th>
              <td><code>typography-label-*</code></td>
            </tr>
            <tr>
              <th scope="row">Product colour</th>
              <td><code>colour-interactive</code></td>
            </tr>
            <tr>
              <th scope="row">Boundary</th>
              <td>
                <code>colour-border</code>,
                <code>colour-text-primary</code>,
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
