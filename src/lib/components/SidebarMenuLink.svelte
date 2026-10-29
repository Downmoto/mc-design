<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  import { useSidebar } from './sidebar-context.js';
  import type { SidebarMenuLinkProps } from './sidebar.types.js';

  let {
    class: className = '',
    current,
    href,
    label,
    leadingIcon,
    onclick,
    title,
    ...attributes
  }: SidebarMenuLinkProps = $props();

  const sidebar = useSidebar();
  let collapsed = $derived(!sidebar.isMobile && sidebar.state === 'collapsed');

  function handleClick(
    event: MouseEvent & { currentTarget: HTMLAnchorElement },
  ): void {
    (onclick as HTMLAnchorAttributes['onclick'])?.(event);
    if (!event.defaultPrevented && sidebar.isMobile) sidebar.closeMobile();
  }
</script>

<a
  {...attributes}
  class={`mc-sidebar-menu-link ${className}`.trim()}
  data-active={current ? true : undefined}
  {href}
  aria-current={current}
  title={title ?? (collapsed ? label : undefined)}
  onclick={handleClick}
>
  {#if leadingIcon}
    <span class="mc-sidebar-menu-link__icon" aria-hidden="true">
      {@render leadingIcon()}
    </span>
  {/if}
  <span class="mc-sidebar-menu-link__label">{label}</span>
</a>
