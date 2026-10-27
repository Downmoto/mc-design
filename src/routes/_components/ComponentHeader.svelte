<script lang="ts">
  import { Button, Typography } from '#lib/index.js';

  type SectionId = 'playground' | 'guidance' | 'reference';

  interface Props {
    category: string;
    description: string;
    sections?: SectionId[];
    title: string;
  }

  const sectionLabels: Record<SectionId, string> = {
    playground: 'Playground',
    guidance: 'Guidance',
    reference: 'Reference',
  };

  let {
    category,
    description,
    sections = ['playground', 'guidance', 'reference'],
    title,
  }: Props = $props();
</script>

<header class="component-heading">
  <Typography class="eyebrow" variant="muted">{category}</Typography>
  <Typography variant="h1">{title}</Typography>
  <Typography variant="lead">{description}</Typography>
</header>

<nav class="section-navigation" aria-label="On this page">
  {#each sections as section}
    <Button appearance="link" href={`#${section}`}>
      {sectionLabels[section]}
    </Button>
  {/each}
</nav>
