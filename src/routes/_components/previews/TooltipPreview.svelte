<script lang="ts">
  import InfoIcon from 'phosphor-svelte/lib/InfoIcon';

  import { Button, Tooltip } from '#lib/index.js';
</script>

<Tooltip content="More information" size="compact">
  {#snippet trigger(props)}
    <Button
      {...props}
      appearance="secondary"
      size="icon-compact"
      aria-label="Info"
    >
      <InfoIcon />
    </Button>
  {/snippet}
</Tooltip>
