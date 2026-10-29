import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

type NativeDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-labelledby' | 'children' | 'class' | 'role' | 'title'
>;

export type EmptyStateProps = NativeDivAttributes & {
  actions?: Snippet;
  children?: Snippet;
  class?: string;
  leadingIcon?: Snippet;
  title: string;
};
