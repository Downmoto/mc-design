import { getContext, setContext } from 'svelte';

import type { SidebarState } from './sidebar.types.js';

export interface SidebarController {
  readonly isMobile: boolean;
  readonly mobileOpen: boolean;
  readonly open: boolean;
  readonly shellId: string;
  readonly state: SidebarState;
  closeMobile: (restoreFocus?: boolean) => void;
  registerSidebar: (element: HTMLElement, id?: string) => () => void;
  restoreFocus: () => void;
  setMobileOpen: (open: boolean, trigger?: HTMLElement) => void;
  setOpen: (open: boolean) => void;
  toggle: (trigger?: HTMLElement) => void;
}

const sidebarContextKey = Symbol('mc-sidebar');

export function setSidebarContext(controller: SidebarController): void {
  setContext(sidebarContextKey, controller);
}

export function useSidebar(): SidebarController {
  const controller = getContext<SidebarController>(sidebarContextKey);

  if (!controller) {
    throw new Error('Sidebar components must be children of SidebarProvider');
  }

  return controller;
}
