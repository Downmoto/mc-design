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
    data-empty={!message || undefined}
    id={messageId}
    aria-atomic="true"
    aria-live="polite">{message}</span
  >
</div>

<style>
  .mc-text-area {
    --mc-text-area-min-block-size: calc(
      var(--mc-size-control-large) + var(--mc-size-control-large)
    );
  }

  .mc-text-area[data-size='compact'] {
    --mc-text-area-min-block-size: calc(
      var(--mc-size-control-compact) + var(--mc-size-control-compact)
    );
  }

  .mc-text-area__control {
    min-block-size: var(--mc-text-area-min-block-size);
    padding: var(--mc-space-3);
    resize: vertical;
  }

  .mc-text-area[data-size='compact'] .mc-text-area__control {
    padding: var(--mc-space-2) var(--mc-space-3);
  }
</style>
