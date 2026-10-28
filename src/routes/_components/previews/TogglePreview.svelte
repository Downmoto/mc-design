<script lang="ts">
  import BoldIcon from 'phosphor-svelte/lib/TextBIcon';

  import { Toggle } from '#lib/index.js';

  let pressed = $state(true);
</script>

<Toggle
  appearance="secondary"
  size="icon-compact"
  aria-label="Bold"
  bind:pressed
>
  <BoldIcon />
</Toggle>
