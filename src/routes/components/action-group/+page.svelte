<script lang="ts">
  import {
    ActionGroup,
    Button,
    type ActionGroupOrientation,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';
  import PlusIcon from '../../_components/icons/PlusIcon.svelte';

  let joined = $state(true);
  let orientation = $state<ActionGroupOrientation>('horizontal');
  let activation = $state('None');
  let exampleCode = $derived(
    `<ActionGroup${joined ? ' joined' : ''} orientation="${orientation}" aria-label="Document actions">\n  <Button appearance="secondary">Save</Button>\n  <Button appearance="secondary">Export</Button>\n  <Button appearance="secondary">Share</Button>\n</ActionGroup>`,
  );

  function selectOrientation(event: Event): void {
    orientation = (event.currentTarget as HTMLSelectElement)
      .value as ActionGroupOrientation;
  }
</script>

<svelte:head>
  <title>Action group · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Actions"
  title="Action group"
  description="Arranges related actions as spaced clusters or a connected control while preserving each action's native behaviour"
  sections={['playground', 'variants', 'guidance', 'reference']}
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
      <ActionGroup {joined} {orientation} aria-label="Document actions">
        <Button appearance="secondary" onclick={() => (activation = 'Save')}
          >Save</Button
        >
        <Button appearance="secondary" onclick={() => (activation = 'Export')}
          >Export</Button
        >
        <Button appearance="secondary" onclick={() => (activation = 'Share')}
          >Share</Button
        >
      </ActionGroup>
      <p class="interaction-result" aria-live="polite">
        Last action: {activation}
      </p>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <label>
        <span>Orientation</span>
        <select value={orientation} onchange={selectOrientation}>
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" bind:checked={joined} />
        <span>Join controls</span>
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
    <h2 id="variants-title">Variants</h2>
  </div>

  <div class="variant-group">
    <h3>Separated and joined</h3>
    <div class="matrix">
      <div class="variant-example">
        <div class="specimen">
          <span class="specimen__label">Separated</span>
          <ActionGroup aria-label="Editing actions">
            <Button>Edit</Button>
            <Button appearance="secondary">Duplicate</Button>
            <Button appearance="secondary">Delete</Button>
          </ActionGroup>
        </div>
        <CodeExample
          code={'<ActionGroup aria-label="Editing actions">\n  <Button>Edit</Button>\n  <Button appearance="secondary">Duplicate</Button>\n  <Button appearance="secondary">Delete</Button>\n</ActionGroup>'}
        />
      </div>
      <div class="variant-example">
        <div class="specimen">
          <span class="specimen__label">Joined</span>
          <ActionGroup joined aria-label="Pagination">
            <Button appearance="secondary">Previous</Button>
            <Button appearance="secondary">Next</Button>
          </ActionGroup>
        </div>
        <CodeExample
          code={'<ActionGroup joined aria-label="Pagination">\n  <Button appearance="secondary">Previous</Button>\n  <Button appearance="secondary">Next</Button>\n</ActionGroup>'}
        />
      </div>
    </div>
  </div>

  <div class="variant-group">
    <h3>Nested clusters</h3>
    <div class="matrix">
      <div class="variant-example">
        <div class="specimen">
          <span class="specimen__label">Joined and separated clusters</span>
          <ActionGroup aria-label="Canvas actions">
            <ActionGroup joined aria-label="History">
              <Button appearance="secondary" size="compact">Undo</Button>
              <Button appearance="secondary" size="compact">Redo</Button>
            </ActionGroup>
            <ActionGroup aria-label="Zoom">
              <Button
                appearance="secondary"
                aria-label="Zoom in"
                size="icon-compact"
                title="Zoom in"
              >
                <PlusIcon />
              </Button>
              <Button appearance="secondary" size="compact">Reset</Button>
            </ActionGroup>
          </ActionGroup>
        </div>
        <CodeExample
          code={'<ActionGroup aria-label="Canvas actions">\n  <ActionGroup joined aria-label="History">\n    <Button appearance="secondary" size="compact">Undo</Button>\n    <Button appearance="secondary" size="compact">Redo</Button>\n  </ActionGroup>\n  <ActionGroup aria-label="Zoom">\n    <Button\n      appearance="secondary"\n      aria-label="Zoom in"\n      size="icon-compact"\n      title="Zoom in"\n    >\n      <PlusIcon />\n    </Button>\n    <Button appearance="secondary" size="compact">Reset</Button>\n  </ActionGroup>\n</ActionGroup>'}
        />
      </div>
      <div class="variant-example">
        <div class="specimen">
          <span class="specimen__label">Vertical</span>
          <ActionGroup joined orientation="vertical" aria-label="Move item">
            <Button appearance="secondary" size="compact">Move up</Button>
            <Button appearance="secondary" size="compact">Move down</Button>
          </ActionGroup>
        </div>
        <CodeExample
          code={'<ActionGroup joined orientation="vertical" aria-label="Move item">\n  <Button appearance="secondary" size="compact">Move up</Button>\n  <Button appearance="secondary" size="compact">Move down</Button>\n</ActionGroup>'}
        />
      </div>
    </div>
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
        <li>Use the default group for related actions with visible spacing</li>
        <li>Use <code>joined</code> for a compact, connected control</li>
        <li>Nest joined groups inside a default group to separate clusters</li>
        <li>Give controls in one joined group the same size</li>
        <li>Keep joined groups short enough to reflow at 320 CSS px</li>
        <li>Use Button appearances other than Link in joined groups</li>
      </ul>
    </div>
    <div>
      <h3>Accessibility</h3>
      <ul>
        <li>Uses <code>role="group"</code> to expose related actions</li>
        <li>
          Provide a concise accessible label when the relationship needs one
        </li>
        <li>Tab moves through each action in document order</li>
        <li>Joined presentation does not add arrow-key navigation</li>
        <li>Each child action keeps its own name, state, and behaviour</li>
        <li>Use Toolbar for composite-control keyboard behaviour</li>
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
    <summary>API and token reference</summary>
    <div class="reference-details__content">
      <h3>API</h3>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Action group API table"
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
              <th scope="row"><code>joined</code></th>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Connects direct Button children</td>
            </tr>
            <tr>
              <th scope="row"><code>orientation</code></th>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'horizontal'</code></td>
              <td>Sets the layout direction</td>
            </tr>
            <tr>
              <th scope="row"><code>children</code></th>
              <td><code>Snippet</code></td>
              <td>Required</td>
              <td>Provides actions or nested action groups</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="table-note">
        Native div attributes, including accessible labels and event handlers,
        pass through
      </p>

      <h3>Token mapping</h3>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Action group token mapping table"
        tabindex="0"
      >
        <table>
          <thead>
            <tr><th scope="col">Role</th><th scope="col">Token</th></tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Separated gap</th>
              <td><code>space-2</code></td>
            </tr>
            <tr>
              <th scope="row">Nested separated gap</th>
              <td><code>space-1</code></td>
            </tr>
            <tr>
              <th scope="row">Joined shape</th>
              <td><code>radius-1</code></td>
            </tr>
            <tr>
              <th scope="row">Joined boundary overlap</th>
              <td><code>border-width-emphasised</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>
</section>
