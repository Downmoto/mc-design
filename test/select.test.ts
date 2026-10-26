import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
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
  it('renders a labelled native select', () => {
    const { container, getByRole } = render(Select, {
      children: options,
      label: 'Theme',
      name: 'theme',
      value: 'dark',
    });
    const select = getByRole('combobox', { name: 'Theme' });

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
    const error = getByText('Choose a theme');

    expect(select).toBeRequired();
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
    expect(container.firstElementChild).toHaveAttribute('data-size', 'compact');
  });

  it('passes native events to the select', async () => {
    const onchange = vi.fn();
    const { getByRole } = render(Select, {
      children: options,
      label: 'Theme',
      onchange,
    });
    const select = getByRole('combobox', { name: 'Theme' });

    await fireEvent.change(select, { target: { value: 'light' } });

    expect(select).toHaveValue('light');
    expect(onchange).toHaveBeenCalledOnce();
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
