<script lang="ts">
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from 'svelte/elements';

  import { getConsumerContext } from '../consumer-context.js';
  import type { ButtonProps } from './button.types.js';
  import Spinner from './internal/Spinner.svelte';

  let {
    appearance = 'primary',
    children,
    class: className = '',
    consumer,
    disabled = false,
    href,
    leadingIcon,
    loading = false,
    onclick,
    role,
    size = 'standard',
    tabindex,
    trailingIcon,
    type = 'button',
    ...attributes
  }: ButtonProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let isIcon = $derived(
    size === 'icon-compact' || size === 'icon' || size === 'icon-large',
  );
  let unavailable = $derived(disabled || loading);

  function blockUnavailable(event: MouseEvent): boolean {
    if (!unavailable) return false;

    event.preventDefault();
    event.stopImmediatePropagation();
    return true;
  }

  function handleButtonClick(
    event: MouseEvent & { currentTarget: HTMLButtonElement },
  ): void {
    if (blockUnavailable(event)) return;
    (onclick as HTMLButtonAttributes['onclick'])?.(event);
  }

  function handleAnchorClick(
    event: MouseEvent & { currentTarget: HTMLAnchorElement },
  ): void {
    if (blockUnavailable(event)) return;
    (onclick as HTMLAnchorAttributes['onclick'])?.(event);
  }
</script>

{#snippet content()}
  <span
    class="mc-button__content"
    data-concealed={loading || undefined}
    aria-hidden={isIcon ? 'true' : undefined}
  >
    {#if isIcon}
      {@render children()}
    {:else}
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
    {/if}
  </span>

  {#if loading}
    <span class="mc-button__spinner"><Spinner /></span>
  {/if}
{/snippet}

{#if href !== undefined}
  <a
    {...attributes}
    class={`mc-button ${className}`.trim()}
    data-appearance={appearance}
    data-disabled={disabled || undefined}
    data-loading={loading || undefined}
    data-mc-product={resolvedConsumer}
    data-size={size}
    href={unavailable ? undefined : href}
    aria-busy={loading || undefined}
    aria-disabled={unavailable || undefined}
    role={unavailable ? 'link' : role}
    tabindex={unavailable ? -1 : tabindex}
    onclick={handleAnchorClick}
  >
    {@render content()}
  </a>
{:else}
  <button
    {...attributes}
    class={`mc-button ${className}`.trim()}
    data-appearance={appearance}
    data-loading={loading || undefined}
    data-mc-product={resolvedConsumer}
    data-size={size}
    {disabled}
    {role}
    {tabindex}
    {type}
    aria-busy={loading || undefined}
    aria-disabled={loading || undefined}
    onclick={handleButtonClick}
  >
    {@render content()}
  </button>
{/if}

<style>
  .mc-button {
    --mc-button-block-size: var(--mc-size-control-standard);
    --mc-button-icon-size: var(--mc-size-icon-standard);
  }

  .mc-button:not([data-appearance='link']) {
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

  .mc-button[data-size='compact'],
  .mc-button[data-size='icon-compact'] {
    --mc-button-block-size: var(--mc-size-control-compact);
    --mc-button-icon-size: var(--mc-size-icon-compact);
  }

  .mc-button[data-size='compact'] {
    padding-inline: var(--mc-space-3);
  }

  .mc-button[data-size='large'],
  .mc-button[data-size='icon-large'] {
    --mc-button-block-size: var(--mc-size-control-large);
    --mc-button-icon-size: var(--mc-size-icon-primary);
  }

  .mc-button[data-size='large'] {
    padding-inline: var(--mc-space-5);
  }

  .mc-button[data-size='icon-compact'],
  .mc-button[data-size='icon'],
  .mc-button[data-size='icon-large'] {
    inline-size: var(--mc-button-block-size);
    max-inline-size: var(--mc-button-block-size);
    padding: 0;
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

  .mc-button[data-appearance='ghost'] {
    color: var(--mc-colour-interactive);
    background: transparent;
    border-color: transparent;
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
    ),
  .mc-button[data-appearance='ghost']:hover:not(:disabled):not(
      [aria-disabled='true']
    ) {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-interactive);
  }

  .mc-button:not([data-appearance='link']):active:not(:disabled):not(
      [aria-disabled='true']
    ) {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
    border-color: var(--mc-colour-interactive);
  }

  .mc-button:disabled,
  .mc-button[data-disabled='true'] {
    color: var(--mc-colour-text-secondary);
    background: var(--mc-colour-surface);
    border-color: var(--mc-colour-border);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mc-button[data-loading='true'] {
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

  .mc-button__icon,
  .mc-button[data-size='icon-compact'] .mc-button__content,
  .mc-button[data-size='icon'] .mc-button__content,
  .mc-button[data-size='icon-large'] .mc-button__content {
    inline-size: var(--mc-button-icon-size);
    block-size: var(--mc-button-icon-size);
    flex: 0 0 var(--mc-button-icon-size);
  }

  .mc-button__spinner {
    --mc-spinner-size: var(--mc-button-icon-size);

    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
  }

  .mc-button[data-appearance='link'] {
    position: relative;
    color: var(--mc-colour-interactive);
    text-decoration-line: none;
    text-decoration-thickness: var(--mc-border-width-default);
    text-underline-offset: var(--mc-space-1);
    transition:
      color var(--mc-motion-duration-direct) var(--mc-motion-easing-default),
      text-decoration-thickness var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default);
  }

  .mc-button[data-appearance='link'] .mc-button__content {
    display: inline;
  }

  button.mc-button[data-appearance='link'] {
    padding: 0;
    border: 0;
    font: inherit;
    background: transparent;
    cursor: pointer;
  }

  .mc-button[data-appearance='link']:hover:not([aria-disabled='true']) {
    text-decoration-line: underline;
    text-decoration-thickness: var(--mc-border-width-emphasised);
  }

  .mc-button[data-appearance='link']:active:not([aria-disabled='true']) {
    color: var(--mc-colour-text-primary);
  }

  .mc-button[data-appearance='link']:disabled,
  .mc-button[data-appearance='link'][data-disabled='true'] {
    color: var(--mc-colour-text-secondary);
    background: transparent;
  }

  @media (forced-colors: active) {
    .mc-button:not([data-appearance='link']) {
      color: ButtonText;
      background: ButtonFace;
      border-color: ButtonText;
      forced-color-adjust: auto;
    }

    .mc-button[data-appearance='link'] {
      color: LinkText;
      forced-color-adjust: auto;
    }

    .mc-button:disabled,
    .mc-button[data-disabled='true'] {
      color: GrayText;
      border-color: GrayText;
      opacity: 1;
    }

    .mc-button[data-appearance='link']:active:not([aria-disabled='true']) {
      color: ActiveText;
    }
  }
</style>
