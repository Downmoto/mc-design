import type { Snippet } from 'svelte';
import type { HTMLSelectAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type SelectSize = 'compact' | 'standard';

type NativeSelectAttributes = Omit<
  HTMLSelectAttributes,
  'children' | 'class' | 'size' | 'value'
>;

export type SelectProps = NativeSelectAttributes & {
  children: Snippet;
  class?: string;
  consumer?: ConsumerId;
  description?: string;
  error?: string;
  label: string;
  size?: SelectSize;
  value?: string;
};
