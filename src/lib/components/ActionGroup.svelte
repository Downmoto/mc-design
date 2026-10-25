<script lang="ts">
  import type { ActionGroupProps } from './action-group.types.js';

  let {
    children,
    class: className = '',
    joined = false,
    orientation = 'horizontal',
    role = 'group',
    ...attributes
  }: ActionGroupProps = $props();
</script>

<div
  {...attributes}
  class={`mc-action-group ${className}`.trim()}
  data-joined={joined || undefined}
  data-orientation={orientation}
  {role}
>
  {@render children()}
</div>

<style>
  .mc-action-group {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: var(--mc-space-2);
    inline-size: fit-content;
    max-inline-size: 100%;
  }

  .mc-action-group[data-orientation='vertical'] {
    flex-direction: column;
  }

  .mc-action-group[data-joined='true'] {
    flex-wrap: nowrap;
    gap: 0;
  }

  .mc-action-group > :global(.mc-action-group:not([data-joined='true'])) {
    gap: var(--mc-space-1);
  }

  .mc-action-group[data-joined='true'] > :global(.mc-button:focus-visible),
  .mc-action-group[data-joined='true'] > :global(.mc-button:hover) {
    z-index: 1;
  }

  .mc-action-group[data-joined='true'][data-orientation='horizontal']
    > :global(.mc-button:not([data-appearance='link'])) {
    border-radius: 0;
  }

  .mc-action-group[data-joined='true'][data-orientation='horizontal']
    > :global(.mc-button:not([data-appearance='link']):first-child) {
    border-start-start-radius: var(--mc-radius-1);
    border-end-start-radius: var(--mc-radius-1);
  }

  .mc-action-group[data-joined='true'][data-orientation='horizontal']
    > :global(.mc-button:not([data-appearance='link']):last-child) {
    border-start-end-radius: var(--mc-radius-1);
    border-end-end-radius: var(--mc-radius-1);
  }

  .mc-action-group[data-joined='true'][data-orientation='horizontal']
    > :global(
      .mc-button:not([data-appearance='link'])
        + .mc-button:not([data-appearance='link'])
    ) {
    margin-inline-start: calc(-1 * var(--mc-border-width-emphasised));
  }

  .mc-action-group[data-joined='true'][data-orientation='vertical']
    > :global(.mc-button:not([data-appearance='link'])) {
    border-radius: 0;
  }

  .mc-action-group[data-joined='true'][data-orientation='vertical']
    > :global(.mc-button:not([data-appearance='link']):first-child) {
    border-start-start-radius: var(--mc-radius-1);
    border-start-end-radius: var(--mc-radius-1);
  }

  .mc-action-group[data-joined='true'][data-orientation='vertical']
    > :global(.mc-button:not([data-appearance='link']):last-child) {
    border-end-start-radius: var(--mc-radius-1);
    border-end-end-radius: var(--mc-radius-1);
  }

  .mc-action-group[data-joined='true'][data-orientation='vertical']
    > :global(
      .mc-button:not([data-appearance='link'])
        + .mc-button:not([data-appearance='link'])
    ) {
    margin-block-start: calc(-1 * var(--mc-border-width-emphasised));
  }
</style>
