<script lang="ts">
  import {
    Checkbox,
    Disclosure,
    Select,
    TextInput,
    Typography,
    type DisclosureSize,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let summary = $state('Project details');
  let size = $state<DisclosureSize>('standard');
  let open = $state(false);
</script>

<svelte:head>
  <title>Disclosure · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Navigation"
  title="Disclosure"
  description="Reveals supporting content or navigation on request"
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
      <div class="disclosure-sample">
        <Disclosure {summary} {size} bind:open>
          <Typography>
            This project is maintained by the MemoryCore design team
          </Typography>
        </Disclosure>
      </div>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <TextInput label="Summary" bind:value={summary} maxlength={60} />
      <Select label="Size" bind:value={size}>
        <option value="standard">Standard</option>
        <option value="compact">Compact</option>
      </Select>
      <Checkbox label="Open disclosure" bind:checked={open} />
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
        <li>Use Disclosure for optional supporting content</li>
        <li>Use it for compact navigation on smaller screens</li>
        <li>Write a concise summary that describes the hidden content</li>
        <li>Keep primary actions and essential information visible</li>
        <li>Use separate disclosures when sections can open independently</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Tab moves focus to the native summary control</li>
        <li>Enter and Space toggle the content</li>
        <li>The browser communicates the expanded state automatically</li>
        <li>Content remains in document order after its summary</li>
        <li>The chevron supplements the summary text with a visual cue</li>
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
    aria-label="Disclosure API table"
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
            ><Typography variant="inline-code">summary</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Required</td>
          <td>Labels the native summary control</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">children</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Required</td>
          <td>Renders the content revealed by the disclosure</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">open</Typography></th
          >
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">false</Typography></td>
          <td>Supports two-way expanded-state binding</td>
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
          <td>Sets summary height and content spacing</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native details attributes pass through to the component root
  </Typography>
</section>

<style>
  .disclosure-sample {
    inline-size: var(--mc-size-reading-maximum);
    max-inline-size: 100%;
  }
</style>
