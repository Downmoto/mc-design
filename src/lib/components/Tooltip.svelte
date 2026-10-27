<script lang="ts">
  import { onDestroy } from 'svelte';

  import { getConsumerContext } from '../consumer-context.js';
  import type { TooltipProps, TooltipTriggerProps } from './tooltip.types.js';

  const generatedId = $props.id();

  let {
    class: className = '',
    consumer,
    content,
    id,
    open = $bindable(false),
    size = 'standard',
    trigger,
    ...attributes
  }: TooltipProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let baseId = $derived(id ?? `${generatedId}-tooltip`);
  let tooltipId = $derived(`${baseId}-content`);
  let triggerHost: HTMLSpanElement;
  let tooltipElement: HTMLDivElement;
  let showTimer: ReturnType<typeof setTimeout> | undefined;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;
  let triggerFocused = false;
  let triggerHovered = false;
  let tooltipHovered = false;
  const supportsPopover =
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype.showPopover === 'function';

  function getTrigger(): HTMLElement | undefined {
    const element = triggerHost?.firstElementChild;
    return element instanceof HTMLElement ? element : undefined;
  }

  function tokenMilliseconds(token: string): number {
    const value = getComputedStyle(tooltipElement).getPropertyValue(token);
    return Number.parseFloat(value) || 0;
  }

  function show(): void {
    clearTimeout(showTimer);
    clearTimeout(closeTimer);
    showTimer = setTimeout(
      () => (open = true),
      tokenMilliseconds('--mc-motion-delay-tooltip'),
    );
  }

  function hide(): void {
    if (triggerFocused || triggerHovered || tooltipHovered) return;
    clearTimeout(showTimer);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(
      () => (open = false),
      tokenMilliseconds('--mc-motion-duration-direct'),
    );
  }

  function close(): void {
    clearTimeout(showTimer);
    clearTimeout(closeTimer);
    open = false;
  }

  function position(): void {
    const anchor = getTrigger();
    if (!anchor || !tooltipElement) return;

    const anchorRect = anchor.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const styles = getComputedStyle(tooltipElement);
    const gap = Number.parseFloat(styles.getPropertyValue('--mc-space-1')) || 0;
    const inset =
      Number.parseFloat(styles.getPropertyValue('--mc-space-2')) || 0;
    let left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;
    let top = anchorRect.bottom + gap;

    if (
      top + tooltipRect.height > window.innerHeight - inset &&
      anchorRect.top - gap - tooltipRect.height >= inset
    ) {
      top = anchorRect.top - gap - tooltipRect.height;
    }

    left = Math.min(
      Math.max(left, inset),
      Math.max(inset, window.innerWidth - tooltipRect.width - inset),
    );
    top = Math.min(
      Math.max(top, inset),
      Math.max(inset, window.innerHeight - tooltipRect.height - inset),
    );

    tooltipElement.style.setProperty('--mc-tooltip-left', `${left}px`);
    tooltipElement.style.setProperty('--mc-tooltip-top', `${top}px`);
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') close();
  }

  function handleFocus(): void {
    triggerFocused = true;
    show();
  }

  function handleBlur(): void {
    triggerFocused = false;
    hide();
  }

  function handleTriggerPointerenter(): void {
    triggerHovered = true;
    show();
  }

  function handleTriggerPointerleave(): void {
    triggerHovered = false;
    hide();
  }

  function handleTooltipPointerenter(): void {
    tooltipHovered = true;
    show();
  }

  function handleTooltipPointerleave(): void {
    tooltipHovered = false;
    hide();
  }

  let triggerProps = $derived<TooltipTriggerProps>({
    'aria-describedby': tooltipId,
    onblur: handleBlur,
    onfocus: handleFocus,
    onkeydown: handleKeydown,
    onpointerenter: handleTriggerPointerenter,
    onpointerleave: handleTriggerPointerleave,
  });

  $effect(() => {
    if (!tooltipElement) return;

    if (open) {
      tooltipElement.hidden = false;
      if (
        typeof tooltipElement.showPopover === 'function' &&
        !tooltipElement.matches(':popover-open')
      ) {
        tooltipElement.showPopover();
      }

      const element = tooltipElement;
      const schedule =
        typeof requestAnimationFrame === 'function'
          ? requestAnimationFrame
          : queueMicrotask;
      schedule(() => {
        if (open && element.isConnected) position();
      });
    } else {
      if (
        typeof tooltipElement.hidePopover === 'function' &&
        tooltipElement.matches(':popover-open')
      ) {
        tooltipElement.hidePopover();
      }
      tooltipElement.hidden = true;
    }
  });

  $effect(() => {
    if (!open) return;

    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  onDestroy(() => {
    clearTimeout(showTimer);
    clearTimeout(closeTimer);
  });
</script>

<span
  {...attributes}
  bind:this={triggerHost}
  class={`mc-tooltip ${className}`.trim()}
  id={baseId}
>
  {@render trigger(triggerProps)}
</span>

<div
  bind:this={tooltipElement}
  class="mc-tooltip__content"
  id={tooltipId}
  data-mc-product={resolvedConsumer}
  data-size={size}
  role="tooltip"
  hidden={!open}
  popover={supportsPopover ? 'manual' : undefined}
  onpointerenter={handleTooltipPointerenter}
  onpointerleave={handleTooltipPointerleave}
  ontoggle={(event) => {
    if ((event as ToggleEvent).newState === 'closed' && open) open = false;
  }}
>
  {content}
</div>

<style>
  .mc-tooltip {
    display: inline-flex;
  }

  .mc-tooltip__content {
    position: fixed;
    z-index: var(--mc-layer-overlay);
    inset: var(--mc-tooltip-top, 0) auto auto var(--mc-tooltip-left, 0);
    box-sizing: border-box;
    inline-size: max-content;
    max-inline-size: min(
      var(--mc-size-sidebar-properties-default),
      calc(100vw - (var(--mc-space-2) * 2))
    );
    margin: 0;
    padding: var(--mc-space-2) var(--mc-space-3);
    color: var(--mc-colour-background);
    background: var(--mc-colour-text-primary);
    border: var(--mc-border-width-default) solid var(--mc-colour-text-primary);
    border-radius: var(--mc-radius-1);
    box-shadow: var(--mc-shadow-2);
    font-family: var(--mc-typography-label-family);
    font-size: var(--mc-typography-label-size);
    font-weight: var(--mc-typography-label-weight);
    line-height: var(--mc-typography-label-line-height);
    overflow-wrap: anywhere;
    opacity: 1;
    transition:
      opacity var(--mc-motion-duration-direct) var(--mc-motion-easing-default),
      display var(--mc-motion-duration-direct) allow-discrete,
      overlay var(--mc-motion-duration-direct) allow-discrete;
  }

  .mc-tooltip__content:popover-open {
    opacity: 1;
  }

  .mc-tooltip__content[data-size='compact'] {
    padding: var(--mc-space-1) var(--mc-space-2);
    font-size: var(--mc-typography-caption-size);
    font-weight: var(--mc-typography-caption-weight);
    line-height: var(--mc-typography-caption-line-height);
  }

  @starting-style {
    .mc-tooltip__content:popover-open {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mc-tooltip__content {
      transition-duration: 0ms;
    }
  }

  @media (forced-colors: active) {
    .mc-tooltip__content {
      color: CanvasText;
      background: Canvas;
      border-color: CanvasText;
      box-shadow: none;
      forced-color-adjust: auto;
    }
  }
</style>
