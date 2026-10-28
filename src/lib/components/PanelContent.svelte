<script lang="ts">
  import type { PanelContentProps } from './panel.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: PanelContentProps = $props();
</script>

<div {...attributes} class={`mc-panel-content ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</div>

<style>
  .mc-panel-content {
    grid-row: 2;
    min-block-size: 0;
    overflow: auto;
  }
</style>
