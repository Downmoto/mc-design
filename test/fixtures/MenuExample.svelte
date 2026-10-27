<script lang="ts">
  import {
    Menu,
    MenuCheckboxItem,
    MenuGroup,
    MenuItem,
    MenuRadioGroup,
    MenuRadioItem,
    MenuSeparator,
    MenuSubmenu,
    type ConsumerId,
    type MenuSize,
  } from '../../src/lib/index.js';

  interface Props {
    consumer?: ConsumerId;
    disabled?: boolean;
    size?: MenuSize;
  }

  let { consumer, disabled = false, size = 'standard' }: Props = $props();

  let open = $state(false);
  let showGrid = $state(false);
  let sort = $state('name');
  let lastAction = $state('none');
  let contextAction = $state('none');
</script>

<Menu bind:open {consumer} {disabled} {size}>
  {#snippet trigger(props)}
    <button {...props} type="button">Actions</button>
  {/snippet}

  <MenuGroup label="File">
    <MenuItem onclick={() => (lastAction = 'new')}>New file</MenuItem>
    <MenuItem href="/open" shortcut="⌘O">Open file</MenuItem>
    <MenuItem disabled>Unavailable action</MenuItem>
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
    <MenuItem onclick={() => (lastAction = 'copy-link')}>Copy link</MenuItem>
    <MenuItem>Export file</MenuItem>
  </MenuSubmenu>
  <MenuSeparator />
  <MenuItem tone="danger">Delete file</MenuItem>
</Menu>

<Menu mode="context" label="Canvas actions">
  {#snippet trigger(props)}
    <div {...props} role="button" tabindex="0">Canvas target</div>
  {/snippet}
  <MenuItem onclick={() => (contextAction = 'duplicate')}>Duplicate</MenuItem>
  <MenuItem>Remove</MenuItem>
</Menu>

<output data-testid="open">{open}</output>
<output data-testid="grid">{showGrid}</output>
<output data-testid="sort">{sort}</output>
<output data-testid="action">{lastAction}</output>
<output data-testid="context-action">{contextAction}</output>
