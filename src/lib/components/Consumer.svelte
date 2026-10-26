<script lang="ts">
  import { setConsumerContext } from '../consumer-context.js';
  import type { ConsumerProps } from './consumer.types.js';

  let { children, consumer }: ConsumerProps = $props();

  setConsumerContext(() => consumer);
</script>

{@render children()}
