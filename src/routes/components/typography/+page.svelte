<script lang="ts">
  import { Select, Typography, type TypographyVariant } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
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

  const reference: {
    element: string;
    tokens: string;
    value: TypographyVariant;
  }[] = [
    { element: 'div', tokens: 'display family + H1 size', value: 'display' },
    { element: 'h1', tokens: 'brand-heading', value: 'h1' },
    { element: 'h2', tokens: 'page-title', value: 'h2' },
    { element: 'h3', tokens: 'section-title', value: 'h3' },
    {
      element: 'h4',
      tokens: 'body + heading weight',
      value: 'h4',
    },
    { element: 'p', tokens: 'body', value: 'p' },
    {
      element: 'blockquote',
      tokens: 'body',
      value: 'blockquote',
    },
    { element: 'ul', tokens: 'body', value: 'list' },
    {
      element: 'code',
      tokens: 'code',
      value: 'inline-code',
    },
    { element: 'p', tokens: 'body + secondary', value: 'lead' },
    { element: 'div', tokens: 'body + strong', value: 'large' },
    { element: 'small', tokens: 'label', value: 'small' },
    {
      element: 'p',
      tokens: 'caption + secondary',
      value: 'muted',
    },
  ];

  let variant = $state<(typeof textPatterns)[number]['value']>('h1');
  let text = $state('Build with intent');
  let exampleCode = $derived(
    `<Typography variant="${variant}">${text || 'Text'}</Typography>`,
  );

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
  sections={['playground', 'variants', 'guidance', 'reference']}
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
      <Typography {variant}>{text || 'Text'}</Typography>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <label>
        <span>Text</span>
        <input bind:value={text} maxlength="80" />
      </label>
      <Select label="Pattern" value={variant} onchange={selectVariant}>
        {#each textPatterns as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </Select>
    </form>
  </div>

  <CodeExample code={exampleCode} />
</section>

<section
  class="workbench-section"
  id="variants"
  aria-labelledby="patterns-title"
>
  <div class="section-heading">
    <Typography id="patterns-title" variant="h2">Patterns</Typography>
  </div>

  <article class="specimen typography-sample">
    <Typography variant="display">Curiouser and curiouser!</Typography>
    <Typography variant="h1">Alice’s Adventures in Wonderland</Typography>
    <Typography variant="lead">Selections from a curious journey</Typography>
    <Typography variant="muted">Lewis Carroll · 1865</Typography>

    <Typography variant="h2">Down the Rabbit-Hole</Typography>
    <Typography>
      There was nothing so very remarkable in that; nor did Alice think it so
      very much out of the way to hear the Rabbit say to itself, “Oh dear! Oh
      dear! I shall be late!”
    </Typography>
    <Typography>
      Presently she saw a little bottle with the words
      <Typography variant="inline-code">DRINK ME</Typography>
      beautifully printed on it in large letters.
    </Typography>
    <Typography variant="blockquote">
      “We’re all mad here. I’m mad. You’re mad.”
    </Typography>

    <Typography variant="h3">Advice from a Caterpillar</Typography>
    <Typography>
      The Caterpillar and Alice looked at each other for some time in silence:
      at last the Caterpillar took the hookah out of its mouth, and addressed
      her in a languid, sleepy voice.
    </Typography>

    <Typography variant="h4">A question of identity</Typography>
    <Typography variant="large">
      “Who in the world am I? Ah, that’s the great puzzle.”
    </Typography>
    <Typography variant="small">Alice, after the fall</Typography>
    <Typography variant="list">
      <li>Was I the same when I got up this morning?</li>
      <li>Who in the world am I?</li>
      <li>How puzzling all these changes are!</li>
    </Typography>
  </article>
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

  <details class="reference-details">
    <summary>API and token reference</summary>
    <div class="reference-details__content">
      <Typography variant="h3">API</Typography>
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

      <Typography variant="h3">Pattern mapping</Typography>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Typography pattern mapping table"
        tabindex="0"
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Pattern</th>
              <th scope="col">Element</th>
              <th scope="col">Token role</th>
            </tr>
          </thead>
          <tbody>
            {#each reference as option}
              <tr>
                <th scope="row">
                  <Typography variant="inline-code">{option.value}</Typography>
                </th>
                <td>
                  <Typography variant="inline-code">{option.element}</Typography
                  >
                </td>
                <td>{option.tokens}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </details>
</section>

<style>
  .typography-sample {
    gap: var(--mc-space-4);
    justify-items: start;
    text-align: start;
  }
</style>
