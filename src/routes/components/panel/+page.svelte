<script lang="ts">
  import {
    Button,
    Card,
    CardContent,
    CardHero,
    Checkbox,
    Panel,
    PanelContent,
    PanelFooter,
    PanelHeader,
    Typography,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let showHeader = $state(true);
  let showContent = $state(true);
  let showFooter = $state(true);
</script>

<svelte:head>
  <title>Panel · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Structure"
  title="Panel"
  description="Fills a workspace region with persistent header and footer areas around scrolling content"
/>

<section
  class="workbench-section"
  id="playground"
  aria-labelledby="playground-title"
>
  <div class="section-heading">
    <Typography id="playground-title" variant="h2">Playground</Typography>
  </div>

  <Card class="playground" orientation="horizontal">
    <CardHero class="playground__preview">
      <div class="panel-frame">
        <Panel aria-label="Layer properties">
          {#if showHeader}
            <PanelHeader>
              <Typography variant="h3">Layer properties</Typography>
            </PanelHeader>
          {/if}
          {#if showContent}
            <PanelContent>
              <Typography>
                Configure the selected layer without leaving the workspace
              </Typography>
            </PanelContent>
          {/if}
          {#if showFooter}
            <PanelFooter>
              <Button appearance="secondary" size="compact">Reset</Button>
              <Button size="compact">Apply</Button>
            </PanelFooter>
          {/if}
        </Panel>
      </div>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <Checkbox label="Header" size="compact" bind:checked={showHeader} />
        <Checkbox label="Content" size="compact" bind:checked={showContent} />
        <Checkbox label="Footer" size="compact" bind:checked={showFooter} />
      </form>
    </CardContent>
  </Card>
</section>

<section
  class="workbench-section"
  id="guidance"
  aria-labelledby="guidance-title"
>
  <div class="section-heading">
    <Typography id="guidance-title" variant="h2">Guidance</Typography>
  </div>

  <div class="prose-grid">
    <div>
      <Typography variant="h3">Composition</Typography>
      <Typography variant="list">
        <li>Use any combination of header, content, and footer</li>
        <li>Use the header for a concise title and local actions</li>
        <li>Place scrollable workspace content in PanelContent</li>
        <li>Use the footer for persistent actions or concise status</li>
        <li>Let the surrounding workspace provide the exterior boundary</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Give meaningful standalone panels an accessible name</li>
        <li>Use heading levels that follow the surrounding document</li>
        <li>Keep actions in logical source and focus order</li>
        <li>Scrolling content remains keyboard reachable</li>
        <li>Forced-colour mode preserves boundaries and separators</li>
      </Typography>
    </div>
  </div>
</section>

<section
  class="workbench-section"
  id="reference"
  aria-labelledby="reference-title"
>
  <div class="section-heading">
    <Typography id="reference-title" variant="h2">Reference</Typography>
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
  <div
    class="table-scroll"
    role="region"
    aria-label="Panel API table"
    tabindex="0"
  >
    <table>
      <thead>
        <tr>
          <th scope="col">Component</th>
          <th scope="col">Element</th>
          <th scope="col">Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">Panel</Typography></th
          >
          <td><Typography variant="inline-code">section</Typography></td>
          <td>Fills the available workspace region</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">PanelHeader</Typography></th
          >
          <td><Typography variant="inline-code">header</Typography></td>
          <td>Provides an optional title and local actions</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">PanelContent</Typography></th
          >
          <td><Typography variant="inline-code">div</Typography></td>
          <td>Provides optional flexible scrolling content</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">PanelFooter</Typography></th
          >
          <td><Typography variant="inline-code">footer</Typography></td>
          <td>Provides optional persistent actions or status</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Each component accepts its native attributes and optional children
  </Typography>
</section>

<style>
  .panel-frame {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
    min-block-size: calc(var(--mc-size-control-large) * 5);
    overflow: hidden;
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
  }
</style>
