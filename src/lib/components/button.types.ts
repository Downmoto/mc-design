import type { Snippet } from 'svelte';
import type {
  HTMLAnchorAttributes,
  HTMLButtonAttributes,
} from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type ButtonAppearance = 'primary' | 'secondary' | 'ghost' | 'link';
type LabelledButtonSize = 'compact' | 'standard' | 'large';
type IconButtonSize = 'icon-compact' | 'icon' | 'icon-large';
export type ButtonSize = LabelledButtonSize | IconButtonSize;

type NativeButtonAttributes = Omit<
  HTMLButtonAttributes,
  'children' | 'class' | 'disabled' | 'type'
>;

type NativeAnchorAttributes = Omit<
  HTMLAnchorAttributes,
  'children' | 'class' | 'href'
>;

export type ButtonProps = NativeButtonAttributes &
  NativeAnchorAttributes & {
    appearance?: ButtonAppearance;
    class?: string;
    consumer?: ConsumerId;
    disabled?: boolean;
    href?: string;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
  } & (
    | {
        children: Snippet;
        leadingIcon?: Snippet;
        size?: LabelledButtonSize;
        trailingIcon?: Snippet;
      }
    | {
        'aria-label': string;
        children: Snippet;
        leadingIcon?: never;
        size: IconButtonSize;
        trailingIcon?: never;
      }
  );
