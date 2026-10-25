<script lang="ts">
  import type { TypographyProps } from './typography.types.js';

  const elements = {
    display: 'div',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    p: 'p',
    blockquote: 'blockquote',
    list: 'ul',
    'inline-code': 'code',
    lead: 'p',
    large: 'div',
    small: 'small',
    muted: 'p',
  } as const;

  let {
    children,
    class: className = '',
    variant = 'p',
    ...attributes
  }: TypographyProps = $props();

  let element = $derived(elements[variant]);
</script>

<svelte:element
  this={element}
  {...attributes}
  class={`mc-typography ${className}`.trim()}
  data-variant={variant}
>
  {@render children()}
</svelte:element>

<style>
  .mc-typography {
    margin: 0;
    color: var(--mc-colour-text-primary);
    overflow-wrap: anywhere;
  }

  .mc-typography[data-variant='display'] {
    font-family: var(--mc-typography-display-family);
    font-size: calc(
      var(--mc-typography-brand-heading-size) +
        var(--mc-typography-brand-heading-size)
    );
    font-weight: var(--mc-typography-display-weight);
    line-height: var(--mc-typography-display-line-height);
    text-wrap: balance;
  }

  .mc-typography[data-variant='h1'] {
    font-family: var(--mc-typography-brand-heading-family);
    font-size: var(--mc-typography-brand-heading-size);
    font-weight: var(--mc-typography-brand-heading-weight);
    line-height: var(--mc-typography-brand-heading-line-height);
    text-wrap: balance;
  }

  .mc-typography[data-variant='h2'] {
    font-family: var(--mc-typography-page-title-family);
    font-size: var(--mc-typography-page-title-size);
    font-weight: var(--mc-typography-page-title-weight);
    line-height: var(--mc-typography-page-title-line-height);
    text-wrap: balance;
  }

  .mc-typography[data-variant='h3'] {
    font-family: var(--mc-typography-section-title-family);
    font-size: var(--mc-typography-section-title-size);
    font-weight: var(--mc-typography-section-title-weight);
    line-height: var(--mc-typography-section-title-line-height);
    text-wrap: balance;
  }

  .mc-typography[data-variant='h4'] {
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-brand-heading-weight);
    line-height: var(--mc-typography-page-title-line-height);
    text-wrap: balance;
  }

  .mc-typography[data-variant='p'],
  .mc-typography[data-variant='blockquote'],
  .mc-typography[data-variant='list'],
  .mc-typography[data-variant='lead'],
  .mc-typography[data-variant='large'] {
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-body-weight);
    line-height: var(--mc-typography-body-line-height);
  }

  .mc-typography[data-variant='blockquote'] {
    padding-inline-start: var(--mc-space-4);
    border-inline-start: var(--mc-border-width-emphasised) solid
      var(--mc-colour-border);
    font-style: italic;
  }

  .mc-typography[data-variant='list'] {
    padding-inline-start: var(--mc-space-5);
    list-style: disc;
  }

  .mc-typography[data-variant='list'] :global(li + li) {
    margin-block-start: var(--mc-space-2);
  }

  .mc-typography[data-variant='inline-code'] {
    display: inline;
    padding: var(--mc-space-1) var(--mc-space-2);
    border-radius: var(--mc-radius-1);
    background: var(--mc-colour-surface);
    font-family: var(--mc-typography-code-family);
    font-size: var(--mc-typography-code-size);
    font-weight: var(--mc-typography-code-weight);
    line-height: var(--mc-typography-code-line-height);
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }

  .mc-typography[data-variant='lead'] {
    color: var(--mc-colour-text-secondary);
  }

  .mc-typography[data-variant='large'] {
    font-weight: var(--mc-typography-brand-heading-weight);
  }

  .mc-typography[data-variant='small'] {
    font-family: var(--mc-typography-label-family);
    font-size: var(--mc-typography-label-size);
    font-weight: var(--mc-typography-label-weight);
    line-height: var(--mc-typography-label-line-height);
  }

  .mc-typography[data-variant='muted'] {
    color: var(--mc-colour-text-secondary);
    font-family: var(--mc-typography-caption-family);
    font-size: var(--mc-typography-caption-size);
    font-weight: var(--mc-typography-caption-weight);
    line-height: var(--mc-typography-caption-line-height);
  }
</style>
