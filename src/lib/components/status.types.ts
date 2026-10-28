import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type StatusSize = 'compact' | 'standard';
export type StatusTone =
  'accent' | 'danger' | 'neutral' | 'success' | 'warning';

type NativeSpanAttributes = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'aria-atomic' | 'aria-live' | 'children' | 'class' | 'role'
>;

export type StatusProps = NativeSpanAttributes & {
  children: Snippet;
  class?: string;
  consumer?: ConsumerId;
  size?: StatusSize;
  tone?: StatusTone;
};
