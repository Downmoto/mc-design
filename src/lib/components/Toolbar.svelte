<script lang="ts">
  import { onMount } from 'svelte';

  import type { ToolbarProps } from './toolbar.types.js';

  let {
    children,
    class: className = '',
    orientation = 'horizontal',
    variant = 'ghost',
    ...attributes
  }: ToolbarProps = $props();

  let toolbar: HTMLDivElement;

  const controlSelector = [
    'button:not(:disabled)',
    'a[href]',
    '[role="button"]:not([aria-disabled="true"])',
    '[role="checkbox"]:not([aria-disabled="true"])',
    '[role="radio"]:not([aria-disabled="true"])',
    '[role="switch"]:not([aria-disabled="true"])',
  ].join(',');

  function controls(): HTMLElement[] {
    return [...toolbar.querySelectorAll<HTMLElement>(controlSelector)].filter(
      (control) =>
        !control.hidden && control.closest('[role="toolbar"]') === toolbar,
    );
  }

  function setTabStop(control?: HTMLElement): void {
    const available = controls();
    const tabStop =
      control && available.includes(control)
        ? control
        : (available.find((candidate) => candidate.tabIndex === 0) ??
          available[0]);

    for (const candidate of available) {
      candidate.tabIndex = candidate === tabStop ? 0 : -1;
    }
  }

  function handleFocus(event: FocusEvent): void {
    if (event.target instanceof HTMLElement) setTabStop(event.target);
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;

    const available = controls();
    const current = available.indexOf(event.target as HTMLElement);
    if (current === -1) return;

    const previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    let next = current;

    if (event.key === previousKey) {
      next = (current - 1 + available.length) % available.length;
    } else if (event.key === nextKey) {
      next = (current + 1) % available.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = available.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setTabStop(available[next]);
    available[next]?.focus();
  }

  onMount(() => {
    setTabStop();

    const observer = new MutationObserver(() => setTabStop());
    observer.observe(toolbar, {
      attributeFilter: ['aria-disabled', 'disabled', 'href', 'hidden'],
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  });
</script>

<div
  {...attributes}
  bind:this={toolbar}
  class={`mc-toolbar ${className}`.trim()}
  data-orientation={orientation}
  data-variant={variant}
  role="toolbar"
  aria-orientation={orientation}
  onfocusin={handleFocus}
  onkeydown={handleKeydown}
>
  {@render children()}
</div>

<style>
  .mc-toolbar {
    display: flex;
    gap: var(--mc-space-1);
    align-items: center;
    box-sizing: border-box;
    inline-size: fit-content;
    max-inline-size: 100%;
    padding: var(--mc-space-1);
    overflow: auto;
    border-radius: var(--mc-radius-1);
  }

  .mc-toolbar[data-variant='surface'] {
    background: var(--mc-colour-surface-high);
    box-shadow: var(--mc-shadow-1);
  }

  .mc-toolbar[data-orientation='vertical'] {
    flex-direction: column;
    align-items: stretch;
  }

  @media (forced-colors: active) {
    .mc-toolbar[data-variant='surface'] {
      border: var(--mc-border-width-default) solid CanvasText;
    }
  }
</style>
