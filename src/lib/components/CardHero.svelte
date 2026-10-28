<script lang="ts">
  import type { CardHeroProps } from './card.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: CardHeroProps = $props();
</script>

<div {...attributes} class={`mc-card-hero ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</div>

<style>
  .mc-card-hero {
    overflow: hidden;
  }

  .mc-card-hero > :global(img),
  .mc-card-hero > :global(picture),
  .mc-card-hero > :global(video) {
    display: block;
    inline-size: 100%;
  }
</style>
