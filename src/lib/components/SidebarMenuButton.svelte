<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  import { useSidebar } from './sidebar-context.js';
  import type { SidebarMenuButtonProps } from './sidebar.types.js';

  let {
    class: className = '',
    disabled = false,
    label,
    leadingIcon,
    onclick,
    title,
    trailingIcon,
    ...attributes
  }: SidebarMenuButtonProps = $props();

  const sidebar = useSidebar();
  let collapsed = $derived(!sidebar.isMobile && sidebar.state === 'collapsed');

  function handleClick(
    event: MouseEvent & { currentTarget: HTMLButtonElement },
  ): void {
    (onclick as HTMLButtonAttributes['onclick'])?.(event);
  }
</script>

<button
  {...attributes}
  class={`mc-sidebar-menu-button ${className}`.trim()}
  {disabled}
  title={title ?? (collapsed ? label : undefined)}
  type="button"
  onclick={handleClick}
>
  {#if leadingIcon}
    <span class="mc-sidebar-menu-button__icon" aria-hidden="true">
      {@render leadingIcon()}
    </span>
  {/if}
  <span class="mc-sidebar-menu-button__label">{label}</span>
  {#if trailingIcon}
    <span
      class="mc-sidebar-menu-button__icon mc-sidebar-menu-button__trailing-icon"
      aria-hidden="true"
    >
      {@render trailingIcon()}
    </span>
  {/if}
</button>
