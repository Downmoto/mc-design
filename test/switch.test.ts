import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from '../src/lib/index.js';

describe('Switch', () => {
  it('renders a labelled native switch', () => {
    const { container, getByRole } = render(Switch, {
      checked: true,
      label: 'Enable notifications',
      name: 'notifications',
    });
    const control = getByRole('switch', { name: 'Enable notifications' });

    expect(control).toBeChecked();
    expect(control).toHaveAttribute('name', 'notifications');
    expect(container.querySelector('.mc-switch__message')).toBeNull();
  });

  it('connects its description to the control', () => {
    const { getByRole, getByText } = render(Switch, {
      description: 'Receive a notice when processing finishes',
      label: 'Enable notifications',
    });
    const control = getByRole('switch', { name: 'Enable notifications' });
    const description = getByText('Receive a notice when processing finishes');

    expect(control).toHaveAttribute('aria-describedby', description.id);
  });

  it('communicates errors and the native required state', () => {
    const { getByRole, getByText } = render(Switch, {
      error: 'Enable this setting to continue',
      label: 'Enable notifications',
      required: true,
    });
    const control = getByRole('switch', { name: 'Enable notifications' });
    const error = getByText('Enable this setting to continue');

    expect(control).toBeRequired();
    expect(control).toHaveAttribute('aria-invalid', 'true');
    expect(control).toHaveAttribute('aria-describedby', error.id);
  });

  it('supports compact and disabled controls', () => {
    const { container, getByRole } = render(Switch, {
      disabled: true,
      label: 'Enable notifications',
      size: 'compact',
    });

    expect(
      getByRole('switch', { name: 'Enable notifications' }),
    ).toBeDisabled();
    expect(container.firstElementChild).toHaveAttribute('data-size', 'compact');
  });

  it('passes native events to the switch', async () => {
    const onchange = vi.fn();
    const { getByRole } = render(Switch, {
      label: 'Enable notifications',
      onchange,
    });
    const control = getByRole('switch', { name: 'Enable notifications' });

    await fireEvent.click(control);

    expect(control).toBeChecked();
    expect(onchange).toHaveBeenCalledOnce();
  });

  it('applies a consumer mapping', () => {
    const { container } = render(Switch, {
      consumer: 'website',
      label: 'Enable notifications',
    });

    expect(container.firstElementChild).toHaveAttribute(
      'data-mc-product',
      'website',
    );
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(Switch, {
      checked: true,
      description: 'Receive a notice when processing finishes',
      label: 'Enable notifications',
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
