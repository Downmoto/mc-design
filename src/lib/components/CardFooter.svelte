<script lang="ts">
  import type { CardFooterProps } from './card.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: CardFooterProps = $props();
</script>

<footer {...attributes} class={`mc-card-footer ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</footer>

<style>
  .mc-card-footer {
    display: flex;
    align-items: center;
    gap: var(--mc-space-3);
    background: var(--mc-colour-surface-high);
  }

  @media (forced-colors: active) {
    .mc-card-footer {
      border-block-start: var(--mc-border-width-default) solid CanvasText;
    }
  }
</style>
