<script lang="ts">
  import type { SidebarRegionProps } from './sidebar.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: SidebarRegionProps = $props();
</script>

<header {...attributes} class={`mc-sidebar-header ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</header>

<style>
  .mc-sidebar-header {
    grid-row: 1;
    min-inline-size: 0;
    padding: var(--mc-space-3);
    border-block-end: var(--mc-border-width-default) solid
      var(--mc-colour-border);
  }

  :global(.mc-sidebar[data-state='collapsed'][data-collapsible='icon'])
    .mc-sidebar-header {
    padding: var(--mc-space-2);
  }
</style>
