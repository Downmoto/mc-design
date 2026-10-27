<script lang="ts">
  import {
    Button,
    Tooltip,
    type ConsumerId,
    type TooltipSize,
  } from '../../src/lib/index.js';

  let {
    consumer,
    initialOpen = false,
    size = 'standard',
  }: {
    consumer?: ConsumerId;
    initialOpen?: boolean;
    size?: TooltipSize;
  } = $props();

  let open = $state(false);

  $effect(() => {
    open = initialOpen;
  });
</script>

<Tooltip
  content="More information"
  {consumer}
  bind:open
  class="custom-tooltip"
  data-example="information"
  id="example-tooltip"
  {size}
>
  {#snippet trigger(props)}
    <Button {...props} appearance="secondary">Information</Button>
  {/snippet}
</Tooltip>

<output data-testid="open">{open}</output>
