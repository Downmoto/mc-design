<script lang="ts">
  import { setMenuRadioContext } from './menu-context.js';
  import type { MenuRadioGroupProps } from './menu.types.js';

  const generatedId = $props.id();

  let {
    children,
    class: className = '',
    id,
    label,
    value = $bindable(''),
    ...attributes
  }: MenuRadioGroupProps = $props();

  let groupId = $derived(id ?? `${generatedId}-radio-group`);
  let labelId = $derived(`${groupId}-label`);

  setMenuRadioContext({
    getValue: () => value,
    setValue: (nextValue) => (value = nextValue),
  });
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
