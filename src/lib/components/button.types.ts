import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type ButtonAppearance = 'primary' | 'secondary';
export type ButtonSize = 'compact' | 'standard' | 'large';

export interface ButtonProps extends Omit<
  HTMLButtonAttributes,
  'children' | 'class' | 'disabled' | 'type'
> {
  appearance?: ButtonAppearance;
  children: Snippet;
  class?: string;
  consumer?: ConsumerId;
  disabled?: boolean;
  leadingIcon?: Snippet;
  loading?: boolean;
  size?: ButtonSize;
  trailingIcon?: Snippet;
  type?: 'button' | 'submit' | 'reset';
}
