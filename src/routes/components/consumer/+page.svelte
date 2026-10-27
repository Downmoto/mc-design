<script lang="ts">
  import PlusIcon from 'phosphor-svelte/lib/PlusIcon';

  import {
    Button,
    Consumer,
    Select,
    Typography,
    consumerRegistry,
    type ConsumerId,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const consumers = Object.entries(consumerRegistry) as [
    ConsumerId,
    (typeof consumerRegistry)[ConsumerId],
  ][];

  let consumer = $state<ConsumerId>('website');

  function selectConsumer(event: Event): void {
    consumer = (event.currentTarget as HTMLSelectElement).value as ConsumerId;
  }
</script>

<svelte:head>
  <title>Consumer · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Configuration"
  title="Consumer"
  description="Provides one registered consumer theme to every nested library component without adding a wrapper element"
/>

<section
  class="workbench-section"
  id="playground"
  aria-labelledby="playground-title"
>
  <div class="section-heading">
    <Typography id="playground-title" variant="h2">Playground</Typography>
  </div>

  <div class="playground">
    <div class="playground__preview">
      <Consumer {consumer}>
        <div class="preview-actions">
          <Button appearance="link" href="#main-content">
            About MemoryCore
          </Button>
          <Button>Save changes</Button>
          <Button size="icon" aria-label="Add item" title="Add item">
            <PlusIcon />
          </Button>
        </div>
      </Consumer>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <Select label="Consumer" value={consumer} onchange={selectConsumer}>
        {#each consumers as [id, details]}
          <option value={id}>{details.name}</option>
        {/each}
      </Select>
    </form>
  </div>
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
        <li>Wrap a product region once when its components share a consumer</li>
        <li>Use a component consumer prop for a local override</li>
        <li>
          Nest providers when an interface contains multiple product regions
        </li>
        <li>Omit both APIs for the neutral default</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Behaviour</Typography>
      <Typography variant="list">
        <li>Renders its children without an additional element</li>
        <li>Provides the consumer through Svelte context</li>
        <li>Allows the nearest provider to replace an outer provider</li>
        <li>Allows a component prop to replace the inherited consumer</li>
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
    aria-label="Consumer API table"
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
            ><Typography variant="inline-code">consumer</Typography></th
          >
          <td><Typography variant="inline-code">ConsumerId</Typography></td>
          <td>Required</td>
          <td>Sets the inherited consumer</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">children</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Required</td>
          <td>Provides the nested component tree</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<style>
  .preview-actions {
    display: flex;
    align-items: center;
    gap: var(--mc-space-2);
  }
</style>
