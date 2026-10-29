<script lang="ts">
  import FolderIcon from 'phosphor-svelte/lib/FolderIcon';
  import GearIcon from 'phosphor-svelte/lib/GearIcon';
  import HouseIcon from 'phosphor-svelte/lib/HouseIcon';

  import {
    Badge,
    Button,
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
</script>

{#snippet overviewIcon()}<HouseIcon />{/snippet}
{#snippet projectsIcon()}<FolderIcon />{/snippet}
{#snippet settingsIcon()}<GearIcon />{/snippet}
{#snippet badge()}<Badge size="compact">3</Badge>{/snippet}
{#snippet itemAction()}
  <Button size="icon-compact" appearance="ghost" aria-label="Add project"
    >+</Button
  >
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
          <SidebarMenuItem>
            <SidebarMenuLink
              current="page"
              href="#overview"
              label="Overview"
              leadingIcon={overviewIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem {badge} action={itemAction} {submenu}>
            <SidebarMenuLink
              href="#projects"
              label="Projects"
              leadingIcon={projectsIcon}
            />
          </SidebarMenuItem>
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
