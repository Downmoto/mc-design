<script lang="ts">
  import type { PanelProps } from './panel.types.js';

  let { children, class: className = '', ...attributes }: PanelProps = $props();
</script>

<section {...attributes} class={`mc-panel ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</section>

<style>
  .mc-panel {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    min-inline-size: 0;
    min-block-size: 0;
    overflow: hidden;
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-background);
  }

  @media (forced-colors: active) {
    .mc-panel {
      color: CanvasText;
      background: Canvas;
    }
  }
</style>
