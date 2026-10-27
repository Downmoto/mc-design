import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import BadgeExample from './fixtures/BadgeExample.svelte';

describe('Badge', () => {
  it('renders static inline content with standard defaults', () => {
    const { getByText } = render(BadgeExample);
    const badge = getByText('Released').closest('.mc-badge');

    expect(badge).toHaveAttribute('data-size', 'standard');
    expect(badge).toHaveAttribute('data-tone', 'neutral');
    expect(badge).not.toHaveAttribute('role');
  });

  it('supports tone, size, consumer mapping, icons, and native attributes', () => {
    const { container, getByText } = render(BadgeExample, {
      consumer: 'website',
      size: 'compact',
      tone: 'success',
      withIcon: true,
    });
    const badge = getByText('Released').closest('.mc-badge');

    expect(badge).toHaveClass('custom-badge');
    expect(badge).toHaveAttribute('data-example', 'release');
    expect(badge).toHaveAttribute('data-mc-product', 'website');
    expect(badge).toHaveAttribute('data-size', 'compact');
    expect(badge).toHaveAttribute('data-tone', 'success');
    expect(container.querySelector('.mc-badge__icon svg')).toBeInTheDocument();
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(BadgeExample, {
      tone: 'warning',
      withIcon: true,
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
