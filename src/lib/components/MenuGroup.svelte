<script lang="ts">
  import type { MenuGroupProps } from './menu.types.js';

  const generatedId = $props.id();

  let {
    children,
    class: className = '',
    id,
    label,
    ...attributes
  }: MenuGroupProps = $props();

  let groupId = $derived(id ?? `${generatedId}-group`);
  let labelId = $derived(`${groupId}-label`);
</script>

<div
  {...attributes}
  class={`mc-menu-group ${className}`.trim()}
  id={groupId}
  role="group"
  aria-labelledby={labelId}
>
  <div class="mc-menu-group__label" id={labelId}>{label}</div>
  {@render children()}
</div>
