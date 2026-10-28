<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { CardProps } from './card.types.js';

  let {
    children,
    class: className = '',
    consumer,
    orientation = 'vertical',
    ...attributes
  }: CardProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
</script>

<article
  {...attributes}
  class={`mc-card ${className}`.trim()}
  data-mc-product={resolvedConsumer}
  data-orientation={orientation}
>
  {#if children}{@render children()}{/if}
</article>

<style>
  .mc-card {
    display: grid;
    min-inline-size: 0;
    overflow: hidden;
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-surface);
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-2);
  }

  .mc-card:has(> :global(.mc-card-hero)) > :global(.mc-card-hero),
  .mc-card:has(> :global(.mc-card-hero)) > :global(.mc-card-header) {
    grid-area: 1 / 1;
  }

  .mc-card:has(> :global(.mc-card-hero)) > :global(.mc-card-header) {
    align-self: end;
    justify-self: start;
    margin: var(--mc-space-4);
    background: var(--mc-colour-surface);
    border-radius: var(--mc-radius-1);
    box-shadow: var(--mc-shadow-1);
  }

  .mc-card[data-orientation='horizontal'] {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .mc-card[data-orientation='horizontal'] > :global(.mc-card-hero),
  .mc-card[data-orientation='horizontal'] > :global(.mc-card-header) {
    grid-column: 1;
    grid-row: 1 / 3;
  }

  .mc-card[data-orientation='horizontal'] > :global(.mc-card-content) {
    grid-column: 2;
    grid-row: 1;
  }

  .mc-card[data-orientation='horizontal'] > :global(.mc-card-footer) {
    grid-column: 2;
    grid-row: 2;
  }

  .mc-card[data-orientation='horizontal']:not(
      :has(> :global(.mc-card-hero), > :global(.mc-card-header))
    )
    > :global(.mc-card-content),
  .mc-card[data-orientation='horizontal']:not(
      :has(> :global(.mc-card-hero), > :global(.mc-card-header))
    )
    > :global(.mc-card-footer),
  .mc-card[data-orientation='horizontal']:not(
      :has(> :global(.mc-card-content), > :global(.mc-card-footer))
    )
    > :global(.mc-card-hero),
  .mc-card[data-orientation='horizontal']:not(
      :has(> :global(.mc-card-content), > :global(.mc-card-footer))
    )
    > :global(.mc-card-header) {
    grid-column: 1 / -1;
  }

  @media (forced-colors: active) {
    .mc-card {
      color: CanvasText;
      background: Canvas;
      border-color: CanvasText;
    }

    .mc-card:has(> :global(.mc-card-hero)) > :global(.mc-card-header) {
      background: Canvas;
      border: var(--mc-border-width-default) solid CanvasText;
    }
  }
</style>
