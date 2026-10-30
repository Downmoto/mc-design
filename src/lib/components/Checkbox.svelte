<script lang="ts">
  import CheckIcon from 'phosphor-svelte/lib/CheckIcon';
  import MinusIcon from 'phosphor-svelte/lib/MinusIcon';

  import { getConsumerContext } from '../consumer-context.js';
  import type { CheckboxProps } from './checkbox.types.js';

  const generatedId = $props.id();

  let {
    'aria-describedby': ariaDescribedby,
    'aria-invalid': ariaInvalid,
    'aria-labelledby': ariaLabelledby,
    checked = $bindable(false),
    class: className = '',
    consumer,
    disabled = false,
    error = '',
    id,
    indeterminate = $bindable(false),
    label,
    required = false,
    size = 'standard',
    ...attributes
  }: CheckboxProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let controlId = $derived(id ?? `${generatedId}-control`);
  let labelId = $derived(`${controlId}-label`);
  let messageId = $derived(`${controlId}-message`);
  let describedBy = $derived(
    [ariaDescribedby, error ? messageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined,
  );
</script>

<div
  class={`mc-checkbox ${className}`.trim()}
  data-disabled={disabled || undefined}
  data-error={Boolean(error) || undefined}
  data-mc-product={resolvedConsumer}
  data-size={size}
>
  <label class="mc-checkbox__control" for={controlId}>
    <input
      {...attributes}
      class="mc-checkbox__native"
      id={controlId}
      type="checkbox"
      {disabled}
      {required}
      bind:checked
      bind:indeterminate
      aria-describedby={describedBy}
      aria-invalid={error ? 'true' : ariaInvalid}
      aria-labelledby={[labelId, ariaLabelledby].filter(Boolean).join(' ')}
    />
    <span class="mc-checkbox__box" aria-hidden="true">
      <CheckIcon class="mc-checkbox__check" />
      <MinusIcon class="mc-checkbox__mixed" />
    </span>
    <span class="mc-checkbox__label" id={labelId}>
      <span>{label}</span>
      {#if required}
        <span class="mc-checkbox__required" aria-hidden="true">*</span>
      {/if}
    </span>
  </label>
  {#if error}
    <span class="mc-checkbox__message" id={messageId} aria-live="polite"
      >{error}</span
    >
  {/if}
</div>

<style>
  .mc-checkbox {
    --mc-checkbox-box-size: var(--mc-size-icon-standard);
    --mc-checkbox-mark-size: var(--mc-size-icon-compact);
  }

  .mc-checkbox[data-size='compact'] {
    --mc-checkbox-box-size: var(--mc-size-icon-compact);
    --mc-checkbox-mark-size: calc(
      var(--mc-size-icon-compact) - var(--mc-space-1)
    );
  }

  .mc-checkbox__native:focus-visible {
    outline: 0;
  }

  .mc-checkbox__box {
    display: grid;
    flex: 0 0 auto;
    inline-size: var(--mc-checkbox-box-size);
    block-size: var(--mc-checkbox-box-size);
    place-items: center;
    color: var(--mc-colour-background);
    background: var(--mc-colour-surface-high);
    border: 0;
    border-radius: var(--mc-radius-1);
    transition:
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      box-shadow var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default);
  }

  :global(.mc-checkbox__check),
  :global(.mc-checkbox__mixed) {
    display: none;
    inline-size: var(--mc-checkbox-mark-size);
    block-size: var(--mc-checkbox-mark-size);
  }

  .mc-checkbox__native:checked + .mc-checkbox__box,
  .mc-checkbox__native:indeterminate + .mc-checkbox__box {
    background: var(--mc-colour-interactive);
  }

  .mc-checkbox__native:checked
    + .mc-checkbox__box
    :global(.mc-checkbox__check) {
    display: block;
  }

  .mc-checkbox__native:indeterminate
    + .mc-checkbox__box
    :global(.mc-checkbox__check) {
    display: none;
  }

  .mc-checkbox__native:indeterminate
    + .mc-checkbox__box
    :global(.mc-checkbox__mixed) {
    display: block;
  }

  .mc-checkbox[data-error='true'] .mc-checkbox__box {
    background: color-mix(
      in srgb,
      var(--mc-colour-danger) var(--mc-opacity-status-emphasised),
      var(--mc-colour-surface-high)
    );
  }

  .mc-checkbox__label {
    min-block-size: var(--mc-checkbox-box-size);
  }

  .mc-checkbox__message {
    margin-inline-start: calc(var(--mc-checkbox-box-size) + var(--mc-space-2));
    color: var(--mc-colour-danger);
  }

  @media (forced-colors: active) {
    .mc-checkbox__box {
      color: HighlightText;
    }

    .mc-checkbox[data-error='true'] .mc-checkbox__box,
    .mc-checkbox[data-error='true'] .mc-checkbox__message {
      color: CanvasText;
      border-color: Highlight;
    }
  }
</style>
