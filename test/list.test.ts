import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import ListExample from './fixtures/ListExample.svelte';

describe('List', () => {
  it('renders native list semantics and standard defaults', () => {
    const { getAllByRole, getByRole } = render(ListExample, {
      withRegions: false,
    });
    const list = getByRole('list');

    expect(list.tagName).toBe('UL');
    expect(list).toHaveClass('mc-list', 'custom-list');
    expect(list).toHaveAttribute('data-example', 'resources');
    expect(list).toHaveAttribute('data-size', 'standard');
    expect(list).toHaveAttribute('data-variant', 'plain');
    expect(getAllByRole('listitem')).toHaveLength(2);
  });

  it('supports density, containment, optional regions, and native attributes', () => {
    const { container, getByRole } = render(ListExample, {
      size: 'compact',
      variant: 'divided',
    });
    const list = getByRole('list');
    const firstItem = container.querySelector('.custom-list-item');

    expect(list).toHaveAttribute('data-size', 'compact');
    expect(list).toHaveAttribute('data-variant', 'divided');
    expect(firstItem).toHaveAttribute('data-resource', 'guide');
    expect(firstItem).toHaveAttribute('data-leading', 'true');
    expect(firstItem).toHaveAttribute('data-trailing', 'true');
    expect(
      firstItem?.querySelector('.mc-list-item__leading'),
    ).toHaveTextContent('New');
    expect(
      firstItem?.querySelector('.mc-list-item__trailing'),
    ).toHaveTextContent('4 min');
  });

  it('preserves nested list semantics', () => {
    const { getAllByRole, getByText } = render(ListExample, { nested: true });
    const lists = getAllByRole('list');
    const parentItem = getByText('Design guide').closest('.mc-list-item');

    expect(lists).toHaveLength(2);
    expect(lists[1]).toHaveClass('mc-list');
    expect(parentItem).toContainElement(lists[1]);
    expect(lists[1]).toContainElement(
      getByText('Foundations').closest('.mc-list-item'),
    );
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(ListExample, {
      nested: true,
      variant: 'divided',
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
