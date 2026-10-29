<script lang="ts">
  import CaretRightIcon from 'phosphor-svelte/lib/CaretRightIcon';

  import SidebarMenuButton from './SidebarMenuButton.svelte';
  import type { SidebarMenuItemProps } from './sidebar.types.js';

  let {
    action,
    children,
    class: className = '',
    label,
    leadingIcon,
    open = $bindable(false),
    submenu,
    ...attributes
  }: SidebarMenuItemProps = $props();
</script>

{#snippet parentChevron()}
  <span class="mc-sidebar-menu-item__chevron">
    <CaretRightIcon />
  </span>
{/snippet}

<li
  {...attributes}
  class={`mc-sidebar-menu-item ${className}`.trim()}
  data-open={submenu && open ? true : undefined}
  data-parent={submenu ? true : undefined}
>
  <div class="mc-sidebar-menu-item__row">
    <div class="mc-sidebar-menu-item__primary">
      {#if submenu}
        <SidebarMenuButton
          aria-expanded={open}
          label={label ?? ''}
          {leadingIcon}
          trailingIcon={parentChevron}
          onclick={() => (open = !open)}
        />
      {:else if children}
        {@render children()}
      {/if}
    </div>
    {#if action}
      <div class="mc-sidebar-menu-item__action">{@render action()}</div>
    {/if}
  </div>
  {#if submenu && open}
    <div class="mc-sidebar-menu-item__submenu">{@render submenu()}</div>
  {/if}
</li>

<style>
  .mc-sidebar-menu-item {
    min-inline-size: 0;
  }

  .mc-sidebar-menu-item__row {
    display: flex;
    align-items: center;
    min-inline-size: 0;
    gap: var(--mc-space-1);
  }

  .mc-sidebar-menu-item__primary {
    flex: 1 1 auto;
    min-inline-size: 0;
  }

  .mc-sidebar-menu-item__action {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
  }

  :global(.mc-sidebar-menu-button__trailing-icon) {
    display: grid;
    margin-inline-start: auto;
  }

  .mc-sidebar-menu-item__chevron {
    display: grid;
    inline-size: var(--mc-size-icon-standard);
    block-size: var(--mc-size-icon-standard);
    place-items: center;
    place-self: center;
    transition: transform var(--mc-motion-duration-standard)
      var(--mc-motion-easing-default);
  }

  .mc-sidebar-menu-item[data-open] .mc-sidebar-menu-item__chevron {
    transform: rotate(90deg);
  }

  .mc-sidebar-menu-item__chevron :global(svg) {
    display: block;
    inline-size: 100%;
    block-size: 100%;
  }

  :global(.mc-sidebar[data-state='collapsed'][data-collapsible='icon'])
    :is(.mc-sidebar-menu-item__action, .mc-sidebar-menu-item__submenu) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .mc-sidebar-menu-item__chevron {
      transition-duration: var(--mc-motion-duration-direct);
    }
  }
</style>
