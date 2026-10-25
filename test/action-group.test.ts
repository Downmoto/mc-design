import { createRawSnippet } from 'svelte';
import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import { ActionGroup } from '../src/lib/index.js';
import ActionGroups from './fixtures/ActionGroups.svelte';

const actions = createRawSnippet(() => ({
  render: () =>
    '<button type="button">First</button><button type="button">Second</button>',
}));

describe('ActionGroup', () => {
  it('renders a horizontal, spaced group by default', () => {
    const { getByRole } = render(ActionGroup, {
      'aria-label': 'Editing actions',
      children: actions,
      class: 'custom-group',
      'data-example': 'editing',
    });
    const group = getByRole('group', { name: 'Editing actions' });

    expect(group).toHaveClass('mc-action-group', 'custom-group');
    expect(group).toHaveAttribute('data-orientation', 'horizontal');
    expect(group).not.toHaveAttribute('data-joined');
    expect(group).toHaveAttribute('data-example', 'editing');
  });

  it('supports joined vertical groups', () => {
    const { getByRole } = render(ActionGroup, {
      'aria-label': 'Zoom actions',
      children: actions,
      joined: true,
      orientation: 'vertical',
    });
    const group = getByRole('group', { name: 'Zoom actions' });

    expect(group).toHaveAttribute('data-joined', 'true');
    expect(group).toHaveAttribute('data-orientation', 'vertical');
  });

  it('nests joined clusters inside a spaced group', () => {
    const { getAllByRole, getByRole, getByTestId } = render(ActionGroups);

    expect(getByTestId('outer')).not.toHaveAttribute('data-joined');
    expect(getByRole('group', { name: 'History' })).toHaveAttribute(
      'data-joined',
      'true',
    );
    expect(getByRole('group', { name: 'File actions' })).toHaveAttribute(
      'data-joined',
      'true',
    );
    expect(
      getAllByRole('button').map((button) => button.textContent?.trim()),
    ).toEqual(['Undo', 'Redo', 'Save', 'Export']);
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(ActionGroups);
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
