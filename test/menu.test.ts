import { fireEvent, render, waitFor } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import MenuExample from './fixtures/MenuExample.svelte';

describe('Menu', () => {
  it('renders a labelled, closed menu and exposes trigger state', () => {
    const { getAllByRole, getByRole } = render(MenuExample);
    const trigger = getByRole('button', { name: 'Actions' });
    const menu = getAllByRole('menu', { hidden: true })[0];

    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls', menu.id);
    expect(menu).toHaveAttribute('aria-labelledby', trigger.id);
    expect(menu).not.toBeVisible();
  });

  it('opens from its button and focuses the first item', async () => {
    const { getByRole, getByTestId } = render(MenuExample);
    const trigger = getByRole('button', { name: 'Actions' });

    await fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(getByRole('menuitem', { name: 'New file' })).toHaveFocus();
    expect(getByTestId('open')).toHaveTextContent('true');
  });

  it('opens to either edge with arrow keys', async () => {
    const { getByRole } = render(MenuExample);
    const trigger = getByRole('button', { name: 'Actions' });

    await fireEvent.keyDown(trigger, { key: 'ArrowUp' });
    expect(getByRole('menuitem', { name: 'Delete file' })).toHaveFocus();

    await fireEvent.keyDown(getByRole('menuitem', { name: 'Delete file' }), {
      key: 'Escape',
    });
    await fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(getByRole('menuitem', { name: 'New file' })).toHaveFocus();
  });

  it('prevents a disabled menu from opening', async () => {
    const { getByRole, getByTestId } = render(MenuExample, { disabled: true });
    const trigger = getByRole('button', { name: 'Actions' });

    expect(trigger).toBeDisabled();
    await fireEvent.click(trigger);
    expect(getByTestId('open')).toHaveTextContent('false');
  });

  it('supports arrow, boundary, and typeahead navigation', async () => {
    const { getByRole } = render(MenuExample);
    await fireEvent.click(getByRole('button', { name: 'Actions' }));

    const first = getByRole('menuitem', { name: 'New file' });
    const open = getByRole('menuitem', { name: 'Open file' });
    const disabled = getByRole('menuitem', { name: 'Unavailable action' });
    const danger = getByRole('menuitem', { name: 'Delete file' });

    await fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(open).toHaveFocus();

    await fireEvent.keyDown(open, { key: 'ArrowDown' });
    expect(disabled).toHaveFocus();
    expect(disabled).toHaveAttribute('aria-disabled', 'true');

    await fireEvent.keyDown(disabled, { key: 'End' });
    expect(danger).toHaveFocus();

    await fireEvent.keyDown(danger, { key: 'Home' });
    expect(first).toHaveFocus();

    await fireEvent.keyDown(first, { key: 'd' });
    const date = getByRole('menuitemradio', { name: 'Date' });
    expect(date).toHaveFocus();

    await fireEvent.keyDown(date, { key: 'e' });
    expect(danger).toHaveFocus();
  });

  it('activates commands, closes, and restores focus', async () => {
    const { getByRole, getByTestId } = render(MenuExample);
    const trigger = getByRole('button', { name: 'Actions' });
    await fireEvent.click(trigger);

    await fireEvent.click(getByRole('menuitem', { name: 'New file' }));

    expect(getByTestId('action')).toHaveTextContent('new');
    expect(getByTestId('open')).toHaveTextContent('false');
    expect(trigger).toHaveFocus();
  });

  it('supports checkbox and radio items without closing when configured', async () => {
    const { getByRole, getByTestId } = render(MenuExample);
    await fireEvent.click(getByRole('button', { name: 'Actions' }));

    const checkbox = getByRole('menuitemcheckbox', { name: 'Show grid' });
    await fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
    expect(getByTestId('grid')).toHaveTextContent('true');
    expect(getByTestId('open')).toHaveTextContent('true');

    const date = getByRole('menuitemradio', { name: 'Date' });
    await fireEvent.click(date);
    expect(date).toHaveAttribute('aria-checked', 'true');
    expect(getByRole('menuitemradio', { name: 'Name' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
    expect(getByTestId('sort')).toHaveTextContent('date');
  });

  it('labels groups and exposes separators', async () => {
    const { getAllByRole, getByRole } = render(MenuExample);
    await fireEvent.click(getByRole('button', { name: 'Actions' }));

    expect(getByRole('group', { name: 'File' })).toBeVisible();
    expect(getByRole('group', { name: 'Sort by' })).toBeVisible();
    expect(getAllByRole('separator')).toHaveLength(2);
  });

  it('opens and closes a nested submenu with keyboard focus', async () => {
    const { getAllByRole, getByRole, getByTestId } = render(MenuExample);
    await fireEvent.click(getByRole('button', { name: 'Actions' }));
    const submenuTrigger = getByRole('menuitem', { name: 'Share' });

    submenuTrigger.focus();
    await fireEvent.keyDown(submenuTrigger, { key: 'ArrowRight' });

    expect(submenuTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(getByRole('menuitem', { name: 'Copy link' })).toHaveFocus();
    expect(getAllByRole('menu')).toHaveLength(2);

    await fireEvent.keyDown(getByRole('menuitem', { name: 'Copy link' }), {
      key: 'ArrowLeft',
    });
    expect(submenuTrigger).toHaveFocus();
    expect(submenuTrigger).toHaveAttribute('aria-expanded', 'false');

    await fireEvent.keyDown(submenuTrigger, { key: 'ArrowRight' });
    await fireEvent.click(getByRole('menuitem', { name: 'Copy link' }));
    expect(getByTestId('action')).toHaveTextContent('copy-link');
    expect(getByTestId('open')).toHaveTextContent('false');
  });

  it('opens a context menu from pointer and keyboard invocation', async () => {
    const { getByRole } = render(MenuExample);
    const target = getByRole('button', { name: 'Canvas target' });

    await fireEvent.contextMenu(target, { clientX: 24, clientY: 32 });
    expect(getByRole('menu', { name: 'Canvas actions' })).toBeVisible();
    expect(getByRole('menuitem', { name: 'Duplicate' })).toHaveFocus();

    await fireEvent.keyDown(getByRole('menuitem', { name: 'Duplicate' }), {
      key: 'Escape',
    });
    expect(target).toHaveFocus();

    await fireEvent.keyDown(target, { key: 'F10', shiftKey: true });
    expect(getByRole('menuitem', { name: 'Duplicate' })).toHaveFocus();
  });

  it('closes on Tab without preventing document navigation', async () => {
    const { getByRole, getByTestId } = render(MenuExample);
    await fireEvent.click(getByRole('button', { name: 'Actions' }));

    await fireEvent.keyDown(getByRole('menuitem', { name: 'New file' }), {
      key: 'Tab',
    });

    await waitFor(() => expect(getByTestId('open')).toHaveTextContent('false'));
  });

  it('closes when a pointer action begins outside the menu', async () => {
    const { getByRole, getByTestId } = render(MenuExample);
    await fireEvent.click(getByRole('button', { name: 'Actions' }));

    await fireEvent.pointerDown(document.body);

    expect(getByTestId('open')).toHaveTextContent('false');
  });

  it('supports compact sizing and consumer mapping', () => {
    const { container } = render(MenuExample, {
      consumer: 'website',
      size: 'compact',
    });
    const menu = container.querySelector('.mc-menu');
    const content = container.querySelector('.mc-menu__content');

    expect(menu).toHaveAttribute('data-size', 'compact');
    expect(menu).toHaveAttribute('data-mc-product', 'website');
    expect(content).toHaveAttribute('data-size', 'compact');
    expect(content).toHaveAttribute('data-mc-product', 'website');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container, getByRole } = render(MenuExample);
    await fireEvent.click(getByRole('button', { name: 'Actions' }));
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
