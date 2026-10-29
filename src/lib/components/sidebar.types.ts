import type { Snippet } from 'svelte';
import type {
  HTMLAnchorAttributes,
  HTMLAttributes,
  HTMLButtonAttributes,
  HTMLLiAttributes,
} from 'svelte/elements';

import type { ButtonProps } from './button.types.js';

export type SidebarCollapsible = 'icon' | 'none' | 'offcanvas';
export type SidebarSide = 'end' | 'start';
export type SidebarState = 'collapsed' | 'expanded';
export type SidebarVariant = 'attached' | 'floating' | 'inset';

type NativeDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'class'
>;
type NativeAsideAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  'aria-label' | 'children' | 'class'
>;
type NativeSectionAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'class'
>;
type NativeListAttributes = Omit<
  HTMLAttributes<HTMLUListElement>,
  'children' | 'class'
>;
type NativeListItemAttributes = Omit<HTMLLiAttributes, 'children' | 'class'>;
type NativeAnchorAttributes = Omit<
  HTMLAnchorAttributes,
  'aria-current' | 'children' | 'class' | 'href'
>;
type NativeButtonAttributes = Omit<
  HTMLButtonAttributes,
  'aria-controls' | 'aria-expanded' | 'children' | 'class' | 'type'
>;

export type SidebarProviderProps = NativeDivAttributes & {
  children: Snippet;
  class?: string;
  mobileOpen?: boolean;
  open?: boolean;
};

export type SidebarProps = NativeAsideAttributes & {
  children: Snippet;
  class?: string;
  collapsible?: SidebarCollapsible;
  label: string;
  side?: SidebarSide;
  variant?: SidebarVariant;
};

export type SidebarRegionProps = NativeSectionAttributes & {
  children?: Snippet;
  class?: string;
};

export type SidebarContentProps = NativeDivAttributes & {
  children?: Snippet;
  class?: string;
};

export type SidebarGroupProps = NativeSectionAttributes & {
  action?: Snippet;
  children: Snippet;
  class?: string;
  label?: string;
};

export type SidebarMenuProps = NativeListAttributes & {
  children: Snippet;
  class?: string;
};

export type SidebarMenuItemProps = NativeListItemAttributes & {
  action?: Snippet;
  badge?: Snippet;
  children: Snippet;
  class?: string;
  submenu?: Snippet;
};

export type SidebarMenuLinkProps = NativeAnchorAttributes & {
  class?: string;
  current?: HTMLAnchorAttributes['aria-current'];
  href: string;
  label: string;
  leadingIcon?: Snippet;
};

export type SidebarMenuButtonProps = NativeButtonAttributes & {
  class?: string;
  label: string;
  leadingIcon?: Snippet;
};

export type SidebarTriggerProps = Omit<
  ButtonProps,
  | 'appearance'
  | 'aria-label'
  | 'children'
  | 'href'
  | 'leadingIcon'
  | 'loading'
  | 'size'
  | 'trailingIcon'
  | 'type'
> & {
  class?: string;
};

export type SidebarInsetProps = NativeDivAttributes & {
  children: Snippet;
  class?: string;
};
