import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import PanelExample from './fixtures/PanelExample.svelte';

describe('Panel', () => {
  it('renders optional header, content, and footer regions', () => {
    const { container, getByRole, getByText } = render(PanelExample);
    const panel = getByRole('region', { name: 'Layer properties' });

    expect(panel).toHaveClass('mc-panel', 'custom-panel');
    expect(panel).toHaveAttribute('data-example', 'layer');
    expect(container.querySelector('.mc-panel-header')).toContainElement(
      getByRole('heading', { name: 'Layer properties' }),
    );
    expect(container.querySelector('.mc-panel-content')).toContainElement(
      getByText('Opacity and blend controls'),
    );
    expect(container.querySelector('.mc-panel-footer')).toContainElement(
      getByRole('button', { name: 'Apply' }),
    );
  });

  it('supports any combination of optional regions', () => {
    const { container, getByRole } = render(PanelExample, {
      showContent: false,
      showFooter: false,
    });

    expect(getByRole('region', { name: 'Layer properties' })).toBeVisible();
    expect(container.querySelector('.mc-panel-header')).toBeVisible();
    expect(
      container.querySelector('.mc-panel-content'),
    ).not.toBeInTheDocument();
    expect(container.querySelector('.mc-panel-footer')).not.toBeInTheDocument();
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(PanelExample);
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
