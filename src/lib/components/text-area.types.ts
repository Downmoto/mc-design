import type { HTMLTextareaAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type TextAreaSize = 'compact' | 'standard';

type NativeTextAreaAttributes = Omit<
  HTMLTextareaAttributes,
  'children' | 'class' | 'value'
>;

export type TextAreaProps = NativeTextAreaAttributes & {
  class?: string;
  consumer?: ConsumerId;
  description?: string;
  error?: string;
  label: string;
  size?: TextAreaSize;
  value?: string;
};
