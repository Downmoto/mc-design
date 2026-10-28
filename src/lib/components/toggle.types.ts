import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

type LabelledToggleSize = 'compact' | 'standard' | 'large';
type IconToggleSize = 'icon-compact' | 'icon' | 'icon-large';
export type ToggleAppearance = 'ghost' | 'secondary';
export type ToggleSize = LabelledToggleSize | IconToggleSize;

type NativeButtonAttributes = Omit<
  HTMLButtonAttributes,
  'aria-pressed' | 'children' | 'class' | 'disabled' | 'type'
>;

export type ToggleProps = NativeButtonAttributes & {
  appearance?: ToggleAppearance;
  class?: string;
  consumer?: ConsumerId;
  disabled?: boolean;
  pressed?: boolean;
  type?: 'button' | 'submit' | 'reset';
} & (
    | {
        children: Snippet;
        leadingIcon?: Snippet;
        size?: LabelledToggleSize;
        trailingIcon?: Snippet;
      }
    | {
        'aria-label': string;
        children: Snippet;
        leadingIcon?: never;
        size: IconToggleSize;
        trailingIcon?: never;
      }
  );
