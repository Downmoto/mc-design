<script lang="ts">
  import {
    Card,
    CardContent,
    CardHero,
    Checkbox,
    NumericInput,
    ProgressIndicator,
    Select,
    TextInput,
    Typography,
    type ProgressIndicatorSize,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let label = $state('Processing files');
  let value = $state(60);
  let max = $state(100);
  let indeterminate = $state(false);
  let showValue = $state(true);
  let size = $state<ProgressIndicatorSize>('standard');
</script>

<svelte:head>
  <title>Progress indicator · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Feedback"
  title="Progress indicator"
  description="Communicates the completion of an ongoing process"
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
      <div class="progress-sample">
        <ProgressIndicator
          {label}
          value={indeterminate ? undefined : value}
          {max}
          {showValue}
          {size}
        />
      </div>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <TextInput label="Label" bind:value={label} maxlength={60} />
        <NumericInput
          label="Value"
          min={0}
          {max}
          bind:value
          disabled={indeterminate}
        />
        <NumericInput label="Maximum" min={1} bind:value={max} />
        <Select label="Size" bind:value={size}>
          <option value="standard">Standard</option>
          <option value="compact">Compact</option>
        </Select>
        <Checkbox
          label="Indeterminate"
          size="compact"
          bind:checked={indeterminate}
        />
        <Checkbox label="Show value" size="compact" bind:checked={showValue} />
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
        <li>
          Use a determinate indicator when measurable progress is available
        </li>
        <li>Use the indeterminate state when completion cannot be estimated</li>
        <li>Describe the process with a concise, persistent label</li>
        <li>Keep the maximum stable while a process is running</li>
        <li>Show the percentage when the precise value helps the user</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>The native progress element exposes value and maximum semantics</li>
        <li>The persistent label provides the accessible name</li>
        <li>Omitting value communicates an indeterminate process</li>
        <li>
          Reduced-motion settings replace animation with a static treatment
        </li>
        <li>Meaning remains available without relying on colour</li>
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
    aria-label="Progress indicator API table"
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
            ><Typography variant="inline-code">label</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Required</td>
          <td>Provides the visible accessible name</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">value</Typography></th
          >
          <td><Typography variant="inline-code">number</Typography></td>
          <td>Undefined</td>
          <td>Sets completion or activates the indeterminate state</td>
        </tr>
        <tr>
          <th scope="row"><Typography variant="inline-code">max</Typography></th
          >
          <td><Typography variant="inline-code">number</Typography></td>
          <td><Typography variant="inline-code">100</Typography></td>
          <td>Sets the value representing completion</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">size</Typography></th
          >
          <td
            ><Typography variant="inline-code"
              >'compact' | 'standard'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'standard'</Typography></td>
          <td>Sets the track thickness</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">showValue</Typography></th
          >
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">true</Typography></td>
          <td>Shows the completion percentage beside the label</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">consumer</Typography></th
          >
          <td><Typography variant="inline-code">ConsumerId</Typography></td>
          <td>Inherited</td>
          <td>Applies a registered consumer mapping to the fill</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native progress attributes and event handlers pass through to the control
  </Typography>
</section>

<style>
  .progress-sample {
    inline-size: min(100%, var(--mc-size-sidebar-properties-default));
  }
</style>
