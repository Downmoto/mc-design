<script lang="ts">
  import {
    Button,
    Typography,
    type ButtonAppearance,
    type ButtonSize,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';
  import ArrowRightIcon from '../../_components/icons/ArrowRightIcon.svelte';
  import PlusIcon from '../../_components/icons/PlusIcon.svelte';

  type ButtonContent = 'label' | 'icon';
  type ButtonBehaviour = 'action' | 'navigation';
  type IconPosition = 'none' | 'leading' | 'trailing' | 'both';
  type LabelledButtonSize = Exclude<ButtonSize, `icon${string}`>;
  type IconButtonSize = Extract<ButtonSize, `icon${string}`>;

  const appearances: { label: string; value: ButtonAppearance }[] = [
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Ghost', value: 'ghost' },
  ];
  const playgroundAppearances: { label: string; value: ButtonAppearance }[] = [
    ...appearances,
    { label: 'Link', value: 'link' },
  ];
  const sizes: { label: string; value: LabelledButtonSize }[] = [
    { label: 'Compact', value: 'compact' },
    { label: 'Standard', value: 'standard' },
    { label: 'Large', value: 'large' },
  ];
  const iconSizes: { label: string; value: IconButtonSize; pixels: string }[] =
    [
      { label: 'Compact', value: 'icon-compact', pixels: '32 × 32' },
      { label: 'Standard', value: 'icon', pixels: '40 × 40' },
      { label: 'Large', value: 'icon-large', pixels: '48 × 48' },
    ];

  let label = $state('Save changes');
  let behaviour = $state<ButtonBehaviour>('action');
  let content = $state<ButtonContent>('label');
  let destination = $state('/about');
  let appearance = $state<ButtonAppearance>('primary');
  let labelledSize = $state<LabelledButtonSize>('standard');
  let iconSize = $state<IconButtonSize>('icon');
  let iconPosition = $state<IconPosition>('none');
  let disabled = $state(false);
  let loading = $state(false);
  let activationCount = $state(0);
  let exampleCode = $derived.by(buildExample);

  function selectAppearance(event: Event): void {
    appearance = (event.currentTarget as HTMLSelectElement)
      .value as ButtonAppearance;

    if (appearance === 'link') {
      behaviour = 'navigation';
      content = 'label';
      iconPosition = 'none';
      labelledSize = 'standard';
    }
  }

  function selectBehaviour(event: Event): void {
    behaviour = (event.currentTarget as HTMLSelectElement)
      .value as ButtonBehaviour;
  }

  function selectContent(event: Event): void {
    content = (event.currentTarget as HTMLSelectElement).value as ButtonContent;

    if (content === 'icon' && appearance === 'link') appearance = 'primary';
  }

  function selectSize(event: Event): void {
    const value = (event.currentTarget as HTMLSelectElement).value;

    if (content === 'icon') {
      iconSize = value as IconButtonSize;
    } else {
      labelledSize = value as LabelledButtonSize;
    }
  }

  function selectIconPosition(event: Event): void {
    iconPosition = (event.currentTarget as HTMLSelectElement)
      .value as IconPosition;
  }

  function handlePreviewClick(event: MouseEvent): void {
    if (behaviour === 'navigation') event.preventDefault();
    activationCount += 1;
  }

  function buildExample(): string {
    const properties = [
      appearance !== 'primary' ? `appearance="${appearance}"` : '',
      behaviour === 'navigation' ? `href="${destination || '#'}"` : '',
      content === 'icon'
        ? `size="${iconSize}"`
        : labelledSize !== 'standard'
          ? `size="${labelledSize}"`
          : '',
      content === 'icon' ? `aria-label="${label || 'Button'}"` : '',
      content === 'icon' ? `title="${label || 'Button'}"` : '',
      disabled ? 'disabled' : '',
      loading ? 'loading' : '',
      content === 'label' &&
      (iconPosition === 'leading' || iconPosition === 'both')
        ? 'leadingIcon={plusIcon}'
        : '',
      content === 'label' &&
      (iconPosition === 'trailing' || iconPosition === 'both')
        ? 'trailingIcon={arrowIcon}'
        : '',
    ].filter(Boolean);
    const snippets = [];

    if (
      content === 'label' &&
      (iconPosition === 'leading' || iconPosition === 'both')
    ) {
      snippets.push('{#snippet plusIcon()}<PlusIcon />{/snippet}');
    }
    if (
      content === 'label' &&
      (iconPosition === 'trailing' || iconPosition === 'both')
    ) {
      snippets.push('{#snippet arrowIcon()}<ArrowRightIcon />{/snippet}');
    }

    const button =
      content === 'icon'
        ? `<Button ${properties.join(' ')}>\n  <PlusIcon />\n</Button>`
        : `<Button${properties.length ? ` ${properties.join(' ')}` : ''}>${label || 'Button'}</Button>`;

    return `${snippets.length ? `${snippets.join('\n')}\n\n` : ''}${button}`;
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
  description="Provides labelled actions, navigation links, and compact icon controls through one consistent component"
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
      {#if content === 'icon'}
        <Button
          {appearance}
          aria-label={label || 'Button'}
          {disabled}
          href={behaviour === 'navigation' ? destination || '#' : undefined}
          {loading}
          size={iconSize}
          title={label || 'Button'}
          onclick={handlePreviewClick}
        >
          <PlusIcon />
        </Button>
      {:else}
        <Button
          {appearance}
          {disabled}
          href={behaviour === 'navigation' ? destination || '#' : undefined}
          leadingIcon={iconPosition === 'leading' || iconPosition === 'both'
            ? plusIcon
            : undefined}
          {loading}
          size={labelledSize}
          trailingIcon={iconPosition === 'trailing' || iconPosition === 'both'
            ? arrowIcon
            : undefined}
          onclick={handlePreviewClick}
        >
          {label || 'Button'}
        </Button>
      {/if}
      <Typography class="interaction-result" aria-live="polite">
        Activations: {activationCount}
      </Typography>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <label>
        <span>Content</span>
        <select value={content} onchange={selectContent}>
          <option value="label">Visible label</option>
          <option value="icon">Icon only</option>
        </select>
      </label>
      <label>
        <span>Behaviour</span>
        <select value={behaviour} onchange={selectBehaviour}>
          <option value="action">Action</option>
          <option value="navigation">Navigation</option>
        </select>
      </label>
      <label>
        <span>{content === 'icon' ? 'Accessible name' : 'Label'}</span>
        <input bind:value={label} maxlength="40" />
      </label>
      {#if behaviour === 'navigation'}
        <label>
          <span>Destination</span>
          <input bind:value={destination} maxlength="200" />
        </label>
      {/if}
      <label>
        <span>Appearance</span>
        <select value={appearance} onchange={selectAppearance}>
          {#each content === 'icon' ? appearances : playgroundAppearances as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </label>
      {#if appearance !== 'link'}
        <label>
          <span>Size</span>
          <select
            value={content === 'icon' ? iconSize : labelledSize}
            onchange={selectSize}
          >
            {#if content === 'icon'}
              {#each iconSizes as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            {:else}
              {#each sizes as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            {/if}
          </select>
        </label>
        {#if content === 'label'}
          <label>
            <span>Icons</span>
            <select value={iconPosition} onchange={selectIconPosition}>
              <option value="none">None</option>
              <option value="leading">Leading</option>
              <option value="trailing">Trailing</option>
              <option value="both">Both</option>
            </select>
          </label>
        {/if}
      {/if}
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
    <Typography id="variants-title" variant="h2">Variants</Typography>
  </div>

  <div class="variant-group">
    <Typography variant="h3">Appearance and size</Typography>
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
    <CodeExample
      code={'<Button appearance="secondary" size="compact">Save changes</Button>'}
    />
  </div>

  <div class="variant-group">
    <Typography variant="h3">Links</Typography>
    <div class="matrix">
      <div class="specimen">
        <span class="specimen__label">Inline link</span>
        <Button appearance="link" href="#main-content">Learn more</Button>
      </div>
      <div class="specimen">
        <span class="specimen__label">Primary button link</span>
        <Button href="#main-content">Open dashboard</Button>
      </div>
      <div class="specimen">
        <span class="specimen__label">Secondary button link</span>
        <Button appearance="secondary" href="#main-content">
          View details
        </Button>
      </div>
    </div>
    <CodeExample
      code={'<Button appearance="link" href="/about">Learn more</Button>\n<Button href="/dashboard">Open dashboard</Button>\n<Button appearance="secondary" href="/details">View details</Button>'}
    />
  </div>

  <div class="variant-group">
    <Typography variant="h3">Icon buttons</Typography>
    <div class="matrix">
      {#each appearances as appearanceOption}
        {#each iconSizes as sizeOption}
          <div class="specimen">
            <span class="specimen__label">
              {appearanceOption.label} · {sizeOption.label} · {sizeOption.pixels}
            </span>
            <Button
              appearance={appearanceOption.value}
              aria-label={`Add item, ${sizeOption.label.toLowerCase()}`}
              size={sizeOption.value}
              title="Add item"
            >
              <PlusIcon />
            </Button>
          </div>
        {/each}
      {/each}
    </div>
    <CodeExample
      code={'<Button size="icon" aria-label="Add item" title="Add item">\n  <PlusIcon />\n</Button>'}
    />
  </div>

  <div class="variant-group">
    <Typography variant="h3">Labelled button content</Typography>
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
        <Button leadingIcon={plusIcon} trailingIcon={arrowIcon}>
          Add and open
        </Button>
      </div>
    </div>
    <CodeExample
      code={'{#snippet plusIcon()}<PlusIcon />{/snippet}\n{#snippet arrowIcon()}<ArrowRightIcon />{/snippet}\n\n<Button leadingIcon={plusIcon}>Add item</Button>\n<Button trailingIcon={arrowIcon}>Continue</Button>'}
    />
  </div>
</section>

<section class="workbench-section" id="states" aria-labelledby="states-title">
  <div class="section-heading">
    <Typography id="states-title" variant="h2">
      States and interactions
    </Typography>
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
    <div class="specimen">
      <span class="specimen__label">Icon loading</span>
      <Button aria-label="Adding item" size="icon" title="Adding item" loading>
        <PlusIcon />
      </Button>
    </div>
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
        <li>
          Omit <Typography variant="inline-code">href</Typography> for an action in
          the current interface
        </li>
        <li>
          Provide <Typography variant="inline-code">href</Typography> for navigation
        </li>
        <li>Use the Link appearance for inline navigation</li>
        <li>Use Primary for the principal action in the current context</li>
        <li>Use Secondary for supporting or lower-priority actions</li>
        <li>Use Ghost for quiet actions without a persistent boundary</li>
        <li>Use an icon size only when the icon is widely understood</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>
          Renders a native anchor with
          <Typography variant="inline-code">href</Typography>
        </li>
        <li>
          Renders a native button without
          <Typography variant="inline-code">href</Typography>
        </li>
        <li>
          Requires <Typography variant="inline-code">aria-label</Typography>
          on icon-only controls
        </li>
        <li>
          Use <Typography variant="inline-code">title</Typography> when an icon-only
          control needs a tooltip
        </li>
        <li>Preserves dimensions and accessible names while loading</li>
        <li>Prevents repeat activation while loading</li>
        <li>Respects reduced-motion and forced-colour preferences</li>
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
              <th scope="row"
                ><Typography variant="inline-code">appearance</Typography></th
              >
              <td
                ><Typography variant="inline-code"
                  >'primary' | 'secondary' | 'ghost' | 'link'</Typography
                ></td
              >
              <td><Typography variant="inline-code">'primary'</Typography></td>
              <td>Sets the visual treatment</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">href</Typography></th
              >
              <td><Typography variant="inline-code">string</Typography></td>
              <td>None</td>
              <td>Renders an anchor and sets its destination</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">consumer</Typography></th
              >
              <td><Typography variant="inline-code">ConsumerId</Typography></td>
              <td>Inherited or neutral</td>
              <td>Sets the consumer colour mapping</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">size</Typography></th
              >
              <td>
                <Typography variant="inline-code">
                  'compact' | 'standard' | 'large' | 'icon-compact' | 'icon' |
                  'icon-large'
                </Typography>
              </td>
              <td><Typography variant="inline-code">'standard'</Typography></td>
              <td>Sets labelled or square control dimensions</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">loading</Typography></th
              >
              <td><Typography variant="inline-code">boolean</Typography></td>
              <td><Typography variant="inline-code">false</Typography></td>
              <td>Shows progress and prevents activation</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">disabled</Typography></th
              >
              <td><Typography variant="inline-code">boolean</Typography></td>
              <td><Typography variant="inline-code">false</Typography></td>
              <td>Prevents activation</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">leadingIcon</Typography></th
              >
              <td><Typography variant="inline-code">Snippet</Typography></td>
              <td>None</td>
              <td>Places a decorative icon before a visible label</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">trailingIcon</Typography></th
              >
              <td><Typography variant="inline-code">Snippet</Typography></td>
              <td>None</td>
              <td>Places a decorative icon after a visible label</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">children</Typography></th
              >
              <td><Typography variant="inline-code">Snippet</Typography></td>
              <td>Required</td>
              <td>Provides the label or icon</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Typography class="table-note" variant="muted">
        Applicable native button and anchor attributes and event handlers pass
        through
      </Typography>

      <Typography variant="h3">Token mapping</Typography>
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
                <Typography variant="inline-code"
                  >size-control-compact</Typography
                >,
                <Typography variant="inline-code"
                  >size-control-standard</Typography
                >,
                <Typography variant="inline-code">size-control-large</Typography
                >
              </td>
            </tr>
            <tr>
              <th scope="row">Icon sizes</th>
              <td>
                <Typography variant="inline-code">size-icon-compact</Typography
                >,
                <Typography variant="inline-code">size-icon-standard</Typography
                >,
                <Typography variant="inline-code">size-icon-primary</Typography>
              </td>
            </tr>
            <tr>
              <th scope="row">Text</th>
              <td
                ><Typography variant="inline-code"
                  >typography-label-*</Typography
                ></td
              >
            </tr>
            <tr>
              <th scope="row">Product colour</th>
              <td
                ><Typography variant="inline-code"
                  >colour-interactive</Typography
                ></td
              >
            </tr>
            <tr>
              <th scope="row">Boundary</th>
              <td>
                <Typography variant="inline-code">colour-border</Typography>,
                <Typography variant="inline-code"
                  >colour-text-primary</Typography
                >,
                <Typography variant="inline-code"
                  >border-width-default</Typography
                >,
                <Typography variant="inline-code"
                  >border-width-emphasised</Typography
                >
              </td>
            </tr>
            <tr>
              <th scope="row">Shape</th>
              <td><Typography variant="inline-code">radius-1</Typography></td>
            </tr>
            <tr>
              <th scope="row">Response</th>
              <td>
                <Typography variant="inline-code"
                  >motion-duration-direct</Typography
                >,
                <Typography variant="inline-code"
                  >motion-easing-default</Typography
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>
</section>
