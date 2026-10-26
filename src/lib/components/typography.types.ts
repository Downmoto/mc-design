import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'list'
  | 'inline-code'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted';

type NativeAttributes = Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'>;

export type TypographyProps = NativeAttributes & {
  children: Snippet;
  class?: string;
  variant?: TypographyVariant;
};
