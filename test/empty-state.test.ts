import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import EmptyStateExample from './fixtures/EmptyStateExample.svelte';

describe('EmptyState', () => {
  it('renders a group named by its visible title', () => {
    const { getByRole, getByText } = render(EmptyStateExample);
    const group = getByRole('group', { name: 'No resources' });

    expect(group).toHaveClass('mc-empty-state', 'custom-empty-state');
    expect(group).toHaveAttribute('data-example', 'resources');
    expect(group).toContainElement(getByText('No resources'));
    expect(group).toContainElement(
      getByText('Create a resource to get started'),
    );
  });

  it('supports optional icon, description, and actions', () => {
    const { container, queryByRole, queryByText } = render(EmptyStateExample, {
      withActions: false,
      withDescription: false,
      withIcon: false,
    });

    expect(container.querySelector('.mc-empty-state__icon')).toBeNull();
    expect(container.querySelector('.mc-empty-state__description')).toBeNull();
    expect(queryByRole('button')).toBeNull();
    expect(queryByText('No resources')).toBeVisible();
  });

  it('hides the decorative icon from assistive technology', () => {
    const { container } = render(EmptyStateExample);
    const icon = container.querySelector('.mc-empty-state__icon');

    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(EmptyStateExample);
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
