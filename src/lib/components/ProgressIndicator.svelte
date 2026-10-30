<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { ProgressIndicatorProps } from './progress-indicator.types.js';

  const generatedId = $props.id();

  let {
    class: className = '',
    consumer,
    id,
    label,
    max = 100,
    showValue = true,
    size = 'standard',
    value,
    ...attributes
  }: ProgressIndicatorProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let controlId = $derived(id ?? `${generatedId}-control`);
  let percentage = $derived(
    value === undefined || max <= 0
      ? undefined
      : Math.round((Math.min(max, Math.max(0, value)) / max) * 100),
  );
</script>

<div
  class={`mc-progress ${className}`.trim()}
  data-indeterminate={value === undefined ? true : undefined}
  data-mc-product={resolvedConsumer}
  data-size={size}
>
  <div class="mc-progress__heading">
    <label class="mc-progress__label" for={controlId}>{label}</label>
    {#if showValue && percentage !== undefined}
      <output class="mc-progress__value" for={controlId} aria-hidden="true">
        {percentage}%
      </output>
    {/if}
  </div>
  <div class="mc-progress__track">
    <progress
      {...attributes}
      class="mc-progress__control"
      id={controlId}
      {max}
      {value}
    ></progress>
    {#if value === undefined}
      <span class="mc-progress__indeterminate" aria-hidden="true"></span>
    {/if}
  </div>
</div>

<style>
  .mc-progress {
    gap: var(--mc-space-2);
  }

  .mc-progress__track {
    position: relative;
    overflow: hidden;
    border-radius: var(--mc-radius-3);
  }

  .mc-progress__control {
    display: block;
    inline-size: 100%;
    block-size: var(--mc-space-2);
    overflow: hidden;
    color: var(--mc-colour-interactive);
    background: var(--mc-colour-surface-high);
    border-radius: var(--mc-radius-3);
    appearance: none;
  }

  .mc-progress[data-size='compact'] .mc-progress__control {
    block-size: var(--mc-space-1);
  }

  .mc-progress__control::-webkit-progress-bar {
    background: var(--mc-colour-surface-high);
  }

  .mc-progress__control::-webkit-progress-value {
    background: var(--mc-colour-interactive);
    border-radius: var(--mc-radius-3);
  }

  .mc-progress__control::-moz-progress-bar {
    background: var(--mc-colour-interactive);
    border-radius: var(--mc-radius-3);
  }

  .mc-progress__control:indeterminate::-moz-progress-bar {
    background: var(--mc-colour-surface-high);
  }

  .mc-progress__indeterminate {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    inline-size: 50%;
    pointer-events: none;
    background: linear-gradient(
      to right,
      transparent,
      var(--mc-colour-interactive),
      transparent
    );
    animation: mc-progress-indeterminate var(--mc-motion-duration-progress)
      var(--mc-motion-easing-default) infinite;
  }

  @keyframes mc-progress-indeterminate {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(200%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mc-progress__indeterminate {
      transform: translateX(50%);
      animation: none;
    }
  }

  @media (forced-colors: active) {
    .mc-progress__control {
      color: Highlight;
      background: Field;
      border-color: FieldText;
      forced-color-adjust: auto;
    }

    .mc-progress__control::-webkit-progress-bar {
      background: Field;
    }

    .mc-progress__control::-webkit-progress-value {
      background: Highlight;
    }

    .mc-progress__control::-moz-progress-bar {
      background: Highlight;
    }

    .mc-progress__indeterminate {
      background: Highlight;
    }
  }
</style>
