<script lang="ts">
  import type { SidebarMenuItemProps } from './sidebar.types.js';

  let {
    action,
    badge,
    children,
    class: className = '',
    submenu,
    ...attributes
  }: SidebarMenuItemProps = $props();
</script>

<li {...attributes} class={`mc-sidebar-menu-item ${className}`.trim()}>
  <div class="mc-sidebar-menu-item__row">
    <div class="mc-sidebar-menu-item__primary">{@render children()}</div>
    {#if badge}
      <div class="mc-sidebar-menu-item__badge">{@render badge()}</div>
    {/if}
    {#if action}
      <div class="mc-sidebar-menu-item__action">{@render action()}</div>
    {/if}
  </div>
  {#if submenu}
    <div class="mc-sidebar-menu-item__submenu">{@render submenu()}</div>
  {/if}
</li>

<style>
  .mc-sidebar-menu-item {
    min-inline-size: 0;
  }

  .mc-sidebar-menu-item__row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    align-items: center;
    min-inline-size: 0;
    gap: var(--mc-space-1);
  }

  .mc-sidebar-menu-item__primary {
    min-inline-size: 0;
  }

  .mc-sidebar-menu-item__badge,
  .mc-sidebar-menu-item__action {
    display: flex;
    align-items: center;
  }

  :global(.mc-sidebar[data-state='collapsed'][data-collapsible='icon'])
    :is(
      .mc-sidebar-menu-item__badge,
      .mc-sidebar-menu-item__action,
      .mc-sidebar-menu-item__submenu
    ) {
    display: none;
  }
</style>
