<script lang="ts">
  import type { SidebarRegionProps } from './sidebar.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: SidebarRegionProps = $props();
</script>

<footer {...attributes} class={`mc-sidebar-footer ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</footer>

<style>
  .mc-sidebar-footer {
    grid-row: 3;
    min-inline-size: 0;
    padding: var(--mc-space-3);
  }

  :global(.mc-sidebar[data-state='collapsed'][data-collapsible='icon'])
    .mc-sidebar-footer {
    padding: var(--mc-space-2);
  }
</style>
