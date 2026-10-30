<script lang="ts">
  import {
    Card,
    CardContent,
    CardHero,
    Scrollbar,
    Typography,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const sections = [
    'Overview',
    'Projects',
    'Resources',
    'Recent activity',
    'Shared with MemoryCore',
    'Archived work',
    'Settings',
  ];
</script>

<svelte:head>
  <title>Scrollbar · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Configuration"
  title="Scrollbar"
  description="Applies shared scrollbar styling to every nested scroll container"
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
      <Scrollbar>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable region needs keyboard focus) -->
        <div
          class="scrollbar-example"
          role="region"
          aria-label="Scrollable navigation example"
          tabindex="0"
        >
          {#each sections as section}
            <div class="scrollbar-example__item">{section}</div>
          {/each}
        </div>
      </Scrollbar>
    </CardHero>

    <CardContent class="playground__controls">
      <div class="scrollbar-summary">
        <Typography variant="h3">One provider, every descendant</Typography>
        <Typography>
          Nested elements keep their native overflow behaviour while sharing the
          same scrollbar treatment
        </Typography>
      </div>
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
      <Typography variant="h3">Usage</Typography>
      <Typography variant="list">
        <li>Wrap an application shell or a smaller product region once</li>
        <li>Keep overflow and sizing on the elements that actually scroll</li>
        <li>
          Nest providers freely when composed regions require the same style
        </li>
        <li>Import the shared stylesheet before using the provider</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Behaviour</Typography>
      <Typography variant="list">
        <li>Applies to the provider's full descendant tree</li>
        <li>Leaves document layout and overflow ownership unchanged</li>
        <li>Styles Firefox, Chromium, and Safari scrollbar interfaces</li>
        <li>Returns control to system colours in forced-colour modes</li>
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
    aria-label="Scrollbar API table"
    tabindex="0"
  >
    <table>
      <thead>
        <tr>
          <th scope="col">Property</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
          <th scope="col">Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">children</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Required</td>
          <td>Provides the nested content tree</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<style>
  .scrollbar-example {
    box-sizing: border-box;
    inline-size: 100%;
    max-inline-size: calc(var(--mc-space-9) * 3);
    block-size: calc(var(--mc-space-8) * 3);
    padding: var(--mc-space-3);
    overflow: auto;
    background: var(--mc-colour-background);
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-1);
  }

  .scrollbar-example:focus-visible {
    outline: var(--mc-border-width-emphasised) solid
      var(--mc-colour-interactive);
    outline-offset: calc(var(--mc-border-width-emphasised) * -1);
  }

  .scrollbar-example__item {
    display: flex;
    align-items: center;
    min-block-size: var(--mc-size-control-standard);
    padding-inline: var(--mc-space-3);
    border-radius: var(--mc-radius-1);
  }

  .scrollbar-example__item:nth-child(odd) {
    background: var(--mc-colour-surface);
  }

  .scrollbar-summary {
    display: grid;
    gap: var(--mc-space-2);
    align-content: center;
    block-size: 100%;
  }
</style>
