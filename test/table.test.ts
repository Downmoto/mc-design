import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import TableExample from './fixtures/TableExample.svelte';

describe('Table', () => {
  it('renders native table semantics and standard defaults', () => {
    const { getAllByRole, getByRole, getByText } = render(TableExample);
    const table = getByRole('table', { name: 'Component releases' });

    expect(table.tagName).toBe('TABLE');
    expect(table).toHaveClass('mc-table', 'custom-table');
    expect(table).toHaveAttribute('data-example', 'releases');
    expect(table).toHaveAttribute('data-size', 'standard');
    expect(table).toHaveAttribute('data-variant', 'plain');
    expect(getByText('Component releases').tagName).toBe('CAPTION');
    expect(getAllByRole('columnheader')).toHaveLength(2);
    expect(getAllByRole('rowheader')).toHaveLength(2);
  });

  it('supports density, containment, and native table sections', () => {
    const { getAllByRole, getByRole } = render(TableExample, {
      size: 'compact',
      variant: 'divided',
      withFooter: true,
    });
    const table = getByRole('table', { name: 'Component releases' });

    expect(table).toHaveAttribute('data-size', 'compact');
    expect(table).toHaveAttribute('data-variant', 'divided');
    expect(table.querySelector('thead')).toBeInTheDocument();
    expect(table.querySelector('tbody')).toBeInTheDocument();
    expect(table.querySelector('tfoot')).toBeInTheDocument();
    expect(getAllByRole('rowheader')).toHaveLength(3);
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(TableExample, {
      variant: 'divided',
      withFooter: true,
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
