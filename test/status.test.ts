import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import StatusExample from './fixtures/StatusExample.svelte';

describe('Status', () => {
  it('renders a polite atomic live region with standard defaults', () => {
    const { getByRole } = render(StatusExample);
    const status = getByRole('status');

    expect(status).toHaveTextContent('Available');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('aria-atomic', 'true');
    expect(status).toHaveAttribute('data-size', 'standard');
    expect(status).toHaveAttribute('data-tone', 'neutral');
    expect(status.querySelector('.mc-status__marker')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('supports tone, size, consumer mapping, and native attributes', () => {
    const { getByRole } = render(StatusExample, {
      consumer: 'website',
      size: 'compact',
      tone: 'success',
    });
    const status = getByRole('status');

    expect(status).toHaveClass('custom-status');
    expect(status).toHaveAttribute('data-example', 'availability');
    expect(status).toHaveAttribute('data-mc-product', 'website');
    expect(status).toHaveAttribute('data-size', 'compact');
    expect(status).toHaveAttribute('data-tone', 'success');
  });

  it('updates the announced message', async () => {
    const { getByRole, rerender } = render(StatusExample);

    await rerender({ label: 'Changes saved' });

    expect(getByRole('status')).toHaveTextContent('Changes saved');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(StatusExample, { tone: 'warning' });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
