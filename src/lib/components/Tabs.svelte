<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { TabsProps } from './tabs.types.js';

  const generatedId = $props.id();

  let {
    children,
    class: className = '',
    consumer,
    id,
    label,
    size = 'standard',
    tabs,
    value = $bindable(''),
    ...attributes
  }: TabsProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let groupId = $derived(id ?? `${generatedId}-tabs`);
  let tabElements = $state<HTMLButtonElement[]>([]);
  let enabledIndices = $derived(
    tabs.flatMap((tab, index) => (tab.disabled ? [] : [index])),
  );
  let selectedIndex = $derived.by(() => {
    const index = tabs.findIndex((tab) => tab.value === value && !tab.disabled);
    return index === -1 ? (enabledIndices[0] ?? -1) : index;
  });
  let selectedTab = $derived(tabs[selectedIndex]);

  $effect(() => {
    if (selectedTab && value !== selectedTab.value) value = selectedTab.value;
  });

  function selectTab(index: number): void {
    const tab = tabs[index];
    if (!tab || tab.disabled) return;

    value = tab.value;
    tabElements[index]?.focus();
  }

  function handleKeydown(event: KeyboardEvent, index: number): void {
    const position = enabledIndices.indexOf(index);
    let nextIndex: number | undefined;

    if (event.key === 'Home') nextIndex = enabledIndices[0];
    if (event.key === 'End') nextIndex = enabledIndices.at(-1);
    if (event.key === 'ArrowRight') {
      nextIndex = enabledIndices[(position + 1) % enabledIndices.length];
    }
    if (event.key === 'ArrowLeft') {
      nextIndex =
        enabledIndices[
          (position - 1 + enabledIndices.length) % enabledIndices.length
        ];
    }

    if (nextIndex === undefined) return;
    event.preventDefault();
    selectTab(nextIndex);
  }
</script>

<div
  {...attributes}
  class={`mc-tabs ${className}`.trim()}
  id={groupId}
  data-mc-product={resolvedConsumer}
  data-size={size}
>
  <div class="mc-tabs__list" role="tablist" aria-label={label}>
    {#each tabs as tab, index (tab.value)}
      <button
        bind:this={tabElements[index]}
        class="mc-tabs__tab"
        id={`${groupId}-tab-${index}`}
        type="button"
        role="tab"
        disabled={tab.disabled}
        aria-controls={`${groupId}-panel`}
        aria-selected={index === selectedIndex}
        tabindex={index === selectedIndex ? 0 : -1}
        onclick={() => selectTab(index)}
        onkeydown={(event) => handleKeydown(event, index)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  {#if selectedTab}
    <div
      class="mc-tabs__panel"
      id={`${groupId}-panel`}
      role="tabpanel"
      aria-labelledby={`${groupId}-tab-${selectedIndex}`}
      tabindex="0"
    >
      {@render children(selectedTab.value)}
    </div>
  {/if}
</div>

<style>
  .mc-tabs {
    display: grid;
    gap: var(--mc-space-3);
    inline-size: 100%;
    min-inline-size: 0;
  }

  .mc-tabs__list {
    display: flex;
    min-inline-size: 0;
    overflow-x: auto;
  }

  .mc-tabs__tab {
    flex: 0 0 auto;
    min-block-size: var(--mc-size-target-minimum);
    padding: 0 var(--mc-space-4);
    color: var(--mc-colour-text-secondary);
    background: transparent;
    border: 0;
    border-block-end: var(--mc-border-width-emphasised) solid transparent;
    cursor: pointer;
    transition:
      color var(--mc-motion-duration-direct) var(--mc-motion-easing-default),
      background-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default),
      border-color var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default);
  }

  .mc-tabs[data-size='compact'] .mc-tabs__tab {
    min-block-size: var(--mc-size-target-minimum);
    padding-inline: var(--mc-space-3);
  }

  .mc-tabs__tab:hover:not(:disabled) {
    color: var(--mc-colour-text-primary);
    background: var(--mc-colour-surface);
  }

  .mc-tabs__tab[aria-selected='true'] {
    color: var(--mc-colour-interactive);
    border-block-end-color: var(--mc-colour-interactive);
  }

  .mc-tabs__tab:disabled {
    color: var(--mc-colour-text-secondary);
    opacity: var(--mc-opacity-disabled);
    cursor: not-allowed;
  }

  .mc-tabs__panel {
    min-inline-size: 0;
    color: var(--mc-colour-text-primary);
  }

  .mc-tabs__panel:focus-visible {
    outline: var(--mc-border-width-emphasised) solid
      var(--mc-colour-interactive);
    outline-offset: var(--mc-space-1);
  }

  @media (forced-colors: active) {
    .mc-tabs__tab[aria-selected='true'] {
      color: Highlight;
      border-block-end-color: Highlight;
    }

    .mc-tabs__tab:disabled {
      color: GrayText;
      opacity: 1;
    }

    .mc-tabs__panel:focus-visible {
      outline-color: Highlight;
    }
  }
</style>
