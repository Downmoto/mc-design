<script lang="ts">
  import { Tabs } from '#lib/index.js';

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Activity', value: 'activity' },
  ];
</script>

<Tabs label="Project sections" {tabs} value="overview" size="compact">
  {#snippet children(selected)}
    <span>{selected === 'overview' ? 'Project summary' : 'Recent changes'}</span
    >
  {/snippet}
</Tabs>
