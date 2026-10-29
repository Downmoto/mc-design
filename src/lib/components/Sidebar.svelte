<script lang="ts">
  import { onDestroy } from 'svelte';

  import { useSidebar } from './sidebar-context.js';
  import type { SidebarProps } from './sidebar.types.js';

  let {
    children,
    class: className = '',
    collapsible = 'offcanvas',
    id,
    label,
    side = 'start',
    variant = 'attached',
    ...attributes
  }: SidebarProps = $props();

  const sidebar = useSidebar();
  let asideElement = $state<HTMLElement>();
  let dialogElement = $state<HTMLDialogElement>();
  let previousOverflow = '';
  let shellId = $derived(id ?? sidebar.shellId);
  let visualState = $derived(
    sidebar.isMobile
      ? sidebar.mobileOpen
        ? 'expanded'
        : 'collapsed'
      : collapsible === 'none'
        ? 'expanded'
        : sidebar.state,
  );

  function focusSidebar(): void {
    queueMicrotask(() => {
      const initialFocus = dialogElement?.querySelector<HTMLElement>(
        'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])',
      );
      (initialFocus ?? dialogElement)?.focus();
    });
  }

  function openMobile(): void {
    if (!dialogElement || dialogElement.open) return;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    if (typeof dialogElement.showModal === 'function') {
      dialogElement.showModal();
    } else {
      dialogElement.open = true;
    }
    focusSidebar();
  }

  function closeMobile(): void {
    if (!dialogElement?.open) return;
    if (typeof dialogElement.close === 'function') dialogElement.close();
    else {
      dialogElement.open = false;
      dialogElement.dispatchEvent(new Event('close'));
    }
  }

  function handleCancel(event: Event): void {
    event.preventDefault();
    closeMobile();
  }

  function handleClose(): void {
    document.documentElement.style.overflow = previousOverflow;
    sidebar.setMobileOpen(false);
  }

  function handleBackdropClick(event: MouseEvent): void {
    if (event.target === dialogElement) closeMobile();
  }

  $effect(() => {
    const element = sidebar.isMobile ? dialogElement : asideElement;
    if (!element) return;
    return sidebar.registerSidebar(element, shellId);
  });

  $effect(() => {
    if (!sidebar.isMobile || !dialogElement) return;
    if (sidebar.mobileOpen) openMobile();
    else closeMobile();
  });

  onDestroy(() => {
    if (dialogElement?.open)
      document.documentElement.style.overflow = previousOverflow;
  });
</script>

{#snippet surface()}
  <nav class="mc-sidebar__surface" aria-label={label}>
    {@render children()}
  </nav>
{/snippet}

{#if sidebar.isMobile}
  <dialog
    {...attributes}
    bind:this={dialogElement}
    class={`mc-sidebar mc-sidebar--mobile ${className}`.trim()}
    id={shellId}
    data-collapsible={collapsible}
    data-side={side}
    data-state={visualState}
    data-variant={variant}
    aria-label={label}
    tabindex="-1"
    oncancel={handleCancel}
    onclose={handleClose}
    onclick={handleBackdropClick}
  >
    {@render surface()}
  </dialog>
{:else}
  <aside
    {...attributes}
    bind:this={asideElement}
    class={`mc-sidebar ${className}`.trim()}
    id={shellId}
    data-collapsible={collapsible}
    data-side={side}
    data-state={visualState}
    data-variant={variant}
  >
    {@render surface()}
  </aside>
{/if}

<style>
  .mc-sidebar {
    --mc-sidebar-width: var(--mc-size-sidebar-navigation);

    position: relative;
    z-index: var(--mc-layer-sticky);
    flex: 0 0 var(--mc-sidebar-width);
    box-sizing: border-box;
    inline-size: var(--mc-sidebar-width);
    min-block-size: 0;
    overflow: hidden;
    color: var(--mc-colour-text-primary);
    transition: inline-size var(--mc-motion-duration-large)
      var(--mc-motion-easing-default);
  }

  .mc-sidebar[data-side='end'] {
    order: 1;
  }

  .mc-sidebar[data-state='collapsed'][data-collapsible='offcanvas'] {
    flex-basis: 0;
    inline-size: 0;
  }

  .mc-sidebar[data-state='collapsed'][data-collapsible='icon'] {
    --mc-sidebar-width: var(--mc-size-control-large);
  }

  .mc-sidebar__surface {
    position: relative;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    min-block-size: 0;
    overflow: hidden;
    background: var(--mc-colour-surface);
  }

  .mc-sidebar[data-variant='attached'][data-side='start'] .mc-sidebar__surface,
  .mc-sidebar[data-variant='inset'][data-side='start'] .mc-sidebar__surface {
    border-inline-end: var(--mc-border-width-default) solid
      var(--mc-colour-border);
  }

  .mc-sidebar[data-variant='attached'][data-side='end'] .mc-sidebar__surface,
  .mc-sidebar[data-variant='inset'][data-side='end'] .mc-sidebar__surface {
    border-inline-start: var(--mc-border-width-default) solid
      var(--mc-colour-border);
  }

  .mc-sidebar[data-variant='floating'] {
    padding: var(--mc-space-2);
  }

  .mc-sidebar[data-variant='floating'] .mc-sidebar__surface {
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-2);
    box-shadow: var(--mc-shadow-1);
  }

  .mc-sidebar--mobile {
    position: fixed;
    inset-block: 0;
    inset-inline-start: 0;
    max-inline-size: calc(100% - var(--mc-space-5));
    max-block-size: none;
    block-size: 100dvb;
    margin: 0;
    padding: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
    transform: translateX(0);
    transition:
      transform var(--mc-motion-duration-large) var(--mc-motion-easing-default),
      display var(--mc-motion-duration-large) allow-discrete,
      overlay var(--mc-motion-duration-large) allow-discrete;
  }

  .mc-sidebar--mobile[data-side='end'] {
    inset-inline: auto 0;
  }

  .mc-sidebar--mobile::backdrop {
    background: color-mix(
      in srgb,
      var(--mc-colour-backdrop) var(--mc-opacity-dialog-backdrop),
      transparent
    );
    transition:
      background-color var(--mc-motion-duration-large)
        var(--mc-motion-easing-default),
      display var(--mc-motion-duration-large) allow-discrete,
      overlay var(--mc-motion-duration-large) allow-discrete;
  }

  @starting-style {
    .mc-sidebar--mobile[open][data-side='start'] {
      transform: translateX(-100%);
    }

    .mc-sidebar--mobile[open][data-side='end'] {
      transform: translateX(100%);
    }

    .mc-sidebar--mobile[open]::backdrop {
      background: transparent;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mc-sidebar,
    .mc-sidebar--mobile,
    .mc-sidebar--mobile::backdrop {
      transition-duration: var(--mc-motion-duration-direct);
    }
  }

  @media (forced-colors: active) {
    .mc-sidebar__surface {
      color: CanvasText;
      background: Canvas;
      border-color: CanvasText;
      box-shadow: none;
    }

    .mc-sidebar--mobile::backdrop {
      background: Canvas;
    }
  }
</style>
