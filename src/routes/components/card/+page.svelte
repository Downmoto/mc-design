<script lang="ts">
  import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardHero,
    Checkbox,
    Select,
    TextArea,
    TextInput,
    Typography,
    type CardOrientation,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let title = $state('Project atlas');
  let content = $state('Explore related MemoryCore resources and updates.');
  let orientation = $state<CardOrientation>('vertical');
  let showHeader = $state(true);
  let showContent = $state(true);
  let showFooter = $state(true);
  let showHero = $state(true);
</script>

<svelte:head>
  <title>Card · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Structure"
  title="Card"
  description="Groups related content into a flexible contained surface"
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
      <div class="card-sample">
        <Card {orientation}>
          {#if showHero}
            <CardHero>
              <div class="hero-effect" aria-hidden="true"></div>
            </CardHero>
          {/if}
          {#if showHeader}
            <CardHeader>
              <Typography variant="h3">{title || 'Card title'}</Typography>
            </CardHeader>
          {/if}
          {#if showContent}
            <CardContent>
              <Typography>{content || 'Card content'}</Typography>
            </CardContent>
          {/if}
          {#if showFooter}
            <CardFooter>
              <Button appearance="secondary">View details</Button>
            </CardFooter>
          {/if}
        </Card>
      </div>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <TextInput label="Title" bind:value={title} maxlength={60} />
        <TextArea
          label="Content"
          bind:value={content}
          maxlength={180}
          rows={3}
        />
        <Select label="Orientation" bind:value={orientation}>
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
        </Select>
        <Checkbox label="Header" size="compact" bind:checked={showHeader} />
        <Checkbox label="Content" size="compact" bind:checked={showContent} />
        <Checkbox label="Footer" size="compact" bind:checked={showFooter} />
        <Checkbox label="Hero" size="compact" bind:checked={showHero} />
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
      <Typography variant="h3">Composition</Typography>
      <Typography variant="list">
        <li>Use any combination of header, content, footer, and hero</li>
        <li>Use horizontal orientation for wider composed regions</li>
        <li>Place CardHero and CardHeader as direct children of Card</li>
        <li>A header overlays the bottom-left of a present hero</li>
        <li>Hero content may be an image, video, or visual effect</li>
        <li>Keep actions in the footer and primary information in content</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Card renders a semantic article</li>
        <li>CardHeader and CardFooter use native landmark elements</li>
        <li>Provide alternative text for meaningful hero media</li>
        <li>Hide decorative hero effects from assistive technology</li>
        <li>Use a heading that matches the surrounding page hierarchy</li>
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
    aria-label="Card component table"
    tabindex="0"
  >
    <table>
      <thead>
        <tr>
          <th scope="col">Component or property</th>
          <th scope="col">Element or type</th>
          <th scope="col">Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">Card</Typography></th
          >
          <td><Typography variant="inline-code">article</Typography></td>
          <td>Contains any combination of optional card pieces</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">orientation</Typography></th
          >
          <td
            ><Typography variant="inline-code"
              >'vertical' | 'horizontal'</Typography
            ></td
          >
          <td>Arranges the optional pieces vertically or across two columns</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">CardHero</Typography></th
          >
          <td><Typography variant="inline-code">div</Typography></td>
          <td>Contains optional media or visual effects</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">CardHeader</Typography></th
          >
          <td><Typography variant="inline-code">header</Typography></td>
          <td>Contains optional titles, metadata, or header actions</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">CardContent</Typography></th
          >
          <td><Typography variant="inline-code">div</Typography></td>
          <td>Contains optional primary card content</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">CardFooter</Typography></th
          >
          <td><Typography variant="inline-code">footer</Typography></td>
          <td>Contains optional actions or supporting details</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native attributes pass through to each component
  </Typography>
</section>

<style>
  .card-sample {
    inline-size: min(100%, var(--mc-size-dialog-medium));
  }

  .hero-effect {
    min-block-size: calc(var(--mc-space-8) + var(--mc-space-8));
    background: linear-gradient(
      var(--mc-colour-interactive),
      var(--mc-colour-surface)
    );
  }
</style>
