<script module lang="ts">
  let scrollLockCount = 0;
  let previousOverflow = '';

  function lockPageScroll(): void {
    if (scrollLockCount === 0) {
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
    scrollLockCount += 1;
  }

  function unlockPageScroll(): void {
    if (scrollLockCount === 0) return;
    scrollLockCount -= 1;
    if (scrollLockCount === 0) {
      document.documentElement.style.overflow = previousOverflow;
    }
  }
</script>

<script lang="ts">
  import { flushSync, onMount, type Snippet } from 'svelte';

  import type { ConsumerId } from '../../generated/tokens.js';
  import {
    setMenuContext,
    type MenuController,
    type RegisteredSubmenu,
  } from '../menu-context.js';
  import type { MenuSize } from '../menu.types.js';
  import { positionMenu, type MenuPosition } from './menu-position.js';

  interface Props {
    children: Snippet;
    class?: string;
    consumer?: ConsumerId;
    getPosition: () => MenuPosition | undefined;
    getTrigger: () => HTMLElement | undefined;
    id: string;
    label?: string;
    labelledby?: string;
    manageFocus?: boolean;
    onconnect?: (controller: MenuController) => void;
    onpointerenter?: () => void;
    onpointerleave?: () => void;
    onleft?: () => void;
    open?: boolean;
    rootClose?: (restoreFocus?: boolean) => void;
    role?: 'listbox' | 'menu';
    size: MenuSize;
    itemSelector?: string;
  }

  let {
    children,
    class: className = '',
    consumer,
    getPosition,
    getTrigger,
    id,
    label,
    labelledby,
    manageFocus = true,
    onconnect,
    onpointerenter,
    onpointerleave,
    onleft,
    open = $bindable(false),
    rootClose,
    role = 'menu',
    size,
    itemSelector = '[data-mc-menu-item]',
  }: Props = $props();

  let menuElement: HTMLDivElement;
  let submenus = new Set<RegisteredSubmenu>();
  let typeahead = '';
  let typeaheadTimer: ReturnType<typeof setTimeout> | undefined;
  const supportsPopover =
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype.showPopover === 'function';

  function menuItems(): HTMLElement[] {
    if (!menuElement) return [];

    return Array.from(
      menuElement.querySelectorAll<HTMLElement>(itemSelector),
    ).filter((item) => item.closest('[data-mc-menu-surface]') === menuElement);
  }

  function focusItem(edge: 'first' | 'last'): void {
    const items = menuItems();
    const item = edge === 'first' ? items[0] : items.at(-1);
    item?.focus();
  }

  function closeSubmenus(except?: HTMLElement): void {
    for (const submenu of submenus) {
      if (submenu.trigger !== except) submenu.close();
    }
  }

  function close(restoreFocus = true): void {
    closeSubmenus();
    flushSync(() => (open = false));
    if (restoreFocus) getTrigger()?.focus();
  }

  function closeTree(restoreFocus = true): void {
    if (rootClose) rootClose(restoreFocus);
    else close(restoreFocus);
  }

  function registerSubmenu(submenu: RegisteredSubmenu): () => void {
    submenus.add(submenu);
    return () => {
      submenus.delete(submenu);
    };
  }

  const controller: MenuController = {
    close,
    closeSubmenus,
    closeTree,
    consumer: undefined,
    focusItem,
    registerSubmenu,
    size: 'standard',
  };

  setMenuContext(controller);

  $effect(() => {
    controller.consumer = consumer;
    controller.size = size;
  });

  $effect(() => {
    if (!open) return;
    lockPageScroll();
    return unlockPageScroll;
  });

  onMount(() => onconnect?.(controller));

  $effect(() => {
    if (!menuElement) return;

    if (open) {
      menuElement.hidden = false;

      if (
        typeof menuElement.showPopover === 'function' &&
        !menuElement.matches(':popover-open')
      ) {
        menuElement.showPopover();
      }

      const element = menuElement;
      const schedule =
        typeof requestAnimationFrame === 'function'
          ? requestAnimationFrame
          : queueMicrotask;
      schedule(() => {
        const position = getPosition();
        if (position && open && element.isConnected) {
          positionMenu(element, position);
        }
      });
    } else {
      if (
        typeof menuElement.hidePopover === 'function' &&
        menuElement.matches(':popover-open')
      ) {
        menuElement.hidePopover();
      }

      menuElement.hidden = true;
    }
  });

  $effect(() => {
    if (!open) return;

    function reposition(): void {
      const position = getPosition();
      if (position) positionMenu(menuElement, position);
    }

    function dismiss(event: PointerEvent): void {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menuElement.contains(target) || getTrigger()?.contains(target))
        return;
      close(false);
    }

    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    document.addEventListener('pointerdown', dismiss);

    return () => {
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
      document.removeEventListener('pointerdown', dismiss);
    };
  });

  function moveFocus(offset: -1 | 1): void {
    const items = menuItems();
    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    const nextIndex =
      currentIndex === -1
        ? offset === 1
          ? 0
          : items.length - 1
        : (currentIndex + offset + items.length) % items.length;

    closeSubmenus();
    items[nextIndex]?.focus();
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (!manageFocus) return;

    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const item = target.closest<HTMLElement>(itemSelector);
    if (!item || item.closest('[data-mc-menu-surface]') !== menuElement) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(event.key === 'ArrowDown' ? 1 : -1);
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      closeSubmenus();
      const items = menuItems();
      const next = event.key === 'Home' ? items[0] : items.at(-1);
      next?.focus();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }

    if (event.key === 'ArrowLeft' && onleft) {
      event.preventDefault();
      onleft();
      return;
    }

    if (event.key === 'Tab') {
      closeTree(false);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      item.click();
      return;
    }

    if (
      event.key.length !== 1 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    clearTimeout(typeaheadTimer);
    typeahead += event.key.toLocaleLowerCase();
    typeaheadTimer = setTimeout(() => (typeahead = ''), 500);

    const items = menuItems();
    const currentIndex = items.indexOf(item);
    const orderedItems = [
      ...items.slice(currentIndex + 1),
      ...items.slice(0, currentIndex + 1),
    ];
    const match = orderedItems.find((candidate) =>
      (candidate.dataset.mcMenuLabel ?? candidate.textContent ?? '')
        .trim()
        .toLocaleLowerCase()
        .startsWith(typeahead),
    );

    if (match) {
      event.preventDefault();
      closeSubmenus();
      match.focus();
    }
  }

  function handlePointermove(event: PointerEvent): void {
    if (!manageFocus) return;

    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const item = target.closest<HTMLElement>(itemSelector);
    if (!item || item.closest('[data-mc-menu-surface]') !== menuElement) return;

    closeSubmenus(item);
    if (document.activeElement !== item) item.focus({ preventScroll: true });
  }

  function handleToggle(event: Event): void {
    const state = (event as ToggleEvent).newState;
    if (state === 'closed' && open) {
      closeSubmenus();
      open = false;
    }
  }
