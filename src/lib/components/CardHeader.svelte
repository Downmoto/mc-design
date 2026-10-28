<script lang="ts">
  import type { CardHeaderProps } from './card.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: CardHeaderProps = $props();
</script>

<header {...attributes} class={`mc-card-header ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</header>

<style>
  .mc-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--mc-space-4);
  }
</style>
