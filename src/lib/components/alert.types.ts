import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type AlertSize = 'compact' | 'standard';
export type AlertTone = 'danger' | 'info' | 'neutral' | 'success' | 'warning';

type NativeDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'class' | 'title'
>;

export type AlertProps = NativeDivAttributes & {
  children: Snippet;
  class?: string;
  consumer?: ConsumerId;
  leadingIcon?: Snippet;
  size?: AlertSize;
  title?: string;
  tone?: AlertTone;
};
