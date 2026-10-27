<script lang="ts">
  import { flushSync, onMount } from 'svelte';
  import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
  import CheckIcon from 'phosphor-svelte/lib/CheckIcon';

  import { getConsumerContext } from '../consumer-context.js';
  import MenuSurface from './internal/MenuSurface.svelte';
  import type { MenuPosition } from './internal/menu-position.js';
  import type { MenuController } from './menu-context.js';
  import type { SelectProps } from './select.types.js';

  type OptionRecord = {
    disabled: boolean;
    index: number;
    label: string;
    value: string;
  };

  type OptionEntry =
    | { kind: 'option'; option: OptionRecord }
    | {
        kind: 'group';
        index: number;
        label: string;
        options: OptionRecord[];
      };

  const generatedId = $props.id();

  let {
    'aria-describedby': ariaDescribedby,
    'aria-invalid': ariaInvalid,
    children,
    class: className = '',
    consumer,
    description = '',
    disabled = false,
    error = '',
    id,
    label,
    required = false,
    size = 'standard',
    value = $bindable(),
    ...attributes
  }: SelectProps = $props();

  const inheritedConsumer = getConsumerContext();
  let resolvedConsumer = $derived(consumer ?? inheritedConsumer?.());
  let controlId = $derived(id ?? `${generatedId}-control`);
  let labelId = $derived(`${controlId}-label`);
  let listboxId = $derived(`${controlId}-listbox`);
  let message = $derived(error || description);
  let messageId = $derived(`${controlId}-message`);
  let describedBy = $derived(
    [ariaDescribedby, message ? messageId : undefined]
      .filter(Boolean)
      .join(' ') || undefined,
  );

  let nativeElement: HTMLSelectElement;
  let triggerElement: HTMLButtonElement;
  let controller: MenuController | undefined;
  let entries = $state<OptionEntry[]>([]);
  let open = $state(false);
  let activeIndex = $state(-1);
  let keyboardActive = $state(false);
  let typeahead = '';
  let typeaheadTimer: ReturnType<typeof setTimeout> | undefined;

  let options = $derived(
    entries.flatMap((entry) =>
      entry.kind === 'group' ? entry.options : [entry.option],
    ),
  );
  let selectedOption = $derived(
    options.find((option) => option.value === value) ?? options[0],
  );
  let activeOptionId = $derived(
    open && activeIndex >= 0 ? `${controlId}-option-${activeIndex}` : undefined,
  );

  function readOption(
    option: HTMLOptionElement,
    index: number,
    groupDisabled = false,
  ): OptionRecord {
    return {
      disabled: groupDisabled || option.disabled,
      index,
      label: option.label,
      value: option.value,
    };
  }

  function syncOptions(): void {
    if (!nativeElement) return;

    let optionIndex = 0;
    let groupIndex = 0;
    const nextEntries: OptionEntry[] = [];

    for (const child of Array.from(nativeElement.children)) {
      if (child instanceof HTMLOptionElement) {
        nextEntries.push({
          kind: 'option',
          option: readOption(child, optionIndex++),
        });
      } else if (child instanceof HTMLOptGroupElement) {
        const groupOptions = Array.from(child.children)
          .filter((option): option is HTMLOptionElement =>
            option.matches('option'),
          )
          .map((option) => readOption(option, optionIndex++, child.disabled));

        nextEntries.push({
          index: groupIndex++,
          kind: 'group',
          label: child.label,
          options: groupOptions,
        });
      }
    }

    entries = nextEntries;
  }

  onMount(() => {
    syncOptions();

    const observer = new MutationObserver(syncOptions);
    observer.observe(nativeElement, {
      attributeFilter: ['disabled', 'label', 'value'],
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });

    const form = nativeElement.form;
    const syncReset = () =>
      queueMicrotask(() => {
        value = nativeElement.value;
        syncOptions();
      });
    const focusTrigger = () => triggerElement.focus();
    form?.addEventListener('reset', syncReset);
    nativeElement.addEventListener('invalid', focusTrigger);

    return () => {
      observer.disconnect();
      form?.removeEventListener('reset', syncReset);
      nativeElement.removeEventListener('invalid', focusTrigger);
      clearTimeout(typeaheadTimer);
    };
  });

  function getPosition(): MenuPosition {
    return {
      align: 'start',
      anchor: triggerElement,
      kind: 'anchor',
      side: 'block',
    };
  }

  function enabledOptions(): OptionRecord[] {
    return options.filter((option) => !option.disabled);
  }

  function initialIndex(edge: 'first' | 'last' | 'selected'): number {
    if (edge === 'selected' && selectedOption && !selectedOption.disabled) {
      return selectedOption.index;
    }

    const enabled = enabledOptions();
    return edge === 'last'
      ? (enabled.at(-1)?.index ?? -1)
      : (enabled[0]?.index ?? -1);
  }

  function show(
    edge: 'first' | 'last' | 'selected' = 'selected',
    fromKeyboard = false,
  ): void {
    if (disabled) return;
    syncOptions();
    activeIndex = initialIndex(edge);
    keyboardActive = fromKeyboard;
    flushSync(() => (open = true));
  }

  function hide(restoreFocus = true): void {
    keyboardActive = false;
    controller?.close(restoreFocus);
  }

  function moveActive(offset: -1 | 1): void {
    const enabled = enabledOptions();
    if (enabled.length === 0) return;
    const current = enabled.findIndex((option) => option.index === activeIndex);
    const next =
      current === -1
        ? offset === 1
          ? 0
          : enabled.length - 1
        : (current + offset + enabled.length) % enabled.length;
    activeIndex = enabled[next]?.index ?? -1;
    keyboardActive = true;
  }

  function selectOption(option: OptionRecord): void {
    if (option.disabled) return;

    const changed = nativeElement.selectedIndex !== option.index;
    nativeElement.selectedIndex = option.index;
    value = option.value;
    if (changed) {
      nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
      nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
    }
    hide(true);
  }

  function moveByTypeahead(key: string): void {
    clearTimeout(typeaheadTimer);
    typeahead += key.toLocaleLowerCase();
    typeaheadTimer = setTimeout(() => (typeahead = ''), 500);

    const enabled = enabledOptions();
    const currentIndex = enabled.findIndex((option) =>
      open
        ? option.index === activeIndex
        : option.value === selectedOption?.value,
    );
    const ordered = [
      ...enabled.slice(currentIndex + 1),
      ...enabled.slice(0, currentIndex + 1),
    ];
    const match = ordered.find((option) =>
      option.label.toLocaleLowerCase().startsWith(typeahead),
    );
    if (!match) return;

    if (open) {
      activeIndex = match.index;
      keyboardActive = true;
    } else {
      selectOption(match);
    }
  }

  function handleClick(): void {
    if (open) hide(false);
    else show('selected');
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (disabled) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (open) moveActive(event.key === 'ArrowDown' ? 1 : -1);
      else show('selected', true);
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      if (!open) return;
      event.preventDefault();
      activeIndex = initialIndex(event.key === 'Home' ? 'first' : 'last');
      keyboardActive = true;
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!open) {
        show('selected', true);
      } else {
        const option = options.find((item) => item.index === activeIndex);
        if (option) selectOption(option);
      }
      return;
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      hide(false);
      return;
    }

    if (event.key === 'Tab' && open) {
      hide(false);
      return;
    }

    if (
      event.key.length === 1 &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      moveByTypeahead(event.key);
    }
  }

  $effect(() => {
    if (disabled && open) hide(false);
  });
