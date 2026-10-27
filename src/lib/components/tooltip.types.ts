import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type TooltipSize = 'compact' | 'standard';

export interface TooltipTriggerProps {
  'aria-describedby': string;
  onblur: (event: FocusEvent) => void;
  onfocus: (event: FocusEvent) => void;
  onkeydown: (event: KeyboardEvent) => void;
  onpointerenter: (event: PointerEvent) => void;
  onpointerleave: (event: PointerEvent) => void;
}

type NativeSpanAttributes = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children' | 'class'
>;

export type TooltipProps = NativeSpanAttributes & {
  class?: string;
  consumer?: ConsumerId;
  content: string;
  open?: boolean;
  size?: TooltipSize;
  trigger: Snippet<[props: TooltipTriggerProps]>;
};
