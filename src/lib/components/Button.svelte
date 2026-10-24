<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { ButtonProps } from './button.types.js';
  import Spinner from './internal/Spinner.svelte';

  let {
    appearance = 'primary',
    children,
    class: className = '',
    consumer,
    disabled = false,
    leadingIcon,
    loading = false,
    onclick,
    size = 'standard',
    trailingIcon,
    type = 'button',
    ...attributes
  }: ButtonProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());

  function handleClick(
    event: MouseEvent & { currentTarget: HTMLButtonElement },
  ) {
    if (loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    onclick?.(event);
  }
</script>

<button
  {...attributes}
  class={`mc-button ${className}`.trim()}
  data-appearance={appearance}
  data-loading={loading || undefined}
  data-mc-product={resolvedConsumer}
  data-size={size}
  {disabled}
  {type}
  aria-busy={loading || undefined}
  aria-disabled={loading || undefined}
  onclick={handleClick}
>
  <span class="mc-button__content" data-concealed={loading}>
    {#if leadingIcon}
      <span class="mc-button__icon" aria-hidden="true">
        {@render leadingIcon()}
      </span>
    {/if}

    <span class="mc-button__label">{@render children()}</span>

    {#if trailingIcon}
      <span class="mc-button__icon" aria-hidden="true">
        {@render trailingIcon()}
      </span>
    {/if}
  </span>

  {#if loading}
    <span class="mc-button__spinner"><Spinner /></span>
  {/if}
</button>

<style>
  .mc-button {
    --mc-button-block-size: var(--mc-size-control-standard);
    --mc-button-icon-size: var(--mc-size-icon-standard);

    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    block-size: var(--mc-button-block-size);
    min-inline-size: var(--mc-button-block-size);
    padding-block: 0;
    padding-inline: var(--mc-space-4);
    border: var(--mc-border-width-emphasised) solid transparent;
    border-radius: var(--mc-radius-1);
    font-family: var(--mc-typography-label-family);
    font-size: var(--mc-typography-label-size);
    font-weight: var(--mc-typography-label-weight);
    line-height: var(--mc-typography-label-line-height);
    text-decoration: none;
    cursor: pointer;
    transition:
      color var(--mc-motion-duration-direct) var(--mc-motion-easing-default),
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      border-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      filter var(--mc-motion-duration-direct) var(--mc-motion-easing-default);
  }

  .mc-button[data-size='compact'] {
    --mc-button-block-size: var(--mc-size-control-compact);
    --mc-button-icon-size: var(--mc-size-icon-compact);

    padding-inline: var(--mc-space-3);
  }

  .mc-button[data-size='large'] {
    --mc-button-block-size: var(--mc-size-control-large);
    --mc-button-icon-size: var(--mc-size-icon-primary);

    padding-inline: var(--mc-space-5);
  }

  .mc-button[data-appearance='primary'] {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-interactive);
  }

  .mc-button[data-appearance='secondary'] {
    color: var(--mc-colour-interactive);
    background: transparent;
    border-color: var(--mc-colour-interactive);
  }

  .mc-button[data-appearance='primary']:hover:not(:disabled):not(
      [aria-disabled='true']
    ) {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-interactive);
    filter: brightness(1.15);
  }

  .mc-button[data-appearance='secondary']:hover:not(:disabled):not(
      [aria-disabled='true']
    ) {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-interactive);
  }

  .mc-button:focus-visible {
    outline: var(--mc-border-width-emphasised) solid
      var(--mc-colour-text-primary);
    outline-offset: 0;
  }

  .mc-button:active:not(:disabled):not([aria-disabled='true']) {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-interactive);
  }

  .mc-button:disabled {
    color: var(--mc-colour-text-secondary);
    background: var(--mc-colour-surface);
    border-color: var(--mc-colour-border);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mc-button[aria-disabled='true'] {
    cursor: progress;
  }

  .mc-button__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--mc-space-2);
  }

  .mc-button__content[data-concealed='true'] {
    opacity: 0;
  }

  .mc-button__icon {
    inline-size: var(--mc-button-icon-size);
    block-size: var(--mc-button-icon-size);
    flex: 0 0 var(--mc-button-icon-size);
  }

  .mc-button__icon :global(svg) {
    display: block;
    inline-size: 100%;
    block-size: 100%;
  }

  .mc-button__spinner {
    --mc-spinner-size: var(--mc-button-icon-size);

    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
  }

  @media (forced-colors: active) {
    .mc-button,
    .mc-button[data-appearance='primary'],
    .mc-button[data-appearance='secondary'] {
      color: ButtonText;
      background: ButtonFace;
      border-color: ButtonText;
      forced-color-adjust: auto;
    }

    .mc-button:focus-visible {
      outline-color: Highlight;
    }

    .mc-button:disabled {
      color: GrayText;
      border-color: GrayText;
    }
  }
</style>
