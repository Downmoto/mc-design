import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type TabsSize = 'compact' | 'standard';

export interface TabItem {
  disabled?: boolean;
  label: string;
  value: string;
}

type NativeDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'class'
>;

export type TabsProps = NativeDivAttributes & {
  children: Snippet<[value: string]>;
  class?: string;
  consumer?: ConsumerId;
  label: string;
  size?: TabsSize;
  tabs: TabItem[];
  value?: string;
};
