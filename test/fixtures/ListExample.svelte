<script lang="ts">
  import {
    Badge,
    List,
    ListItem,
    type ListSize,
    type ListVariant,
  } from '../../src/lib/index.js';

  let {
    size = 'standard',
    nested = false,
    variant = 'plain',
    withRegions = true,
  }: {
    size?: ListSize;
    nested?: boolean;
    variant?: ListVariant;
    withRegions?: boolean;
  } = $props();
</script>

<List class="custom-list" data-example="resources" {size} {variant}>
  <ListItem
    class="custom-list-item"
    data-resource="guide"
    leading={withRegions ? leading : undefined}
    trailing={withRegions ? trailing : undefined}
  >
    <span>Design guide</span>
    {#if nested}
      <List size="compact">
        <ListItem><span>Foundations</span></ListItem>
        <ListItem><span>Components</span></ListItem>
      </List>
    {/if}
  </ListItem>
  <ListItem><span>Component reference</span></ListItem>
</List>

{#snippet leading()}
  <Badge size="compact">New</Badge>
{/snippet}

{#snippet trailing()}
  <span>4 min</span>
{/snippet}
