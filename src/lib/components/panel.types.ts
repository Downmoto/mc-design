import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type NativeSectionAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'class'
>;

type NativeDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'class'
>;

export type PanelProps = NativeSectionAttributes & {
  children?: Snippet;
  class?: string;
};

export type PanelHeaderProps = NativeSectionAttributes & {
  children?: Snippet;
  class?: string;
};

export type PanelContentProps = NativeDivAttributes & {
  children?: Snippet;
  class?: string;
};

export type PanelFooterProps = NativeSectionAttributes & {
  children?: Snippet;
  class?: string;
};
