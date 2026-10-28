<script lang="ts">
  import {
    Card,
    CardContent,
    CardHero,
    Select,
    TextInput,
    Typography,
    type TypographyVariant,
  } from '#lib/index.js';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  const textPatterns: {
    label: string;
    sample: string;
    value: Exclude<TypographyVariant, 'list'>;
  }[] = [
    { label: 'Display', sample: 'A curious journey', value: 'display' },
    { label: 'H1', sample: 'Build with intent', value: 'h1' },
    { label: 'H2', sample: 'Product settings', value: 'h2' },
    { label: 'H3', sample: 'Interface options', value: 'h3' },
    { label: 'H4', sample: 'Output controls', value: 'h4' },
    {
      label: 'Paragraph',
      sample: 'Clear language keeps the primary task easy to understand.',
      value: 'p',
    },
    {
      label: 'Blockquote',
      sample: 'Design choices should make the next action feel obvious.',
      value: 'blockquote',
    },
    {
      label: 'Inline code',
      sample: '@memorycore/design',
      value: 'inline-code',
    },
    {
      label: 'Lead',
      sample: 'A concise introduction to the content that follows.',
      value: 'lead',
    },
    { label: 'Large', sample: 'Are you ready to continue?', value: 'large' },
    { label: 'Small', sample: 'Email address', value: 'small' },
    { label: 'Muted', sample: 'Updated moments ago', value: 'muted' },
  ];

  let variant = $state<(typeof textPatterns)[number]['value']>('h1');
  let text = $state('Build with intent');

  function selectVariant(event: Event): void {
    const selected = textPatterns.find(
      ({ value }) => value === (event.currentTarget as HTMLSelectElement).value,
    );

    if (!selected) return;
    variant = selected.value;
    text = selected.sample;
  }
</script>

<svelte:head>
  <title>Typography · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Structure"
  title="Typography"
  description="Provides named text patterns with the appropriate semantic element and approved MemoryCore treatment"
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
      <Typography {variant}>{text || 'Text'}</Typography>
    </CardHero>

    <CardContent class="playground__controls">
      <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
        <TextInput label="Text" bind:value={text} maxlength={80} />
        <Select label="Pattern" value={variant} onchange={selectVariant}>
          {#each textPatterns as option}
            <option value={option.value}>{option.label}</option>
          {/each}
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
        <li>Select the pattern that matches the content</li>
        <li>Use H1 through H4 in a logical document hierarchy</li>
        <li>Use Lead for introductory copy and Muted for supporting details</li>
        <li>Use Large for short, emphasised statements</li>
        <li>Provide native list items as children of List</li>
      </Typography>
    </div>
    <div>
      <Typography variant="h3">Accessibility</Typography>
      <Typography variant="list">
        <li>Each pattern supplies its corresponding semantic element</li>
        <li>Use one H1 for the primary page heading</li>
        <li>Keep quotations in Blockquote and code-like text in Inline code</li>
        <li>Keep inline code short enough to wrap within narrow layouts</li>
        <li>Text and borders use theme-aware semantic colours</li>
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
    aria-label="Typography API table"
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
            ><Typography variant="inline-code">variant</Typography></th
          >
          <td
            ><Typography variant="inline-code">TypographyVariant</Typography
            ></td
          >
          <td><Typography variant="inline-code">'p'</Typography></td>
          <td>Selects the text pattern and semantic element</td>
        </tr>
        <tr>
          <th scope="row"
            ><Typography variant="inline-code">children</Typography></th
          >
          <td><Typography variant="inline-code">Snippet</Typography></td>
          <td>Required</td>
          <td>Provides text or valid list items</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography class="table-note" variant="muted">
    Applicable native HTML attributes and event handlers pass through
  </Typography>
</section>
