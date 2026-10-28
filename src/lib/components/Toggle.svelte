<script lang="ts">
  import type { Component } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  import Button from './Button.svelte';
  import type { ToggleProps } from './toggle.types.js';

  const ToggleButton = Button as Component<Record<string, unknown>>;

  let {
    appearance = 'ghost',
    children,
    class: className = '',
    onclick,
    pressed = $bindable(false),
    ...buttonProps
  }: ToggleProps = $props();

  function handleClick(
    event: MouseEvent & { currentTarget: HTMLButtonElement },
  ): void {
    (onclick as HTMLButtonAttributes['onclick'])?.(event);
    if (!event.defaultPrevented) pressed = !pressed;
  }
</script>

<ToggleButton
  {...buttonProps}
  class={`mc-toggle ${className}`.trim()}
  {appearance}
  aria-pressed={pressed}
  onclick={handleClick}
>
  {@render children()}
</ToggleButton>
