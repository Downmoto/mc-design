<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { RadioGroupProps } from './radio-group.types.js';

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
    name,
    options,
    required = false,
    size = 'standard',
    value = $bindable(),
    ...attributes
  }: RadioGroupProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let groupId = $derived(id ?? `${generatedId}-group`);
  let groupName = $derived(name ?? `${groupId}-option`);
  let message = $derived(error || description);
  let messageId = $derived(`${groupId}-message`);
  let describedBy = $derived(
    [ariaDescribedby, message ? messageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined,
  );
</script>

<fieldset
  {...attributes}
  class={`mc-radio-group ${className}`.trim()}
  id={groupId}
  {disabled}
  aria-describedby={describedBy}
  data-disabled={disabled || undefined}
  data-error={Boolean(error) || undefined}
  data-mc-product={resolvedConsumer}
  data-size={size}
>
  <legend class="mc-radio-group__legend">
    <span>{label}</span>
    {#if required}
      <span class="mc-radio-group__required" aria-hidden="true">*</span>
    {/if}
  </legend>
  {#if message}
    <span
      class="mc-radio-group__message"
      id={messageId}
      aria-live={error ? 'polite' : undefined}>{message}</span
    >
  {/if}
  <div class="mc-radio-group__options">
    {#each options as option, index (option.value)}
      {@const optionId = `${groupId}-option-${index}`}
      {@const optionLabelId = `${optionId}-label`}
      {@const optionDescriptionId = `${optionId}-description`}
      <label
        class="mc-radio-group__option"
        data-disabled={option.disabled || undefined}
        for={optionId}
      >
        <!-- svelte-ignore a11y_role_supports_aria_props_implicit (Validation applies to each native radio) -->
        <input
          class="mc-radio-group__native"
          id={optionId}
          type="radio"
          name={groupName}
          value={option.value}
          disabled={disabled || option.disabled}
          {required}
          bind:group={value}
          aria-describedby={[
            describedBy,
            option.description ? optionDescriptionId : undefined,
          ]
            .filter(Boolean)
            .join(' ') || undefined}
          aria-invalid={error ? 'true' : ariaInvalid}
          aria-labelledby={optionLabelId}
        />
        <span class="mc-radio-group__circle" aria-hidden="true">
          <span class="mc-radio-group__dot"></span>
        </span>
        <span class="mc-radio-group__option-content">
          <span class="mc-radio-group__option-label" id={optionLabelId}
            >{option.label}</span
          >
          {#if option.description}
            <span
              class="mc-radio-group__option-description"
              id={optionDescriptionId}>{option.description}</span
            >
          {/if}
        </span>
      </label>
    {/each}
  </div>
</fieldset>

<style>
  .mc-radio-group {
    --mc-radio-group-circle-size: var(--mc-size-icon-standard);
    --mc-radio-group-dot-size: var(--mc-space-2);

    min-inline-size: 0;
    margin: 0;
    padding: 0;
    color: var(--mc-colour-text-primary);
    border: 0;
  }

  .mc-radio-group[data-size='compact'] {
    --mc-radio-group-circle-size: var(--mc-size-icon-compact);
    --mc-radio-group-dot-size: var(--mc-space-1);
  }

  .mc-radio-group__legend {
    padding: 0;
  }

  .mc-radio-group__options {
    display: grid;
    gap: var(--mc-space-2);
    margin-block-start: var(--mc-space-2);
  }

  .mc-radio-group__option {
    position: relative;
    display: flex;
    align-items: start;
    min-block-size: var(--mc-size-target-minimum);
    gap: var(--mc-space-2);
    cursor: pointer;
  }

  .mc-radio-group__circle {
    display: grid;
    flex: 0 0 auto;
    inline-size: var(--mc-radio-group-circle-size);
    block-size: var(--mc-radio-group-circle-size);
    place-items: center;
    background: var(--mc-colour-surface-high);
    border: 0;
    border-radius: 50%;
    transition:
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      box-shadow var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default);
  }

  .mc-radio-group__dot {
    display: none;
    inline-size: var(--mc-radio-group-dot-size);
    block-size: var(--mc-radio-group-dot-size);
    background: var(--mc-colour-background);
    border-radius: 50%;
  }

  .mc-radio-group__native:checked + .mc-radio-group__circle {
    background: var(--mc-colour-interactive);
  }

  .mc-radio-group__native:checked
    + .mc-radio-group__circle
    .mc-radio-group__dot {
    display: block;
  }

  .mc-radio-group__option-content {
    display: grid;
  }
</style>
