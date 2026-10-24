import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { IconButton } from '../src/lib/index.js';

const icon = createRawSnippet(() => ({
  render: () =>
    '<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M0 0h1v1H0z" /></svg>',
}));

describe('IconButton', () => {
  it('requires a visible tooltip and accessible name', () => {
    const { getByRole } = render(IconButton, {
      children: icon,
      label: 'Add item',
    });
    const button = getByRole('button', { name: 'Add item' });

    expect(button).toHaveAttribute('aria-label', 'Add item');
    expect(button).toHaveAttribute('title', 'Add item');
    expect(button).toHaveAttribute('data-size', 'standard');
  });

  it('supports a distinct tooltip', () => {
    const { getByRole } = render(IconButton, {
      children: icon,
      label: 'Add item',
      tooltip: 'Add a new item',
    });

    expect(getByRole('button', { name: 'Add item' })).toHaveAttribute(
      'title',
      'Add a new item',
    );
  });

  it('prevents repeat activation while loading', async () => {
    const onclick = vi.fn();
    const { getByRole } = render(IconButton, {
      children: icon,
      label: 'Add item',
      loading: true,
      onclick,
    });
    const button = getByRole('button', { name: 'Add item' });

    await fireEvent.click(button);

    expect(onclick).not.toHaveBeenCalled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(IconButton, {
      children: icon,
      label: 'Add item',
    });

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
