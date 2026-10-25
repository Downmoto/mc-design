<script lang="ts">
  import { resolve } from '$app/paths';
  import { Button, Typography } from '#lib/index.js';
  import { catalogue } from './_components/catalogue.js';
  import ActionGroupPreview from './_components/previews/ActionGroupPreview.svelte';
  import ButtonPreview from './_components/previews/ButtonPreview.svelte';
  import ConsumerPreview from './_components/previews/ConsumerPreview.svelte';
  import TypographyPreview from './_components/previews/TypographyPreview.svelte';

  const categories = [...new Set(catalogue.map((entry) => entry.category))];
  const previews = {
    '/components/action-group': ActionGroupPreview,
    '/components/button': ButtonPreview,
    '/components/consumer': ConsumerPreview,
    '/components/typography': TypographyPreview,
  };
</script>

<svelte:head>
  <title>MemoryCore component library</title>
  <meta
    name="description"
    content="Live MemoryCore components, variants, interactions, accessibility guidance, and Svelte APIs"
  />
</svelte:head>

<section class="page-heading" aria-labelledby="home-title">
  <Typography class="eyebrow" variant="muted">MemoryCore design</Typography>
  <Typography id="home-title" variant="display">Component library</Typography>
  <Typography variant="lead">
    Live components, variants, interactions, accessibility guidance, and Svelte
    APIs
    <span class="inline-phrase">
      for <Typography variant="inline-code">@memorycore/design</Typography>
    </span>
  </Typography>
</section>

{#each categories as category}
  <section class="catalogue-section" aria-labelledby={`category-${category}`}>
    <Typography id={`category-${category}`} variant="h2">
      {category}
    </Typography>
    <div class="component-list">
      {#each catalogue.filter((entry) => entry.category === category) as entry}
        {@const Preview = previews[entry.route]}
        <article class="catalogue-item">
          <div class="catalogue-item__preview">
            <Preview />
          </div>
          <div class="catalogue-item__body">
            <div class="catalogue-item__heading">
              <Typography variant="h3">{entry.name}</Typography>
              <span class="status">{entry.status}</span>
            </div>
            <Typography>{entry.description}</Typography>
            <Button
              appearance="link"
              class="component-link"
              href={`${resolve(entry.route)}/`}
            >
              View {entry.name.toLowerCase()}
            </Button>
          </div>
        </article>
      {/each}
    </div>
  </section>
{/each}

<style>
  .inline-phrase {
    white-space: nowrap;
  }
</style>
