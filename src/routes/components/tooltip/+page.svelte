<script lang="ts">
  import InfoIcon from 'phosphor-svelte/lib/InfoIcon';

  import {
    Button,
    Checkbox,
    Select,
    TextInput,
    Tooltip,
    Typography,
    type TooltipSize,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let content = $state('Project details and ownership');
  let open = $state(false);
  let size = $state<TooltipSize>('standard');
</script>

<svelte:head>
  <title>Tooltip · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Feedback"
  title="Tooltip"
  description="Provides concise supporting text for a control"
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
      <Tooltip {content} {size} bind:open>
        {#snippet trigger(props)}
          <Button
            {...props}
            appearance="secondary"
            size="icon"
            aria-label="Project information"
          >
            <InfoIcon />
          </Button>
        {/snippet}
      </Tooltip>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <TextInput label="Content" bind:value={content} maxlength={120} />
      <Select label="Size" bind:value={size}>
        <option value="standard">Standard</option>
        <option value="compact">Compact</option>
      </Select>
      <Checkbox label="Show tooltip" bind:checked={open} />
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
        <li>Use Tooltip to explain unfamiliar icon-only controls</li>
        <li>Keep content concise and descriptive</li>
        <li>Allow 500 ms before the tooltip appears</li>
        <li>Keep essential information visible in the interface</li>
        <li>Use visible labels when space and context allow</li>
        <li>Keep links, buttons, and other interactions outside tooltips</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>The trigger references the tooltip through aria-describedby</li>
        <li>Pointer hover and keyboard focus reveal the same content</li>
        <li>Moving the pointer over the tooltip keeps it visible</li>
        <li>Escape dismisses it without moving focus</li>
        <li>The trigger keeps its own visible or accessible name</li>
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
    aria-label="Tooltip API table"
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
            ><Typography variant="inline-code">content</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Required</td>
          <td>Provides concise descriptive text</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">trigger</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Required</td>
          <td>Applies supplied accessibility and interaction properties</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">open</Typography></th
          >
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">false</Typography></td>
          <td>Supports two-way visibility binding</td>
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
          <td>Sets text size and content padding</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">consumer</Typography></th
          >
          <td><Typography variant="inline-code">ConsumerId</Typography></td>
          <td>Inherited</td>
          <td>Applies a registered consumer mapping</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native span attributes pass through to the trigger wrapper
  </Typography>
</section>
