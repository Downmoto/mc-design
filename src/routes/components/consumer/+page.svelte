<script lang="ts">
  import {
    Button,
    Consumer,
    consumerRegistry,
    type ConsumerId,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';
  import PlusIcon from '../../_components/icons/PlusIcon.svelte';

  const consumers = Object.entries(consumerRegistry) as [
    ConsumerId,
    (typeof consumerRegistry)[ConsumerId],
  ][];

  let consumer = $state<ConsumerId>('website');
  let exampleCode = $derived(
    `<Consumer consumer="${consumer}">\n  <Button appearance="link" href="/about">About MemoryCore</Button>\n  <Button>Save changes</Button>\n  <Button size="icon" aria-label="Add item" title="Add item">\n    <PlusIcon />\n  </Button>\n</Consumer>`,
  );

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
    <h2 id="playground-title">Playground</h2>
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
      <label>
        <span>Consumer</span>
        <select value={consumer} onchange={selectConsumer}>
          {#each consumers as [id, details]}
            <option value={id}>{details.name}</option>
          {/each}
        </select>
      </label>
    </form>
  </div>

  <CodeExample code={exampleCode} />
</section>

<section
  class="workbench-section"
  id="variants"
  aria-labelledby="variants-title"
>
  <div class="section-heading">
    <h2 id="variants-title">Registered consumers</h2>
  </div>

  <div class="matrix">
    {#each consumers as [id, details]}
      <Consumer consumer={id}>
        <div class="specimen">
          <span class="specimen__label">{details.name}</span>
          <Button>{details.name}</Button>
        </div>
      </Consumer>
    {/each}
  </div>
</section>

<section class="workbench-section" id="states" aria-labelledby="states-title">
  <div class="section-heading">
    <h2 id="states-title">Precedence</h2>
  </div>

  <div class="matrix">
    <Consumer consumer="website">
      <div class="specimen">
        <span class="specimen__label">Inherited from Consumer</span>
        <Button>Website</Button>
      </div>
    </Consumer>

    <Consumer consumer="website">
      <div class="specimen">
        <span class="specimen__label">Component prop override</span>
        <Button consumer="aetheltool">AethelTool</Button>
      </div>
    </Consumer>

    <Consumer consumer="website">
      <Consumer consumer="dithertool">
        <div class="specimen">
          <span class="specimen__label">Nearest Consumer</span>
          <Button>DitherTool</Button>
        </div>
      </Consumer>
    </Consumer>
  </div>
</section>

<section
  class="workbench-section"
  id="guidance"
  aria-labelledby="guidance-title"
>
  <div class="section-heading">
    <h2 id="guidance-title">Guidance</h2>
  </div>

  <div class="prose-grid">
    <div>
      <h3>Usage</h3>
      <ul>
        <li>Wrap a product region once when its components share a consumer</li>
        <li>Use a component consumer prop for a local override</li>
        <li>
          Nest providers when an interface contains multiple product regions
        </li>
        <li>Omit both APIs for the neutral default</li>
      </ul>
    </div>
    <div>
      <h3>Behaviour</h3>
      <ul>
        <li>Renders its children without an additional element</li>
        <li>Provides the consumer through Svelte context</li>
        <li>Allows the nearest provider to replace an outer provider</li>
        <li>Allows a component prop to replace the inherited consumer</li>
      </ul>
    </div>
  </div>
</section>

<section
  class="workbench-section"
  id="reference"
  aria-labelledby="reference-title"
>
  <div class="section-heading">
    <h2 id="reference-title">Reference</h2>
  </div>

  <details class="reference-details">
    <summary>API reference</summary>
    <div class="reference-details__content">
      <h3>API</h3>
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
              <th scope="row"><code>consumer</code></th>
              <td><code>ConsumerId</code></td>
              <td>Required</td>
              <td>Sets the inherited consumer</td>
            </tr>
            <tr>
              <th scope="row"><code>children</code></th>
              <td><code>Snippet</code></td>
              <td>Required</td>
              <td>Provides the nested component tree</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>
</section>

<style>
  .preview-actions {
    display: flex;
    align-items: center;
    gap: var(--mc-space-2);
  }
</style>
