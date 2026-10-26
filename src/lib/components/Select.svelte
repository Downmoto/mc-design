<script lang="ts">
  import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';

  import { getConsumerContext } from '../consumer-context.js';
  import type { SelectProps } from './select.types.js';

  const generatedId = $props.id();

  let {
    'aria-describedby': ariaDescribedby,
    'aria-invalid': ariaInvalid,
    children,
    class: className = '',
    consumer,
    description = '',
    disabled = false,
    error = '',
    id,
    label,
    required = false,
    size = 'standard',
    value = $bindable(),
    ...attributes
  }: SelectProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let controlId = $derived(id ?? `${generatedId}-control`);
  let message = $derived(error || description);
  let messageId = $derived(`${controlId}-message`);
  let describedBy = $derived(
    [ariaDescribedby, message ? messageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined,
  );
</script>

<div
  class={`mc-select ${className}`.trim()}
  data-disabled={disabled || undefined}
  data-error={Boolean(error) || undefined}
  data-mc-product={resolvedConsumer}
  data-size={size}
>
  <label class="mc-select__label" for={controlId}>
    <span>{label}</span>
    {#if required}
      <span class="mc-select__required" aria-hidden="true">*</span>
    {/if}
  </label>
  <div class="mc-select__control-shell">
    <select
      {...attributes}
      class="mc-select__control"
      id={controlId}
      {disabled}
      {required}
      bind:value
      aria-describedby={describedBy}
      aria-invalid={error ? 'true' : ariaInvalid}
    >
      {@render children()}
    </select>
    <span class="mc-select__icon" aria-hidden="true">
      <CaretDownIcon />
    </span>
  </div>
  <span
    class="mc-select__message"
    id={messageId}
    aria-live={error ? 'polite' : undefined}>{message}</span
  >
</div>

<style>
  .mc-select {
    --mc-select-block-size: var(--mc-size-control-standard);
    --mc-select-icon-size: var(--mc-size-icon-standard);

    display: grid;
    inline-size: 100%;
    gap: var(--mc-space-1);
  }

  .mc-select[data-size='compact'] {
    --mc-select-block-size: var(--mc-size-control-compact);
    --mc-select-icon-size: var(--mc-size-icon-compact);
  }

  .mc-select__label {
    display: flex;
    gap: var(--mc-space-1);
    color: var(--mc-colour-text-primary);
    font-family: var(--mc-typography-label-family);
    font-size: var(--mc-typography-label-size);
    font-weight: var(--mc-typography-label-weight);
    line-height: var(--mc-typography-label-line-height);
  }

  .mc-select__required {
    color: var(--mc-colour-interactive);
  }

  .mc-select__control-shell {
    position: relative;
  }

  .mc-select__control {
    box-sizing: border-box;
    inline-size: 100%;
    block-size: var(--mc-select-block-size);
    min-block-size: var(--mc-select-block-size);
    min-inline-size: 0;
    padding: 0
      calc(var(--mc-space-3) + var(--mc-select-icon-size) + var(--mc-space-2)) 0
      var(--mc-space-3);
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-background);
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-1);
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-body-weight);
    line-height: var(--mc-typography-body-line-height);
    appearance: none;
    cursor: pointer;
    transition:
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      border-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default);
  }

  .mc-select__icon {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-end: var(--mc-space-3);
    display: grid;
    inline-size: var(--mc-select-icon-size);
    block-size: var(--mc-select-icon-size);
    place-items: center;
    color: var(--mc-colour-text-secondary);
    pointer-events: none;
    transform: translateY(-50%);
  }

  .mc-select__icon :global(svg) {
    display: block;
    inline-size: 100%;
    block-size: 100%;
  }

  .mc-select__control:hover:not(:disabled) {
    border-color: var(--mc-colour-interactive);
  }

  .mc-select__control:focus-visible {
    border-color: var(--mc-colour-interactive);
    outline: var(--mc-border-width-emphasised) solid
      var(--mc-colour-text-primary);
    outline-offset: 0;
  }

  .mc-select[data-error='true'] .mc-select__control {
    border-color: var(--mc-colour-danger);
  }

  .mc-select__control:disabled {
    color: var(--mc-colour-text-secondary);
    background: var(--mc-colour-surface);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mc-select[data-disabled='true'] .mc-select__icon {
    opacity: 0.5;
  }

  .mc-select__message {
    margin-block-start: var(--mc-space-1);
    min-block-size: calc(
      var(--mc-typography-caption-size) *
        var(--mc-typography-caption-line-height)
    );
    color: var(--mc-colour-text-secondary);
    font-family: var(--mc-typography-caption-family);
    font-size: var(--mc-typography-caption-size);
    font-weight: var(--mc-typography-caption-weight);
    line-height: var(--mc-typography-caption-line-height);
  }

  .mc-select[data-error='true'] .mc-select__message {
    color: var(--mc-colour-danger);
  }

  @media (forced-colors: active) {
    .mc-select__required {
      color: Highlight;
    }

    .mc-select__control,
    .mc-select__control:disabled {
      color: FieldText;
      background: Field;
      border-color: FieldText;
      opacity: 1;
      forced-color-adjust: auto;
    }

    .mc-select__control:focus-visible {
      outline-color: Highlight;
    }

    .mc-select[data-error='true'] .mc-select__control,
    .mc-select[data-error='true'] .mc-select__message {
      color: CanvasText;
      border-color: Highlight;
    }

    .mc-select__control:disabled,
    .mc-select[data-disabled='true'] .mc-select__icon {
      color: GrayText;
      opacity: 1;
    }
  }
</style>
