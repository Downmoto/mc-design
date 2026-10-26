import type { Snippet } from 'svelte';

import type { ConsumerId } from '../generated/tokens.js';

export interface ConsumerProps {
  children: Snippet;
  consumer: ConsumerId;
}
