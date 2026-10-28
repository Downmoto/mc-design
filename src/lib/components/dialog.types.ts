import type { Snippet } from 'svelte';
import type { HTMLDialogAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type DialogSize = 'large' | 'medium' | 'small';

type NativeDialogAttributes = Omit<
  HTMLDialogAttributes,
  'children' | 'class' | 'oncancel' | 'onclose' | 'open' | 'title'
>;

export type DialogProps = NativeDialogAttributes & {
  children?: Snippet;
  class?: string;
  consumer?: ConsumerId;
  description?: string;
  dismissible?: boolean;
  footer?: Snippet;
  oncancel?: HTMLDialogAttributes['oncancel'];
  onclose?: HTMLDialogAttributes['onclose'];
  open?: boolean;
  size?: DialogSize;
  title: string;
};
