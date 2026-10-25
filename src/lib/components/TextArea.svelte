<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { TextAreaProps } from './text-area.types.js';

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
    readonly = false,
    required = false,
    rows,
    size = 'standard',
    value = $bindable(),
    ...attributes
  }: TextAreaProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let controlId = $derived(id ?? `${generatedId}-control`);
  let resolvedRows = $derived(rows ?? (size === 'compact' ? 2 : 4));
  let message = $derived(error || description);
  let messageId = $derived(`${controlId}-message`);
  let describedBy = $derived(
    [ariaDescribedby, message ? messageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined,
  );
</script>

<div
  class={`mc-text-area ${className}`.trim()}
  data-disabled={disabled || undefined}
  data-error={Boolean(error) || undefined}
  data-mc-product={resolvedConsumer}
  data-readonly={readonly || undefined}
  data-size={size}
>
  <label class="mc-text-area__label" for={controlId}>
    <span>{label}</span>
    {#if required}
      <span class="mc-text-area__required" aria-hidden="true">*</span>
    {/if}
  </label>
  <textarea
    {...attributes}
    class="mc-text-area__control"
    id={controlId}
    {disabled}
    {readonly}
    {required}
    rows={resolvedRows}
    bind:value
    aria-describedby={describedBy}
    aria-invalid={error ? 'true' : ariaInvalid}></textarea>
  <span
    class="mc-text-area__message"
    id={messageId}
    aria-live={error ? 'polite' : undefined}>{message}</span
  >
</div>

<style>
  .mc-text-area {
    --mc-text-area-min-block-size: calc(
      var(--mc-size-control-large) + var(--mc-size-control-large)
    );

    display: grid;
    inline-size: 100%;
    gap: var(--mc-space-1);
  }

  .mc-text-area[data-size='compact'] {
    --mc-text-area-min-block-size: calc(
      var(--mc-size-control-compact) + var(--mc-size-control-compact)
    );
  }

  .mc-text-area__label {
    display: flex;
    gap: var(--mc-space-1);
    color: var(--mc-colour-text-primary);
    font-family: var(--mc-typography-label-family);
    font-size: var(--mc-typography-label-size);
    font-weight: var(--mc-typography-label-weight);
    line-height: var(--mc-typography-label-line-height);
  }

  .mc-text-area__required {
    color: var(--mc-colour-interactive);
  }

  .mc-text-area__control {
    box-sizing: border-box;
    inline-size: 100%;
    min-block-size: var(--mc-text-area-min-block-size);
    min-inline-size: 0;
    padding: var(--mc-space-3);
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-background);
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-1);
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-body-weight);
    line-height: var(--mc-typography-body-line-height);
    resize: vertical;
    transition:
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      border-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default);
  }

  .mc-text-area[data-size='compact'] .mc-text-area__control {
    padding: var(--mc-space-2) var(--mc-space-3);
  }

  .mc-text-area__control::placeholder {
    color: var(--mc-colour-text-secondary);
    opacity: 1;
  }

  .mc-text-area__control:hover:not(:disabled):not(:read-only) {
    border-color: var(--mc-colour-interactive);
  }

  .mc-text-area__control:focus-visible {
    border-color: var(--mc-colour-interactive);
    outline: var(--mc-border-width-emphasised) solid
      var(--mc-colour-text-primary);
    outline-offset: 0;
  }

  .mc-text-area[data-error='true'] .mc-text-area__control {
    border-color: var(--mc-colour-danger);
  }

  .mc-text-area__control:disabled {
    color: var(--mc-colour-text-secondary);
    background: var(--mc-colour-surface);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mc-text-area__control:read-only:not(:disabled) {
    background: var(--mc-colour-surface);
  }

  .mc-text-area__message {
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

  .mc-text-area[data-error='true'] .mc-text-area__message {
    color: var(--mc-colour-danger);
  }

  @media (forced-colors: active) {
    .mc-text-area__required {
      color: Highlight;
    }

    .mc-text-area__control,
    .mc-text-area__control:disabled {
      color: FieldText;
      background: Field;
      border-color: FieldText;
      opacity: 1;
      forced-color-adjust: auto;
    }

    .mc-text-area__control:focus-visible {
      outline-color: Highlight;
    }

    .mc-text-area[data-error='true'] .mc-text-area__control,
    .mc-text-area[data-error='true'] .mc-text-area__message {
      color: CanvasText;
      border-color: Highlight;
    }

    .mc-text-area__control:disabled {
      color: GrayText;
      border-color: GrayText;
    }
  }
</style>
