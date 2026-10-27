<script lang="ts">
  import TagIcon from 'phosphor-svelte/lib/TagIcon';

  import { Badge } from '#lib/index.js';
</script>

{#snippet tagIcon()}<TagIcon />{/snippet}

<Badge leadingIcon={tagIcon} size="compact" tone="accent">New</Badge>
