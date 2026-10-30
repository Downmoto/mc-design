<script lang="ts">
  import type { TableProps } from './table.types.js';

  let {
    children,
    class: className = '',
    size = 'standard',
    variant = 'plain',
    ...attributes
  }: TableProps = $props();
</script>

<table
  {...attributes}
  class={`mc-table ${className}`.trim()}
  data-size={size}
  data-variant={variant}
>
  {@render children()}
</table>

<style>
  .mc-table {
    inline-size: 100%;
    min-inline-size: 0;
    color: var(--mc-colour-text-primary);
    border-collapse: separate;
    border-spacing: 0;
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-body-weight);
    font-variant-numeric: tabular-nums;
    line-height: var(--mc-typography-body-line-height);
  }

  .mc-table[data-variant='divided'] {
    overflow: hidden;
    background: var(--mc-colour-surface-high);
    border-radius: var(--mc-radius-2);
  }

  .mc-table > :global(caption) {
    padding-block-end: var(--mc-space-2);
    color: var(--mc-colour-text-secondary);
    font-family: var(--mc-typography-label-family);
    font-size: var(--mc-typography-label-size);
    font-weight: var(--mc-typography-label-weight);
    line-height: var(--mc-typography-label-line-height);
    text-align: start;
  }

  .mc-table :global(th),
  .mc-table :global(td) {
    padding: var(--mc-space-3) var(--mc-space-4);
    text-align: start;
    vertical-align: top;
  }

  .mc-table[data-variant='divided'] :global(th),
  .mc-table[data-variant='divided'] :global(td) {
    background: var(--mc-colour-surface);
  }

  .mc-table[data-variant='divided']
    > :global(tbody)
    > :global(tr:nth-child(even))
    > :global(*) {
    background: var(--mc-colour-surface-low);
  }

  .mc-table > :global(thead) :global(th) {
    background: var(--mc-colour-surface-high);
  }

  .mc-table[data-size='compact'] :global(th),
  .mc-table[data-size='compact'] :global(td) {
    padding: var(--mc-space-2) var(--mc-space-3);
  }

  @media (forced-colors: active) {
    .mc-table {
      color: CanvasText;
    }

    .mc-table :global(th),
    .mc-table :global(td) {
      border-color: CanvasText;
    }

    .mc-table > :global(thead) :global(th) {
      background: Canvas;
    }
  }
</style>
