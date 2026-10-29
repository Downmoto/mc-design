import { fireEvent, render, waitFor } from '@testing-library/svelte';
import axe from 'axe-core';
import { afterEach, describe, expect, it, vi } from 'vitest';

import SidebarExample from './fixtures/SidebarExample.svelte';

function mockViewport(initialMatches: boolean): (matches: boolean) => void {
  let matches = initialMatches;
  const listeners = new Set<() => void>();
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      addEventListener: (_type: string, listener: () => void) =>
        listeners.add(listener),
      get matches() {
        return matches;
      },
      media: '(max-width: 767px)',
      onchange: null,
      removeEventListener: (_type: string, listener: () => void) =>
        listeners.delete(listener),
    })),
  );

  return (value: boolean) => {
    matches = value;
    for (const listener of listeners) listener();
  };
}

afterEach(() => {
  document.documentElement.style.overflow = '';
  vi.unstubAllGlobals();
});

describe('Sidebar', () => {
  it('renders native navigation structure and composed regions', () => {
    const { container, getAllByRole, getByRole, getByText } =
      render(SidebarExample);
    const sidebar = getByRole('complementary');
    const navigation = getByRole('navigation', { name: 'Primary' });

    expect(sidebar).toHaveAttribute('data-side', 'start');
    expect(sidebar).toHaveAttribute('data-variant', 'attached');
    expect(sidebar).toHaveAttribute('data-collapsible', 'icon');
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    expect(navigation).toContainElement(getByText('MemoryCore'));
    expect(navigation).toContainElement(getByText('Account'));
    expect(getAllByRole('list')).toHaveLength(2);
    expect(getByRole('link', { name: 'Overview' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(container.querySelector('.mc-sidebar-content')).toBeInTheDocument();
  });

  it('toggles desktop icon collapse from the trigger', async () => {
    const { getByRole, getByTestId } = render(SidebarExample);
    const sidebar = getByRole('complementary');

    await fireEvent.click(getByRole('button', { name: 'Collapse navigation' }));
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    expect(getByTestId('open')).toHaveTextContent('false');

    await fireEvent.click(getByRole('button', { name: 'Expand navigation' }));
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    expect(getByTestId('open')).toHaveTextContent('true');
  });

  it('supports variants, logical placement, badges, actions, and buttons', () => {
    const { getByRole } = render(SidebarExample, {
      collapsible: 'offcanvas',
      side: 'end',
      variant: 'floating',
    });
    const sidebar = getByRole('complementary');

    expect(sidebar).toHaveAttribute('data-side', 'end');
    expect(sidebar).toHaveAttribute('data-variant', 'floating');
    expect(sidebar).toHaveAttribute('data-collapsible', 'offcanvas');
    expect(getByRole('button', { name: 'Add project' })).toBeVisible();
    expect(getByRole('button', { name: 'Settings' })).toBeDisabled();
  });

  it('opens as a mobile modal and closes from navigation', async () => {
    mockViewport(true);
    const { getByRole, getByTestId, queryByRole } = render(SidebarExample);
    const trigger = getByRole('button', { name: 'Expand navigation' });

    trigger.focus();
    await fireEvent.click(trigger);

    const dialog = await waitFor(() =>
      getByRole('dialog', { name: 'Primary' }),
    );
    expect(dialog).toHaveAttribute('open');
    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(getByTestId('mobile-open')).toHaveTextContent('true');

    await fireEvent.click(getByRole('link', { name: 'Overview' }));
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(queryByRole('dialog', { name: 'Primary' })).toBeNull();
    expect(document.documentElement.style.overflow).toBe('');
    expect(getByTestId('mobile-open')).toHaveTextContent('false');
  });

  it('closes the mobile modal with Escape and restores focus', async () => {
    mockViewport(true);
    const { getByRole } = render(SidebarExample);
    const trigger = getByRole('button', { name: 'Expand navigation' });

    trigger.focus();
    await fireEvent.click(trigger);
    const dialog = await waitFor(() =>
      getByRole('dialog', { name: 'Primary' }),
    );
    await fireEvent(dialog, new Event('cancel', { cancelable: true }));

    await waitFor(() => expect(trigger).toHaveFocus());
    expect(dialog).not.toHaveAttribute('open');
  });

  it('preserves desktop collapse state across the mobile breakpoint', async () => {
    const setMobile = mockViewport(false);
    const { getByRole, getByTestId } = render(SidebarExample);

    await fireEvent.click(getByRole('button', { name: 'Collapse navigation' }));
    expect(getByTestId('open')).toHaveTextContent('false');

    setMobile(true);
    await waitFor(() =>
      expect(getByRole('button', { name: 'Expand navigation' })).toBeVisible(),
    );
    await fireEvent.click(getByRole('button', { name: 'Expand navigation' }));
    expect(getByTestId('mobile-open')).toHaveTextContent('true');

    setMobile(false);
    await waitFor(() =>
      expect(getByRole('complementary')).toHaveAttribute(
        'data-state',
        'collapsed',
      ),
    );
    expect(getByTestId('open')).toHaveTextContent('false');
    expect(getByTestId('mobile-open')).toHaveTextContent('false');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(SidebarExample);
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });

  it('has no automatically detectable mobile accessibility violations', async () => {
    mockViewport(true);
    const { container, getByRole } = render(SidebarExample);
    await fireEvent.click(getByRole('button', { name: 'Expand navigation' }));
    await waitFor(() => getByRole('dialog', { name: 'Primary' }));

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
