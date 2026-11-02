<script lang="ts">
  import {
    Card,
    CardContent,
    CardHero,
    Logo,
    Select,
    TextInput,
    Typography,
    type LogoAppearance,
    type LogoVariant,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let alt = $state('MemoryCore');
  let appearance = $state<LogoAppearance>('default');
  let variant = $state<LogoVariant>('wordmark-full');
</script>

<svelte:head>
  <title>Logo · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Structure"
  title="Logo"
  description="Renders approved MemoryCore marks and wordmarks without changing their geometry"
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
      <Logo {alt} {appearance} {variant} width="280" />
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <TextInput label="Alternative text" bind:value={alt} maxlength={80} />
        <Select label="Identity" bind:value={variant}>
          <option value="mark-bordered">Bordered mark</option>
          <option value="mark">Mark</option>
          <option value="wordmark">MC wordmark</option>
          <option value="wordmark-full">MemoryCore wordmark</option>
        </Select>
        <Select label="Appearance" bind:value={appearance}>
          <option value="default">Default</option>
          <option value="inverse">Inverse</option>
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
        <li>
          Use the full wordmark where the MemoryCore name needs prominence
        </li>
        <li>Use the MC wordmark or mark where space is limited</li>
        <li>Choose inverse only on dark surfaces</li>
        <li>Set width or CSS sizing without altering the SVG viewBox</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>
          Use the default alternative text when the logo identifies MemoryCore
        </li>
        <li>
          Set alternative text to empty when nearby text already provides the
          name
        </li>
        <li>Do not use a logo as the only label for an unfamiliar action</li>
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

  <div class="table-scroll" role="region" aria-label="Logo API table">
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
            ><Typography variant="inline-code">variant</Typography></th
          >
          <td><Typography variant="inline-code">LogoVariant</Typography></td>
          <td><Typography variant="inline-code">'wordmark-full'</Typography></td
          >
          <td>Chooses the approved identity</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">appearance</Typography></th
          >
          <td><Typography variant="inline-code">LogoAppearance</Typography></td>
          <td><Typography variant="inline-code">'default'</Typography></td>
          <td>Chooses the standard or inverse artwork</td>
        </tr>
        <tr>
          <th scope="row"><Typography variant="inline-code">alt</Typography></th
          >
          <td><Typography variant="inline-code">string</Typography></td>
          <td><Typography variant="inline-code">'MemoryCore'</Typography></td>
          <td
            >Provides alternative text, or an empty string for a decorative logo</td
          >
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Native image attributes, including width and height, pass through to the
    logo
  </Typography>
</section>
