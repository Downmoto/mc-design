<script lang="ts">
  import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
  import CaretUpIcon from 'phosphor-svelte/lib/CaretUpIcon';

  import { getConsumerContext } from '../consumer-context.js';
  import type { NumericInputProps } from './numeric-input.types.js';

  const generatedId = $props.id();

  let {
    'aria-describedby': ariaDescribedby,
    'aria-invalid': ariaInvalid,
    class: className = '',
    consumer,
    description = '',
    disabled = false,
    error = '',
    id,
    label,
    prefix = '',
    readonly = false,
    required = false,
    size = 'standard',
    step,
    suffix = '',
    value = $bindable(),
    ...attributes
  }: NumericInputProps = $props();

  let control: HTMLInputElement;
  let repeatDelay: ReturnType<typeof setTimeout> | undefined;
  let repeatInterval: ReturnType<typeof setInterval> | undefined;

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let controlId = $derived(id ?? `${generatedId}-control`);
  let message = $derived(error || description);
  let messageId = $derived(`${controlId}-message`);
  let prefixId = $derived(`${controlId}-prefix`);
  let suffixId = $derived(`${controlId}-suffix`);
  let describedBy = $derived(
    [
      ariaDescribedby,
      prefix ? prefixId : undefined,
      suffix ? suffixId : undefined,
      message ? messageId : undefined,
    ]
      .filter(Boolean)
      .join(' ') || undefined,
  );
  let stepperDisabled = $derived(disabled || readonly || step === 'any');

  function changeByStep(direction: 'up' | 'down', focus = true) {
    if (stepperDisabled) return;

    control[direction === 'up' ? 'stepUp' : 'stepDown']();
    control.dispatchEvent(new Event('input', { bubbles: true }));
    control.dispatchEvent(new Event('change', { bubbles: true }));
    if (focus) control.focus();
  }

  function stopRepeating() {
    clearTimeout(repeatDelay);
    clearInterval(repeatInterval);
    repeatDelay = undefined;
    repeatInterval = undefined;
  }

  function startRepeating(direction: 'up' | 'down', event: MouseEvent) {
    if (event.button !== 0 || stepperDisabled) return;

    stopRepeating();
    changeByStep(direction, false);
    repeatDelay = setTimeout(() => {
      repeatInterval = setInterval(() => changeByStep(direction, false), 80);
    }, 400);
  }

  function finishRepeating() {
    stopRepeating();
    control.focus();
  }
</script>

<div
  class={`mc-numeric-input ${className}`.trim()}
  data-disabled={disabled || undefined}
  data-error={Boolean(error) || undefined}
  data-mc-product={resolvedConsumer}
  data-readonly={readonly || undefined}
  data-size={size}
