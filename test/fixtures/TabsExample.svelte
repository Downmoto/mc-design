<script lang="ts">
  import {
    Tabs,
    type ConsumerId,
    type TabItem,
    type TabsSize,
  } from '../../src/lib/index.js';

  let {
    consumer,
    initialValue = 'overview',
    size = 'standard',
    tabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Activity', value: 'activity' },
      { disabled: true, label: 'Settings', value: 'settings' },
    ],
  }: {
    consumer?: ConsumerId;
    initialValue?: string;
    size?: TabsSize;
    tabs?: TabItem[];
  } = $props();

  let value = $state('');

  $effect(() => {
    if (!value) value = initialValue;
  });
</script>

<Tabs
  label="Project sections"
  {tabs}
  {size}
  {consumer}
  bind:value
  class="custom-tabs"
  data-example="project"
>
  {#snippet children(selected)}
    <p>{selected} panel</p>
  {/snippet}
</Tabs>

<output data-testid="value">{value}</output>
