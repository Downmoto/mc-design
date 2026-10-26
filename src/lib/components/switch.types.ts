import type { HTMLInputAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type SwitchSize = 'compact' | 'standard';

type NativeSwitchAttributes = Omit<
  HTMLInputAttributes,
  'checked' | 'class' | 'size' | 'type'
>;

export type SwitchProps = NativeSwitchAttributes & {
  checked?: boolean;
  class?: string;
  consumer?: ConsumerId;
  description?: string;
  error?: string;
  label: string;
  size?: SwitchSize;
};
