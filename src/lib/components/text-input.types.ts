import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type TextInputSize = 'compact' | 'standard';
export type TextInputType =
  'email' | 'password' | 'search' | 'tel' | 'text' | 'url';

type NativeInputAttributes = Omit<
  HTMLInputAttributes,
  'class' | 'size' | 'type' | 'value'
>;

export type TextInputProps = NativeInputAttributes & {
  class?: string;
  consumer?: ConsumerId;
  description?: string;
  error?: string;
  label: string;
  leadingIcon?: Snippet;
  size?: TextInputSize;
  trailingIcon?: Snippet;
  type?: TextInputType;
  value?: string;
};
