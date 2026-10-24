<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import {
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
  const categories = [...new Set(catalogue.map((entry) => entry.category))];

  let { children }: LayoutProps = $props();
  let theme = $state<Theme>('dark');
  let consumer = $state<ConsumerId>('website');

  onMount(() => {
    theme = initialiseTheme();
    consumer = readConsumer();
    applyConsumer(consumer);
  });

  function readConsumer(): ConsumerId {
    try {
      const stored = localStorage.getItem(consumerStorageKey);
      if (stored && stored in consumerRegistry) return stored as ConsumerId;
    } catch {
      // The website mapping remains available when storage is unavailable.
    }

    return 'website';
  }

  function applyConsumer(value: ConsumerId): void {
    document.documentElement.setAttribute('data-mc-product', value);
    try {
      localStorage.setItem(consumerStorageKey, value);
    } catch {
      // Applying the consumer still works when storage is unavailable.
    }
  }

  function selectTheme(event: Event): void {
    theme = (event.currentTarget as HTMLSelectElement).value as Theme;
    setTheme(theme);
  }

  function selectConsumer(event: Event): void {
    consumer = (event.currentTarget as HTMLSelectElement).value as ConsumerId;
    applyConsumer(consumer);
  }

  function componentHref(route: (typeof catalogue)[number]['route']): string {
    return `${resolve(route)}/`;
  }
</script>

{#snippet componentNavigation()}
  <nav class="component-navigation" aria-label="Component navigation">
    <a
      class="component-navigation__overview"
      href={resolve('/')}
      aria-current={page.route.id === '/' ? 'page' : undefined}>Overview</a
    >

    {#each categories as category}
      <h2>{category}</h2>
      <ul>
        {#each catalogue.filter((entry) => entry.category === category) as entry}
          <li>
            <a
              href={componentHref(entry.route)}
              aria-current={page.route.id === entry.route ? 'page' : undefined}
              >{entry.name}</a
            >
          </li>
        {/each}
      </ul>
    {/each}
  </nav>
{/snippet}

<a class="skip-link" href="#main-content">Skip to content</a>

<header class="site-header">
  <a class="site-title" href={resolve('/')}>
    <span>MemoryCore</span>
    <span>Component library</span>
  </a>

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
    {@render children()}
  </main>
</div>
