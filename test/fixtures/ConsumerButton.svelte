<script lang="ts">
  import { Button, Consumer, type ConsumerId } from '../../src/lib/index.js';

  let {
    buttonConsumer,
    consumer,
  }: {
    buttonConsumer?: ConsumerId;
    consumer: ConsumerId;
  } = $props();
</script>

<Consumer {consumer}>
  <Button consumer={buttonConsumer}>Save changes</Button>
  <Button size="icon" aria-label="Add item" title="Add item">
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2v12M2 8h12" />
    </svg>
  </Button>
  <Button appearance="link" href="/about">About MemoryCore</Button>
</Consumer>
