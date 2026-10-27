import type { Snippet } from 'svelte';
import type {
  HTMLAnchorAttributes,
  HTMLAttributes,
  HTMLButtonAttributes,
} from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type MenuSize = 'compact' | 'standard';
export type MenuAlign = 'start' | 'end';
export type MenuMode = 'button' | 'context';
export type MenuItemTone = 'default' | 'danger';

export interface MenuButtonTriggerProps {
  id: string;
  'aria-controls': string;
  'aria-expanded': boolean;
  'aria-haspopup': 'menu';
  disabled: boolean;
  onclick: (event: MouseEvent) => void;
  onkeydown: (event: KeyboardEvent) => void;
}

export interface MenuContextTriggerProps {
  id: string;
  'aria-controls': string;
  'aria-disabled': boolean | undefined;
  'aria-haspopup': 'menu';
  oncontextmenu: (event: MouseEvent) => void;
  onkeydown: (event: KeyboardEvent) => void;
}

export type MenuTriggerProps = MenuButtonTriggerProps | MenuContextTriggerProps;

type NativeDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'class' | 'contextmenu'
>;

type MenuBaseProps = NativeDivAttributes & {
  align?: MenuAlign;
  children: Snippet;
  class?: string;
  consumer?: ConsumerId;
  disabled?: boolean;
  open?: boolean;
  size?: MenuSize;
};

export type MenuProps = MenuBaseProps &
  (
    | {
        label?: string;
        mode?: 'button';
        trigger: Snippet<[props: MenuTriggerProps]>;
      }
    | {
        label: string;
        mode: 'context';
        trigger: Snippet<[props: MenuTriggerProps]>;
      }
  );

type NativeButtonAttributes = Omit<
  HTMLButtonAttributes,
  'children' | 'class' | 'disabled' | 'role' | 'tabindex' | 'type'
>;

type NativeAnchorAttributes = Omit<
  HTMLAnchorAttributes,
  'children' | 'class' | 'href' | 'role' | 'tabindex'
>;

export type MenuItemProps = NativeButtonAttributes &
  NativeAnchorAttributes & {
    children: Snippet;
    class?: string;
    closeOnSelect?: boolean;
    disabled?: boolean;
    href?: string;
    icon?: Snippet;
    shortcut?: string;
    tone?: MenuItemTone;
  };

export type MenuCheckboxItemProps = NativeButtonAttributes & {
  checked?: boolean;
  children: Snippet;
  class?: string;
  closeOnSelect?: boolean;
  disabled?: boolean;
  shortcut?: string;
};

export type MenuRadioGroupProps = NativeDivAttributes & {
  children: Snippet;
  class?: string;
  label: string;
  value?: string;
};

export type MenuRadioItemProps = NativeButtonAttributes & {
  children: Snippet;
  class?: string;
  closeOnSelect?: boolean;
  disabled?: boolean;
  shortcut?: string;
  value: string;
};

export type MenuGroupProps = NativeDivAttributes & {
  children: Snippet;
  class?: string;
  label: string;
};

export type MenuSeparatorProps = Omit<
  NativeDivAttributes,
  'aria-orientation' | 'role'
> & {
  class?: string;
};

export type MenuSubmenuProps = NativeButtonAttributes & {
  children: Snippet;
  class?: string;
  disabled?: boolean;
  icon?: Snippet;
  label: string;
};
