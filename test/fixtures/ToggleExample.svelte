<script lang="ts">
  import BoldIcon from 'phosphor-svelte/lib/TextBIcon';

  import { Toggle, type ToggleAppearance } from '../../src/lib/index.js';

  let {
    appearance = 'ghost',
    disabled = false,
  }: { appearance?: ToggleAppearance; disabled?: boolean } = $props();
  let pressed = $state(false);
</script>

<Toggle
  bind:pressed
  {appearance}
  {disabled}
  class="custom-toggle"
  data-example="bold"
>
  Bold
</Toggle>
<Toggle size="icon" aria-label="Bold icon" bind:pressed {appearance}>
  <BoldIcon />
</Toggle>
<output data-testid="pressed">{pressed}</output>
