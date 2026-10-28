<script lang="ts">
  import { Status, type StatusProps } from '#lib/index.js';

  let {
    consumer,
    label = 'Available',
    size = 'standard',
    tone = 'neutral',
  }: Pick<StatusProps, 'consumer' | 'size' | 'tone'> & {
    label?: string;
  } = $props();
</script>

<Status
  class="custom-status"
  data-example="availability"
  {consumer}
  {size}
  {tone}
>
  {label}
</Status>
