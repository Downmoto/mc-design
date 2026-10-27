<script lang="ts">
  import {
    Disclosure,
    type ConsumerId,
    type DisclosureSize,
  } from '../../src/lib/index.js';

  let {
    consumer,
    initialOpen = false,
    size = 'standard',
  }: {
    consumer?: ConsumerId;
    initialOpen?: boolean;
    size?: DisclosureSize;
  } = $props();

  let open = $state(false);

  $effect(() => {
    open = initialOpen;
  });
</script>

<Disclosure
  summary="Project details"
  {consumer}
  {size}
  bind:open
  class="custom-disclosure"
  data-example="project"
>
  <p>Project content</p>
</Disclosure>

<output data-testid="open">{open}</output>
