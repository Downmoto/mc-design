<script lang="ts">
  import type { CardContentProps } from './card.types.js';

  let {
    children,
    class: className = '',
    ...attributes
  }: CardContentProps = $props();
</script>

<div {...attributes} class={`mc-card-content ${className}`.trim()}>
  {#if children}{@render children()}{/if}
</div>
