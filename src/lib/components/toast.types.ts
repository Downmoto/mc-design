import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';
import type { AlertSize, AlertTone } from './alert.types.js';

export type ToastSize = AlertSize;
export type ToastTone = AlertTone;

type NativeDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'class' | 'title'
>;

export type ToastProps = NativeDivAttributes & {
  children: Snippet;
  class?: string;
  consumer?: ConsumerId;
  dismissible?: boolean;
  leadingIcon?: Snippet;
  onclose?: () => void;
  open?: boolean;
  size?: ToastSize;
  timeout?: number;
  title?: string;
  tone?: ToastTone;
};
