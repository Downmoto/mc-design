import type { HTMLInputAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type CheckboxSize = 'compact' | 'standard';

type NativeCheckboxAttributes = Omit<
  HTMLInputAttributes,
  'checked' | 'class' | 'size' | 'type'
>;

export type CheckboxProps = NativeCheckboxAttributes & {
  checked?: boolean;
  class?: string;
  consumer?: ConsumerId;
  error?: string;
  indeterminate?: boolean;
  label: string;
  size?: CheckboxSize;
};
