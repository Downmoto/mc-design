<script lang="ts">
  import {
    Card,
    CardContent,
    CardHero,
    Checkbox,
    Select,
    Table,
    Typography,
    type TableSize,
    type TableVariant,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const components = [
    { category: 'Actions', name: 'Button', sizes: 4, version: '1.0' },
    { category: 'Structure', name: 'Card', sizes: 2, version: '1.0' },
    { category: 'Structure', name: 'Table', sizes: 2, version: '1.0' },
  ];

  let size = $state<TableSize>('standard');
  let variant = $state<TableVariant>('divided');
  let showCaption = $state(true);
  let showFooter = $state(false);
</script>

<svelte:head>
  <title>Table · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Structure"
  title="Table"
  description="Compares structured values across labelled columns"
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
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll table-sample-scroll"
        role="region"
        aria-label="Component release status table"
        tabindex="0"
      >
        <Table class="table-sample" {size} {variant}>
          {#if showCaption}<caption>Component release status</caption>{/if}
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Category</th>
              <th scope="col">Sizes</th>
              <th scope="col">Version</th>
            </tr>
          </thead>
          <tbody>
            {#each components as component}
              <tr>
                <th scope="row">{component.name}</th>
                <td>{component.category}</td>
                <td>{component.sizes}</td>
                <td>{component.version}</td>
              </tr>
            {/each}
          </tbody>
          {#if showFooter}
            <tfoot>
              <tr>
                <th scope="row" colspan="3">Components</th>
                <td>{components.length}</td>
              </tr>
            </tfoot>
          {/if}
        </Table>
      </div>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <Select label="Variant" bind:value={variant}>
          <option value="plain">Plain</option>
          <option value="divided">Divided</option>
        </Select>
        <Select label="Size" bind:value={size}>
          <option value="standard">Standard</option>
          <option value="compact">Compact</option>
        </Select>
        <Checkbox label="Caption" size="compact" bind:checked={showCaption} />
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
      <Typography variant="h3">Usage</Typography>
      <Typography variant="list">
        <li>Use Table to compare values across consistent columns</li>
        <li>Use Plain in open layouts and Divided for contained data</li>
        <li>Use Compact when dense data benefits from reduced cell padding</li>
        <li>Keep column order meaningful at narrow widths</li>
        <li>Use List when content does not require column comparison</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>
          Provide a caption when surrounding context does not name the table
        </li>
        <li>Use th with scope col or row for every header</li>
        <li>Keep related values in the same row</li>
        <li>Do not communicate meaning through colour alone</li>
        <li>Wrap wide tables in a labelled keyboard-scrollable region</li>
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
    aria-label="Table API table"
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
            ><Typography variant="inline-code">variant</Typography></th
          >
          <td
            ><Typography variant="inline-code">'plain' | 'divided'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'plain'</Typography></td>
          <td>Controls surface containment</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">size</Typography></th
          >
          <td
            ><Typography variant="inline-code"
              >'standard' | 'compact'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'standard'</Typography></td>
          <td>Controls cell density</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Table accepts native table attributes and requires children
  </Typography>
</section>

<style>
  .table-sample-scroll {
    inline-size: min(100%, var(--mc-size-reading-maximum));
  }

  :global(.table-sample) {
    min-inline-size: max-content;
  }
</style>
