<script lang="ts">
  import type { PanelHeaderProps } from './panel.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: PanelHeaderProps = $props();
</script>

<header {...attributes} class={`mc-panel-header ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</header>

<style>
  .mc-panel-header {
    display: flex;
    grid-row: 1;
    gap: var(--mc-space-3);
    align-items: center;
    justify-content: space-between;
    background: var(--mc-colour-surface-low);
  }

  @media (forced-colors: active) {
    .mc-panel-header {
      background: Canvas;
      border-block-end: var(--mc-border-width-default) solid CanvasText;
    }
  }
</style>
