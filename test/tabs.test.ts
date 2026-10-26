import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import TabsExample from './fixtures/TabsExample.svelte';

describe('Tabs', () => {
  it('renders a labelled tab list and selected panel', () => {
    const { getByRole } = render(TabsExample);
    const overview = getByRole('tab', { name: 'Overview' });

    expect(getByRole('tablist', { name: 'Project sections' })).toHaveClass(
      'mc-tabs__list',
    );
    expect(overview).toHaveAttribute('aria-selected', 'true');
    expect(overview).toHaveAttribute('aria-controls', getByRole('tabpanel').id);
    expect(getByRole('tabpanel')).toHaveTextContent('overview panel');
  });

  it('updates the bound value when a tab is selected', async () => {
    const { getByRole, getByTestId } = render(TabsExample);

    await fireEvent.click(getByRole('tab', { name: 'Activity' }));

    expect(getByRole('tab', { name: 'Activity' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(getByRole('tabpanel')).toHaveTextContent('activity panel');
    expect(getByTestId('value')).toHaveTextContent('activity');
  });

  it('uses arrow, Home, and End keys while skipping disabled tabs', async () => {
    const { getByRole } = render(TabsExample);
    const overview = getByRole('tab', { name: 'Overview' });
    const activity = getByRole('tab', { name: 'Activity' });
    const settings = getByRole('tab', { name: 'Settings' });

    overview.focus();
    await fireEvent.keyDown(overview, { key: 'ArrowRight' });
    expect(activity).toHaveFocus();
    expect(activity).toHaveAttribute('aria-selected', 'true');

    await fireEvent.keyDown(activity, { key: 'ArrowRight' });
    expect(overview).toHaveFocus();
    expect(settings).toBeDisabled();

    await fireEvent.keyDown(overview, { key: 'End' });
    expect(activity).toHaveFocus();

    await fireEvent.keyDown(activity, { key: 'Home' });
    expect(overview).toHaveFocus();
  });

  it('falls back to the first enabled tab', () => {
    const { getByRole, getByTestId } = render(TabsExample, {
      initialValue: 'missing',
    });

    expect(getByRole('tab', { name: 'Overview' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(getByTestId('value')).toHaveTextContent('overview');
  });

  it('supports compact sizing and consumer mapping', () => {
    const { container } = render(TabsExample, {
      consumer: 'website',
      size: 'compact',
    });
    const tabs = container.querySelector('.mc-tabs');

    expect(tabs).toHaveClass('custom-tabs');
    expect(tabs).toHaveAttribute('data-example', 'project');
    expect(tabs).toHaveAttribute('data-size', 'compact');
    expect(tabs).toHaveAttribute('data-mc-product', 'website');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(TabsExample);
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
