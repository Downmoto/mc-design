<script lang="ts">
  import {
    Card,
    CardContent,
    CardHero,
    Checkbox,
    Select,
    Tabs,
    TextInput,
    Typography,
    type TabItem,
    type TabsSize,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const panelContent: Record<string, string> = {
    activity: 'Recent project changes appear here',
    overview: 'A summary of the current project appears here',
    settings: 'Project-specific settings appear here',
  };
  let label = $state('Project sections');
  let size = $state<TabsSize>('standard');
  let value = $state('overview');
  let disableActivity = $state(false);
  let playgroundTabs = $derived<TabItem[]>([
    { label: 'Overview', value: 'overview' },
    { disabled: disableActivity, label: 'Activity', value: 'activity' },
    { label: 'Settings', value: 'settings' },
  ]);
</script>

<svelte:head>
  <title>Tabs · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Navigation"
  title="Tabs"
  description="Switches between related sections in the same context"
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
      <div class="tabs-sample tabs-sample--centred">
        <Tabs {label} tabs={playgroundTabs} {size} bind:value>
          {#snippet children(selected)}
            <Typography>{panelContent[selected]}</Typography>
          {/snippet}
        </Tabs>
      </div>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <TextInput label="Accessible label" bind:value={label} maxlength={40} />
        <Select label="Size" bind:value={size}>
          <option value="standard">Standard</option>
          <option value="compact">Compact</option>
        </Select>
        <Checkbox
          label="Disable Activity"
          size="compact"
          bind:checked={disableActivity}
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
        <li>Use Tabs for peer sections within the same context</li>
        <li>Keep labels short and place the most useful tab first</li>
        <li>
          Keep tab changes immediate so automatic activation stays responsive
        </li>
        <li>Use navigation links when each destination has its own page URL</li>
        <li>
          Allow horizontal scrolling when labels exceed the available width
        </li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Tab enters the selected tab and then the active panel</li>
        <li>Left and Right arrows move and select within the tab list</li>
        <li>Home and End select the first and last enabled tabs</li>
        <li>Disabled tabs are skipped by keyboard navigation</li>
        <li>
          Each tab is linked to its active panel through ARIA relationships
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
    aria-label="Tabs API table"
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
          <td>Names the tab list for assistive technology</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">tabs</Typography></th
          >
          <td><Typography variant="inline-code">TabItem[]</Typography></td>
          <td>Required</td>
          <td>Defines each label, value, and optional disabled state</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">value</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td>First enabled tab</td>
          <td>Supports two-way selected-value binding</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">children</Typography></th
          >
          <td
            ><Typography variant="inline-code"
              >Snippet&lt;[string]&gt;</Typography
            ></td
          >
          <td>Required</td>
          <td>Renders the active panel from the selected value</td>
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
          <td>Sets the tab height and inline padding</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native div attributes pass through to the component root
  </Typography>
</section>

<style>
  .tabs-sample {
    inline-size: var(--mc-size-sidebar-properties-default);
    max-inline-size: 100%;
  }

  .tabs-sample--centred {
    text-align: center;
  }

  .tabs-sample--centred :global(.mc-tabs__list) {
    justify-content: center;
  }
</style>
