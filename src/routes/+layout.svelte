<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import {
    Button,
    Consumer,
    Typography,
    consumerRegistry,
    initialiseTheme,
    setTheme,
    themes,
    type ConsumerId,
    type Theme,
  } from '#lib/index.js';
  import { onMount } from 'svelte';
  import type { LayoutProps } from './$types';
  import { catalogue } from './_components/catalogue.js';
  import '#lib/styles.css';
  import './app.css';

  const consumerStorageKey = 'mc-workbench-consumer';
  const consumers = Object.entries(consumerRegistry) as [
    ConsumerId,
    (typeof consumerRegistry)[ConsumerId],
  ][];
  type WorkbenchConsumer = ConsumerId | '';
  const categories = [...new Set(catalogue.map((entry) => entry.category))];

  let { children }: LayoutProps = $props();
  let theme = $state<Theme>('dark');
  let consumer = $state<WorkbenchConsumer>('');

  onMount(() => {
    document.documentElement.removeAttribute('data-mc-product');
    theme = initialiseTheme();
    consumer = readConsumer();
  });

  function readConsumer(): WorkbenchConsumer {
    try {
      const stored = localStorage.getItem(consumerStorageKey);
      if (stored && stored in consumerRegistry) return stored as ConsumerId;
    } catch {
      // The default mapping remains available when storage is unavailable.
    }

    return '';
  }

  function storeConsumer(value: WorkbenchConsumer): void {
    try {
      if (value) {
        localStorage.setItem(consumerStorageKey, value);
      } else {
        localStorage.removeItem(consumerStorageKey);
      }
    } catch {
      // Applying the consumer still works when storage is unavailable.
    }
  }

  function selectTheme(event: Event): void {
    theme = (event.currentTarget as HTMLSelectElement).value as Theme;
    setTheme(theme);
  }

  function selectConsumer(event: Event): void {
    consumer = (event.currentTarget as HTMLSelectElement)
      .value as WorkbenchConsumer;
    storeConsumer(consumer);
  }

  function componentHref(route: (typeof catalogue)[number]['route']): string {
    return `${resolve(route)}/`;
  }
</script>

{#snippet componentNavigation()}
  <nav class="component-navigation" aria-label="Component navigation">
    <Button
      appearance="link"
      class="component-navigation__overview"
      href={resolve('/')}
      aria-current={page.route.id === '/' ? 'page' : undefined}>Overview</Button
    >

    {#each categories as category}
      <Typography class="component-navigation__category" variant="large">
        {category}
      </Typography>
      <ul aria-label={category}>
        {#each catalogue.filter((entry) => entry.category === category) as entry}
          <li>
            <Button
              appearance="link"
              href={componentHref(entry.route)}
              aria-current={page.route.id === entry.route ? 'page' : undefined}
              >{entry.name}</Button
            >
          </li>
        {/each}
      </ul>
    {/each}
  </nav>
{/snippet}

<a class="skip-link" href="#main-content">Skip to content</a>

<header class="site-header">
  <Button appearance="link" class="site-title" href={resolve('/')}>
    <span class="site-title__brand">MemoryCore</span>
    <span class="site-title__context">Component library</span>
  </Button>

  <div class="global-controls" aria-label="Preview settings">
    <label>
      <span>Theme</span>
      <select value={theme} onchange={selectTheme}>
        {#each themes as option}
          <option value={option} selected={theme === option}>
            {option[0].toUpperCase() + option.slice(1)}
          </option>
        {/each}
      </select>
    </label>

    <label>
      <span>Consumer</span>
      <select value={consumer} onchange={selectConsumer}>
        <option value="" selected={consumer === ''}>Default</option>
        {#each consumers as [id, details]}
          <option value={id} selected={consumer === id}>{details.name}</option>
        {/each}
      </select>
    </label>
  </div>
</header>

<div class="workbench-shell">
  <aside class="sidebar">
    {@render componentNavigation()}
  </aside>

  <details class="mobile-navigation">
    <summary>Components</summary>
    {@render componentNavigation()}
  </details>

  <main id="main-content" tabindex="-1">
    {#if consumer}
      <Consumer {consumer}>
        {@render children()}
      </Consumer>
    {:else}
      {@render children()}
    {/if}
  </main>
</div>
