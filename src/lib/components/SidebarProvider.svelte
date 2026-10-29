<script lang="ts">
  import { onMount } from 'svelte';

  import { foundationTokens } from '../generated/tokens.js';
  import { setSidebarContext } from './sidebar-context.js';
  import type { SidebarProviderProps } from './sidebar.types.js';

  const generatedId = $props.id();

  let {
    children,
    class: className = '',
    mobileOpen = $bindable(false),
    open = $bindable(true),
    ...attributes
  }: SidebarProviderProps = $props();

  let isMobile = $state(false);
  let shellId = $state(`${generatedId}-sidebar`);
  let returnFocus: HTMLElement | null = null;
  let wasMobileOpen = false;

  function setOpen(value: boolean): void {
    open = value;
  }

  function setMobileOpen(value: boolean, trigger?: HTMLElement): void {
    if (value) {
      returnFocus =
        trigger ??
        (document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null);
    }
    mobileOpen = value;
  }

  function restoreFocus(): void {
    queueMicrotask(() => {
      if (returnFocus?.isConnected) returnFocus.focus();
      returnFocus = null;
    });
  }

  function closeMobile(shouldRestoreFocus = true): void {
    mobileOpen = false;
    if (!shouldRestoreFocus) returnFocus = null;
  }

  function toggle(trigger?: HTMLElement): void {
    if (isMobile) setMobileOpen(!mobileOpen, trigger);
    else setOpen(!open);
  }

  function registerSidebar(_element: HTMLElement, id?: string): () => void {
    if (id) shellId = id;
    return () => {};
  }

  setSidebarContext({
    get isMobile() {
      return isMobile;
    },
    get mobileOpen() {
      return mobileOpen;
    },
    get open() {
      return open;
    },
    get shellId() {
      return shellId;
    },
    get state() {
      return open ? 'expanded' : 'collapsed';
    },
    closeMobile,
    registerSidebar,
    restoreFocus,
    setMobileOpen,
    setOpen,
    toggle,
  });

  $effect(() => {
    if (mobileOpen && !wasMobileOpen && !returnFocus) {
      returnFocus =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    } else if (!mobileOpen && wasMobileOpen) {
      restoreFocus();
    }

    wasMobileOpen = mobileOpen;
  });

  onMount(() => {
    if (typeof window.matchMedia !== 'function') return;

    const query = `(max-width: ${foundationTokens['breakpoint-small-maximum']})`;
    const media = window.matchMedia(query);
    const update = (): void => {
      isMobile = media.matches;
      if (!isMobile) mobileOpen = false;
    };

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  });
</script>

<div
  {...attributes}
  class={`mc-sidebar-provider ${className}`.trim()}
  data-mobile={isMobile || undefined}
  data-state={open ? 'expanded' : 'collapsed'}
>
  {@render children()}
</div>

<style>
  .mc-sidebar-provider {
    display: flex;
    align-items: stretch;
    box-sizing: border-box;
    inline-size: 100%;
    min-inline-size: 0;
    min-block-size: 0;
  }
</style>
