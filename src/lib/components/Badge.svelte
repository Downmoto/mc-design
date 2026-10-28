<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { BadgeProps } from './badge.types.js';

  let {
    children,
    class: className = '',
    consumer,
    leadingIcon,
    size = 'standard',
    tone = 'neutral',
    ...attributes
  }: BadgeProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
</script>

<span
  {...attributes}
  class={`mc-badge ${className}`.trim()}
  data-mc-product={resolvedConsumer}
  data-size={size}
  data-tone={tone}
>
  {#if leadingIcon}
    <span class="mc-badge__icon" aria-hidden="true">
      {@render leadingIcon()}
    </span>
  {/if}
  {@render children()}
</span>

<style>
  .mc-badge {
    flex: 0 0 auto;
    box-sizing: border-box;
    min-block-size: var(--mc-size-target-minimum);
    gap: var(--mc-space-1);
    padding-inline: var(--mc-space-2);
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-surface);
    border: var(--mc-border-width-default) solid currentColor;
    border-radius: var(--mc-radius-3);
    white-space: nowrap;
  }

  .mc-badge[data-size='compact'] {
    min-block-size: var(--mc-size-icon-standard);
    padding-inline: var(--mc-space-1);
  }

  .mc-badge[data-tone='accent'] {
    color: var(--mc-colour-interactive);
  }

  .mc-badge[data-tone='success'] {
    color: var(--mc-colour-success);
  }

  .mc-badge[data-tone='warning'] {
    color: var(--mc-colour-warning);
  }

  .mc-badge[data-tone='danger'] {
    color: var(--mc-colour-danger);
  }

  .mc-badge__icon {
    inline-size: var(--mc-size-icon-compact);
    block-size: var(--mc-size-icon-compact);
  }
</style>
