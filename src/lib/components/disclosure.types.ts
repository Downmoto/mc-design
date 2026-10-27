import type { Snippet } from 'svelte';
import type { HTMLDetailsAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type DisclosureSize = 'compact' | 'standard';

type NativeDetailsAttributes = Omit<
  HTMLDetailsAttributes,
  'children' | 'class' | 'open'
>;

export type DisclosureProps = NativeDetailsAttributes & {
  children: Snippet;
  class?: string;
  consumer?: ConsumerId;
  open?: boolean;
  size?: DisclosureSize;
  summary: string;
};
