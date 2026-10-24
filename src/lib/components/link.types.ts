import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export interface LinkProps extends Omit<
  HTMLAnchorAttributes,
  'children' | 'class' | 'href'
> {
  children: Snippet;
  class?: string;
  consumer?: ConsumerId;
  href: string;
}
