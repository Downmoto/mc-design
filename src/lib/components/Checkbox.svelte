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

    display: grid;
    inline-size: 100%;
  }

  .mc-checkbox[data-size='compact'] {
    --mc-checkbox-box-size: var(--mc-size-icon-compact);
    --mc-checkbox-mark-size: calc(
      var(--mc-size-icon-compact) - var(--mc-space-1)
    );
  }

  .mc-checkbox__control {
    position: relative;
    display: flex;
    grid-row: 1;
    align-items: center;
    min-block-size: var(--mc-size-target-minimum);
    gap: var(--mc-space-2);
    color: var(--mc-colour-text-primary);
    cursor: pointer;
  }

  .mc-checkbox__native {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    margin: 0;
    opacity: 0;
    pointer-events: none;
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
    background: var(--mc-colour-background);
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-1);
    transition:
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      border-color var(--mc-motion-duration-direct)
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
    border-color: var(--mc-colour-interactive);
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

  .mc-checkbox__control:hover
    .mc-checkbox__native:not(:disabled)
    + .mc-checkbox__box {
    border-color: var(--mc-colour-interactive);
  }

  .mc-checkbox[data-error='true'] .mc-checkbox__box {
    border-color: var(--mc-colour-danger);
  }

  .mc-checkbox .mc-checkbox__native:focus-visible + .mc-checkbox__box {
    border-color: var(--mc-colour-interactive);
    outline: 0;
    box-shadow: 0 0 var(--mc-space-2)
      color-mix(
        in srgb,
        var(--mc-colour-interactive) var(--mc-opacity-focus-shadow),
        transparent
      );
  }

  .mc-checkbox__label {
    display: flex;
    align-items: center;
    min-block-size: var(--mc-checkbox-box-size);
    gap: var(--mc-space-1);
    font-family: var(--mc-typography-label-family);
    font-size: var(--mc-typography-label-size);
    font-weight: var(--mc-typography-label-weight);
    line-height: var(--mc-typography-label-line-height);
  }

  .mc-checkbox__required {
    color: var(--mc-colour-interactive);
  }

  .mc-checkbox__message {
    z-index: 1;
    grid-row: 2;
    min-block-size: calc(
      var(--mc-typography-caption-size) *
        var(--mc-typography-caption-line-height)
    );
    margin-inline-start: calc(var(--mc-checkbox-box-size) + var(--mc-space-2));
    color: var(--mc-colour-danger);
    font-family: var(--mc-typography-caption-family);
    font-size: var(--mc-typography-caption-size);
    font-weight: var(--mc-typography-caption-weight);
    line-height: var(--mc-typography-caption-line-height);
  }

  .mc-checkbox[data-disabled='true'] .mc-checkbox__control {
    color: var(--mc-colour-text-secondary);
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (forced-colors: active) {
    .mc-checkbox__required {
      color: Highlight;
    }

    .mc-checkbox__box,
    .mc-checkbox__native:checked + .mc-checkbox__box,
    .mc-checkbox__native:indeterminate + .mc-checkbox__box {
      color: HighlightText;
      background: Field;
      border-color: FieldText;
      forced-color-adjust: auto;
    }

    .mc-checkbox__native:checked + .mc-checkbox__box,
    .mc-checkbox__native:indeterminate + .mc-checkbox__box {
      background: Highlight;
      border-color: Highlight;
    }

    .mc-checkbox__native:focus-visible + .mc-checkbox__box {
      border-color: Highlight;
      outline: var(--mc-border-width-emphasised) solid Highlight;
      outline-offset: calc(var(--mc-border-width-emphasised) * -1);
      box-shadow: none;
    }

    .mc-checkbox[data-error='true'] .mc-checkbox__box,
    .mc-checkbox[data-error='true'] .mc-checkbox__message {
      color: CanvasText;
      border-color: Highlight;
    }

    .mc-checkbox[data-disabled='true'] .mc-checkbox__control {
      color: GrayText;
      opacity: 1;
    }
  }
</style>
