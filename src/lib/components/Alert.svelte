<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { AlertProps } from './alert.types.js';

  let {
    children,
    class: className = '',
    consumer,
    leadingIcon,
    size = 'standard',
    title,
    tone = 'neutral',
    ...attributes
  }: AlertProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
</script>

<div
  {...attributes}
  class={`mc-alert ${className}`.trim()}
  data-mc-product={resolvedConsumer}
  data-size={size}
  data-tone={tone}
>
  {#if leadingIcon}
    <span class="mc-alert__icon" aria-hidden="true">
      {@render leadingIcon()}
    </span>
  {/if}
  <div class="mc-alert__content">
    {#if title}
      <div class="mc-alert__title">{title}</div>
    {/if}
    <div class="mc-alert__message">{@render children()}</div>
  </div>
</div>

<style>
  .mc-alert {
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
    inline-size: 100%;
    gap: var(--mc-space-3);
    padding: var(--mc-space-4);
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-surface);
    border-radius: var(--mc-radius-1);
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-body-weight);
    line-height: var(--mc-typography-body-line-height);
  }

  .mc-alert[data-size='compact'] {
    gap: var(--mc-space-2);
    padding: var(--mc-space-3);
  }

  .mc-alert[data-tone='info'] {
    background: color-mix(
      in srgb,
      var(--mc-colour-interactive) 12%,
      var(--mc-colour-surface)
    );
  }

  .mc-alert[data-tone='success'] {
    background: color-mix(
      in srgb,
      var(--mc-colour-success) 12%,
      var(--mc-colour-surface)
    );
  }

  .mc-alert[data-tone='warning'] {
    background: color-mix(
      in srgb,
      var(--mc-colour-warning) 12%,
      var(--mc-colour-surface)
    );
  }

  .mc-alert[data-tone='danger'] {
    background: color-mix(
      in srgb,
      var(--mc-colour-danger) 12%,
      var(--mc-colour-surface)
    );
  }

  .mc-alert__icon {
    flex: 0 0 auto;
    inline-size: var(--mc-size-icon-standard);
    block-size: var(--mc-size-icon-standard);
    color: var(--mc-colour-text-secondary);
  }

  .mc-alert[data-size='compact'] .mc-alert__icon {
    inline-size: var(--mc-size-icon-compact);
    block-size: var(--mc-size-icon-compact);
  }

  .mc-alert[data-tone='info'] .mc-alert__icon {
    color: var(--mc-colour-interactive);
  }

  .mc-alert[data-tone='success'] .mc-alert__icon {
    color: var(--mc-colour-success);
  }

  .mc-alert[data-tone='warning'] .mc-alert__icon {
    color: var(--mc-colour-warning);
  }

  .mc-alert[data-tone='danger'] .mc-alert__icon {
    color: var(--mc-colour-danger);
  }

  .mc-alert__content {
    display: grid;
    min-inline-size: 0;
    gap: var(--mc-space-1);
  }

  .mc-alert__title {
    font-weight: var(--mc-font-weight-bold);
  }

  .mc-alert__message {
    overflow-wrap: anywhere;
  }

  @media (forced-colors: active) {
    .mc-alert__icon {
      color: CanvasText;
    }
  }
</style>
