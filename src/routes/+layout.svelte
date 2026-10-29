<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import {
    Button,
    Consumer,
    Select,
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuLink,
    SidebarProvider,
    SidebarTrigger,
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
  const resolveCatalogueRoute = resolve as (
    route: (typeof catalogue)[number]['route'],
  ) => string;

  let { children }: LayoutProps = $props();
  let theme = $state<Theme>('dark');
  let consumer = $state<WorkbenchConsumer>('');
  let activeCategory = $derived(
    catalogue.find((entry) => page.route.id === entry.route)?.category,
  );

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
    return `${resolveCatalogueRoute(route)}/`;
  }
</script>

{#snippet componentNavigation()}
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuLink
          current={page.route.id === '/' ? 'page' : undefined}
          href={resolve('/')}
          label="Overview"
        />
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>

  <SidebarContent>
    <SidebarMenu>
      {#each categories as category}
        <SidebarMenuItem label={category} open={activeCategory === category}>
          {#snippet submenu()}
            <SidebarMenu>
              {#each catalogue.filter((entry) => entry.category === category) as entry}
                <SidebarMenuItem>
                  <SidebarMenuLink
                    current={page.route.id === entry.route ? 'page' : undefined}
                    href={componentHref(entry.route)}
                    label={entry.name}
                  />
                </SidebarMenuItem>
              {/each}
            </SidebarMenu>
          {/snippet}
        </SidebarMenuItem>
      {/each}
    </SidebarMenu>
  </SidebarContent>
{/snippet}

<a class="skip-link" href="#main-content">Skip to content</a>

<SidebarProvider class="workbench-provider">
  <header class="site-header">
    <div class="site-navigation">
      <Button appearance="link" class="site-title" href={resolve('/')}>
        <span class="site-title__brand">MemoryCore</span>
        <span class="site-title__context">Component library</span>
      </Button>
    </div>

    <div class="global-controls" aria-label="Preview settings">
      <Select
        class="global-control"
        label="Theme"
        size="compact"
        value={theme}
        onchange={selectTheme}
      >
        {#each themes as option}
          <option value={option} selected={theme === option}>
            {option[0].toUpperCase() + option.slice(1)}
          </option>
        {/each}
      </Select>

      <Select
        class="global-control"
        label="Consumer"
        size="compact"
        value={consumer}
        onchange={selectConsumer}
      >
        <option value="" selected={consumer === ''}>Default</option>
        {#each consumers as [id, details]}
          <option value={id} selected={consumer === id}>{details.name}</option>
        {/each}
      </Select>
    </div>
  </header>

  <div class="workbench-shell">
    <SidebarTrigger class="workbench-sidebar-trigger" />

    <Sidebar
      class="workbench-sidebar"
      label="Component navigation"
      collapsible="offcanvas"
    >
      {@render componentNavigation()}
    </Sidebar>

    <SidebarInset class="workbench-content">
      <main id="main-content" tabindex="-1">
        {#if consumer}
          <Consumer {consumer}>
            {@render children()}
          </Consumer>
        {:else}
          {@render children()}
        {/if}
      </main>
    </SidebarInset>
  </div>
</SidebarProvider>
