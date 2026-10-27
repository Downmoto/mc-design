<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { SliderProps } from './slider.types.js';

  const generatedId = $props.id();

  let {
    'aria-describedby': ariaDescribedby,
    'aria-invalid': ariaInvalid,
    'aria-valuetext': ariaValueText,
    class: className = '',
    consumer,
    disabled = false,
    error = '',
    id,
    label,
    max = 100,
    min = 0,
    showValue = false,
    size = 'standard',
    step = 1,
    suffix = '',
    value = $bindable(0),
    ...attributes
  }: SliderProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let controlId = $derived(id ?? `${generatedId}-control`);
  let messageId = $derived(`${controlId}-message`);
  let describedBy = $derived(
    [ariaDescribedby, error ? messageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined,
  );
  let fill = $derived(
    max === min
      ? 0
      : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)),
  );
  let valueText = $derived(
    ariaValueText ?? (suffix ? `${value}${suffix}` : undefined),
  );
</script>

<div
  class={`mc-slider ${className}`.trim()}
  data-disabled={disabled || undefined}
  data-error={Boolean(error) || undefined}
  data-mc-product={resolvedConsumer}
  data-size={size}
>
  <div class="mc-slider__heading">
    <label class="mc-slider__label" for={controlId}>{label}</label>
    {#if showValue}
      <output class="mc-slider__value" for={controlId} aria-hidden="true">
        {value}{suffix}
      </output>
    {/if}
  </div>
  <input
    {...attributes}
    class="mc-slider__control"
    id={controlId}
    type="range"
    {disabled}
    {min}
    {max}
    {step}
    bind:value
    aria-describedby={describedBy}
    aria-invalid={error ? 'true' : ariaInvalid}
    aria-valuetext={valueText}
    style:--mc-slider-fill={`${fill}%`}
  />
  {#if error}
    <span class="mc-slider__message" id={messageId} aria-live="polite"
      >{error}</span
    >
  {/if}
</div>

<style>
  .mc-slider {
    --mc-slider-control-block-size: var(--mc-size-control-standard);
    --mc-slider-thumb-size: var(--mc-size-icon-standard);
    --mc-slider-track-size: var(--mc-space-2);
  }

  .mc-slider[data-size='compact'] {
    --mc-slider-control-block-size: var(--mc-size-control-compact);
    --mc-slider-thumb-size: var(--mc-size-icon-compact);
    --mc-slider-track-size: var(--mc-space-1);
  }

  .mc-slider__heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--mc-space-2);
  }

  .mc-slider__value {
    color: var(--mc-colour-text-secondary);
    font-family: var(--mc-typography-code-family);
    font-size: var(--mc-typography-code-size);
    font-weight: var(--mc-typography-code-weight);
    line-height: var(--mc-typography-code-line-height);
    font-variant-numeric: tabular-nums;
  }

  .mc-slider__control {
    --mc-slider-fill: 0%;

    box-sizing: border-box;
    inline-size: 100%;
    block-size: var(--mc-slider-control-block-size);
    min-inline-size: 0;
    margin: calc(var(--mc-space-1) * -1) 0;
    padding: 0;
    background: transparent;
    border: 0;
    border-radius: 0;
    appearance: none;
    cursor: pointer;
  }

  .mc-slider__control::-webkit-slider-runnable-track {
    block-size: var(--mc-slider-track-size);
    background: linear-gradient(
      to right,
      var(--mc-colour-interactive) 0 var(--mc-slider-fill),
      var(--mc-colour-surface) var(--mc-slider-fill) 100%
    );
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-3);
  }

  .mc-slider__control::-moz-range-track {
    block-size: var(--mc-slider-track-size);
    background: linear-gradient(
      to right,
      var(--mc-colour-interactive) 0 var(--mc-slider-fill),
      var(--mc-colour-surface) var(--mc-slider-fill) 100%
    );
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-3);
  }

  .mc-slider__control::-webkit-slider-thumb {
    box-sizing: border-box;
    inline-size: var(--mc-slider-thumb-size);
    block-size: var(--mc-slider-thumb-size);
    margin-block-start: calc(
      (var(--mc-slider-track-size) - var(--mc-slider-thumb-size)) / 2
    );
    background: var(--mc-colour-interactive);
    border: var(--mc-border-width-emphasised) solid var(--mc-colour-background);
    border-radius: 50%;
    appearance: none;
  }

  .mc-slider__control::-moz-range-thumb {
    box-sizing: border-box;
    inline-size: var(--mc-slider-thumb-size);
    block-size: var(--mc-slider-thumb-size);
    background: var(--mc-colour-interactive);
    border: var(--mc-border-width-emphasised) solid var(--mc-colour-background);
    border-radius: 50%;
  }

  .mc-slider__control:hover:not(:disabled)::-webkit-slider-thumb {
    border-color: var(--mc-colour-interactive);
  }

  .mc-slider__control:hover:not(:disabled)::-moz-range-thumb {
    border-color: var(--mc-colour-interactive);
  }

  .mc-slider[data-error='true']
    .mc-slider__control::-webkit-slider-runnable-track {
    border-color: var(--mc-colour-danger);
  }

  .mc-slider[data-error='true'] .mc-slider__control::-moz-range-track {
    border-color: var(--mc-colour-danger);
  }

  .mc-slider[data-disabled='true'] {
    color: var(--mc-colour-text-secondary);
    opacity: var(--mc-opacity-disabled);
  }

  .mc-slider[data-disabled='true'] .mc-slider__control {
    cursor: not-allowed;
  }

  @media (forced-colors: active) {
    .mc-slider__control::-webkit-slider-runnable-track,
    .mc-slider__control::-moz-range-track {
      background: Field;
      border-color: FieldText;
      forced-color-adjust: auto;
    }

    .mc-slider__control::-webkit-slider-thumb,
    .mc-slider__control::-moz-range-thumb {
      background: Highlight;
      border-color: Highlight;
      forced-color-adjust: auto;
    }

    .mc-slider[data-error='true']
      .mc-slider__control::-webkit-slider-runnable-track,
    .mc-slider[data-error='true'] .mc-slider__control::-moz-range-track {
      border-color: Highlight;
    }

    .mc-slider[data-disabled='true'] {
      color: GrayText;
      opacity: 1;
    }
  }
</style>
