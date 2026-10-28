<script lang="ts">
  import type { PanelFooterProps } from './panel.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: PanelFooterProps = $props();
</script>

<footer {...attributes} class={`mc-panel-footer ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</footer>

<style>
  .mc-panel-footer {
    display: flex;
    grid-row: 3;
    gap: var(--mc-space-3);
    align-items: center;
    background: var(--mc-colour-surface);
    border-block-start: var(--mc-border-width-default) solid
      var(--mc-colour-border);
  }

  @media (forced-colors: active) {
    .mc-panel-footer {
      background: Canvas;
      border-color: CanvasText;
    }
  }
</style>
