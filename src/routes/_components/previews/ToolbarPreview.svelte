<script lang="ts">
  import UndoIcon from 'phosphor-svelte/lib/ArrowCounterClockwiseIcon';
  import RedoIcon from 'phosphor-svelte/lib/ArrowClockwiseIcon';
  import BoldIcon from 'phosphor-svelte/lib/TextBIcon';

  import { ActionGroup, Button, Toggle, Toolbar } from '#lib/index.js';

  let bold = $state(true);
</script>

<Toolbar aria-label="Document tools" variant="surface">
  <ActionGroup joined aria-label="History">
    <Button appearance="ghost" size="icon-compact" aria-label="Undo">
      <UndoIcon />
    </Button>
    <Button appearance="ghost" size="icon-compact" aria-label="Redo">
      <RedoIcon />
    </Button>
  </ActionGroup>
  <Toggle size="icon-compact" aria-label="Bold" bind:pressed={bold}>
    <BoldIcon />
  </Toggle>
</Toolbar>
