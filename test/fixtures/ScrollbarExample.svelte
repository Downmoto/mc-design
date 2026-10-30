<script lang="ts">
  import { Scrollbar } from '../../src/lib/index.js';
</script>

<Scrollbar>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable region needs keyboard focus) -->
  <div
    data-testid="scroll-region"
    role="region"
    aria-label="Scrollable content"
    tabindex="0"
  >
    Scrollable content
  </div>
</Scrollbar>
