<script lang="ts">
  import mBorderInverse from '../assets/m-border-inverse.svg?url';
  import mBorder from '../assets/m-border.svg?url';
  import mInverse from '../assets/m-inverse.svg?url';
  import m from '../assets/m-no-border.svg?url';
  import mcInverse from '../assets/mc-inverse.svg?url';
  import mc from '../assets/mc.svg?url';
  import memoryCoreInverse from '../assets/MemoryCore-inverse.svg?url';
  import memoryCore from '../assets/MemoryCore.svg?url';
  import type { LogoProps } from './logo.types.js';

  let {
    alt = 'MemoryCore',
    appearance = 'default',
    class: className = '',
    variant = 'wordmark-full',
    ...attributes
  }: LogoProps = $props();

  const sources = {
    default: {
      mark: m,
      'mark-bordered': mBorder,
      wordmark: mc,
      'wordmark-full': memoryCore,
    },
    inverse: {
      mark: mInverse,
      'mark-bordered': mBorderInverse,
      wordmark: mcInverse,
      'wordmark-full': memoryCoreInverse,
    },
  };

  let source = $derived(sources[appearance][variant]);
</script>

<img
  {...attributes}
  {alt}
  src={source}
  class={`mc-logo ${className}`.trim()}
  data-appearance={appearance}
  data-variant={variant}
/>

<style>
  .mc-logo {
    display: block;
    max-inline-size: 100%;
    block-size: auto;
  }
</style>
