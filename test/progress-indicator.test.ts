import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import { ProgressIndicator } from '../src/lib/index.js';

describe('ProgressIndicator', () => {
  it('renders a labelled native progress element and percentage', () => {
    const { getByRole, getByText } = render(ProgressIndicator, {
      label: 'Processing files',
      max: 200,
      value: 120,
    });
    const progress = getByRole('progressbar', { name: 'Processing files' });

    expect(progress).toHaveAttribute('max', '200');
    expect(progress).toHaveAttribute('value', '120');
    expect(getByText('60%')).toBeInTheDocument();
  });

  it('renders an indeterminate state when value is omitted', () => {
    const { container, getByRole, queryByText } = render(ProgressIndicator, {
      label: 'Uploading',
    });

    expect(getByRole('progressbar', { name: 'Uploading' })).not.toHaveAttribute(
      'value',
    );
    expect(container.firstElementChild).toHaveAttribute(
      'data-indeterminate',
      'true',
    );
    expect(
      container.querySelector('.mc-progress__indeterminate'),
    ).toBeInTheDocument();
    expect(queryByText(/%/)).not.toBeInTheDocument();
  });

  it('clamps the visible percentage to the available range', () => {
    const { getByRole, getByText } = render(ProgressIndicator, {
      label: 'Exporting',
      max: 80,
      value: 120,
    });

    expect(getByRole('progressbar', { name: 'Exporting' })).toHaveAttribute(
      'value',
      '120',
    );
    expect(getByText('100%')).toBeInTheDocument();
  });

  it('supports compact sizing, consumer mapping, and hidden values', () => {
    const { container, queryByText } = render(ProgressIndicator, {
      consumer: 'website',
      label: 'Loading preview',
      showValue: false,
      size: 'compact',
      value: 40,
    });

    expect(container.firstElementChild).toHaveAttribute('data-size', 'compact');
    expect(container.firstElementChild).toHaveAttribute(
      'data-mc-product',
      'website',
    );
    expect(
      container.querySelector('.mc-progress__indeterminate'),
    ).not.toBeInTheDocument();
    expect(queryByText('40%')).not.toBeInTheDocument();
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(ProgressIndicator, {
      label: 'Processing files',
      value: 60,
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
