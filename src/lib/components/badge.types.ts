import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type BadgeSize = 'compact' | 'standard';
export type BadgeTone = 'accent' | 'danger' | 'neutral' | 'success' | 'warning';

type NativeSpanAttributes = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children' | 'class'
>;

export type BadgeProps = NativeSpanAttributes & {
  children: Snippet;
  class?: string;
  consumer?: ConsumerId;
  leadingIcon?: Snippet;
  size?: BadgeSize;
  tone?: BadgeTone;
};
