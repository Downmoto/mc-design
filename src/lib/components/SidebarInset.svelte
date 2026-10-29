<script lang="ts">
  import type { SidebarInsetProps } from './sidebar.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: SidebarInsetProps = $props();
</script>

<div {...attributes} class={`mc-sidebar-inset ${className}`.trim()}>
  {@render children()}
</div>

<style>
  .mc-sidebar-inset {
    flex: 1 1 auto;
    box-sizing: border-box;
    min-inline-size: 0;
    min-block-size: 0;
    overflow: auto;
    background: var(--mc-colour-background);
  }

  :global(.mc-sidebar[data-variant='inset']) + .mc-sidebar-inset,
  .mc-sidebar-inset:has(+ :global(.mc-sidebar[data-variant='inset'])) {
    margin: var(--mc-space-2);
    border-radius: var(--mc-radius-2);
    box-shadow: var(--mc-shadow-1);
  }
</style>
