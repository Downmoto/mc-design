<script lang="ts">
  import {
    Button,
    Consumer,
    IconButton,
    type ConsumerId,
  } from '../../src/lib/index.js';

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
  <IconButton label="Add item">
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2v12M2 8h12" />
    </svg>
  </IconButton>
</Consumer>
