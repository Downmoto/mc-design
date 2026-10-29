<script lang="ts">
  import HouseIcon from 'phosphor-svelte/lib/HouseIcon';
  import StackIcon from 'phosphor-svelte/lib/StackIcon';

  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuLink,
    SidebarProvider,
  } from '#lib/index.js';
</script>

{#snippet homeIcon()}<HouseIcon />{/snippet}
{#snippet libraryIcon()}<StackIcon />{/snippet}

<SidebarProvider class="sidebar-preview">
  <Sidebar label="Preview navigation" collapsible="none">
    <SidebarContent>
      <SidebarGroup label="Workspace">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuLink
              current="page"
              href="#home-title"
              label="Overview"
              leadingIcon={homeIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink
              href="#category-Structure"
              label="Library"
              leadingIcon={libraryIcon}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>

<style>
  :global(.sidebar-preview) {
    inline-size: var(--mc-size-sidebar-navigation);
    block-size: calc(var(--mc-size-control-large) * 3);
  }
</style>
