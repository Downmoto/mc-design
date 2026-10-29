<script lang="ts">
  import FolderOpenIcon from 'phosphor-svelte/lib/FolderOpenIcon';

  import {
    Button,
    Card,
    CardContent,
    CardHero,
    Checkbox,
    EmptyState,
    TextArea,
    TextInput,
    Typography,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let title = $state('No resources yet');
  let description = $state(
    'Create a resource to start organising project knowledge.',
  );
  let showActions = $state(true);
  let showDescription = $state(true);
  let showIcon = $state(true);
</script>

{#snippet folderIcon()}<FolderOpenIcon />{/snippet}

{#snippet descriptionContent()}
  {description || 'Add a concise explanation or next step.'}
{/snippet}

{#snippet actions()}
  <Button>Create resource</Button>
  <Button appearance="secondary">Learn more</Button>
{/snippet}

<svelte:head>
  <title>Empty state · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Structure"
  title="Empty state"
  description="Explains an empty region and provides an optional next step"
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
      <EmptyState
        actions={showActions ? actions : undefined}
        children={showDescription ? descriptionContent : undefined}
        leadingIcon={showIcon ? folderIcon : undefined}
        title={title || 'Empty state title'}
      />
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <TextInput label="Title" bind:value={title} maxlength={80} />
        <TextArea
          label="Description"
          bind:value={description}
          maxlength={180}
          rows={3}
        />
        <Checkbox
          label="Description"
          size="compact"
          bind:checked={showDescription}
        />
        <Checkbox label="Leading icon" size="compact" bind:checked={showIcon} />
        <Checkbox label="Actions" size="compact" bind:checked={showActions} />
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
        <li>Explain what is absent in the title</li>
        <li>Use the description to clarify why or suggest a next step</li>
        <li>Provide one primary action when the user can resolve the state</li>
        <li>Use a decorative icon only when it reinforces the message</li>
        <li>Keep empty-state copy concise and specific to the region</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>The visible title provides the group accessible name</li>
        <li>Decorative icons remain hidden from assistive technology</li>
        <li>Actions preserve their native link or button behaviour</li>
        <li>Use Status when an empty result needs a live announcement</li>
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
    aria-label="Empty state API table"
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
          <td>Names the empty region</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">leadingIcon</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Optional</td>
          <td>Provides a decorative feature icon</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">actions</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Optional</td>
          <td>Provides links or buttons for a next step</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    EmptyState accepts native div attributes and optional description children
  </Typography>
</section>
