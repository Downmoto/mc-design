<script lang="ts">
  import {
    Button,
    Panel,
    PanelContent,
    PanelFooter,
    PanelHeader,
  } from '../../src/lib/index.js';

  let {
    showContent = true,
    showFooter = true,
    showHeader = true,
  }: {
    showContent?: boolean;
    showFooter?: boolean;
    showHeader?: boolean;
  } = $props();
</script>

<Panel aria-label="Layer properties" class="custom-panel" data-example="layer">
  {#if showHeader}
    <PanelHeader><h2>Layer properties</h2></PanelHeader>
  {/if}
  {#if showContent}
    <PanelContent><p>Opacity and blend controls</p></PanelContent>
  {/if}
  {#if showFooter}
    <PanelFooter><Button size="compact">Apply</Button></PanelFooter>
  {/if}
</Panel>
