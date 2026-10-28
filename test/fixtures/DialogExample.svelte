<script lang="ts">
  import { Button, Dialog, type DialogProps } from '#lib/index.js';

  let {
    consumer,
    dismissible = true,
    size = 'medium',
  }: Pick<DialogProps, 'consumer' | 'dismissible' | 'size'> = $props();

  let open = $state(false);
  let closeCount = $state(0);
</script>

{#snippet footer()}
  <Button appearance="secondary" onclick={() => (open = false)}>Cancel</Button>
  <Button onclick={() => (open = false)}>Continue</Button>
{/snippet}

<Button onclick={() => (open = true)}>Open dialog</Button>

<Dialog
  class="custom-dialog"
  data-example="preview"
  {consumer}
  description="Review the details before continuing."
  {dismissible}
  {footer}
  onclose={() => (closeCount += 1)}
  bind:open
  {size}
  title="Preview resource"
>
  The selected resource opens in a focused preview.
</Dialog>

<span data-testid="open">{open}</span>
<span data-testid="close-count">{closeCount}</span>
