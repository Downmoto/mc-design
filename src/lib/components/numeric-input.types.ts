import type { HTMLInputAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type NumericInputSize = 'compact' | 'standard';

type NativeNumericInputAttributes = Omit<
  HTMLInputAttributes,
  'class' | 'size' | 'type' | 'value'
>;

export type NumericInputProps = NativeNumericInputAttributes & {
  class?: string;
  consumer?: ConsumerId;
  description?: string;
  error?: string;
  label: string;
  prefix?: string;
  size?: NumericInputSize;
  suffix?: string;
  value?: number;
};
