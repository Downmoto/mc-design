import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { RadioGroup } from '../src/lib/index.js';

const options = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
  { label: 'System', value: 'system' },
];

describe('RadioGroup', () => {
  it('renders a labelled native radio group', () => {
    const { getByRole } = render(RadioGroup, {
      label: 'Theme',
      name: 'theme',
      options,
      value: 'dark',
    });

    expect(getByRole('group', { name: 'Theme' })).toBeInTheDocument();
    expect(getByRole('radio', { name: 'Dark' })).toBeChecked();
    expect(getByRole('radio', { name: 'Light' })).toHaveAttribute(
      'name',
      'theme',
    );
  });

  it('connects descriptions and errors to the group', () => {
    const { getByRole, getByText, rerender } = render(RadioGroup, {
      description: 'Applies across this device',
      label: 'Theme',
      options,
    });
    const group = getByRole('group', { name: 'Theme' });
    const description = getByText('Applies across this device');

    expect(group).toHaveAttribute('aria-describedby', description.id);

    rerender({
      error: 'Choose a theme',
      label: 'Theme',
      options,
      required: true,
    });

    const error = getByText('Choose a theme');
    expect(group).toHaveAttribute('aria-describedby', error.id);
    expect(getByRole('radio', { name: 'Dark' })).toBeRequired();
    expect(getByRole('radio', { name: 'Dark' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('supports option descriptions and disabled states', () => {
    const { getByRole, getByText } = render(RadioGroup, {
      label: 'Theme',
      options: [
        {
          description: 'Follow the operating system',
          label: 'System',
          value: 'system',
        },
        { disabled: true, label: 'Automatic', value: 'automatic' },
      ],
    });

    const system = getByRole('radio', { name: 'System' });
    const description = getByText('Follow the operating system');
    expect(system).toHaveAttribute('aria-describedby', description.id);
    expect(getByRole('radio', { name: 'Automatic' })).toBeDisabled();
  });

  it('supports compact and disabled groups', () => {
    const { container, getAllByRole } = render(RadioGroup, {
      disabled: true,
      label: 'Theme',
      options,
      size: 'compact',
    });

    expect(container.firstElementChild).toHaveAttribute('data-size', 'compact');
    for (const radio of getAllByRole('radio')) expect(radio).toBeDisabled();
  });

  it('updates selection and passes native events through the group', async () => {
    const onchange = vi.fn();
    const { getByRole } = render(RadioGroup, {
      label: 'Theme',
      onchange,
      options,
      value: 'dark',
    });

    await fireEvent.click(getByRole('radio', { name: 'Light' }));

    expect(getByRole('radio', { name: 'Light' })).toBeChecked();
    expect(onchange).toHaveBeenCalledOnce();
  });

  it('applies a consumer mapping', () => {
    const { container } = render(RadioGroup, {
      consumer: 'website',
      label: 'Theme',
      options,
    });

    expect(container.firstElementChild).toHaveAttribute(
      'data-mc-product',
      'website',
    );
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(RadioGroup, {
      description: 'Applies across this device',
      label: 'Theme',
      options,
      required: true,
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
