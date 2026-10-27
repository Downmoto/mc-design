<script lang="ts">
  import {
    Button,
    Checkbox,
    Menu,
    MenuCheckboxItem,
    MenuGroup,
    MenuItem,
    MenuRadioGroup,
    MenuRadioItem,
    MenuSeparator,
    MenuSubmenu,
    Select,
    Typography,
    type MenuAlign,
    type MenuSize,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const exampleCode = `<Menu {size} {align}>
  {#snippet trigger(props)}
    <Button {...props} appearance="secondary">Actions</Button>
  {/snippet}
  <MenuGroup label="File">
    <MenuItem onclick={rename}>Rename</MenuItem>
    <MenuItem shortcut="⌘D" onclick={duplicate}>Duplicate</MenuItem>
  </MenuGroup>
  <MenuSeparator />
  <MenuCheckboxItem bind:checked={showGrid} closeOnSelect={false}>
    Show grid
  </MenuCheckboxItem>
</Menu>`;

  const tokenMapping = [
    {
      role: 'Surface',
      tokens: ['colour-surface', 'radius-1', 'shadow-2'],
    },
    {
      role: 'Items',
      tokens: ['colour-text-primary', 'colour-text-secondary'],
    },
    {
      role: 'Focus and hover',
      tokens: [
        'colour-interactive',
        'colour-background',
        'opacity-menu-item-hover',
      ],
    },
    { role: 'Destructive actions', tokens: ['colour-danger'] },
    {
      role: 'Size',
      tokens: [
        'size-control-compact',
        'size-control-standard',
        'size-icon-compact',
        'size-icon-standard',
      ],
    },
    {
      role: 'Separators',
      tokens: [
        'colour-border',
        'border-width-default',
        'opacity-menu-separator',
      ],
    },
    { role: 'Spacing', tokens: ['space-1', 'space-2'] },
    { role: 'Layer and motion', tokens: ['layer-overlay', 'motion-*'] },
  ];

  let size = $state<MenuSize>('standard');
  let align = $state<MenuAlign>('start');
  let disabled = $state(false);
  let showGrid = $state(true);
  let sort = $state('name');
  let lastAction = $state('No action selected');
</script>

<svelte:head>
  <title>Menu · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Navigation"
  title="Menu"
  description="Presents commands and navigation links from buttons or contextual targets"
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
      <Menu {size} {align} {disabled}>
        {#snippet trigger(props)}
          <Button {...props} appearance="secondary">Actions</Button>
        {/snippet}
        <MenuGroup label="File">
          <MenuItem onclick={() => (lastAction = 'Rename selected')}>
            Rename
          </MenuItem>
          <MenuItem
            shortcut="⌘D"
            onclick={() => (lastAction = 'Duplicate selected')}
          >
            Duplicate
          </MenuItem>
          <MenuItem disabled>Archive</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuCheckboxItem bind:checked={showGrid} closeOnSelect={false}>
          Show grid
        </MenuCheckboxItem>
        <MenuRadioGroup label="Sort by" bind:value={sort}>
          <MenuRadioItem value="name" closeOnSelect={false}>Name</MenuRadioItem>
          <MenuRadioItem value="date" closeOnSelect={false}>Date</MenuRadioItem>
        </MenuRadioGroup>
        <MenuSubmenu label="Share">
          <MenuItem onclick={() => (lastAction = 'Copy link selected')}>
            Copy link
          </MenuItem>
          <MenuItem onclick={() => (lastAction = 'Export selected')}>
            Export
          </MenuItem>
        </MenuSubmenu>
        <MenuSeparator />
        <MenuItem
          tone="danger"
          onclick={() => (lastAction = 'Delete selected')}
        >
          Delete
        </MenuItem>
      </Menu>
      <Typography class="interaction-result" variant="muted">
        {lastAction}
      </Typography>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <Select label="Size" bind:value={size}>
        <option value="standard">Standard</option>
        <option value="compact">Compact</option>
      </Select>
      <Select label="Alignment" bind:value={align}>
        <option value="start">Start</option>
        <option value="end">End</option>
      </Select>
      <Checkbox label="Disable menu" bind:checked={disabled} />
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
      <Typography class="specimen__label" variant="muted">
        Action menu
      </Typography>
      <Menu>
        {#snippet trigger(props)}
          <Button {...props} appearance="secondary">Project actions</Button>
        {/snippet}
        <MenuItem>Rename project</MenuItem>
        <MenuItem>Duplicate project</MenuItem>
        <MenuItem tone="danger">Delete project</MenuItem>
      </Menu>
    </article>

    <article class="specimen">
      <Typography class="specimen__label" variant="muted">
        Navigation dropdown
      </Typography>
      <Menu align="end">
        {#snippet trigger(props)}
          <Button {...props} appearance="ghost">Resources</Button>
        {/snippet}
        <MenuItem href="/design/library/">Component library</MenuItem>
        <MenuItem href="https://memorycore.dev">MemoryCore website</MenuItem>
      </Menu>
    </article>

    <article class="specimen">
      <Typography class="specimen__label" variant="muted">
        Context menu
      </Typography>
      <Menu mode="context" label="Canvas actions">
        {#snippet trigger(props)}
          <div {...props} class="context-target" role="button" tabindex="0">
            Right-click or press Shift+F10
          </div>
        {/snippet}
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Bring forward</MenuItem>
        <MenuItem>Send backward</MenuItem>
      </Menu>
    </article>

    <article class="specimen">
      <Typography class="specimen__label" variant="muted">Compact</Typography>
      <Menu size="compact">
        {#snippet trigger(props)}
          <Button {...props} appearance="secondary" size="compact">
            Compact actions
          </Button>
        {/snippet}
        <MenuItem>Rename</MenuItem>
        <MenuItem>Duplicate</MenuItem>
      </Menu>
    </article>
  </div>
</section>

<section class="workbench-section" id="states" aria-labelledby="states-title">
  <div class="section-heading">
    <Typography id="states-title" variant="h2">States</Typography>
  </div>

  <div class="matrix">
    <article class="specimen menu-state-sample">
      <Typography class="specimen__label" variant="muted">
        Item states
      </Typography>
      <div class="menu-state-surface" role="presentation">
        <div class="mc-menu-group__label">Arrange</div>
        <button class="mc-menu-item" type="button">
          <span class="mc-menu-item__label">Default item</span>
        </button>
        <button class="mc-menu-item" type="button" aria-disabled="true">
          <span class="mc-menu-item__label">Disabled item</span>
        </button>
        <button class="mc-menu-item" type="button" data-tone="danger">
          <span class="mc-menu-item__label">Destructive item</span>
        </button>
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
        <li>Use menus for concise commands or navigation links</li>
        <li>Use groups and separators to organise related items</li>
        <li>Keep item labels short and begin commands with clear verbs</li>
        <li>Use shortcut hints only when the application implements them</li>
        <li>Use context menus as an additional path to visible commands</li>
        <li>Use Disclosure for expandable page content or mobile navigation</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Enter, Space, and arrow keys open a button-triggered menu</li>
        <li>Up and Down arrows move through every item</li>
        <li>Home and End move to the first and last items</li>
        <li>Typing moves focus by item label</li>
        <li>Right and Left arrows open and close nested submenus</li>
        <li>Escape closes the current menu and restores trigger focus</li>
        <li>Disabled items remain discoverable but cannot activate</li>
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
      <Typography variant="h3">Menu API</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Menu API table"
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
                ><Typography variant="inline-code">trigger</Typography></th
              >
              <td><Typography variant="inline-code">Snippet</Typography></td>
              <td>Required</td>
              <td
                >Applies the supplied trigger properties to a button or context
                target</td
              >
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">mode</Typography></th
              >
              <td
                ><Typography variant="inline-code"
                  >'button' | 'context'</Typography
                ></td
              >
              <td><Typography variant="inline-code">'button'</Typography></td>
              <td>Selects button or contextual invocation</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">open</Typography></th
              >
              <td><Typography variant="inline-code">boolean</Typography></td>
              <td><Typography variant="inline-code">false</Typography></td>
              <td>Supports two-way open-state binding</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">align</Typography></th
              >
              <td
                ><Typography variant="inline-code">'start' | 'end'</Typography
                ></td
              >
              <td><Typography variant="inline-code">'start'</Typography></td>
              <td>Aligns button-triggered content to the trigger edge</td>
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
              <td>Sets item density and icon size</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Typography variant="h3">Component family</Typography>
      <Typography variant="list">
        <li>
          <Typography variant="inline-code">MenuItem</Typography> renders a command
          or link
        </li>
        <li>
          <Typography variant="inline-code">MenuCheckboxItem</Typography> binds an
          independent checked state
        </li>
        <li>
          <Typography variant="inline-code">MenuRadioGroup</Typography> and <Typography
            variant="inline-code">MenuRadioItem</Typography
          > bind one selected value
        </li>
        <li>
          <Typography variant="inline-code">MenuGroup</Typography> provides a non-interactive
          group label
        </li>
        <li>
          <Typography variant="inline-code">MenuSeparator</Typography> divides related
          groups
        </li>
        <li>
          <Typography variant="inline-code">MenuSubmenu</Typography> opens nested
          menu content
        </li>
      </Typography>

      <Typography variant="h3">Token mapping</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Menu token mapping table"
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
  .context-target {
    display: grid;
    min-block-size: calc(var(--mc-size-control-large) * 2);
    padding: var(--mc-space-4);
    place-items: center;
    color: var(--mc-colour-text-secondary);
    background: var(--mc-colour-background);
    border: var(--mc-border-width-default) dashed var(--mc-colour-border);
    border-radius: var(--mc-radius-2);
  }

  .menu-state-surface {
    inline-size: min(100%, var(--mc-size-sidebar-properties-minimum));
    padding: var(--mc-space-2);
    background: var(--mc-colour-surface);
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-2);
    box-shadow: var(--mc-shadow-2);
  }
</style>
