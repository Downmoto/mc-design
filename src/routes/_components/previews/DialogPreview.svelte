<script lang="ts">
  import { Button, Dialog, Typography } from '#lib/index.js';

  let open = $state(false);
</script>

<Button appearance="secondary" size="compact" onclick={() => (open = true)}>
  Open preview
</Button>

<Dialog bind:open size="small" title="Resource preview">
  <Typography>Review a resource without leaving the current page</Typography>
</Dialog>
