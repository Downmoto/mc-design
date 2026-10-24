<script lang="ts">
  import type { IconButtonProps } from './button.types.js';
  import Spinner from './internal/Spinner.svelte';

  let {
    appearance = 'primary',
    children,
    class: className = '',
    disabled = false,
    label,
    loading = false,
    onclick,
    size = 'standard',
    title,
    tooltip,
    type = 'button',
    ...attributes
  }: IconButtonProps = $props();

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
  class={`mc-icon-button ${className}`.trim()}
  data-appearance={appearance}
  data-loading={loading || undefined}
  data-size={size}
  {disabled}
  {type}
  aria-busy={loading || undefined}
  aria-disabled={loading || undefined}
  aria-label={label}
  title={tooltip ?? title ?? label}
  onclick={handleClick}
>
  <span
    class="mc-icon-button__content"
    data-concealed={loading}
    aria-hidden="true"
  >
    {@render children()}
  </span>

  {#if loading}
    <span class="mc-icon-button__spinner"><Spinner /></span>
  {/if}
</button>

<style>
  .mc-icon-button {
    --mc-button-block-size: var(--mc-size-control-standard);
    --mc-button-icon-size: var(--mc-size-icon-standard);

    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: var(--mc-button-block-size);
    min-inline-size: var(--mc-button-block-size);
    max-inline-size: var(--mc-button-block-size);
    block-size: var(--mc-button-block-size);
    padding: 0;
    border: var(--mc-border-width-default) solid transparent;
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
        var(--mc-motion-easing-default);
  }

  .mc-icon-button[data-size='compact'] {
    --mc-button-block-size: var(--mc-size-control-compact);
    --mc-button-icon-size: var(--mc-size-icon-compact);
  }

  .mc-icon-button[data-size='large'] {
    --mc-button-block-size: var(--mc-size-control-large);
    --mc-button-icon-size: var(--mc-size-icon-primary);
  }

  .mc-icon-button[data-appearance='primary'] {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-interactive);
  }

  .mc-icon-button[data-appearance='secondary'] {
    color: var(--mc-colour-interactive);
    background: transparent;
    border-color: var(--mc-colour-interactive);
  }

  .mc-icon-button[data-appearance='primary']:hover:not(:disabled):not(
      [aria-disabled='true']
    ) {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-text-secondary);
  }

  .mc-icon-button[data-appearance='secondary']:hover:not(:disabled):not(
      [aria-disabled='true']
    ) {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-interactive);
  }

  .mc-icon-button:focus-visible {
    border-color: var(--mc-colour-interactive);
    border-width: var(--mc-border-width-emphasised);
    outline: none;
  }

  .mc-icon-button:active:not(:disabled):not([aria-disabled='true']) {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-interactive);
  }

  .mc-icon-button:disabled {
    color: var(--mc-colour-text-secondary);
    background: var(--mc-colour-surface);
    border-color: var(--mc-colour-border);
    cursor: not-allowed;
  }

  .mc-icon-button[aria-disabled='true'] {
    cursor: progress;
  }

  .mc-icon-button__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: var(--mc-button-icon-size);
    block-size: var(--mc-button-icon-size);
    flex: 0 0 var(--mc-button-icon-size);
  }

  .mc-icon-button__content[data-concealed='true'] {
    opacity: 0;
  }

  .mc-icon-button__content :global(svg) {
    display: block;
    inline-size: 100%;
    block-size: 100%;
  }

  .mc-icon-button__spinner {
    --mc-spinner-size: var(--mc-button-icon-size);

    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
  }

  @media (forced-colors: active) {
    .mc-icon-button,
    .mc-icon-button[data-appearance='primary'],
    .mc-icon-button[data-appearance='secondary'] {
      color: ButtonText;
      background: ButtonFace;
      border-color: ButtonText;
      forced-color-adjust: auto;
    }

    .mc-icon-button:focus-visible {
      border-color: Highlight;
    }

    .mc-icon-button:disabled {
      color: GrayText;
      border-color: GrayText;
    }
  }
</style>
