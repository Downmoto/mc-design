<script lang="ts">
  import { flushSync } from 'svelte';

  import { getConsumerContext } from '../consumer-context.js';
  import type { MenuController } from './menu-context.js';
  import type {
    MenuButtonTriggerProps,
    MenuContextTriggerProps,
    MenuProps,
  } from './menu.types.js';
  import MenuSurface from './internal/MenuSurface.svelte';
  import type { MenuPosition } from './internal/menu-position.js';

  const generatedId = $props.id();

  let {
    align = 'start',
    children,
    class: className = '',
    consumer,
    disabled = false,
    id,
    label,
    mode = 'button',
    open = $bindable(false),
    size = 'standard',
    trigger,
    ...attributes
  }: MenuProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let baseId = $derived(id ?? `${generatedId}-menu`);
  let triggerId = $derived(`${baseId}-trigger`);
  let contentId = $derived(`${baseId}-content`);
  let triggerElement: HTMLElement | undefined;
  let triggerHost: HTMLSpanElement;
  let contextPoint = $state<{ x: number; y: number }>();
  let controller: MenuController | undefined;

  function getTriggerElement(): HTMLElement | undefined {
    return (
      triggerElement ??
      (triggerHost?.firstElementChild instanceof HTMLElement
        ? triggerHost.firstElementChild
        : undefined)
    );
  }

  function show(edge: 'first' | 'last', element: HTMLElement): void {
    if (disabled) return;
    triggerElement = element;
    flushSync(() => (open = true));
    controller?.focusItem(edge);
  }

  function hide(restoreFocus = true): void {
    controller?.close(restoreFocus);
  }

  function handleButtonClick(event: MouseEvent): void {
    if (disabled) {
      event.preventDefault();
      return;
    }

    triggerElement = event.currentTarget as HTMLElement;
    contextPoint = undefined;

    if (open) hide(false);
    else show('first', triggerElement);
  }

  function handleButtonKeydown(event: KeyboardEvent): void {
    if (disabled) return;
    const element = event.currentTarget as HTMLElement;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      contextPoint = undefined;
      show('first', element);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      contextPoint = undefined;
      show('last', element);
    }
  }

  function handleContextmenu(event: MouseEvent): void {
    if (disabled) return;
    event.preventDefault();
    triggerElement = event.currentTarget as HTMLElement;
    contextPoint = { x: event.clientX, y: event.clientY };
    show('first', triggerElement);
  }

  function handleContextKeydown(event: KeyboardEvent): void {
    if (disabled) return;
    if (
      event.key !== 'ContextMenu' &&
      !(event.shiftKey && event.key === 'F10')
    ) {
      return;
    }

    event.preventDefault();
    triggerElement = event.currentTarget as HTMLElement;
    const rect = triggerElement.getBoundingClientRect();
    contextPoint = { x: rect.left, y: rect.bottom };
    show('first', triggerElement);
  }

  function getPosition(): MenuPosition | undefined {
    if (mode === 'context' && contextPoint) {
      return { kind: 'point', ...contextPoint };
    }

    const anchor = getTriggerElement();
    if (!anchor) return;
    return {
      align,
      anchor,
      kind: 'anchor',
      side: 'block',
    };
  }

  let buttonTriggerProps = $derived<MenuButtonTriggerProps>({
    id: triggerId,
    'aria-controls': contentId,
    'aria-expanded': open,
    'aria-haspopup': 'menu',
    disabled,
    onclick: handleButtonClick,
    onkeydown: handleButtonKeydown,
  });

  let contextTriggerProps = $derived<MenuContextTriggerProps>({
    id: triggerId,
    'aria-controls': contentId,
    'aria-disabled': disabled || undefined,
    'aria-haspopup': 'menu',
    oncontextmenu: handleContextmenu,
    onkeydown: handleContextKeydown,
  });

  $effect(() => {
    if (disabled && open) controller?.close(false);
  });
</script>

<div
  {...attributes}
  class={`mc-menu ${className}`.trim()}
  id={baseId}
  data-disabled={disabled || undefined}
  data-mc-product={resolvedConsumer}
  data-mode={mode}
  data-size={size}
>
  <span bind:this={triggerHost} class="mc-menu__trigger-host">
    {#if mode === 'context'}
      {@render trigger(contextTriggerProps)}
    {:else}
      {@render trigger(buttonTriggerProps)}
    {/if}
  </span>

  <MenuSurface
    bind:open
    id={contentId}
    {label}
    labelledby={triggerId}
    consumer={resolvedConsumer}
    {size}
    getTrigger={getTriggerElement}
    {getPosition}
    onconnect={(value) => (controller = value)}
  >
    {@render children()}
  </MenuSurface>
</div>

<style>
  .mc-menu,
  .mc-menu__trigger-host {
    display: contents;
  }
</style>
