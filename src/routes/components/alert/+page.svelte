<script lang="ts">
  import InfoIcon from 'phosphor-svelte/lib/InfoIcon';

  import {
    Alert,
    Checkbox,
    Select,
    TextArea,
    TextInput,
    Typography,
    type AlertSize,
    type AlertTone,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let title = $state('Project updated');
  let message = $state('The new settings are available to everyone.');
  let size = $state<AlertSize>('standard');
  let tone = $state<AlertTone>('neutral');
  let showIcon = $state(true);
</script>

{#snippet infoIcon()}<InfoIcon />{/snippet}

<svelte:head>
  <title>Alert · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Feedback"
  title="Alert"
  description="Presents persistent contextual information near related content"
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
      <div class="alert-sample">
        <Alert
          {size}
          {title}
          {tone}
          leadingIcon={showIcon ? infoIcon : undefined}
        >
          {message || 'Alert message'}
        </Alert>
      </div>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <TextInput label="Title" bind:value={title} maxlength={60} />
      <TextArea label="Message" bind:value={message} maxlength={180} rows={3} />
      <Select label="Size" bind:value={size}>
        <option value="standard">Standard</option>
        <option value="compact">Compact</option>
      </Select>
      <Select label="Tone" bind:value={tone}>
        <option value="neutral">Neutral</option>
        <option value="info">Info</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="danger">Danger</option>
      </Select>
      <Checkbox label="Leading icon" size="compact" bind:checked={showIcon} />
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
        <li>Use Alert for contextual information that remains visible</li>
        <li>Place it near the content or action it concerns</li>
        <li>Use a short title when it helps users scan the message</li>
        <li>Match semantic tones to the meaning of the message</li>
        <li>Use Toast for temporary confirmation away from the current task</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Static alerts remain ordinary content in reading order</li>
        <li>Icons are decorative and hidden from assistive technology</li>
        <li>Text communicates meaning alongside colour and border treatment</li>
        <li>
          Add role="alert" only when dynamically inserting an urgent message
        </li>
        <li>Move focus when the message requires immediate user action</li>
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
    aria-label="Alert API table"
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
          <td>Provides the message content</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">title</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Empty</td>
          <td>Adds a concise visible heading</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">tone</Typography></th
          >
          <td
            ><Typography variant="inline-code"
              >'neutral' | 'info' | 'success' | 'warning' | 'danger'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'neutral'</Typography></td>
          <td>Sets the semantic border and icon colour</td>
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
          <td>Sets content typography, spacing, and padding</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">leadingIcon</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Empty</td>
          <td>Adds a decorative leading icon</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">consumer</Typography></th
          >
          <td><Typography variant="inline-code">ConsumerId</Typography></td>
          <td>Inherited</td>
          <td>Applies a registered consumer mapping to the info tone</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native div attributes, including role and aria-live, pass through to the
    alert
  </Typography>
</section>

<style>
  .alert-sample {
    inline-size: min(100%, var(--mc-size-reading-maximum));
  }
</style>
