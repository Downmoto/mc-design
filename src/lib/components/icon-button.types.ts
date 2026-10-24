import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';
import type { ButtonAppearance, ButtonSize } from './button.types.js';

export interface IconButtonProps extends Omit<
  HTMLButtonAttributes,
  'aria-label' | 'children' | 'class' | 'disabled' | 'title' | 'type'
> {
  appearance?: ButtonAppearance;
  children: Snippet;
  class?: string;
  consumer?: ConsumerId;
  disabled?: boolean;
  label: string;
  loading?: boolean;
  size?: ButtonSize;
  title?: string;
  tooltip?: string;
  type?: 'button' | 'submit' | 'reset';
}
