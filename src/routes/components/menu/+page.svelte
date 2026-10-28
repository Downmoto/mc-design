<script lang="ts">
  import {
    Card,
    CardContent,
    CardHero,
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
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

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

  <Card class="playground" orientation="horizontal">
    <CardHero class="playground__preview">
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
    </CardHero>

    <CardContent class="playground__controls">
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
    </CardContent>
  </Card>
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
            ><Typography variant="inline-code">'button' | 'context'</Typography
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
          <td><Typography variant="inline-code">'start' | 'end'</Typography></td
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
      <Typography variant="inline-code">MenuItem</Typography> renders a command or
      link
    </li>
    <li>
      <Typography variant="inline-code">MenuCheckboxItem</Typography> binds an independent
      checked state
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
      <Typography variant="inline-code">MenuSubmenu</Typography> opens nested menu
      content
    </li>
  </Typography>
</section>
