<script lang="ts">
  import CheckIcon from 'phosphor-svelte/lib/CheckIcon';

  import { Badge, type BadgeProps } from '#lib/index.js';

  let {
    consumer,
    size = 'standard',
    tone = 'neutral',
    withIcon = false,
  }: Pick<BadgeProps, 'consumer' | 'size' | 'tone'> & {
    withIcon?: boolean;
  } = $props();
</script>

<Badge
  class="custom-badge"
  data-example="release"
  {consumer}
  {size}
  {tone}
  leadingIcon={withIcon ? icon : undefined}
>
  Released
</Badge>

{#snippet icon()}
  <CheckIcon />
{/snippet}
