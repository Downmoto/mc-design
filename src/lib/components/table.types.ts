import type { Snippet } from 'svelte';
import type { HTMLTableAttributes } from 'svelte/elements';

export type TableSize = 'compact' | 'standard';
export type TableVariant = 'divided' | 'plain';

type NativeTableAttributes = Omit<HTMLTableAttributes, 'children' | 'class'>;

export type TableProps = NativeTableAttributes & {
  children: Snippet;
  class?: string;
  size?: TableSize;
  variant?: TableVariant;
};
