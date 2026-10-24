<script lang="ts">
  import { getConsumerContext } from '../consumer-context.js';
  import type { LinkProps } from './link.types.js';

  let {
    children,
    class: className = '',
    consumer,
    href,
    ...attributes
  }: LinkProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
</script>

<a
  {...attributes}
  class={`mc-link ${className}`.trim()}
  data-mc-product={resolvedConsumer}
  {href}
>
  {@render children()}
</a>

<style>
  .mc-link {
    color: var(--mc-colour-interactive);
    text-decoration-line: underline;
    text-decoration-thickness: var(--mc-border-width-default);
    text-underline-offset: var(--mc-space-1);
    transition:
      color var(--mc-motion-duration-direct) var(--mc-motion-easing-default),
      text-decoration-thickness var(--mc-motion-duration-direct)
        var(--mc-motion-easing-default);
  }

  .mc-link:hover {
    text-decoration-thickness: var(--mc-border-width-emphasised);
  }

  .mc-link:focus-visible {
    outline: var(--mc-border-width-emphasised) solid
      var(--mc-colour-text-primary);
    outline-offset: 0;
  }

  .mc-link:active {
    color: var(--mc-colour-text-primary);
  }

  @media (forced-colors: active) {
    .mc-link {
      color: LinkText;
      forced-color-adjust: auto;
    }

    .mc-link:focus-visible {
      outline-color: Highlight;
    }

    .mc-link:active {
      color: ActiveText;
    }
  }
</style>
