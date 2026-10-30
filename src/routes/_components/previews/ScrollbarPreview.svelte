<script lang="ts">
  import { Scrollbar } from '#lib/index.js';

  const items = ['Overview', 'Projects', 'Resources', 'Settings'];
</script>

<Scrollbar>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable region needs keyboard focus) -->
  <div
    class="scrollbar-preview"
    role="region"
    tabindex="0"
    aria-label="Scrollable sections"
  >
    {#each items as item}
      <div>{item}</div>
    {/each}
  </div>
</Scrollbar>

<style>
  .scrollbar-preview {
    box-sizing: border-box;
    inline-size: 100%;
    max-inline-size: calc(var(--mc-space-9) * 2);
    block-size: var(--mc-space-8);
    padding: var(--mc-space-2);
    overflow: auto;
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-1);
  }

  .scrollbar-preview > div {
    min-block-size: var(--mc-size-control-compact);
  }
</style>
