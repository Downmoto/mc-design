<script lang="ts">
  import TagIcon from 'phosphor-svelte/lib/TagIcon';

  import {
    Badge,
    Checkbox,
    Select,
    TextInput,
    Typography,
    type BadgeSize,
    type BadgeTone,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let label = $state('New release');
  let size = $state<BadgeSize>('standard');
  let tone = $state<BadgeTone>('neutral');
  let showIcon = $state(false);
</script>

{#snippet tagIcon()}<TagIcon />{/snippet}

<svelte:head>
  <title>Badge · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Feedback"
  title="Badge"
  description="Labels concise metadata, categories, and attributes"
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
      <Badge {size} {tone} leadingIcon={showIcon ? tagIcon : undefined}>
        {label || 'Badge'}
      </Badge>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <TextInput label="Label" bind:value={label} maxlength={40} />
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
        <li>Use Badge for brief metadata, categories, or attributes</li>
        <li>Keep labels short enough to remain on one line</li>
        <li>Use neutral for metadata and accent for highlighted attributes</li>
        <li>Use semantic tones only when the meaning matches</li>
        <li>Use Button or a link when the label performs an action</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Badge text is exposed as ordinary inline content</li>
        <li>Icons are decorative and hidden from assistive technology</li>
        <li>Meaning remains available through text alongside colour</li>
        <li>Use Status for dynamic updates that require announcement</li>
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
    aria-label="Badge API table"
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
          <td>Provides the visible label</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">tone</Typography></th
          >
          <td
            ><Typography variant="inline-code"
              >'neutral' | 'accent' | 'success' | 'warning' | 'danger'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'neutral'</Typography></td>
          <td>Sets the semantic colour</td>
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
          <td>Sets label typography, height, and padding</td>
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
          <td>Applies a registered consumer mapping to the accent tone</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native span attributes pass through to the badge
  </Typography>
</section>
