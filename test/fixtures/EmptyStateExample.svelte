<script lang="ts">
  import { EmptyState } from '../../src/lib/index.js';

  let {
    withActions = true,
    withDescription = true,
    withIcon = true,
  }: {
    withActions?: boolean;
    withDescription?: boolean;
    withIcon?: boolean;
  } = $props();
</script>

{#snippet icon()}
  <svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /></svg>
{/snippet}

{#snippet description()}Create a resource to get started{/snippet}

{#snippet actions()}<button type="button">Create resource</button>{/snippet}

<EmptyState
  actions={withActions ? actions : undefined}
  children={withDescription ? description : undefined}
  class="custom-empty-state"
  data-example="resources"
  leadingIcon={withIcon ? icon : undefined}
  title="No resources"
/>
