<script lang="ts">
  import type { SidebarGroupProps } from './sidebar.types.js';

  const generatedId = $props.id();

  let {
    action,
    children,
    class: className = '',
    label,
    ...attributes
  }: SidebarGroupProps = $props();

  const labelId = `${generatedId}-label`;
</script>

<section
  {...attributes}
  class={`mc-sidebar-group ${className}`.trim()}
  aria-labelledby={label ? labelId : undefined}
>
  {#if label || action}
    <div class="mc-sidebar-group__heading">
      {#if label}
        <div class="mc-sidebar-group__label" id={labelId}>{label}</div>
      {/if}
      {#if action}
        <div class="mc-sidebar-group__action">{@render action()}</div>
      {/if}
    </div>
  {/if}
  <div class="mc-sidebar-group__content">{@render children()}</div>
</section>

<style>
  .mc-sidebar-group {
    display: grid;
    min-inline-size: 0;
    gap: var(--mc-space-1);
    padding-block: var(--mc-space-2);
  }

  .mc-sidebar-group__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-inline-size: 0;
    min-block-size: var(--mc-size-target-minimum);
    padding-inline: var(--mc-space-2);
  }

  .mc-sidebar-group__label {
    color: var(--mc-colour-text-secondary);
    font-family: var(--mc-typography-caption-family);
    font-size: var(--mc-typography-caption-size);
    font-weight: var(--mc-font-weight-medium);
    line-height: var(--mc-typography-caption-line-height);
    overflow-wrap: anywhere;
  }

  .mc-sidebar-group__action {
    display: flex;
    flex: 0 0 auto;
    margin-inline-end: calc(-1 * var(--mc-space-2));
  }

  .mc-sidebar-group__content {
    min-inline-size: 0;
  }

  :global(.mc-sidebar[data-state='collapsed'][data-collapsible='icon'])
    .mc-sidebar-group__heading {
    display: none;
  }
</style>
