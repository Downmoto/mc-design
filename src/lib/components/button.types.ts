import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonAppearance = 'primary' | 'secondary';
export type ButtonSize = 'compact' | 'standard' | 'large';

export interface ButtonProps extends Omit<
  HTMLButtonAttributes,
  'children' | 'class' | 'disabled' | 'type'
> {
  appearance?: ButtonAppearance;
  children: Snippet;
  class?: string;
  disabled?: boolean;
  leadingIcon?: Snippet;
  loading?: boolean;
  size?: ButtonSize;
  trailingIcon?: Snippet;
  type?: 'button' | 'submit' | 'reset';
}

export interface IconButtonProps extends Omit<
  HTMLButtonAttributes,
  'aria-label' | 'children' | 'class' | 'disabled' | 'title' | 'type'
> {
  appearance?: ButtonAppearance;
  children: Snippet;
  class?: string;
  disabled?: boolean;
  label: string;
  loading?: boolean;
  size?: ButtonSize;
  title?: string;
  tooltip?: string;
  type?: 'button' | 'submit' | 'reset';
}
