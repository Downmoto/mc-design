<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { SwitchProps } from './switch.types.js';

  const generatedId = $props.id();

  let {
    'aria-describedby': ariaDescribedby,
    'aria-invalid': ariaInvalid,
    'aria-labelledby': ariaLabelledby,
    checked = $bindable(false),
    class: className = '',
    consumer,
    description = '',
    disabled = false,
    error = '',
    id,
    label,
    required = false,
    size = 'standard',
    ...attributes
  }: SwitchProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let controlId = $derived(id ?? `${generatedId}-control`);
  let labelId = $derived(`${controlId}-label`);
  let message = $derived(error || description);
  let messageId = $derived(`${controlId}-message`);
  let describedBy = $derived(
    [ariaDescribedby, message ? messageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined,
  );
</script>

<div
  class={`mc-switch ${className}`.trim()}
  data-disabled={disabled || undefined}
  data-error={Boolean(error) || undefined}
  data-mc-product={resolvedConsumer}
  data-size={size}
>
  <label class="mc-switch__control" for={controlId}>
    <input
      {...attributes}
      class="mc-switch__native"
      id={controlId}
      type="checkbox"
      role="switch"
      {disabled}
      {required}
      bind:checked
      aria-describedby={describedBy}
      aria-invalid={error ? 'true' : ariaInvalid}
      aria-labelledby={[labelId, ariaLabelledby].filter(Boolean).join(' ')}
    />
    <span class="mc-switch__track" aria-hidden="true">
      <span class="mc-switch__thumb"></span>
    </span>
    <span class="mc-switch__label" id={labelId}>
      <span>{label}</span>
      {#if required}
        <span class="mc-switch__required" aria-hidden="true">*</span>
      {/if}
    </span>
  </label>
  {#if message}
    <span
      class="mc-switch__message"
      id={messageId}
      aria-live={error ? 'polite' : undefined}>{message}</span
    >
  {/if}
</div>

<style>
  .mc-switch {
    --mc-switch-track-inline-size: var(--mc-size-control-standard);
    --mc-switch-track-block-size: var(--mc-size-target-minimum);
    --mc-switch-thumb-size: var(--mc-size-icon-compact);
    --mc-switch-thumb-offset: var(--mc-space-1);
    --mc-switch-thumb-travel: var(--mc-size-icon-compact);
  }

  .mc-switch[data-size='compact'] {
    --mc-switch-track-inline-size: var(--mc-size-control-compact);
    --mc-switch-track-block-size: var(--mc-size-icon-standard);
    --mc-switch-thumb-size: calc(
      var(--mc-size-icon-compact) - var(--mc-space-1)
    );
    --mc-switch-thumb-travel: calc(
      var(--mc-size-icon-compact) - var(--mc-space-1)
    );
  }

  .mc-switch__control {
    position: relative;
    display: flex;
    grid-row: 1;
    align-items: center;
    min-block-size: var(--mc-size-target-minimum);
    gap: var(--mc-space-2);
    color: var(--mc-colour-text-primary);
    cursor: pointer;
  }

  .mc-switch__native {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    margin: 0;
    opacity: 0;
    pointer-events: none;
  }

  .mc-switch__track {
    position: relative;
    box-sizing: border-box;
    flex: 0 0 auto;
    inline-size: var(--mc-switch-track-inline-size);
    block-size: var(--mc-switch-track-block-size);
    background: var(--mc-colour-background);
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-3);
    transition:
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      border-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default);
  }

  .mc-switch__thumb {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: var(--mc-switch-thumb-offset);
    inline-size: var(--mc-switch-thumb-size);
    block-size: var(--mc-switch-thumb-size);
    background: var(--mc-colour-text-secondary);
    border-radius: 50%;
    transform: translateY(-50%);
    transition:
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      transform var(--mc-motion-duration-direct) var(--mc-motion-easing-default);
  }

  .mc-switch__native:checked + .mc-switch__track {
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-interactive);
  }

  .mc-switch__native:checked + .mc-switch__track .mc-switch__thumb {
    background: var(--mc-colour-background);
    transform: translate(var(--mc-switch-thumb-travel), -50%);
  }

  .mc-switch__label {
    align-items: center;
    min-block-size: var(--mc-switch-track-block-size);
  }

  .mc-switch__message {
    z-index: 1;
    grid-row: 2;
    min-block-size: calc(
      var(--mc-typography-caption-size) *
        var(--mc-typography-caption-line-height)
    );
    margin-inline-start: calc(
      var(--mc-switch-track-inline-size) + var(--mc-space-2)
    );
  }

  .mc-switch[data-disabled='true'] .mc-switch__control {
    color: var(--mc-colour-text-secondary);
    opacity: var(--mc-opacity-disabled);
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    .mc-switch__track,
    .mc-switch__thumb {
      transition: none;
    }
  }

  @media (forced-colors: active) {
    .mc-switch__track,
    .mc-switch__native:checked + .mc-switch__track {
      background: Field;
      border-color: FieldText;
      forced-color-adjust: auto;
    }

    .mc-switch__native:checked + .mc-switch__track {
      background: Highlight;
      border-color: Highlight;
    }

    .mc-switch__thumb {
      background: FieldText;
    }

    .mc-switch__native:checked + .mc-switch__track .mc-switch__thumb {
      background: HighlightText;
    }

    .mc-switch[data-disabled='true'] .mc-switch__control {
      color: GrayText;
      opacity: 1;
    }
  }
</style>
