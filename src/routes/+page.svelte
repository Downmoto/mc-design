<script lang="ts">
  import { resolve } from '$app/paths';
  import { Button, Typography } from '#lib/index.js';
  import { catalogue } from './_components/catalogue.js';
  import ActionGroupPreview from './_components/previews/ActionGroupPreview.svelte';
  import AlertPreview from './_components/previews/AlertPreview.svelte';
  import BadgePreview from './_components/previews/BadgePreview.svelte';
  import ButtonPreview from './_components/previews/ButtonPreview.svelte';
  import CardPreview from './_components/previews/CardPreview.svelte';
  import CheckboxPreview from './_components/previews/CheckboxPreview.svelte';
  import ConsumerPreview from './_components/previews/ConsumerPreview.svelte';
  import DisclosurePreview from './_components/previews/DisclosurePreview.svelte';
  import DialogPreview from './_components/previews/DialogPreview.svelte';
  import ListPreview from './_components/previews/ListPreview.svelte';
  import NumericInputPreview from './_components/previews/NumericInputPreview.svelte';
  import ProgressIndicatorPreview from './_components/previews/ProgressIndicatorPreview.svelte';
  import PanelPreview from './_components/previews/PanelPreview.svelte';
  import MenuPreview from './_components/previews/MenuPreview.svelte';
  import RadioGroupPreview from './_components/previews/RadioGroupPreview.svelte';
  import SelectPreview from './_components/previews/SelectPreview.svelte';
  import SliderPreview from './_components/previews/SliderPreview.svelte';
  import StatusPreview from './_components/previews/StatusPreview.svelte';
  import SwitchPreview from './_components/previews/SwitchPreview.svelte';
  import TabsPreview from './_components/previews/TabsPreview.svelte';
  import TextAreaPreview from './_components/previews/TextAreaPreview.svelte';
  import TextInputPreview from './_components/previews/TextInputPreview.svelte';
  import ToastPreview from './_components/previews/ToastPreview.svelte';
  import TogglePreview from './_components/previews/TogglePreview.svelte';
  import ToolbarPreview from './_components/previews/ToolbarPreview.svelte';
  import TooltipPreview from './_components/previews/TooltipPreview.svelte';
  import TypographyPreview from './_components/previews/TypographyPreview.svelte';

  const categories = [...new Set(catalogue.map((entry) => entry.category))];
  const resolveCatalogueRoute = resolve as (
    route: (typeof catalogue)[number]['route'],
  ) => string;
  const previews = {
    '/components/action-group': ActionGroupPreview,
    '/components/alert': AlertPreview,
    '/components/badge': BadgePreview,
    '/components/button': ButtonPreview,
    '/components/card': CardPreview,
    '/components/checkbox': CheckboxPreview,
    '/components/consumer': ConsumerPreview,
    '/components/disclosure': DisclosurePreview,
    '/components/dialog': DialogPreview,
    '/components/list': ListPreview,
    '/components/menu': MenuPreview,
    '/components/numeric-input': NumericInputPreview,
    '/components/progress-indicator': ProgressIndicatorPreview,
    '/components/panel': PanelPreview,
    '/components/radio-group': RadioGroupPreview,
    '/components/select': SelectPreview,
    '/components/slider': SliderPreview,
    '/components/status': StatusPreview,
    '/components/switch': SwitchPreview,
    '/components/tabs': TabsPreview,
    '/components/text-area': TextAreaPreview,
    '/components/text-input': TextInputPreview,
    '/components/toast': ToastPreview,
    '/components/toggle': TogglePreview,
    '/components/toolbar': ToolbarPreview,
    '/components/tooltip': TooltipPreview,
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
            <Typography variant="h3">{entry.name}</Typography>
            <Typography>{entry.description}</Typography>
            <Button
              appearance="link"
              class="component-link"
              href={`${resolveCatalogueRoute(entry.route)}/`}
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
