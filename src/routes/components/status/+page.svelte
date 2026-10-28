<script lang="ts">
  import {
    Card,
    CardContent,
    CardHero,
    Select,
    Status,
    TextInput,
    Typography,
    type StatusSize,
    type StatusTone,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let label = $state('Changes saved');
  let size = $state<StatusSize>('standard');
  let tone = $state<StatusTone>('success');
</script>

<svelte:head>
  <title>Status · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Feedback"
  title="Status"
  description="Announces concise background updates without moving focus"
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
      <Status {size} {tone}>{label}</Status>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <TextInput label="Message" bind:value={label} maxlength={80} />
        <Select label="Size" bind:value={size}>
          <option value="standard">Standard</option>
          <option value="compact">Compact</option>
        </Select>
        <Select label="Tone" bind:value={tone}>
          <option value="neutral">Neutral</option>
          <option value="accent">Accent</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="danger">Danger</option>
        </Select>
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
        <li>Use Status for concise updates that change in place</li>
        <li>Update the message only when meaningful information changes</li>
        <li>Use semantic tones only when the meaning matches</li>
        <li>Use Badge for static metadata and categories</li>
        <li>Use Alert when information needs more context</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Updates use a polite atomic status region</li>
        <li>Announcements do not move keyboard focus</li>
        <li>The visible message carries the meaning expressed by colour</li>
        <li>The marker is decorative and hidden from assistive technology</li>
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
    aria-label="Status API table"
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
          <td>Provides the visible and announced message</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">tone</Typography></th
          >
          <td><Typography variant="inline-code">StatusTone</Typography></td>
          <td><Typography variant="inline-code">'neutral'</Typography></td>
          <td>Sets the marker's semantic colour</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">size</Typography></th
          >
          <td><Typography variant="inline-code">StatusSize</Typography></td>
          <td><Typography variant="inline-code">'standard'</Typography></td>
          <td>Sets label typography and spacing</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">consumer</Typography></th
          >
          <td><Typography variant="inline-code">ConsumerId</Typography></td>
          <td>Inherited</td>
          <td>Applies a registered consumer mapping to the accent tone</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native span attributes pass through to the polite status region
  </Typography>
</section>
