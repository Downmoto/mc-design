<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { StatusProps } from './status.types.js';

  let {
    children,
    class: className = '',
    consumer,
    size = 'standard',
    tone = 'neutral',
    ...attributes
  }: StatusProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
</script>

<span
  {...attributes}
  class={`mc-status ${className}`.trim()}
  data-mc-product={resolvedConsumer}
  data-size={size}
  data-tone={tone}
  role="status"
  aria-atomic="true"
  aria-live="polite"
>
  <span class="mc-status__marker" aria-hidden="true"></span>
  <span class="mc-status__label">{@render children()}</span>
</span>

<style>
  .mc-status {
    display: inline-flex;
    align-items: center;
    min-inline-size: 0;
    gap: var(--mc-space-2);
    color: var(--mc-colour-text-primary);
    font-family: var(--mc-typography-label-family);
    font-size: var(--mc-typography-label-size);
    font-weight: var(--mc-typography-label-weight);
    line-height: var(--mc-typography-label-line-height);
  }

  .mc-status[data-size='compact'] {
    gap: var(--mc-space-1);
    font-family: var(--mc-typography-caption-family);
    font-size: var(--mc-typography-caption-size);
    font-weight: var(--mc-typography-caption-weight);
    line-height: var(--mc-typography-caption-line-height);
  }

  .mc-status__marker {
    flex: 0 0 auto;
    inline-size: var(--mc-space-2);
    block-size: var(--mc-space-2);
    background: var(--mc-colour-text-secondary);
    border-radius: var(--mc-radius-3);
  }

  .mc-status[data-tone='accent'] .mc-status__marker {
    background: var(--mc-colour-interactive);
  }

  .mc-status[data-tone='success'] .mc-status__marker {
    background: var(--mc-colour-success);
  }

  .mc-status[data-tone='warning'] .mc-status__marker {
    background: var(--mc-colour-warning);
  }

  .mc-status[data-tone='danger'] .mc-status__marker {
    background: var(--mc-colour-danger);
  }

  .mc-status__label {
    min-inline-size: 0;
    overflow-wrap: anywhere;
  }

  @media (forced-colors: active) {
    .mc-status {
      color: CanvasText;
    }

    .mc-status__marker {
      background: CanvasText;
    }
  }
</style>
