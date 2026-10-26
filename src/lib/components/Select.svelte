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
  {#if message}
    <span
      class="mc-select__message"
      id={messageId}
      aria-live={error ? 'polite' : undefined}>{message}</span
    >
  {/if}
</div>

<style>
  .mc-select {
    --mc-select-block-size: var(--mc-size-control-standard);
    --mc-select-icon-size: var(--mc-size-icon-standard);
  }

  .mc-select[data-size='compact'] {
    --mc-select-block-size: var(--mc-size-control-compact);
    --mc-select-icon-size: var(--mc-size-icon-compact);
  }

  .mc-select__control {
    block-size: var(--mc-select-block-size);
    min-block-size: var(--mc-select-block-size);
    padding: 0
      calc(var(--mc-space-3) + var(--mc-select-icon-size) + var(--mc-space-2)) 0
      var(--mc-space-3);
    appearance: none;
    cursor: pointer;
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

  .mc-select[data-disabled='true'] .mc-select__icon {
    opacity: 0.5;
  }
</style>
