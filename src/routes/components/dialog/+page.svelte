<script lang="ts">
  import {
    Button,
    Card,
    CardContent,
    CardHero,
    Checkbox,
    Dialog,
    Select,
    TextArea,
    TextInput,
    Typography,
    type DialogSize,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let open = $state(false);
  let title = $state('Preview resource');
  let description = $state('Review the details before continuing.');
  let content = $state(
    'The selected resource opens in a focused layer over the current page.',
  );
  let size = $state<DialogSize>('medium');
  let dismissible = $state(true);
  let showFooter = $state(true);
</script>

{#snippet footer()}
  <Button appearance="secondary" onclick={() => (open = false)}>Cancel</Button>
  <Button onclick={() => (open = false)}>Continue</Button>
{/snippet}

<svelte:head>
  <title>Dialog · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Feedback"
  title="Dialog"
  description="Focuses attention on information or a decision in a modal layer"
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
      <Button onclick={() => (open = true)}>Open dialog</Button>
      <Dialog
        bind:open
        title={title || 'Dialog title'}
        description={description || undefined}
        {dismissible}
        footer={showFooter ? footer : undefined}
        {size}
      >
        <Typography>{content || 'Dialog content'}</Typography>
      </Dialog>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <TextInput label="Title" bind:value={title} maxlength={60} />
        <TextInput
          label="Description"
          bind:value={description}
          maxlength={120}
        />
        <TextArea
          label="Content"
          bind:value={content}
          maxlength={240}
          rows={3}
        />
        <Select label="Size" bind:value={size}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </Select>
        <Checkbox
          label="Dismissible"
          size="compact"
          bind:checked={dismissible}
        />
        <Checkbox label="Footer" size="compact" bind:checked={showFooter} />
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
        <li>Use Dialog for focused information, previews, or decisions</li>
        <li>Keep the title concise and describe the immediate task</li>
        <li>Use the smallest width that keeps the content comfortable</li>
        <li>
          Place supporting actions before the primary action in the footer
        </li>
        <li>Reserve non-dismissible dialogs for required decisions</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>The native modal dialog traps interaction within the top layer</li>
        <li>Opening moves focus inside and closing restores the trigger</li>
        <li>The visible title and description provide its accessible name</li>
        <li>Escape and backdrop clicks dismiss when enabled</li>
        <li>Reduced-motion settings remove entrance translation</li>
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
    aria-label="Dialog API table"
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
            ><Typography variant="inline-code">title</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Required</td>
          <td>Provides the visible accessible name</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">description</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>Empty</td>
          <td>Provides concise context below the title</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">open</Typography></th
          >
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">false</Typography></td>
          <td>Supports two-way modal visibility binding</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">size</Typography></th
          >
          <td><Typography variant="inline-code">DialogSize</Typography></td>
          <td><Typography variant="inline-code">'medium'</Typography></td>
          <td>Sets the small, medium, or large maximum width</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">dismissible</Typography></th
          >
          <td><Typography variant="inline-code">boolean</Typography></td>
          <td><Typography variant="inline-code">true</Typography></td>
          <td>Enables close, Escape, and backdrop dismissal</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">children / footer</Typography
            ></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Empty</td>
          <td>Provides optional content and actions</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native dialog attributes and event handlers pass through to the element
  </Typography>
</section>
