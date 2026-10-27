<script lang="ts">
  import InfoIcon from 'phosphor-svelte/lib/InfoIcon';

  import { Alert, type AlertProps } from '#lib/index.js';

  let {
    consumer,
    role,
    size = 'standard',
    title = 'Project updated',
    tone = 'neutral',
    withIcon = false,
  }: Pick<AlertProps, 'consumer' | 'role' | 'size' | 'title' | 'tone'> & {
    withIcon?: boolean;
  } = $props();
</script>

{#snippet infoIcon()}<InfoIcon />{/snippet}

<Alert
  class="custom-alert"
  data-example="project"
  {consumer}
  leadingIcon={withIcon ? infoIcon : undefined}
  {role}
  {size}
  {title}
  {tone}
>
  The new settings are available to everyone.
</Alert>
