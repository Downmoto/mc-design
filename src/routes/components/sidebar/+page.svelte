<script lang="ts">
  import BookOpenIcon from 'phosphor-svelte/lib/BookOpenIcon';
  import DotsThreeIcon from 'phosphor-svelte/lib/DotsThreeIcon';
  import FolderIcon from 'phosphor-svelte/lib/FolderIcon';
  import GearIcon from 'phosphor-svelte/lib/GearIcon';
  import HouseIcon from 'phosphor-svelte/lib/HouseIcon';
  import PlusIcon from 'phosphor-svelte/lib/PlusIcon';
  import UserIcon from 'phosphor-svelte/lib/UserIcon';

  import {
    Button,
    Card,
    CardContent,
    CardHero,
    Checkbox,
    Menu,
    MenuItem,
    Select,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuLink,
    SidebarProvider,
    SidebarTrigger,
    Typography,
    type SidebarCollapsible,
    type SidebarSide,
    type SidebarVariant,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let collapsible = $state<SidebarCollapsible>('icon');
  let open = $state(true);
  let projectsOpen = $state(true);
  let side = $state<SidebarSide>('start');
  let variant = $state<SidebarVariant>('inset');
</script>

{#snippet homeIcon()}<HouseIcon />{/snippet}
{#snippet resourcesIcon()}<BookOpenIcon />{/snippet}
{#snippet projectsIcon()}<FolderIcon />{/snippet}
{#snippet settingsIcon()}<GearIcon />{/snippet}
{#snippet accountIcon()}<UserIcon />{/snippet}
{#snippet groupAction()}
  <Button appearance="ghost" size="icon-compact" aria-label="Add project">
    <PlusIcon />
  </Button>
{/snippet}

{#snippet resourceActions()}
  <Menu align="end" size="compact">
    {#snippet trigger(props)}
      <Button
        {...props}
        appearance="ghost"
        size="icon-compact"
        aria-label="Resource actions"
      >
        <DotsThreeIcon />
      </Button>
    {/snippet}
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
  </Menu>
{/snippet}

{#snippet projectSubmenu()}
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuLink href="#guidance" label="Atlas" />
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuLink href="#reference" label="Field notes" />
    </SidebarMenuItem>
  </SidebarMenu>
{/snippet}

<svelte:head>
  <title>Sidebar · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Structure"
  title="Sidebar"
  description="Provides responsive application navigation and shell layout"
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
    <CardHero class="playground__preview sidebar-playground__preview">
      <SidebarProvider class="sidebar-sample" bind:open>
        <Sidebar label="Primary" {collapsible} {side} {variant}>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  label="MemoryCore"
                  leadingIcon={resourcesIcon}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup label="Workspace">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuLink
                    current="page"
                    href="#playground"
                    label="Overview"
                    leadingIcon={homeIcon}
                  />
                </SidebarMenuItem>
                <SidebarMenuItem
                  bind:open={projectsOpen}
                  label="Projects"
                  leadingIcon={projectsIcon}
                  submenu={projectSubmenu}
                />
                <SidebarMenuItem action={resourceActions}>
                  <SidebarMenuLink
                    href="#reference"
                    label="Resources with a long navigation label"
                    leadingIcon={resourcesIcon}
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup label="Manage" action={groupAction}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    label="Settings"
                    leadingIcon={settingsIcon}
                  />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled label="Archive" />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton label="Account" leadingIcon={accountIcon} />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div class="sidebar-sample__toolbar">
            <SidebarTrigger />
            <Typography variant="h4">Project overview</Typography>
          </div>
          <div class="sidebar-sample__content">
            <Typography variant="muted">
              Main application content remains independent from navigation
            </Typography>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <Select label="Variant" bind:value={variant}>
          <option value="attached">Attached</option>
          <option value="floating">Floating</option>
          <option value="inset">Inset</option>
        </Select>
        <Select label="Side" bind:value={side}>
          <option value="start">Start</option>
          <option value="end">End</option>
        </Select>
        <Select label="Collapsible" bind:value={collapsible}>
          <option value="none">None</option>
          <option value="icon">Icon</option>
          <option value="offcanvas">Off-canvas</option>
        </Select>
        <Checkbox label="Desktop expanded" size="compact" bind:checked={open} />
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
        <li>Use Sidebar for persistent application navigation</li>
        <li>Use Panel for properties and workspace controls</li>
        <li>
          Keep Header and Footer concise so Content receives the available space
        </li>
        <li>Provide every primary item an icon when using icon collapse</li>
        <li>Compose collapsible groups with Disclosure</li>
        <li>Give parent items a submenu so they render as grouping buttons</li>
        <li>Use Menu in the action slot for optional leaf-item actions</li>
        <li>
          Persist the bindable state in the consuming application when needed
        </li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Give every Sidebar a distinct navigation label</li>
        <li>Use aria-current through the current prop for the active link</li>
        <li>Links and buttons retain native Tab order and activation</li>
        <li>Mobile presentation contains focus and restores it when closed</li>
        <li>Icon labels remain available to assistive technology</li>
        <li>Test expanded, collapsed, and mobile states at 400% zoom</li>
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
    aria-label="Sidebar API table"
    tabindex="0"
  >
    <table>
      <thead>
        <tr>
          <th scope="col">Component</th>
          <th scope="col">Property</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">SidebarProvider</th>
          <td><Typography variant="inline-code">open</Typography></td>
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">true</Typography></td>
        </tr>
        <tr>
          <th scope="row">SidebarProvider</th>
          <td><Typography variant="inline-code">mobileOpen</Typography></td>
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">false</Typography></td>
        </tr>
        <tr>
          <th scope="row">Sidebar</th>
          <td><Typography variant="inline-code">variant</Typography></td>
          <td
            ><Typography variant="inline-code"
              >'attached' | 'floating' | 'inset'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'attached'</Typography></td>
        </tr>
        <tr>
          <th scope="row">Sidebar</th>
          <td><Typography variant="inline-code">collapsible</Typography></td>
          <td
            ><Typography variant="inline-code"
              >'none' | 'icon' | 'offcanvas'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'offcanvas'</Typography></td>
        </tr>
        <tr>
          <th scope="row">Sidebar</th>
          <td><Typography variant="inline-code">side</Typography></td>
          <td><Typography variant="inline-code">'start' | 'end'</Typography></td
          >
          <td><Typography variant="inline-code">'start'</Typography></td>
        </tr>
        <tr>
          <th scope="row">SidebarMenuLink</th>
          <td><Typography variant="inline-code">current</Typography></td>
          <td><Typography variant="inline-code">aria-current</Typography></td>
          <td>Optional</td>
        </tr>
        <tr>
          <th scope="row">SidebarMenuItem</th>
          <td><Typography variant="inline-code">open</Typography></td>
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">false</Typography></td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Region and menu components accept their corresponding native attributes
  </Typography>
</section>

<style>
  :global(.sidebar-playground__preview) {
    align-items: stretch;
    padding: 0;
  }

  :global(.sidebar-sample) {
    block-size: calc(var(--mc-size-control-large) * 8);
  }

  .sidebar-sample__toolbar {
    display: flex;
    align-items: center;
    gap: var(--mc-space-2);
    padding: var(--mc-space-3);
    border-block-end: var(--mc-border-width-default) solid
      var(--mc-colour-border);
  }

  .sidebar-sample__content {
    padding: var(--mc-space-5);
  }
</style>