</script>

<div
  bind:this={menuElement}
  class={`mc-menu__content ${className}`.trim()}
  {id}
  data-mc-menu-surface
  data-mc-product={consumer}
  data-size={size}
  {role}
  tabindex="-1"
  aria-label={label}
  aria-labelledby={label ? undefined : labelledby}
  hidden={!open}
  popover={supportsPopover ? 'auto' : undefined}
  onkeydown={handleKeydown}
  {onpointerenter}
  {onpointerleave}
  onpointermove={handlePointermove}
  ontoggle={handleToggle}
>
  {@render children()}
</div>

<style>
  .mc-menu__content {
    --mc-menu-divider-colour: color-mix(
      in srgb,
      var(--mc-colour-border) var(--mc-opacity-menu-separator),
      transparent
    );
    --mc-menu-item-inline-inset: var(--mc-space-2);

    position: fixed;
    z-index: var(--mc-layer-overlay);
    inset: 0 auto auto 0;
    box-sizing: border-box;
    inline-size: max-content;
    min-inline-size: 0;
    max-inline-size: calc(100vw - (var(--mc-space-2) * 2));
    max-block-size: calc(100vh - (var(--mc-space-2) * 2));
    margin: 0;
    padding: var(--mc-space-1);
    overflow: auto;
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-surface);
    border: var(--mc-border-width-default) solid var(--mc-menu-divider-colour);
    border-radius: var(--mc-radius-1);
    box-shadow: var(--mc-shadow-2);
    opacity: 1;
    transition:
      opacity var(--mc-motion-duration-standard) var(--mc-motion-easing-default),
      display var(--mc-motion-duration-standard) allow-discrete,
      overlay var(--mc-motion-duration-standard) allow-discrete;
  }

  .mc-menu__content[data-size='compact'] {
    --mc-menu-item-inline-inset: var(--mc-space-1);
  }

  .mc-menu__content:popover-open {
    opacity: 1;
  }

  @starting-style {
    .mc-menu__content:popover-open {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mc-menu__content {
      transition-duration: var(--mc-motion-duration-direct);
    }
  }

  @media (forced-colors: active) {
    .mc-menu__content {
      color: CanvasText;
      background: Canvas;
      border: var(--mc-border-width-default) solid CanvasText;
      box-shadow: none;
      forced-color-adjust: auto;
    }
  }
</style>
