import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type ActionGroupOrientation = 'horizontal' | 'vertical';

type NativeDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'class' | 'role'
>;

export type ActionGroupProps = NativeDivAttributes & {
  children: Snippet;
  class?: string;
  joined?: boolean;
  orientation?: ActionGroupOrientation;
  role?: 'group';
};
