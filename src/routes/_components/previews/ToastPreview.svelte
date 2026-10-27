<script lang="ts">
  import CheckCircleIcon from 'phosphor-svelte/lib/CheckCircleIcon';

  import { Toast } from '#lib/index.js';
</script>

{#snippet successIcon()}<CheckCircleIcon />{/snippet}

<Toast
  dismissible={false}
  leadingIcon={successIcon}
  size="compact"
  timeout={0}
  tone="success"
>
  Changes saved
</Toast>
