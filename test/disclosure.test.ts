import { fireEvent, render, waitFor } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import DisclosureExample from './fixtures/DisclosureExample.svelte';

describe('Disclosure', () => {
  it('renders a native closed disclosure', () => {
    const { container, getByText } = render(DisclosureExample);
    const disclosure = container.querySelector('details');

    expect(disclosure).not.toHaveAttribute('open');
    expect(getByText('Project details').closest('summary')).toBeTruthy();
    expect(getByText('Project content')).not.toBeVisible();
  });

  it('toggles content and its bound open state', async () => {
    const { getByTestId, getByText } = render(DisclosureExample);
    const summary = getByText('Project details').closest('summary');

    expect(summary).toBeTruthy();
    await fireEvent.click(summary!);

    expect(getByText('Project content')).toBeVisible();
    await waitFor(() => expect(getByTestId('open')).toHaveTextContent('true'));
  });

  it('accepts an initially open state', () => {
    const { container, getByText } = render(DisclosureExample, {
      initialOpen: true,
    });

    expect(container.querySelector('details')).toHaveAttribute('open');
    expect(getByText('Project content')).toBeVisible();
  });

  it('supports compact sizing, consumer mapping, and native attributes', () => {
    const { container } = render(DisclosureExample, {
      consumer: 'website',
      size: 'compact',
    });
    const disclosure = container.querySelector('details');

    expect(disclosure).toHaveClass('custom-disclosure');
    expect(disclosure).toHaveAttribute('data-example', 'project');
    expect(disclosure).toHaveAttribute('data-size', 'compact');
    expect(disclosure).toHaveAttribute('data-mc-product', 'website');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(DisclosureExample, { initialOpen: true });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
