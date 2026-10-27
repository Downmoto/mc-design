<script lang="ts">
  import CheckIcon from 'phosphor-svelte/lib/CheckIcon';

  import { getMenuContext, getMenuRadioContext } from './menu-context.js';
  import type { MenuRadioItemProps } from './menu.types.js';

  let {
    children,
    class: className = '',
    closeOnSelect = true,
    disabled = false,
    onclick,
    shortcut,
    value,
    ...attributes
  }: MenuRadioItemProps = $props();

  const menu = getMenuContext();
  const group = getMenuRadioContext();
  let checked = $derived(group.getValue() === value);

  function select(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    group.setValue(value);
    onclick?.(event);
    if (!event.defaultPrevented && closeOnSelect) menu.closeTree(true);
  }
</script>

<button
  {...attributes}
  class={`mc-menu-item ${className}`.trim()}
  data-mc-menu-item
  type="button"
  role="menuitemradio"
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
