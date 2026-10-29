<script lang="ts">
  import FolderOpenIcon from 'phosphor-svelte/lib/FolderOpenIcon';

  import { EmptyState } from '#lib/index.js';
</script>

{#snippet folderIcon()}<FolderOpenIcon />{/snippet}

<EmptyState leadingIcon={folderIcon} title="No resources">
  Create a resource to get started
</EmptyState>
