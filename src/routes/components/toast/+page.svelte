<script lang="ts">
  import CheckCircleIcon from 'phosphor-svelte/lib/CheckCircleIcon';

  import {
    Card,
    CardContent,
    CardHero,
    Button,
    Checkbox,
    Select,
    TextArea,
    TextInput,
    Toast,
    Typography,
    type ToastSize,
    type ToastTone,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let title = $state('Project saved');
  let message = $state('The latest changes are available.');
  let size = $state<ToastSize>('standard');
  let tone = $state<ToastTone>('success');
  let timeout = $state('0');
  let dismissible = $state(true);
  let showIcon = $state(true);
  let open = $state(true);

  function showToast(): void {
    open = false;
    requestAnimationFrame(() => (open = true));
  }
</script>

{#snippet successIcon()}<CheckCircleIcon />{/snippet}

<svelte:head>
  <title>Toast · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Feedback"
  title="Toast"
  description="Announces temporary background results without moving focus"
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
      <div class="toast-sample">
        <Toast
          {dismissible}
          leadingIcon={showIcon ? successIcon : undefined}
          bind:open
          {size}
          timeout={Number(timeout)}
          {title}
          {tone}
        >
          {message || 'Notification message'}
        </Toast>
        <Button appearance="secondary" onclick={showToast}>Show toast</Button>
      </div>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <TextInput label="Title" bind:value={title} maxlength={60} />
        <TextArea
          label="Message"
          bind:value={message}
          maxlength={180}
          rows={3}
        />
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
        <Select label="Timeout" bind:value={timeout}>
          <option value="0">Persistent</option>
          <option value="5000">5 seconds</option>
        </Select>
        <Checkbox
          label="Dismiss button"
          size="compact"
          bind:checked={dismissible}
        />
        <Checkbox label="Leading icon" size="compact" bind:checked={showIcon} />
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
          Use Toast for brief results that do not interrupt the current task
        </li>
        <li>Keep the message concise and specific</li>
        <li>Use Alert when information must remain visible in context</li>
        <li>Use a persistent timeout when users may need longer to read</li>
        <li>Place and stack Toast components in a consumer-owned region</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Messages use a polite atomic status region by default</li>
        <li>Opening and closing a toast does not move focus</li>
        <li>Hover and focus pause an active timeout</li>
        <li>
          The dismiss button has a visible native tooltip and accessible name
        </li>
        <li>Escape dismisses the toast while focus is inside it</li>
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
    aria-label="Toast API table"
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
          <td>Provides the notification message</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">open</Typography></th
          >
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">true</Typography></td>
          <td>Supports two-way visibility binding</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">timeout</Typography></th
          >
          <td><Typography variant="inline-code">number</Typography></td>
          <td><Typography variant="inline-code">5000</Typography></td>
          <td>Sets milliseconds before dismissal; zero remains visible</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">dismissible</Typography></th
          >
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">true</Typography></td>
          <td>Shows the dismiss button</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">onclose</Typography></th
          >
          <td><Typography variant="inline-code">() =&gt; void</Typography></td>
          <td>Empty</td>
          <td>Runs after timeout or user dismissal</td>
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
          <td><Typography variant="inline-code">ToastTone</Typography></td>
          <td><Typography variant="inline-code">'neutral'</Typography></td>
          <td>Sets the Alert surface tone</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">size</Typography></th
          >
          <td><Typography variant="inline-code">ToastSize</Typography></td>
          <td><Typography variant="inline-code">'standard'</Typography></td>
          <td>Sets content density and dismiss-button position</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native div attributes pass through to the polite status region
  </Typography>
</section>

<style>
  .toast-sample {
    display: grid;
    justify-items: start;
    inline-size: min(100%, var(--mc-size-dialog-medium));
    gap: var(--mc-space-4);
  }
</style>
