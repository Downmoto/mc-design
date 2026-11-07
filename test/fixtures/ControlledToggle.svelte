<script lang="ts">
  import { Toggle } from '../../src/lib/index.js';

  let pressed = $state(false);
</script>

<Toggle {pressed} onclick={() => (pressed = true)}>Bold</Toggle>
<output data-testid="pressed">{pressed}</output>
