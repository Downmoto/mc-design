<script lang="ts">
  import {
    Badge,
    Card,
    CardContent,
    CardHero,
    Checkbox,
    List,
    ListItem,
    Select,
    Typography,
    type ListSize,
    type ListVariant,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const resources = [
    {
      description: 'Foundation and semantic values for every consumer',
      title: 'Design tokens',
    },
    {
      description: 'Shared Svelte interfaces and interaction patterns',
      title: 'Component reference',
    },
    {
      description: 'Keyboard, contrast, reflow, and naming requirements',
      title: 'Accessibility checklist',
    },
  ];

  let size = $state<ListSize>('standard');
  let variant = $state<ListVariant>('divided');
  let showLeading = $state(true);
  let showNested = $state(true);
  let showTrailing = $state(true);
</script>

{#snippet leadingContent()}
  <Badge size="compact">Resource</Badge>
{/snippet}

{#snippet trailingContent()}
  <Typography variant="muted">4 min</Typography>
{/snippet}

<svelte:head>
  <title>List · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Structure"
  title="List"
  description="Presents related content as semantic structured rows"
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
      <List class="list-sample" {size} {variant}>
        {#each resources as resource, index}
          <ListItem
            leading={showLeading ? leadingContent : undefined}
            trailing={showTrailing ? trailingContent : undefined}
          >
            <div class="list-sample__content">
              <Typography variant="h4">{resource.title}</Typography>
              <Typography variant="muted">{resource.description}</Typography>
            </div>
            {#if showNested && index === 1}
              <List size="compact">
                <ListItem
                  ><Typography variant="small">Button</Typography></ListItem
                >
                <ListItem
                  ><Typography variant="small">Card</Typography></ListItem
                >
                <ListItem
                  ><Typography variant="small">List</Typography></ListItem
                >
              </List>
            {/if}
          </ListItem>
        {/each}
      </List>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <Select label="Variant" bind:value={variant}>
          <option value="plain">Plain</option>
          <option value="divided">Divided</option>
        </Select>
        <Select label="Size" bind:value={size}>
          <option value="standard">Standard</option>
          <option value="compact">Compact</option>
        </Select>
        <Checkbox
          label="Leading content"
          size="compact"
          bind:checked={showLeading}
        />
        <Checkbox
          label="Trailing content"
          size="compact"
          bind:checked={showTrailing}
        />
        <Checkbox
          label="Nested list"
          size="compact"
          bind:checked={showNested}
        />
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
        <li>Use List for repeating rows with a shared content structure</li>
        <li>Use Plain in open layouts and Divided for contained groups</li>
        <li>Keep primary content in the centre region</li>
        <li>Nest List inside ListItem to represent a true hierarchy</li>
        <li>
          Reserve leading and trailing regions for concise supporting content
        </li>
        <li>Use Typography lists for prose and Table for column comparisons</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>List and ListItem preserve native ul and li semantics</li>
        <li>Use links or buttons when a row provides an action</li>
        <li>Keep interactive controls in logical source order</li>
        <li>Give icon-only actions an accessible name and Tooltip</li>
        <li>
          Keep decorative leading content hidden from assistive technology
        </li>
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
    aria-label="List API table"
    tabindex="0"
  >
    <table>
      <thead>
        <tr>
          <th scope="col">Component</th>
          <th scope="col">Property</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
          <th scope="col">Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">List</Typography></th
          >
          <td><Typography variant="inline-code">variant</Typography></td>
          <td
            ><Typography variant="inline-code">'plain' | 'divided'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'plain'</Typography></td>
          <td>Controls containment and row separators</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">List</Typography></th
          >
          <td><Typography variant="inline-code">size</Typography></td>
          <td
            ><Typography variant="inline-code"
              >'standard' | 'compact'</Typography
            ></td
          >
          <td><Typography variant="inline-code">'standard'</Typography></td>
          <td>Controls row density</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">ListItem</Typography></th
          >
          <td><Typography variant="inline-code">leading</Typography></td>
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Optional</td>
          <td>Provides concise content before the primary region</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">ListItem</Typography></th
          >
          <td><Typography variant="inline-code">trailing</Typography></td>
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Optional</td>
          <td>Provides concise metadata or actions after the primary region</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    List and ListItem accept their native attributes and require children
  </Typography>
</section>

<style>
  :global(.list-sample) {
    inline-size: min(100%, var(--mc-size-reading-maximum));
  }

  .list-sample__content {
    display: grid;
    gap: var(--mc-space-1);
    min-inline-size: 0;
  }
</style>
