import { createRawSnippet } from 'svelte';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '../src/lib/index.js';

const options = createRawSnippet(() => ({
  render: () => `
    <optgroup label="Themes">
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="system">System</option>
    </optgroup>
  `,
}));

describe('Select', () => {
  it('renders a labelled combobox backed by a native form control', () => {
    const { container, getByRole } = render(Select, {
      children: options,
      label: 'Theme',
      name: 'theme',
      value: 'dark',
    });
    const combobox = getByRole('combobox', { name: 'Theme' });
    const select = container.querySelector('select');

    expect(combobox).toHaveTextContent('Dark');
    expect(select).toHaveAttribute('name', 'theme');
    expect(select).toHaveValue('dark');
    expect(select).toHaveDisplayValue('Dark');
    expect(container.querySelector('.mc-select__message')).toBeNull();
  });

  it('connects its description to the control', () => {
    const { getByRole, getByText } = render(Select, {
      children: options,
      description: 'Applies across this device',
      label: 'Theme',
    });
    const select = getByRole('combobox', { name: 'Theme' });
    const description = getByText('Applies across this device');

    expect(select).toHaveAttribute('aria-describedby', description.id);
  });

  it('communicates errors and the native required state', () => {
    const { getByRole, getByText } = render(Select, {
      children: options,
      error: 'Choose a theme',
      label: 'Theme',
      required: true,
    });
    const select = getByRole('combobox', { name: 'Theme' });
    const nativeSelect = document.querySelector('select');
    const error = getByText('Choose a theme');

    expect(select).toHaveAttribute('aria-required', 'true');
    expect(nativeSelect).toBeRequired();
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby', error.id);
  });

  it('supports compact and disabled controls', () => {
    const { container, getByRole } = render(Select, {
      children: options,
      disabled: true,
      label: 'Theme',
      size: 'compact',
    });

    expect(getByRole('combobox', { name: 'Theme' })).toBeDisabled();
    expect(container.querySelector('select')).toBeDisabled();
    expect(container.firstElementChild).toHaveAttribute('data-size', 'compact');
  });

  it('passes native events to the select', async () => {
    const onchange = vi.fn();
    const { container, getByRole } = render(Select, {
      children: options,
      label: 'Theme',
      onchange,
    });
    const combobox = getByRole('combobox', { name: 'Theme' });
    const select = container.querySelector('select') as HTMLSelectElement;

    await fireEvent.change(select, { target: { value: 'light' } });

    expect(select).toHaveValue('light');
    expect(combobox).toHaveTextContent('Light');
    expect(onchange).toHaveBeenCalledOnce();
  });

  it('uses the shared menu surface with listbox semantics', async () => {
    const onchange = vi.fn();
    const { getByRole } = render(Select, {
      children: options,
      label: 'Theme',
      onchange,
      value: 'dark',
    });
    const combobox = getByRole('combobox', { name: 'Theme' });

    await fireEvent.click(combobox);

    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(getByRole('listbox', { name: 'Theme' })).toBeVisible();
    expect(getByRole('option', { name: 'Dark' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    await fireEvent.click(getByRole('option', { name: 'Light' }));

    expect(combobox).toHaveTextContent('Light');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(onchange).toHaveBeenCalledOnce();
  });

  it('locks page scrolling containers while open', async () => {
    const { container, getByRole } = render(Select, {
      children: options,
      label: 'Theme',
      value: 'dark',
    });
    const combobox = getByRole('combobox', { name: 'Theme' });
    const siblingScroller = document.createElement('div');
    container.style.overflow = 'auto';
    siblingScroller.style.overflow = 'auto';
    document.body.append(siblingScroller);

    await fireEvent.click(combobox);

    expect(container.style.overflow).toBe('hidden');
    expect(siblingScroller.style.overflow).toBe('hidden');
    expect(document.documentElement.style.overflow).toBe('hidden');

    await fireEvent.click(getByRole('option', { name: 'Light' }));

    expect(container.style.overflow).toBe('auto');
    expect(siblingScroller.style.overflow).toBe('auto');
    expect(document.documentElement.style.overflow).toBe('');
    siblingScroller.remove();
  });

  it('supports listbox keyboard selection and dismissal', async () => {
    const { getByRole } = render(Select, {
      children: options,
      label: 'Theme',
      value: 'dark',
    });
    const combobox = getByRole('combobox', { name: 'Theme' });

    await fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    await fireEvent.keyDown(combobox, { key: 'ArrowDown' });

    expect(combobox).toHaveAttribute(
      'aria-activedescendant',
      getByRole('option', { name: 'Light' }).id,
    );

    await fireEvent.keyDown(combobox, { key: 'Enter' });
    await waitFor(() => expect(combobox).toHaveTextContent('Light'));

    await fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    await fireEvent.keyDown(combobox, { key: 'Escape' });

    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).toHaveFocus();
  });

  it('applies a consumer mapping', () => {
    const { container } = render(Select, {
      children: options,
      consumer: 'website',
      label: 'Theme',
    });

    expect(container.firstElementChild).toHaveAttribute(
      'data-mc-product',
      'website',
    );
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(Select, {
      children: options,
      description: 'Applies across this device',
      label: 'Theme',
      required: true,
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
