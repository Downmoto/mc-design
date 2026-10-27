import { getContext, setContext } from 'svelte';

import type { ConsumerId } from '../generated/tokens.js';
import type { MenuSize } from './menu.types.js';

export interface RegisteredSubmenu {
  close: () => void;
  trigger: HTMLElement;
}

export interface MenuController {
  close: (restoreFocus?: boolean) => void;
  closeSubmenus: (except?: HTMLElement) => void;
  closeTree: (restoreFocus?: boolean) => void;
  consumer?: ConsumerId;
  focusItem: (edge: 'first' | 'last') => void;
  registerSubmenu: (submenu: RegisteredSubmenu) => () => void;
  size: MenuSize;
}

export interface MenuRadioController {
  getValue: () => string;
  setValue: (value: string) => void;
}

const menuContextKey = Symbol('mc-menu');
const menuRadioContextKey = Symbol('mc-menu-radio');

export function getMenuContext(): MenuController {
  const context = getContext<MenuController>(menuContextKey);

  if (!context) {
    throw new Error('Menu items must be children of Menu or MenuSubmenu');
  }

  return context;
}

export function setMenuContext(context: MenuController): void {
  setContext(menuContextKey, context);
}

export function getMenuRadioContext(): MenuRadioController {
  const context = getContext<MenuRadioController>(menuRadioContextKey);

  if (!context) {
    throw new Error('MenuRadioItem must be a child of MenuRadioGroup');
  }

  return context;
}

export function setMenuRadioContext(context: MenuRadioController): void {
  setContext(menuRadioContextKey, context);
}
