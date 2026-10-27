<script lang="ts">
  import { Button, Menu, MenuItem } from '#lib/index.js';
</script>

<Menu size="compact">
  {#snippet trigger(props)}
    <Button {...props} appearance="secondary" size="compact">Actions</Button>
  {/snippet}
  <MenuItem>Rename</MenuItem>
  <MenuItem>Duplicate</MenuItem>
</Menu>
