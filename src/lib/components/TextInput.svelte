<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { TextInputProps } from './text-input.types.js';

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
    leadingIcon,
    readonly = false,
    required = false,
    size = 'standard',
    trailingIcon,
    type = 'text',
    value = $bindable(),
    ...attributes
  }: TextInputProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let inputId = $derived(id ?? `${generatedId}-control`);
  let message = $derived(error || description);
  let messageId = $derived(`${inputId}-message`);
  let describedBy = $derived(
    [ariaDescribedby, message ? messageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined,
  );
</script>

<div
  class={`mc-text-input ${className}`.trim()}
  data-disabled={disabled || undefined}
  data-error={Boolean(error) || undefined}
  data-leading-icon={Boolean(leadingIcon) || undefined}
  data-mc-product={resolvedConsumer}
  data-readonly={readonly || undefined}
  data-size={size}
  data-trailing-icon={Boolean(trailingIcon) || undefined}
>
  <label class="mc-text-input__label" for={inputId}>
    <span>{label}</span>
    {#if required}
      <span class="mc-text-input__required" aria-hidden="true">*</span>
    {/if}
  </label>
  <div class="mc-text-input__control-shell">
    {#if leadingIcon}
      <span
        class="mc-text-input__icon"
        data-position="leading"
        aria-hidden="true"
      >
        {@render leadingIcon()}
      </span>
    {/if}
    <input
      {...attributes}
      class="mc-text-input__control"
      id={inputId}
      {type}
      {disabled}
      {readonly}
      {required}
      bind:value
      aria-describedby={describedBy}
      aria-invalid={error ? 'true' : ariaInvalid}
    />
    {#if trailingIcon}
      <span
        class="mc-text-input__icon"
        data-position="trailing"
        aria-hidden="true"
      >
        {@render trailingIcon()}
      </span>
    {/if}
  </div>
  {#if message}
    <span
      class="mc-text-input__message"
      id={messageId}
      aria-live={error ? 'polite' : undefined}>{message}</span
    >
  {/if}
</div>

<style>
  .mc-text-input {
    --mc-text-input-block-size: var(--mc-size-control-standard);
    --mc-text-input-icon-size: var(--mc-size-icon-standard);

    display: grid;
    inline-size: 100%;
    gap: var(--mc-space-1);
  }

  .mc-text-input[data-size='compact'] {
    --mc-text-input-block-size: var(--mc-size-control-compact);
    --mc-text-input-icon-size: var(--mc-size-icon-compact);
  }

  .mc-text-input__label {
    display: flex;
    gap: var(--mc-space-1);
    color: var(--mc-colour-text-primary);
    font-family: var(--mc-typography-label-family);
    font-size: var(--mc-typography-label-size);
    font-weight: var(--mc-typography-label-weight);
    line-height: var(--mc-typography-label-line-height);
  }

  .mc-text-input__required {
    color: var(--mc-colour-interactive);
  }

  .mc-text-input__control {
    box-sizing: border-box;
    inline-size: 100%;
    block-size: var(--mc-text-input-block-size);
    min-block-size: var(--mc-text-input-block-size);
    min-inline-size: 0;
    padding-inline: var(--mc-space-3);
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-background);
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-1);
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-body-weight);
    line-height: var(--mc-typography-body-line-height);
    transition:
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      border-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default);
  }

  .mc-text-input__control-shell {
    position: relative;
  }

  .mc-text-input[data-leading-icon='true'] .mc-text-input__control {
    padding-inline-start: calc(
      var(--mc-space-3) + var(--mc-text-input-icon-size) + var(--mc-space-2)
    );
  }

  .mc-text-input[data-trailing-icon='true'] .mc-text-input__control {
    padding-inline-end: calc(
      var(--mc-space-3) + var(--mc-text-input-icon-size) + var(--mc-space-2)
    );
  }

  .mc-text-input__icon {
    position: absolute;
    z-index: 1;
    inset-block-start: 50%;
    inline-size: var(--mc-text-input-icon-size);
    block-size: var(--mc-text-input-icon-size);
    color: var(--mc-colour-text-secondary);
    pointer-events: none;
    transform: translateY(-50%);
  }

  .mc-text-input__icon[data-position='leading'] {
    inset-inline-start: var(--mc-space-3);
  }

  .mc-text-input__icon[data-position='trailing'] {
    inset-inline-end: var(--mc-space-3);
  }

  .mc-text-input__icon :global(svg) {
    display: block;
    inline-size: 100%;
    block-size: 100%;
  }

  .mc-text-input__control::placeholder {
    color: var(--mc-colour-text-secondary);
    opacity: 1;
  }

  .mc-text-input__control:hover:not(:disabled):not(:read-only) {
    border-color: var(--mc-colour-interactive);
  }

  .mc-text-input__control:focus-visible {
    border-color: var(--mc-colour-interactive);
    outline: var(--mc-border-width-emphasised) solid
      var(--mc-colour-text-primary);
    outline-offset: 0;
  }

  .mc-text-input[data-error='true'] .mc-text-input__control {
    border-color: var(--mc-colour-danger);
  }

  .mc-text-input__control:disabled {
    color: var(--mc-colour-text-secondary);
    background: var(--mc-colour-surface);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mc-text-input__control:read-only:not(:disabled) {
    background: var(--mc-colour-surface);
  }

  .mc-text-input__message {
    margin-block-start: var(--mc-space-1);
    color: var(--mc-colour-text-secondary);
    font-family: var(--mc-typography-caption-family);
    font-size: var(--mc-typography-caption-size);
    font-weight: var(--mc-typography-caption-weight);
    line-height: var(--mc-typography-caption-line-height);
  }

  .mc-text-input[data-error='true'] .mc-text-input__message {
    color: var(--mc-colour-danger);
  }

  @media (forced-colors: active) {
    .mc-text-input__required {
      color: Highlight;
    }

    .mc-text-input__control,
    .mc-text-input__control:disabled {
      color: FieldText;
      background: Field;
      border-color: FieldText;
      opacity: 1;
      forced-color-adjust: auto;
    }

    .mc-text-input__control:focus-visible {
      outline-color: Highlight;
    }

    .mc-text-input[data-error='true'] .mc-text-input__control,
    .mc-text-input[data-error='true'] .mc-text-input__message {
      color: CanvasText;
      border-color: Highlight;
    }

    .mc-text-input__control:disabled {
      color: GrayText;
      border-color: GrayText;
    }
  }
</style>
