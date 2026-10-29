<script lang="ts">
  import type { EmptyStateProps } from './empty-state.types.js';

  const generatedId = $props.id();

  let {
    actions,
    children,
    class: className = '',
    leadingIcon,
    title,
    ...attributes
  }: EmptyStateProps = $props();

  const titleId = `${generatedId}-title`;
</script>

<div
  {...attributes}
  class={`mc-empty-state ${className}`.trim()}
  role="group"
  aria-labelledby={titleId}
>
  {#if leadingIcon}
    <div class="mc-empty-state__icon" aria-hidden="true">
      {@render leadingIcon()}
    </div>
  {/if}
  <div class="mc-empty-state__content">
    <div class="mc-empty-state__title" id={titleId}>{title}</div>
    {#if children}
      <div class="mc-empty-state__description">{@render children()}</div>
    {/if}
  </div>
  {#if actions}
    <div class="mc-empty-state__actions">{@render actions()}</div>
  {/if}
</div>

<style>
  .mc-empty-state {
    display: grid;
    justify-items: center;
    box-sizing: border-box;
    inline-size: 100%;
    min-inline-size: 0;
    gap: var(--mc-space-4);
    padding: var(--mc-space-7) var(--mc-space-5);
    color: var(--mc-colour-text-primary);
    text-align: center;
  }

  .mc-empty-state__icon {
    inline-size: var(--mc-size-icon-feature);
    block-size: var(--mc-size-icon-feature);
    color: var(--mc-colour-text-secondary);
  }

  .mc-empty-state__content {
    display: grid;
    justify-items: center;
    max-inline-size: var(--mc-size-reading-maximum);
    gap: var(--mc-space-2);
  }

  .mc-empty-state__title {
    font-family: var(--mc-typography-section-title-family);
    font-size: var(--mc-typography-section-title-size);
    font-weight: var(--mc-typography-section-title-weight);
    line-height: var(--mc-typography-section-title-line-height);
  }

  .mc-empty-state__description {
    color: var(--mc-colour-text-secondary);
    font-family: var(--mc-typography-body-family);
    font-size: var(--mc-typography-body-size);
    font-weight: var(--mc-typography-body-weight);
    line-height: var(--mc-typography-body-line-height);
    overflow-wrap: anywhere;
  }

  .mc-empty-state__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--mc-space-2);
  }

  @media (forced-colors: active) {
    .mc-empty-state,
    .mc-empty-state__icon,
    .mc-empty-state__description {
      color: CanvasText;
    }
  }
</style>
