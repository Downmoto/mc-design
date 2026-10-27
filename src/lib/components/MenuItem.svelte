<script lang="ts">
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from 'svelte/elements';

  import { getMenuContext } from './menu-context.js';
  import type { MenuItemProps } from './menu.types.js';

  let {
    children,
    class: className = '',
    closeOnSelect = true,
    disabled = false,
    href,
    icon,
    onclick,
    shortcut,
    tone = 'default',
    ...attributes
  }: MenuItemProps = $props();

  const menu = getMenuContext();

  function select(event: MouseEvent): void {
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    if (href === undefined) {
      (onclick as HTMLButtonAttributes['onclick'])?.(
        event as MouseEvent & { currentTarget: HTMLButtonElement },
      );
    } else {
      (onclick as HTMLAnchorAttributes['onclick'])?.(
        event as MouseEvent & { currentTarget: HTMLAnchorElement },
      );
    }

    if (!event.defaultPrevented && closeOnSelect) menu.closeTree(true);
  }
</script>

{#snippet content()}
  <span class="mc-menu-item__label">{@render children()}</span>
  {#if shortcut || icon}
    <span class="mc-menu-item__trailing" aria-hidden="true">
      {#if shortcut}
        <span class="mc-menu-item__shortcut">{shortcut}</span>
      {/if}
      {#if icon}
        <span class="mc-menu-item__icon">{@render icon()}</span>
      {/if}
    </span>
  {/if}
{/snippet}

{#if href !== undefined}
  <a
    {...attributes}
    class={`mc-menu-item ${className}`.trim()}
    data-mc-menu-item
    data-tone={tone}
    href={disabled ? undefined : href}
    role="menuitem"
    tabindex="-1"
    aria-disabled={disabled || undefined}
    onclick={select}
  >
    {@render content()}
  </a>
{:else}
  <button
    {...attributes}
    class={`mc-menu-item ${className}`.trim()}
    data-mc-menu-item
    data-tone={tone}
    type="button"
    role="menuitem"
    tabindex="-1"
    aria-disabled={disabled || undefined}
    onclick={select}
  >
    {@render content()}
  </button>
{/if}