</script>

<div
  class={`mc-select ${className}`.trim()}
  data-disabled={disabled || undefined}
  data-error={Boolean(error) || undefined}
  data-mc-product={resolvedConsumer}
  data-size={size}
>
  <label class="mc-select__label" id={labelId} for={controlId}>
    <span>{label}</span>
    {#if required}
      <span class="mc-select__required" aria-hidden="true">*</span>
    {/if}
  </label>
  <div class="mc-select__control-shell">
    <select
      {...attributes}
      bind:this={nativeElement}
      class="mc-select__native"
      id={`${controlId}-native`}
      tabindex="-1"
      aria-hidden="true"
      {disabled}
      {required}
      bind:value
    >
      {@render children()}
    </select>
    <button
      bind:this={triggerElement}
      class="mc-select__control"
      id={controlId}
      type="button"
      role="combobox"
      aria-activedescendant={activeOptionId}
      aria-controls={listboxId}
      aria-describedby={describedBy}
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-invalid={error ? 'true' : ariaInvalid}
      aria-required={required || undefined}
      {disabled}
      onclick={handleClick}
      onkeydown={handleKeydown}
    >
      <span class="mc-select__value">{selectedOption?.label ?? ''}</span>
      <span class="mc-select__icon" aria-hidden="true">
        <CaretDownIcon />
      </span>
    </button>
  </div>

  {#snippet optionItem(option: OptionRecord)}
    <button
      class="mc-menu-item mc-select__option"
      id={`${controlId}-option-${option.index}`}
      type="button"
      role="option"
      tabindex="-1"
      data-mc-select-option
      data-mc-menu-label={option.label}
      data-active={keyboardActive && activeIndex === option.index
        ? 'true'
        : undefined}
      aria-disabled={option.disabled || undefined}
      aria-selected={option.value === value}
      onpointerdown={(event) => event.preventDefault()}
      onpointermove={() => {
        activeIndex = option.index;
        keyboardActive = false;
      }}
      onclick={() => selectOption(option)}
    >
      <span class="mc-menu-item__label">{option.label}</span>
      <span class="mc-menu-item__icon" aria-hidden="true">
        {#if option.value === value}<CheckIcon />{/if}
      </span>
    </button>
  {/snippet}

  <MenuSurface
    bind:open
    id={listboxId}
    role="listbox"
    itemSelector="[data-mc-select-option]"
    manageFocus={false}
    labelledby={labelId}
    consumer={resolvedConsumer}
    {size}
    getTrigger={() => triggerElement}
    {getPosition}
    onconnect={(value) => (controller = value)}
  >
    {#each entries as entry}
      {#if entry.kind === 'group'}
        <div
          class="mc-menu-group"
          role="group"
          aria-labelledby={`${controlId}-group-${entry.index}`}
        >
          <div
            class="mc-menu-group__label"
            id={`${controlId}-group-${entry.index}`}
          >
            {entry.label}
          </div>
          {#each entry.options as option}
            {@render optionItem(option)}
          {/each}
        </div>
      {:else}
        {@render optionItem(entry.option)}
      {/if}
    {/each}
  </MenuSurface>

  {#if message}
    <span
      class="mc-select__message"
      id={messageId}
      aria-live={error ? 'polite' : undefined}>{message}</span
    >
  {/if}
</div>

<style>
  .mc-select {
    --mc-select-block-size: var(--mc-size-control-standard);
    --mc-select-icon-size: var(--mc-size-icon-standard);
  }

  .mc-select[data-size='compact'] {
    --mc-select-block-size: var(--mc-size-control-compact);
    --mc-select-icon-size: var(--mc-size-icon-compact);
  }

  .mc-select__native {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip-path: inset(50%);
  }

  .mc-select__control {
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content;
    align-items: center;
    block-size: var(--mc-select-block-size);
    min-block-size: var(--mc-select-block-size);
    padding: 0
      calc(var(--mc-space-3) + var(--mc-select-icon-size) + var(--mc-space-2)) 0
      var(--mc-space-3);
    text-align: start;
    appearance: none;
    cursor: pointer;
  }

  .mc-select__value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mc-select__icon {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-end: var(--mc-space-3);
    display: grid;
    inline-size: var(--mc-select-icon-size);
    block-size: var(--mc-select-icon-size);
    place-items: center;
    color: var(--mc-colour-text-secondary);
    pointer-events: none;
    transform: translateY(-50%);
  }

  .mc-select__option[data-active='true'] {
    color: var(--mc-colour-background);
    background: var(--mc-colour-interactive);
  }

  .mc-select[data-disabled='true'] .mc-select__icon {
    opacity: 0.5;
  }
</style>
