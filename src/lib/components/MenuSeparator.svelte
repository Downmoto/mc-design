<script lang="ts">
  import type { MenuSeparatorProps } from './menu.types.js';

  let { class: className = '', ...attributes }: MenuSeparatorProps = $props();
</script>

<div
  {...attributes}
  class={`mc-menu-separator ${className}`.trim()}
  role="separator"
  aria-orientation="horizontal"
></div>
