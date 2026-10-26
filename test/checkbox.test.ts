import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from '../src/lib/index.js';

describe('Checkbox', () => {
  it('renders a labelled native checkbox', () => {
    const { container, getByRole } = render(Checkbox, {
      checked: true,
      label: 'Include metadata',
      name: 'metadata',
    });
    const checkbox = getByRole('checkbox', { name: 'Include metadata' });

    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('name', 'metadata');
    expect(container.querySelector('.mc-checkbox__message')).toBeNull();
  });

  it('supports an indeterminate state', () => {
    const { getByRole } = render(Checkbox, {
      indeterminate: true,
      label: 'Select all files',
    });

    expect(
      getByRole('checkbox', { name: 'Select all files' }),
    ).toBePartiallyChecked();
  });

  it('communicates errors without making the message toggle the control', async () => {
    const { getByRole, getByText } = render(Checkbox, {
      error: 'Accept the licence to continue',
      label: 'Accept licence',
      required: true,
    });
    const checkbox = getByRole('checkbox', { name: 'Accept licence' });
    const error = getByText('Accept the licence to continue');

    expect(checkbox).toBeRequired();
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAttribute('aria-describedby', error.id);

    await fireEvent.click(error);

    expect(checkbox).not.toBeChecked();
  });

  it('supports compact and disabled controls', () => {
    const { container, getByRole } = render(Checkbox, {
      disabled: true,
      label: 'Include metadata',
      size: 'compact',
    });

    expect(getByRole('checkbox', { name: 'Include metadata' })).toBeDisabled();
    expect(container.firstElementChild).toHaveAttribute('data-size', 'compact');
  });

  it('passes native events to the checkbox', async () => {
    const onchange = vi.fn();
    const { getByRole } = render(Checkbox, {
      label: 'Include metadata',
      onchange,
    });
    const checkbox = getByRole('checkbox', { name: 'Include metadata' });

    await fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(onchange).toHaveBeenCalledOnce();
  });

  it('applies a consumer mapping', () => {
    const { container } = render(Checkbox, {
      consumer: 'website',
      label: 'Include metadata',
    });

    expect(container.firstElementChild).toHaveAttribute(
      'data-mc-product',
      'website',
    );
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(Checkbox, {
      checked: true,
      label: 'Include metadata',
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
