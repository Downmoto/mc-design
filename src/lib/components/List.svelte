<script lang="ts">
  import type { ListProps } from './list.types.js';

  let {
    children,
    class: className = '',
    size = 'standard',
    variant = 'plain',
    ...attributes
  }: ListProps = $props();
</script>

<ul
  {...attributes}
  class={`mc-list ${className}`.trim()}
  data-size={size}
  data-variant={variant}
>
  {@render children()}
</ul>

<style>
  .mc-list {
    display: grid;
    min-inline-size: 0;
    margin: 0;
    padding: 0;
    color: var(--mc-colour-text-primary);
    list-style: none;
  }

  .mc-list[data-variant='divided'] {
    overflow: hidden;
    background: var(--mc-colour-surface);
    border: var(--mc-border-width-default) solid var(--mc-colour-border);
    border-radius: var(--mc-radius-2);
  }

  @media (forced-colors: active) {
    .mc-list[data-variant='divided'] {
      color: CanvasText;
      background: Canvas;
      border-color: CanvasText;
    }
  }
</style>
