<script lang="ts">
  import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';

  import { getConsumerContext } from '../consumer-context.js';
  import type { DisclosureProps } from './disclosure.types.js';

  let {
    children,
    class: className = '',
    consumer,
    open = $bindable(false),
    size = 'standard',
    summary,
    ...attributes
  }: DisclosureProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
</script>

<details
  {...attributes}
  class={`mc-disclosure ${className}`.trim()}
  data-mc-product={resolvedConsumer}
  data-size={size}
  bind:open
>
  <summary class="mc-disclosure__summary">
    <span>{summary}</span>
    <CaretDownIcon class="mc-disclosure__icon" aria-hidden="true" />
  </summary>
  <div class="mc-disclosure__content">
    {@render children()}
  </div>
</details>

<style>
  .mc-disclosure {
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-surface);
    border-radius: var(--mc-radius-1);
  }

  .mc-disclosure__summary {
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content;
    align-items: center;
    list-style: none;
    cursor: pointer;
    transition:
      color var(--mc-motion-duration-direct) var(--mc-motion-easing-default),
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default);
  }

  .mc-disclosure__summary::-webkit-details-marker {
    display: none;
  }

  .mc-disclosure__summary:hover {
    color: var(--mc-colour-interactive);
  }

  :global(.mc-disclosure__icon) {
    transition: transform var(--mc-motion-duration-standard)
      var(--mc-motion-easing-default);
  }

  .mc-disclosure[open] :global(.mc-disclosure__icon) {
    transform: rotate(180deg);
  }

  .mc-disclosure__content {
    padding: 0 var(--mc-space-4) var(--mc-space-4);
  }

  .mc-disclosure[data-size='compact'] .mc-disclosure__content {
    padding: 0 var(--mc-space-3) var(--mc-space-3);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.mc-disclosure__icon) {
      transition-duration: var(--mc-motion-duration-direct);
    }
  }

  @media (forced-colors: active) {
    .mc-disclosure {
      color: CanvasText;
      background: Canvas;
      border: var(--mc-border-width-default) solid CanvasText;
      forced-color-adjust: auto;
    }

    .mc-disclosure__summary:hover {
      color: Highlight;
    }
  }
</style>
