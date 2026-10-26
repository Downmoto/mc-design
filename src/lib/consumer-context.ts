import { getContext, setContext } from 'svelte';

import type { ConsumerId } from './generated/tokens.js';

type ConsumerResolver = () => ConsumerId;

const consumerContextKey = Symbol('mc-consumer');

export function getConsumerContext(): ConsumerResolver | undefined {
  return getContext<ConsumerResolver | undefined>(consumerContextKey);
}

export function setConsumerContext(resolveConsumer: ConsumerResolver): void {
  setContext(consumerContextKey, resolveConsumer);
}
