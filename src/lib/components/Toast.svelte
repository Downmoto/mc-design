<script lang="ts">
  import { onDestroy } from 'svelte';
  import XIcon from 'phosphor-svelte/lib/XIcon';

  import { getConsumerContext } from '../consumer-context.js';
  import Alert from './Alert.svelte';
  import Button from './Button.svelte';
  import type { ToastProps } from './toast.types.js';

  let {
    'aria-live': ariaLive = 'polite',
    children,
    class: className = '',
    consumer,
    dismissible = true,
    leadingIcon,
    onclose,
    open = $bindable(true),
    role = 'status',
    size = 'standard',
    timeout = 5000,
    title,
    tone = 'neutral',
    ...attributes
  }: ToastProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let timer: ReturnType<typeof setTimeout> | undefined;
  let remaining = 0;
  let startedAt = 0;
  let paused = false;
  let focusWithin = false;
  let pointerHovered = false;

  function clearTimer(): void {
    clearTimeout(timer);
    timer = undefined;
  }

  function dismiss(): void {
    if (!open) return;
    clearTimer();
    open = false;
    onclose?.();
  }

  function schedule(): void {
    clearTimer();
    if (!open || paused || timeout <= 0 || remaining <= 0) return;

    startedAt = Date.now();
    timer = setTimeout(dismiss, remaining);
  }

  function pause(): void {
    paused = true;
    if (timer) remaining = Math.max(0, remaining - (Date.now() - startedAt));
    clearTimer();
  }

  function resumeIfInactive(): void {
    if (focusWithin || pointerHovered) return;
    paused = false;
    schedule();
  }

  function handleFocusin(): void {
    focusWithin = true;
    pause();
  }

  function handleFocusout(event: FocusEvent): void {
    if (
      (event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)
    )
      return;
    focusWithin = false;
    resumeIfInactive();
  }

  function handlePointerenter(): void {
    pointerHovered = true;
    pause();
  }

  function handlePointerleave(): void {
    pointerHovered = false;
    resumeIfInactive();
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') dismiss();
  }

  $effect(() => {
    open;
    timeout;
    remaining = timeout;
    schedule();
    return clearTimer;
  });

  onDestroy(clearTimer);
</script>

<div
  {...attributes}
  class={`mc-toast ${className}`.trim()}
  data-size={size}
  data-tone={tone}
  {role}
  aria-live={ariaLive}
  aria-atomic="true"
  onfocusin={handleFocusin}
  onfocusout={handleFocusout}
  onkeydown={handleKeydown}
  onpointerenter={handlePointerenter}
  onpointerleave={handlePointerleave}
>
  {#if open}
    <Alert
      class="mc-toast__alert"
      consumer={resolvedConsumer}
      {leadingIcon}
      {size}
      {title}
      {tone}
    >
      {@render children()}
    </Alert>
    {#if dismissible}
      <Button
        appearance="ghost"
        class="mc-toast__dismiss"
        consumer={resolvedConsumer}
        size="icon-compact"
        title="Dismiss notification"
        aria-label="Dismiss notification"
        onclick={dismiss}
      >
        <XIcon />
      </Button>
    {/if}
  {/if}
</div>

<style>
  .mc-toast {
    position: relative;
    z-index: var(--mc-layer-toast);
    box-sizing: border-box;
    inline-size: min(100%, var(--mc-size-dialog-medium));
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity var(--mc-motion-duration-standard) var(--mc-motion-easing-default),
      transform var(--mc-motion-duration-standard)
        var(--mc-motion-easing-default),
      display var(--mc-motion-duration-standard) allow-discrete;
  }

  .mc-toast :global(.mc-toast__alert) {
    padding-inline-end: var(--mc-space-7);
    box-shadow: var(--mc-shadow-2);
  }

  .mc-toast[data-size='compact'] :global(.mc-toast__alert) {
    padding-inline-end: var(--mc-space-6);
  }

  .mc-toast :global(.mc-toast__dismiss) {
    position: absolute;
    inset-block-start: var(--mc-space-2);
    inset-inline-end: var(--mc-space-2);
  }

  .mc-toast[data-size='compact'] :global(.mc-toast__dismiss) {
    inset-block-start: var(--mc-space-1);
    inset-inline-end: var(--mc-space-1);
  }

  @media (prefers-reduced-motion: reduce) {
    .mc-toast {
      transition-duration: var(--mc-motion-duration-direct);
    }
  }
</style>
