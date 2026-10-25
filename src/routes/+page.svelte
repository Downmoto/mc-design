<script lang="ts">
  import { resolve } from '$app/paths';
  import { Button } from '#lib/index.js';
  import { catalogue } from './_components/catalogue.js';
  import ActionGroupPreview from './_components/previews/ActionGroupPreview.svelte';
  import ButtonPreview from './_components/previews/ButtonPreview.svelte';
  import ConsumerPreview from './_components/previews/ConsumerPreview.svelte';

  const categories = [...new Set(catalogue.map((entry) => entry.category))];
  const previews = {
    '/components/action-group': ActionGroupPreview,
    '/components/button': ButtonPreview,
    '/components/consumer': ConsumerPreview,
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
  <p class="eyebrow">MemoryCore design</p>
  <h1 id="home-title">Component library</h1>
  <p>
    Live components, variants, interactions, accessibility guidance, and Svelte
    APIs for <code>@memorycore/design</code>
  </p>
</section>

{#each categories as category}
  <section class="catalogue-section" aria-labelledby={`category-${category}`}>
    <h2 id={`category-${category}`}>{category}</h2>
    <div class="component-list">
      {#each catalogue.filter((entry) => entry.category === category) as entry}
        {@const Preview = previews[entry.route]}
        <article class="catalogue-item">
          <div class="catalogue-item__preview">
            <Preview />
          </div>
          <div class="catalogue-item__body">
            <div class="catalogue-item__heading">
              <h3>{entry.name}</h3>
              <span class="status">{entry.status}</span>
            </div>
            <p>{entry.description}</p>
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
