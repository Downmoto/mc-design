import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import ToolbarExample from './fixtures/ToolbarExample.svelte';

describe('Toolbar', () => {
  it('renders a labelled horizontal toolbar by default', () => {
    const { getByRole } = render(ToolbarExample);
    const toolbar = getByRole('toolbar', { name: 'Document tools' });

    expect(toolbar).toHaveClass('mc-toolbar', 'custom-toolbar');
    expect(toolbar).toHaveAttribute('aria-orientation', 'horizontal');
    expect(toolbar).toHaveAttribute('data-variant', 'ghost');
    expect(toolbar).toHaveAttribute('data-example', 'document');
  });

  it('supports a surface variant', () => {
    const { getByRole } = render(ToolbarExample, { variant: 'surface' });

    expect(getByRole('toolbar', { name: 'Document tools' })).toHaveAttribute(
      'data-variant',
      'surface',
    );
  });

  it('keeps one enabled action in the tab order', () => {
    const { getByRole } = render(ToolbarExample);

    expect(getByRole('button', { name: 'Undo' })).toHaveAttribute(
      'tabindex',
      '0',
    );
    expect(getByRole('button', { name: 'Delete' })).toHaveAttribute(
      'tabindex',
      '-1',
    );
    expect(getByRole('button', { name: 'Redo' })).toBeDisabled();
  });

  it('moves focus with horizontal arrow, Home, and End keys', async () => {
    const { getByRole } = render(ToolbarExample);
    const undo = getByRole('button', { name: 'Undo' });
    const remove = getByRole('button', { name: 'Delete' });

    undo.focus();
    await fireEvent.keyDown(undo, { key: 'ArrowRight' });
    expect(remove).toHaveFocus();
    expect(remove).toHaveAttribute('tabindex', '0');

    await fireEvent.keyDown(remove, { key: 'ArrowRight' });
    expect(undo).toHaveFocus();

    await fireEvent.keyDown(undo, { key: 'End' });
    expect(remove).toHaveFocus();

    await fireEvent.keyDown(remove, { key: 'Home' });
    expect(undo).toHaveFocus();
  });

  it('uses vertical arrow keys for a vertical toolbar', async () => {
    const { getByRole } = render(ToolbarExample, {
      orientation: 'vertical',
    });
    const toolbar = getByRole('toolbar', { name: 'Document tools' });
    const undo = getByRole('button', { name: 'Undo' });
    const remove = getByRole('button', { name: 'Delete' });

    expect(toolbar).toHaveAttribute('aria-orientation', 'vertical');
    undo.focus();
    await fireEvent.keyDown(undo, { key: 'ArrowDown' });
    expect(remove).toHaveFocus();

    await fireEvent.keyDown(remove, { key: 'ArrowRight' });
    expect(remove).toHaveFocus();
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(ToolbarExample);
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
