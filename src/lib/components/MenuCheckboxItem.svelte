<script lang="ts">
  import CheckIcon from 'phosphor-svelte/lib/CheckIcon';

  import { getMenuContext } from './menu-context.js';
  import type { MenuCheckboxItemProps } from './menu.types.js';

  let {
    checked = $bindable(false),
    children,
    class: className = '',
    closeOnSelect = true,
    disabled = false,
    onclick,
    shortcut,
    ...attributes
  }: MenuCheckboxItemProps = $props();

  const menu = getMenuContext();

  function select(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    checked = !checked;
    onclick?.(event);
    if (!event.defaultPrevented && closeOnSelect) menu.closeTree(true);
  }
</script>

<button
  {...attributes}
  class={`mc-menu-item ${className}`.trim()}
  data-mc-menu-item
  type="button"
  role="menuitemcheckbox"
  tabindex="-1"
  aria-checked={checked}
  aria-disabled={disabled || undefined}
  onclick={select}
>
  <span class="mc-menu-item__label">{@render children()}</span>
  <span class="mc-menu-item__trailing" aria-hidden="true">
    {#if shortcut}<span class="mc-menu-item__shortcut">{shortcut}</span>{/if}
    <span class="mc-menu-item__icon">
      {#if checked}<CheckIcon />{/if}
    </span>
  </span>
</button>
