import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import ToggleExample from './fixtures/ToggleExample.svelte';

describe('Toggle', () => {
  it('renders an unpressed native button by default', () => {
    const { getByRole } = render(ToggleExample);
    const toggle = getByRole('button', { name: 'Bold' });

    expect(toggle).toHaveClass('mc-button', 'mc-toggle', 'custom-toggle');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(toggle).toHaveAttribute('data-example', 'bold');
    expect(toggle).toHaveAttribute('data-appearance', 'ghost');
  });

  it('supports the secondary Button appearance', () => {
    const { getByRole } = render(ToggleExample, { appearance: 'secondary' });

    expect(getByRole('button', { name: 'Bold' })).toHaveAttribute(
      'data-appearance',
      'secondary',
    );
  });

  it('updates its pressed state and binding', async () => {
    const { getByRole, getByTestId } = render(ToggleExample);
    const labelled = getByRole('button', { name: 'Bold' });
    const icon = getByRole('button', { name: 'Bold icon' });

    await fireEvent.click(labelled);
    expect(labelled).toHaveAttribute('aria-pressed', 'true');
    expect(icon).toHaveAttribute('aria-pressed', 'true');
    expect(getByTestId('pressed')).toHaveTextContent('true');

    await fireEvent.click(icon);
    expect(labelled).toHaveAttribute('aria-pressed', 'false');
    expect(getByTestId('pressed')).toHaveTextContent('false');
  });

  it('preserves the pressed state when disabled', async () => {
    const { getByRole, getByTestId } = render(ToggleExample, {
      disabled: true,
    });
    const toggle = getByRole('button', { name: 'Bold' });

    expect(toggle).toBeDisabled();
    await fireEvent.click(toggle);
    expect(getByTestId('pressed')).toHaveTextContent('false');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(ToggleExample);
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
