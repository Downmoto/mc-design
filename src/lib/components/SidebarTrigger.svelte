<script lang="ts">
  import SidebarIcon from 'phosphor-svelte/lib/SidebarIcon';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  import Button from './Button.svelte';
  import { useSidebar } from './sidebar-context.js';
  import type { SidebarTriggerProps } from './sidebar.types.js';

  let {
    class: className = '',
    onclick,
    ...attributes
  }: SidebarTriggerProps = $props();

  const sidebar = useSidebar();
  let expanded = $derived(sidebar.isMobile ? sidebar.mobileOpen : sidebar.open);
  let label = $derived(expanded ? 'Collapse navigation' : 'Expand navigation');

  function handleClick(event: MouseEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      sidebar.toggle(event.currentTarget);
    }
    (onclick as HTMLButtonAttributes['onclick'])?.(
      event as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
    );
  }
</script>

<Button
  {...attributes}
  appearance="ghost"
  class={`mc-sidebar-trigger ${className}`.trim()}
  size="icon-compact"
  type="button"
  aria-controls={sidebar.shellId}
  aria-expanded={expanded}
  aria-label={label}
  title={label}
  onclick={handleClick}
>
  <SidebarIcon />
</Button>
