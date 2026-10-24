<script lang="ts">
  import { resolve } from '$app/paths';
  import { catalogue } from './_components/catalogue.js';
  import ButtonPreview from './_components/previews/ButtonPreview.svelte';
  import IconButtonPreview from './_components/previews/IconButtonPreview.svelte';

  const categories = [...new Set(catalogue.map((entry) => entry.category))];
  const previews = {
    '/components/button': ButtonPreview,
    '/components/icon-button': IconButtonPreview,
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
            <a class="component-link" href={`${resolve(entry.route)}/`}>
              View {entry.name.toLowerCase()}
            </a>
          </div>
        </article>
      {/each}
    </div>
  </section>
{/each}
