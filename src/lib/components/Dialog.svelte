<script lang="ts">
  import XIcon from 'phosphor-svelte/lib/XIcon';

  import { getConsumerContext } from '../consumer-context.js';
  import Button from './Button.svelte';
  import type { DialogProps } from './dialog.types.js';

  type DialogEvent = Event & {
    currentTarget: EventTarget & HTMLDialogElement;
  };

  const generatedId = $props.id();

  let {
    children,
    class: className = '',
    consumer,
    description,
    dismissible = true,
    footer,
    oncancel,
    onclose,
    open = $bindable(false),
    size = 'medium',
    title,
    ...attributes
  }: DialogProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let dialogElement: HTMLDialogElement;
  let returnFocus: HTMLElement | null = null;
  let titleId = $derived(`${generatedId}-title`);
  let descriptionId = $derived(`${generatedId}-description`);

  function focusDialog(): void {
    queueMicrotask(() => {
      if (dialogElement.contains(document.activeElement)) return;

      const initialFocus = dialogElement.querySelector<HTMLElement>(
        '[autofocus], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (initialFocus ?? dialogElement).focus();
    });
  }

  function dismiss(): void {
    if (!dialogElement?.open) return;

    if (typeof dialogElement.close === 'function') {
      dialogElement.close();
      return;
    }

    dialogElement.open = false;
    dialogElement.dispatchEvent(new Event('close'));
  }

  function handleCancel(event: DialogEvent): void {
    oncancel?.call(dialogElement, event);
    if (!dismissible || event.defaultPrevented) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    dismiss();
  }

  function handleClose(event: DialogEvent): void {
    open = false;
    onclose?.call(dialogElement, event);
    queueMicrotask(() => {
      if (returnFocus?.isConnected) returnFocus.focus();
      returnFocus = null;
    });
  }

  function handleClick(event: MouseEvent): void {
    if (dismissible && event.target === dialogElement) dismiss();
  }

  $effect(() => {
    if (!dialogElement) return;

    if (open && !dialogElement.open) {
      returnFocus =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      if (typeof dialogElement.showModal === 'function') {
        dialogElement.showModal();
      } else {
        dialogElement.open = true;
      }
      focusDialog();
    } else if (!open && dialogElement.open) {
      dismiss();
    }
  });
</script>

<dialog
  {...attributes}
  bind:this={dialogElement}
  class={`mc-dialog ${className}`.trim()}
  data-mc-product={resolvedConsumer}
  data-size={size}
  aria-describedby={description ? descriptionId : undefined}
  aria-labelledby={titleId}
  tabindex="-1"
  oncancel={handleCancel}
  onclose={handleClose}
  onclick={handleClick}
>
  <div class="mc-dialog__surface">
    <header class="mc-dialog__header">
      <div class="mc-dialog__heading">
        <h2 class="mc-dialog__title" id={titleId}>{title}</h2>
        {#if description}
          <p class="mc-dialog__description" id={descriptionId}>
            {description}
          </p>
        {/if}
      </div>
      {#if dismissible}
        <Button
          appearance="ghost"
          class="mc-dialog__dismiss"
          consumer={resolvedConsumer}
          size="icon"
          title="Close dialog"
          aria-label="Close dialog"
          onclick={dismiss}
        >
          <XIcon />
        </Button>
      {/if}
    </header>

    {#if children}
      <div class="mc-dialog__content">{@render children()}</div>
    {/if}

    {#if footer}
      <footer class="mc-dialog__footer">{@render footer()}</footer>
    {/if}
  </div>
</dialog>

<style>
  .mc-dialog {
    z-index: var(--mc-layer-modal);
    box-sizing: border-box;
    inline-size: min(
      calc(100% - var(--mc-space-7)),
      var(--mc-size-dialog-medium)
    );
    max-block-size: calc(100dvb - var(--mc-space-7));
    margin: auto;
    padding: 0;
    overflow: hidden;
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-surface-highest);
    border: 0;
    border-radius: var(--mc-radius-3);
    box-shadow: var(--mc-shadow-3);
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity var(--mc-motion-duration-large) var(--mc-motion-easing-default),
      transform var(--mc-motion-duration-large) var(--mc-motion-easing-default),
      display var(--mc-motion-duration-large) allow-discrete,
      overlay var(--mc-motion-duration-large) allow-discrete;
  }

  .mc-dialog[data-size='small'] {
    inline-size: min(
      calc(100% - var(--mc-space-7)),
      var(--mc-size-dialog-small)
    );
  }

  .mc-dialog[data-size='large'] {
    inline-size: min(
      calc(100% - var(--mc-space-7)),
      var(--mc-size-dialog-large)
    );
  }

  .mc-dialog__surface {
    display: grid;
    max-block-size: inherit;
    overflow: auto;
  }

  .mc-dialog__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--mc-space-4);
    padding: var(--mc-space-5);
  }

  .mc-dialog__heading {
    display: grid;
    min-inline-size: 0;
    gap: var(--mc-space-2);
  }

  .mc-dialog__title {
    margin: 0;
    font-family: var(--mc-typography-section-title-family);
    font-size: var(--mc-typography-section-title-size);
    font-weight: var(--mc-typography-section-title-weight);
    line-height: var(--mc-typography-section-title-line-height);
    overflow-wrap: anywhere;
  }

  .mc-dialog__description {
    margin: 0;
    color: var(--mc-colour-text-secondary);
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-body-weight);
    line-height: var(--mc-typography-body-line-height);
    overflow-wrap: anywhere;
  }

  .mc-dialog :global(.mc-dialog__dismiss) {
    flex: 0 0 auto;
    margin-block-start: calc(var(--mc-space-2) * -1);
    margin-inline-end: calc(var(--mc-space-2) * -1);
  }

  .mc-dialog__content {
    padding: 0 var(--mc-space-5) var(--mc-space-5);
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-body-weight);
    line-height: var(--mc-typography-body-line-height);
    overflow-wrap: anywhere;
  }

  .mc-dialog__footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--mc-space-2);
    padding: 0 var(--mc-space-5) var(--mc-space-5);
  }

  @starting-style {
    .mc-dialog[open]::backdrop {
      background: transparent;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mc-dialog,
    .mc-dialog::backdrop {
      transition-duration: var(--mc-motion-duration-direct);
    }

    .mc-dialog:not([open]),
    .mc-dialog[open] {
      transform: none;
    }
  }

  @media (forced-colors: active) {
    .mc-dialog::backdrop {
      background: Canvas;
    }
  }
</style>
