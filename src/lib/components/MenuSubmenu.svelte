<script lang="ts">
  import CaretRightIcon from 'phosphor-svelte/lib/CaretRightIcon';
  import { flushSync, onMount } from 'svelte';

  import { getMenuContext, type MenuController } from './menu-context.js';
  import type { MenuSubmenuProps } from './menu.types.js';
  import MenuSurface from './internal/MenuSurface.svelte';
  import type { MenuPosition } from './internal/menu-position.js';

  const generatedId = $props.id();

  let {
    children,
    class: className = '',
    disabled = false,
    id,
    icon,
    label,
    onclick,
    ...attributes
  }: MenuSubmenuProps = $props();

  const parent = getMenuContext();
  let baseId = $derived(id ?? `${generatedId}-submenu`);
  let triggerId = $derived(`${baseId}-trigger`);
  let contentId = $derived(`${baseId}-content`);
  let triggerElement: HTMLButtonElement;
  let controller: MenuController | undefined;
  let open = $state(false);
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  onMount(() =>
    parent.registerSubmenu({
      close: () => close(false),
      trigger: triggerElement,
    }),
  );

  function hoverDelay(): number {
    if (!triggerElement) return 0;
    const value = getComputedStyle(triggerElement).getPropertyValue(
      '--mc-motion-duration-standard',
    );
    return Number.parseFloat(value) || 0;
  }

  function show(edge: 'first' | 'last' = 'first', moveFocus = true): void {
    if (disabled) return;
    clearTimeout(closeTimer);
    parent.closeSubmenus(triggerElement);
    flushSync(() => (open = true));
    if (moveFocus) controller?.focusItem(edge);
  }

  function close(restoreFocus = false): void {
    clearTimeout(closeTimer);
    controller?.close(false);
    open = false;
    if (restoreFocus) triggerElement?.focus();
  }

  function scheduleClose(): void {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => close(false), hoverDelay());
  }

  function handleClick(
    event: MouseEvent & { currentTarget: HTMLButtonElement },
  ): void {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onclick?.(event);
    if (event.defaultPrevented) return;
    if (open) close(false);
    else show();
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (disabled) return;

    if (
      event.key === 'ArrowRight' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      event.stopPropagation();
      show('first');
    }
  }

  function getPosition(): MenuPosition | undefined {
    if (!triggerElement) return;
    return {
      align: 'start',
      anchor: triggerElement,
      kind: 'anchor',
      side: 'inline',
    };
  }
</script>

<button
  {...attributes}
  bind:this={triggerElement}
  class={`mc-menu-item ${className}`.trim()}
  id={triggerId}
  data-mc-menu-item
  data-mc-menu-label={label}
  type="button"
  role="menuitem"
  tabindex="-1"
  aria-controls={contentId}
  aria-disabled={disabled || undefined}
  aria-expanded={open}
  aria-haspopup="menu"
  onclick={handleClick}
  onkeydown={handleKeydown}
  onpointerenter={() => {
    clearTimeout(closeTimer);
    if (!open && !disabled) show('first', false);
  }}
  onpointerleave={scheduleClose}
>
  <span class="mc-menu-item__label">{label}</span>
  <span class="mc-menu-item__trailing" aria-hidden="true">
    {#if icon}<span class="mc-menu-item__icon">{@render icon()}</span>{/if}
    <span class="mc-menu-item__icon"><CaretRightIcon /></span>
  </span>
</button>

<MenuSurface
  bind:open
  id={contentId}
  labelledby={triggerId}
  consumer={parent.consumer}
  size={parent.size}
  getTrigger={() => triggerElement}
  {getPosition}
  rootClose={parent.closeTree}
  onconnect={(value) => (controller = value)}
  onleft={() => close(true)}
  onpointerenter={() => clearTimeout(closeTimer)}
  onpointerleave={scheduleClose}
>
  {@render children()}
</MenuSurface>