>
  <label class="mc-numeric-input__label" for={controlId}>
    <span>{label}</span>
    {#if required}
      <span class="mc-numeric-input__required" aria-hidden="true">*</span>
    {/if}
  </label>
  <div class="mc-numeric-input__control-shell">
    <div class="mc-numeric-input__value">
      {#if prefix}
        <span class="mc-numeric-input__adornment" id={prefixId}>
          {prefix}
        </span>
      {/if}
      <input
        {...attributes}
        class="mc-numeric-input__control"
        id={controlId}
        type="number"
        {disabled}
        {readonly}
        {required}
        {step}
        bind:this={control}
        bind:value
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : ariaInvalid}
      />
      {#if suffix}
        <span class="mc-numeric-input__adornment" id={suffixId}>
          {suffix}
        </span>
      {/if}
    </div>
    <div class="mc-numeric-input__steppers">
      <button
        class="mc-numeric-input__stepper"
        type="button"
        disabled={stepperDisabled}
        aria-label={`Increase ${label}`}
        onclick={(event) => event.detail === 0 && changeByStep('up')}
        onmousedown={(event) => startRepeating('up', event)}
        onmouseup={finishRepeating}
        onmouseleave={stopRepeating}
      >
        <CaretUpIcon aria-hidden="true" />
      </button>
      <button
        class="mc-numeric-input__stepper"
        type="button"
        disabled={stepperDisabled}
        aria-label={`Decrease ${label}`}
        onclick={(event) => event.detail === 0 && changeByStep('down')}
        onmousedown={(event) => startRepeating('down', event)}
        onmouseup={finishRepeating}
        onmouseleave={stopRepeating}
      >
        <CaretDownIcon aria-hidden="true" />
      </button>
    </div>
  </div>
  {#if message}
    <span
      class="mc-numeric-input__message"
      id={messageId}
      aria-live={error ? 'polite' : undefined}>{message}</span
    >
  {/if}
</div>

<style>
  .mc-numeric-input {
    --mc-numeric-input-block-size: var(--mc-size-control-standard);
    --mc-numeric-input-icon-size: calc(
      var(--mc-size-icon-standard) - var(--mc-space-1)
    );
    --mc-numeric-input-stepper-size: var(--mc-size-control-standard);
  }

  .mc-numeric-input[data-size='compact'] {
    --mc-numeric-input-block-size: var(--mc-size-control-compact);
    --mc-numeric-input-icon-size: calc(
      var(--mc-size-icon-compact) - var(--mc-space-1)
    );
    --mc-numeric-input-stepper-size: var(--mc-size-control-compact);
  }

  .mc-numeric-input__control-shell {
    display: grid;
    grid-template-columns: minmax(0, 1fr) var(--mc-numeric-input-stepper-size);
    block-size: var(--mc-numeric-input-block-size);
    min-block-size: var(--mc-numeric-input-block-size);
    overflow: hidden;
  }

  .mc-numeric-input__control {
    flex: 1 1 auto;
    block-size: 100%;
    min-block-size: 0;
    padding: 0;
    background: transparent;
    border: 0;
    border-radius: 0;
    font-variant-numeric: tabular-nums;
    appearance: textfield;
  }

  .mc-numeric-input__value {
    display: flex;
    align-items: center;
    min-inline-size: 0;
    padding-inline: var(--mc-space-3);
    gap: var(--mc-space-2);
  }

  .mc-numeric-input__adornment {
    flex: 0 0 auto;
    color: var(--mc-colour-text-secondary);
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-body-weight);
    line-height: var(--mc-typography-body-line-height);
    white-space: nowrap;
  }

  .mc-numeric-input__control::-webkit-inner-spin-button,
  .mc-numeric-input__control::-webkit-outer-spin-button {
    margin: 0;
    appearance: none;
  }

  .mc-numeric-input__control:focus-visible {
    outline: 0;
  }

  .mc-numeric-input__steppers {
    position: relative;
    display: grid;
    grid-template-rows: repeat(2, minmax(0, 1fr));
    block-size: var(--mc-numeric-input-block-size);
    min-block-size: 0;
    background: color-mix(
      in srgb,
      var(--mc-colour-interactive) var(--mc-opacity-control-stepper),
      var(--mc-colour-surface-high)
    );
  }

  .mc-numeric-input__steppers::after {
    position: absolute;
    inset: 50% 0 auto;
    block-size: var(--mc-border-width-default);
    background: var(--mc-colour-surface-high);
    content: '';
    pointer-events: none;
    transform: translateY(-50%);
  }

  .mc-numeric-input__stepper {
    display: grid;
    min-inline-size: 0;
    min-block-size: 0;
    padding: 0;
    place-items: center;
    color: var(--mc-colour-text-secondary);
    background: transparent;
    border: 0;
    border-radius: 0;
    line-height: 0;
    appearance: none;
    cursor: pointer;
  }

  .mc-numeric-input__stepper :global(svg) {
    display: block;
    inline-size: var(--mc-numeric-input-icon-size);
    block-size: var(--mc-numeric-input-icon-size);
  }

  .mc-numeric-input__stepper:hover:not(:disabled) {
    color: var(--mc-colour-interactive);
    background: color-mix(
      in srgb,
      var(--mc-colour-interactive) var(--mc-opacity-control-stepper-hover),
      var(--mc-colour-surface-high)
    );
  }

  .mc-numeric-input__stepper:focus-visible {
    color: var(--mc-colour-interactive);
    outline: 0;
    box-shadow: inset 0 0 var(--mc-space-2)
      color-mix(
        in srgb,
        var(--mc-colour-interactive) var(--mc-opacity-focus-shadow),
        transparent
      );
  }

  .mc-numeric-input__stepper:disabled {
    color: var(--mc-colour-text-secondary);
    cursor: not-allowed;
  }

  @media (forced-colors: active) {
    .mc-numeric-input__steppers {
      border-color: FieldText;
    }

    .mc-numeric-input__steppers::after {
      background: FieldText;
    }

    .mc-numeric-input__stepper {
      color: ButtonText;
      background: ButtonFace;
    }

    .mc-numeric-input__stepper:disabled {
      color: GrayText;
      border-color: GrayText;
    }
  }
</style>
