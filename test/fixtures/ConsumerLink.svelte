<script lang="ts">
  import { Consumer, Link, type ConsumerId } from '../../src/lib/index.js';

  let {
    consumer,
    linkConsumer,
  }: {
    consumer: ConsumerId;
    linkConsumer?: ConsumerId;
  } = $props();
</script>

<Consumer {consumer}>
  <Link consumer={linkConsumer} href="/about">About MemoryCore</Link>
</Consumer>
