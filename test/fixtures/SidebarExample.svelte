<script lang="ts">
  import DotsThreeIcon from 'phosphor-svelte/lib/DotsThreeIcon';
  import FolderIcon from 'phosphor-svelte/lib/FolderIcon';
  import GearIcon from 'phosphor-svelte/lib/GearIcon';
  import HouseIcon from 'phosphor-svelte/lib/HouseIcon';

  import {
    Button,
    Menu,
    MenuItem,
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
    type SidebarCollapsible,
    type SidebarSide,
    type SidebarVariant,
  } from '#lib/index.js';

  let {
    collapsible = 'icon',
    side = 'start',
    variant = 'attached',
  }: {
    collapsible?: SidebarCollapsible;
    side?: SidebarSide;
    variant?: SidebarVariant;
  } = $props();

  let open = $state(true);
  let mobileOpen = $state(false);
  let projectsOpen = $state(true);
</script>

{#snippet overviewIcon()}<HouseIcon />{/snippet}
{#snippet projectsIcon()}<FolderIcon />{/snippet}
{#snippet settingsIcon()}<GearIcon />{/snippet}
{#snippet itemAction()}
  <Menu size="compact">
    {#snippet trigger(props)}
      <Button
        {...props}
        size="icon-compact"
        appearance="ghost"
        aria-label="More actions"
      >
        <DotsThreeIcon />
      </Button>
    {/snippet}
    <MenuItem>Rename</MenuItem>
  </Menu>
{/snippet}

{#snippet submenu()}
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuLink href="#alpha" label="Alpha" />
    </SidebarMenuItem>
  </SidebarMenu>
{/snippet}

<SidebarProvider
  class="custom-provider"
  data-example="application"
  bind:mobileOpen
  bind:open
>
  <Sidebar label="Primary" {collapsible} {side} {variant}>
    <SidebarHeader><span>MemoryCore</span></SidebarHeader>
    <SidebarContent>
      <SidebarGroup label="Workspace">
        <SidebarMenu>
          <SidebarMenuItem action={itemAction}>
            <SidebarMenuLink
              current="page"
              href="#overview"
              label="Overview"
              leadingIcon={overviewIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem
            bind:open={projectsOpen}
            label="Projects"
            leadingIcon={projectsIcon}
            {submenu}
          />
          <SidebarMenuItem>
            <SidebarMenuButton
              disabled
              label="Settings"
              leadingIcon={settingsIcon}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter><span>Account</span></SidebarFooter>
  </Sidebar>

  <SidebarInset>
    <SidebarTrigger />
    <main>Application content</main>
  </SidebarInset>
</SidebarProvider>

<span data-testid="open">{open}</span>
<span data-testid="mobile-open">{mobileOpen}</span>
