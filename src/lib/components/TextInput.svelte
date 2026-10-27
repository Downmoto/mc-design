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
  }

  .mc-text-input[data-size='compact'] {
    --mc-text-input-block-size: var(--mc-size-control-compact);
    --mc-text-input-icon-size: var(--mc-size-icon-compact);
  }

  .mc-text-input__control {
    block-size: var(--mc-text-input-block-size);
    min-block-size: var(--mc-text-input-block-size);
    padding-inline: var(--mc-space-3);
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
</style>
