import type { HTMLInputAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type SliderSize = 'compact' | 'standard';

type NativeSliderAttributes = Omit<
  HTMLInputAttributes,
  'class' | 'max' | 'min' | 'size' | 'step' | 'type' | 'value'
>;

export type SliderProps = NativeSliderAttributes & {
  class?: string;
  consumer?: ConsumerId;
  error?: string;
  label: string;
  max?: number;
  min?: number;
  showValue?: boolean;
  size?: SliderSize;
  step?: number;
  suffix?: string;
  value?: number;
};
