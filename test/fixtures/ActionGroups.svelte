<script lang="ts">
  import { ActionGroup, Button } from '../../src/lib/index.js';
</script>

<ActionGroup aria-label="Document actions" data-testid="outer">
  <ActionGroup joined aria-label="History">
    <Button appearance="secondary">Undo</Button>
    <Button appearance="secondary">Redo</Button>
  </ActionGroup>
  <ActionGroup joined aria-label="File actions">
    <Button>Save</Button>
    <Button appearance="secondary">Export</Button>
  </ActionGroup>
</ActionGroup>
