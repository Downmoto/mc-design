import { fireEvent, render, waitFor } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import ToastExample from './fixtures/ToastExample.svelte';

describe('Toast', () => {
  it('announces its complete message politely by default', () => {
    const { getByRole } = render(ToastExample);
    const toast = getByRole('status');

    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
    expect(toast).toHaveTextContent('Project saved');
    expect(toast).toHaveTextContent('The latest changes are available.');
  });

  it('dismisses without moving focus and reports closure', async () => {
    const { getByRole, getByTestId } = render(ToastExample);
    const dismiss = getByRole('button', { name: 'Dismiss notification' });

    dismiss.focus();
    await fireEvent.click(dismiss);

    expect(getByRole('status', { hidden: true })).not.toBeVisible();
    expect(getByTestId('open')).toHaveTextContent('false');
    expect(getByTestId('close-count')).toHaveTextContent('1');
  });

  it('dismisses after the configured timeout', async () => {
    const { getByRole, getByTestId } = render(ToastExample, { timeout: 20 });

    await waitFor(() => {
      expect(getByRole('status', { hidden: true })).not.toBeVisible();
    });
    expect(getByTestId('close-count')).toHaveTextContent('1');
  });

  it('pauses its timeout while hovered', async () => {
    const { getByRole } = render(ToastExample, { timeout: 40 });
    const toast = getByRole('status');

    await fireEvent.pointerEnter(toast);
    await new Promise((resolve) => setTimeout(resolve, 60));
    expect(toast).toBeVisible();

    await fireEvent.pointerLeave(toast);
    await waitFor(() => expect(toast).not.toBeVisible());
  });

  it('remains paused while either pointer or focus is within it', async () => {
    const { getByRole } = render(ToastExample, { timeout: 40 });
    const toast = getByRole('status');
    const dismiss = getByRole('button', { name: 'Dismiss notification' });

    await fireEvent.pointerEnter(toast);
    await fireEvent.focusIn(toast);
    await fireEvent.focusOut(toast, { relatedTarget: document.body });
    await new Promise((resolve) => setTimeout(resolve, 60));

    expect(dismiss).toBeVisible();

    await fireEvent.pointerLeave(toast);
    await waitFor(() => expect(toast).not.toBeVisible());
  });

  it('supports presentation, consumer mapping, and native attributes', () => {
    const { container, queryByRole } = render(ToastExample, {
      consumer: 'website',
      dismissible: false,
      size: 'compact',
      tone: 'success',
      withIcon: true,
    });
    const toast = container.querySelector('.mc-toast');
    const alert = container.querySelector('.mc-toast__alert');

    expect(toast).toHaveClass('custom-toast');
    expect(toast).toHaveAttribute('data-example', 'saved');
    expect(toast).toHaveAttribute('data-size', 'compact');
    expect(toast).toHaveAttribute('data-tone', 'success');
    expect(alert).toHaveAttribute('data-mc-product', 'website');
    expect(container.querySelector('.mc-alert__icon svg')).toBeInTheDocument();
    expect(
      queryByRole('button', { name: 'Dismiss notification' }),
    ).not.toBeInTheDocument();
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(ToastExample, {
      tone: 'warning',
      withIcon: true,
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
