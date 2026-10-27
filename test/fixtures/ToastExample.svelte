<script lang="ts">
  import CheckCircleIcon from 'phosphor-svelte/lib/CheckCircleIcon';

  import { Toast, type ToastProps } from '#lib/index.js';

  let {
    consumer,
    dismissible = true,
    size = 'standard',
    timeout = 0,
    tone = 'neutral',
    withIcon = false,
  }: Pick<
    ToastProps,
    'consumer' | 'dismissible' | 'size' | 'timeout' | 'tone'
  > & {
    withIcon?: boolean;
  } = $props();

  let open = $state(true);
  let closeCount = $state(0);
</script>

{#snippet successIcon()}<CheckCircleIcon />{/snippet}

<Toast
  class="custom-toast"
  data-example="saved"
  {consumer}
  {dismissible}
  leadingIcon={withIcon ? successIcon : undefined}
  onclose={() => (closeCount += 1)}
  bind:open
  {size}
  {timeout}
  title="Project saved"
  {tone}
>
  The latest changes are available.
</Toast>

<span data-testid="open">{open}</span>
<span data-testid="close-count">{closeCount}</span>
