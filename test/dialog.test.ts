import { fireEvent, render, waitFor } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import DialogExample from './fixtures/DialogExample.svelte';

describe('Dialog', () => {
  it('opens a labelled native modal dialog', async () => {
    const { getByRole, getByTestId } = render(DialogExample);

    await fireEvent.click(getByRole('button', { name: 'Open dialog' }));

    const dialog = getByRole('dialog', { name: 'Preview resource' });
    expect(dialog).toHaveAttribute('open');
    expect(dialog).toHaveAccessibleDescription(
      'Review the details before continuing.',
    );
    expect(dialog).toHaveTextContent(
      'The selected resource opens in a focused preview.',
    );
    expect(getByTestId('open')).toHaveTextContent('true');
  });

  it('dismisses from the close button and returns focus', async () => {
    const { getByRole, getByTestId } = render(DialogExample);
    const trigger = getByRole('button', { name: 'Open dialog' });

    trigger.focus();
    await fireEvent.click(trigger);
    await fireEvent.click(getByRole('button', { name: 'Close dialog' }));

    await waitFor(() => expect(trigger).toHaveFocus());
    expect(getByRole('dialog', { hidden: true })).not.toHaveAttribute('open');
    expect(getByTestId('open')).toHaveTextContent('false');
    expect(getByTestId('close-count')).toHaveTextContent('1');
  });

  it('dismisses with Escape and backdrop clicks', async () => {
    const { getByRole, getByTestId } = render(DialogExample);
    const trigger = getByRole('button', { name: 'Open dialog' });

    await fireEvent.click(trigger);
    const dialog = getByRole('dialog', { name: 'Preview resource' });
    await fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(getByTestId('open')).toHaveTextContent('false');

    await fireEvent.click(trigger);
    await fireEvent.click(dialog);
    expect(getByTestId('open')).toHaveTextContent('false');
  });

  it('supports non-dismissible presentation and native attributes', async () => {
    const { container, getByRole, queryByRole } = render(DialogExample, {
      consumer: 'website',
      dismissible: false,
      size: 'large',
    });

    await fireEvent.click(getByRole('button', { name: 'Open dialog' }));
    const dialog = getByRole('dialog', { name: 'Preview resource' });
    const cancel = new Event('cancel', { cancelable: true });
    await fireEvent(dialog, cancel);

    expect(dialog).toHaveClass('custom-dialog');
    expect(dialog).toHaveAttribute('data-example', 'preview');
    expect(dialog).toHaveAttribute('data-mc-product', 'website');
    expect(dialog).toHaveAttribute('data-size', 'large');
    expect(dialog).toHaveAttribute('open');
    expect(cancel.defaultPrevented).toBe(true);
    expect(
      queryByRole('button', { name: 'Close dialog' }),
    ).not.toBeInTheDocument();
    expect(container.querySelector('.mc-dialog__footer')).toBeInTheDocument();
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container, getByRole } = render(DialogExample);
    await fireEvent.click(getByRole('button', { name: 'Open dialog' }));

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
