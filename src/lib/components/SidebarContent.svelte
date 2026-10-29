<script lang="ts">
  import type { SidebarContentProps } from './sidebar.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: SidebarContentProps = $props();
</script>

<div {...attributes} class={`mc-sidebar-content ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</div>

<style>
  .mc-sidebar-content {
    display: grid;
    grid-row: 2;
    align-content: start;
    min-inline-size: 0;
    min-block-size: 0;
    overflow-y: auto;
    overscroll-behavior-block: contain;
    padding: var(--mc-space-2);
  }

  :global(.mc-sidebar[data-state='collapsed'][data-collapsible='icon'])
    .mc-sidebar-content {
    padding-inline: var(--mc-space-1);
  }
</style>
