import type { HTMLFieldsetAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type RadioGroupSize = 'compact' | 'standard';

export interface RadioOption {
  description?: string;
  disabled?: boolean;
  label: string;
  value: string;
}

type NativeFieldsetAttributes = Omit<
  HTMLFieldsetAttributes,
  'class' | 'disabled'
>;

export type RadioGroupProps = NativeFieldsetAttributes & {
  class?: string;
  consumer?: ConsumerId;
  description?: string;
  disabled?: boolean;
  error?: string;
  label: string;
  name?: string;
  options: RadioOption[];
  required?: boolean;
  size?: RadioGroupSize;
  value?: string;
};
