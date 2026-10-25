<script lang="ts">
  import { Button } from '#lib/index.js';

  type SectionId =
    'playground' | 'variants' | 'states' | 'guidance' | 'reference';

  interface Props {
    category: string;
    description: string;
    sections?: SectionId[];
    status?: 'Draft' | 'Ready';
    title: string;
  }

  const sectionLabels: Record<SectionId, string> = {
    playground: 'Playground',
    variants: 'Variants',
    states: 'States',
    guidance: 'Guidance',
    reference: 'Reference',
  };

  let {
    category,
    description,
    sections = ['playground', 'variants', 'states', 'guidance', 'reference'],
    status = 'Ready',
    title,
  }: Props = $props();
</script>

<header class="component-heading">
  <p class="eyebrow">{category}</p>
  <div class="component-heading__title">
    <h1>{title}</h1>
    <span class="status">{status}</span>
  </div>
  <p>{description}</p>
</header>

<nav class="section-navigation" aria-label="On this page">
  {#each sections as section}
    <Button appearance="link" href={`#${section}`}>
      {sectionLabels[section]}
    </Button>
  {/each}
</nav>
