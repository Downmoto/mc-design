<script lang="ts">
  import InfoIcon from 'phosphor-svelte/lib/InfoIcon';

  import { Alert } from '#lib/index.js';
</script>

{#snippet infoIcon()}<InfoIcon />{/snippet}

<Alert leadingIcon={infoIcon} size="compact" tone="info">Changes saved</Alert>
