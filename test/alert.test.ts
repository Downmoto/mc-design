import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import AlertExample from './fixtures/AlertExample.svelte';

describe('Alert', () => {
  it('renders static content without an implicit live-region role', () => {
    const { getByText } = render(AlertExample);
    const alert = getByText('Project updated').closest('.mc-alert');

    expect(alert).toHaveTextContent(
      'The new settings are available to everyone.',
    );
    expect(alert).toHaveAttribute('data-size', 'standard');
    expect(alert).toHaveAttribute('data-tone', 'neutral');
    expect(alert).not.toHaveAttribute('role');
  });

  it('supports live-region roles through native attributes', () => {
    const { getByRole } = render(AlertExample, { role: 'alert' });

    expect(getByRole('alert')).toHaveTextContent('Project updated');
  });

  it('supports tone, size, consumer mapping, icons, and native attributes', () => {
    const { container, getByText } = render(AlertExample, {
      consumer: 'website',
      size: 'compact',
      tone: 'success',
      withIcon: true,
    });
    const alert = getByText('Project updated').closest('.mc-alert');

    expect(alert).toHaveClass('custom-alert');
    expect(alert).toHaveAttribute('data-example', 'project');
    expect(alert).toHaveAttribute('data-mc-product', 'website');
    expect(alert).toHaveAttribute('data-size', 'compact');
    expect(alert).toHaveAttribute('data-tone', 'success');
    expect(container.querySelector('.mc-alert__icon svg')).toBeInTheDocument();
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(AlertExample, {
      role: 'alert',
      tone: 'warning',
      withIcon: true,
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
