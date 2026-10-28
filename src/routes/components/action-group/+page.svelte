<script lang="ts">
  import {
    Card,
    CardContent,
    CardHero,
    ActionGroup,
    Button,
    Checkbox,
    Select,
    Typography,
    type ActionGroupOrientation,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let joined = $state(true);
  let orientation = $state<ActionGroupOrientation>('horizontal');
  let activation = $state('None');
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
    </CardHero>

    <CardContent class="playground__controls">
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
          <td><Typography variant="inline-code">'horizontal'</Typography></td>
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
    Native div attributes, including accessible labels and event handlers, pass
    through
  </Typography>
</section>
