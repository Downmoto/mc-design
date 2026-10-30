<script lang="ts">
  import type { ListItemProps } from './list.types.js';

  let {
    children,
    class: className = '',
    leading,
    trailing,
    ...attributes
  }: ListItemProps = $props();
</script>

<li
  {...attributes}
  class={`mc-list-item ${className}`.trim()}
  data-leading={leading ? true : undefined}
  data-trailing={trailing ? true : undefined}
>
  {#if leading}
    <div class="mc-list-item__leading">{@render leading()}</div>
  {/if}
  <div class="mc-list-item__content">{@render children()}</div>
  {#if trailing}
    <div class="mc-list-item__trailing">{@render trailing()}</div>
  {/if}
</li>

<style>
  .mc-list-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    box-sizing: border-box;
    min-inline-size: 0;
  }

  .mc-list-item[data-leading] {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .mc-list-item[data-trailing] {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .mc-list-item[data-leading][data-trailing] {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .mc-list-item__content {
    display: grid;
    gap: var(--mc-space-3);
    min-inline-size: 0;
  }

  :global(.mc-list[data-size='compact'])
    > .mc-list-item
    > .mc-list-item__content {
    gap: var(--mc-space-2);
  }

  .mc-list-item__leading,
  .mc-list-item__trailing {
    display: flex;
    align-items: center;
  }

  .mc-list-item__trailing {
    justify-self: end;
  }
</style>
