import type { HTMLProgressAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type ProgressIndicatorSize = 'compact' | 'standard';

type NativeProgressAttributes = Omit<
  HTMLProgressAttributes,
  'class' | 'max' | 'value'
>;

export type ProgressIndicatorProps = NativeProgressAttributes & {
  class?: string;
  consumer?: ConsumerId;
  label: string;
  max?: number;
  showValue?: boolean;
  size?: ProgressIndicatorSize;
  value?: number;
};
