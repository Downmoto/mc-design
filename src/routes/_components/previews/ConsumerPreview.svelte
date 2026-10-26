<script lang="ts">
  import { Button, Consumer } from '#lib/index.js';
</script>

<div class="consumer-preview">
  <Consumer consumer="website">
    <Button size="compact">Website</Button>
  </Consumer>
  <Consumer consumer="dithertool">
    <Button size="compact">DitherTool</Button>
  </Consumer>
  <Consumer consumer="aetheltool">
    <Button size="compact">AethelTool</Button>
  </Consumer>
</div>

<style>
  .consumer-preview {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--mc-space-2);
  }
</style>
