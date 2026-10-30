<script lang="ts">
  import type { ScrollbarProps } from './scrollbar.types.js';

  let { children }: ScrollbarProps = $props();
</script>

<div class="mc-scrollbar">
  {@render children()}
</div>

<style>
  .mc-scrollbar {
    display: contents;
  }
</style>
