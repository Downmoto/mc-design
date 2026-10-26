<script lang="ts">
  import PlusIcon from 'phosphor-svelte/lib/PlusIcon';

  import {
    ActionGroup,
    Button,
    Checkbox,
    Select,
    Typography,
    type ActionGroupOrientation,
  } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

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
    <Typography id="playground-title" variant="h2">Playground</Typography>
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
      <Typography class="interaction-result" aria-live="polite">
        Last action: {activation}
      </Typography>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <Select
        label="Orientation"
        value={orientation}
        onchange={selectOrientation}
      >
        <option value="horizontal">Horizontal</option>
        <option value="vertical">Vertical</option>
      </Select>
      <Checkbox label="Join controls" size="compact" bind:checked={joined} />
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
    <Typography id="variants-title" variant="h2">Variants</Typography>
  </div>

  <div class="variant-group">
    <Typography variant="h3">Separated and joined</Typography>
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
    <Typography variant="h3">Nested clusters</Typography>
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
    <Typography id="guidance-title" variant="h2">Guidance</Typography>
  </div>

  <div class="prose-grid">
    <div>
      <Typography variant="h3">Usage</Typography>
      <Typography variant="list">
        <li>Use the default group for related actions with visible spacing</li>
        <li>
          Use <Typography variant="inline-code">joined</Typography> for a compact,
          connected control
        </li>
        <li>Nest joined groups inside a default group to separate clusters</li>
        <li>Give controls in one joined group the same size</li>
        <li>Keep joined groups short enough to reflow at 320 CSS px</li>
        <li>Use Button appearances other than Link in joined groups</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>
          Uses <Typography variant="inline-code">role="group"</Typography> to expose
          related actions
        </li>
        <li>
          Provide a concise accessible label when the relationship needs one
        </li>
        <li>Tab moves through each action in document order</li>
        <li>Joined presentation does not add arrow-key navigation</li>
        <li>Each child action keeps its own name, state, and behaviour</li>
        <li>Use Toolbar for composite-control keyboard behaviour</li>
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

  <details class="reference-details">
    <summary>API and token reference</summary>
    <div class="reference-details__content">
      <Typography variant="h3">API</Typography>
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
              <th scope="row"
                ><Typography variant="inline-code">joined</Typography></th
              >
              <td><Typography variant="inline-code">boolean</Typography></td>
              <td><Typography variant="inline-code">false</Typography></td>
              <td>Connects direct Button children</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">orientation</Typography></th
              >
              <td
                ><Typography variant="inline-code"
                  >'horizontal' | 'vertical'</Typography
                ></td
              >
              <td
                ><Typography variant="inline-code">'horizontal'</Typography></td
              >
              <td>Sets the layout direction</td>
            </tr>
            <tr>
              <th scope="row"
                ><Typography variant="inline-code">children</Typography></th
              >
              <td><Typography variant="inline-code">Snippet</Typography></td>
              <td>Required</td>
              <td>Provides actions or nested action groups</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Typography class="table-note" variant="muted">
        Native div attributes, including accessible labels and event handlers,
        pass through
      </Typography>

      <Typography variant="h3">Token mapping</Typography>
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
              <td><Typography variant="inline-code">space-2</Typography></td>
            </tr>
            <tr>
              <th scope="row">Nested separated gap</th>
              <td><Typography variant="inline-code">space-1</Typography></td>
            </tr>
            <tr>
              <th scope="row">Joined shape</th>
              <td><Typography variant="inline-code">radius-1</Typography></td>
            </tr>
            <tr>
              <th scope="row">Joined boundary overlap</th>
              <td
                ><Typography variant="inline-code"
                  >border-width-emphasised</Typography
                ></td
              >
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>
</section>
