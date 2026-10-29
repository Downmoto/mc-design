import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLLiAttributes } from 'svelte/elements';

export type ListSize = 'compact' | 'standard';
export type ListVariant = 'divided' | 'plain';

type NativeListAttributes = Omit<
  HTMLAttributes<HTMLUListElement>,
  'children' | 'class'
>;

type NativeListItemAttributes = Omit<HTMLLiAttributes, 'children' | 'class'>;

export type ListProps = NativeListAttributes & {
  children: Snippet;
  class?: string;
  size?: ListSize;
  variant?: ListVariant;
};

export type ListItemProps = NativeListItemAttributes & {
  children: Snippet;
  class?: string;
  leading?: Snippet;
  trailing?: Snippet;
};
