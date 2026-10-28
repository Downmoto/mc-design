<script lang="ts">
  import UndoIcon from 'phosphor-svelte/lib/ArrowCounterClockwiseIcon';
  import RedoIcon from 'phosphor-svelte/lib/ArrowClockwiseIcon';
  import TrashIcon from 'phosphor-svelte/lib/TrashIcon';

  import {
    ActionGroup,
    Button,
    Toolbar,
    type ToolbarOrientation,
    type ToolbarVariant,
  } from '../../src/lib/index.js';

  let {
    orientation = 'horizontal',
    variant = 'ghost',
  }: {
    orientation?: ToolbarOrientation;
    variant?: ToolbarVariant;
  } = $props();
</script>

<Toolbar
  aria-label="Document tools"
  {orientation}
  {variant}
  class="custom-toolbar"
  data-example="document"
>
  <ActionGroup joined aria-label="History">
    <Button appearance="ghost" size="icon" aria-label="Undo">
      <UndoIcon />
    </Button>
    <Button appearance="ghost" size="icon" aria-label="Redo" disabled>
      <RedoIcon />
    </Button>
  </ActionGroup>
  <Button appearance="ghost" size="icon" aria-label="Delete">
    <TrashIcon />
  </Button>
</Toolbar>
