<script lang="ts">
  import type { SidebarMenuProps } from './sidebar.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: SidebarMenuProps = $props();
</script>

<ul {...attributes} class={`mc-sidebar-menu ${className}`.trim()}>
  {@render children()}
</ul>

<style>
  .mc-sidebar-menu {
    display: grid;
    min-inline-size: 0;
    gap: var(--mc-space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  :global(.mc-sidebar-menu) .mc-sidebar-menu {
    margin-block-start: var(--mc-space-1);
    margin-inline-start: var(--mc-space-4);
    padding-inline-start: var(--mc-space-2);
  }

  :global(.mc-sidebar[data-state='collapsed'][data-collapsible='icon'])
    :global(.mc-sidebar-menu)
    .mc-sidebar-menu {
    display: none;
  }
</style>
