import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../src/lib/index.js';
import ConsumerButton from './fixtures/ConsumerButton.svelte';

const label = createRawSnippet(() => ({
  render: () => '<span>Save changes</span>',
}));

describe('Button', () => {
  it('renders a native button with the standard primary defaults', () => {
    const { getByRole } = render(Button, { children: label });
    const button = getByRole('button', { name: 'Save changes' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-appearance', 'primary');
    expect(button).toHaveAttribute('data-size', 'standard');
    expect(button).not.toHaveAttribute('data-mc-product');
    expect(button).toBeEnabled();
  });

  it('applies a consumer from its prop', () => {
    const { getByRole } = render(Button, {
      children: label,
      consumer: 'dithertool',
    });

    expect(getByRole('button', { name: 'Save changes' })).toHaveAttribute(
      'data-mc-product',
      'dithertool',
    );
  });

  it('inherits a consumer and allows its prop to override it', () => {
    const inherited = render(ConsumerButton, { consumer: 'website' });
    for (const button of inherited.getAllByRole('button')) {
      expect(button).toHaveAttribute('data-mc-product', 'website');
    }
    inherited.unmount();

    const overridden = render(ConsumerButton, {
      buttonConsumer: 'aetheltool',
      consumer: 'website',
    });
    expect(
      overridden.getByRole('button', { name: 'Save changes' }),
    ).toHaveAttribute('data-mc-product', 'aetheltool');
    expect(
      overridden.getByRole('button', { name: 'Add item' }),
    ).toHaveAttribute('data-mc-product', 'website');
  });

  it('prevents repeat activation while loading and preserves its label', async () => {
    const onclick = vi.fn();
    const { getByRole } = render(Button, {
      children: label,
      loading: true,
      onclick,
    });
    const button = getByRole('button', { name: 'Save changes' });

    await fireEvent.click(button);

    expect(onclick).not.toHaveBeenCalled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveTextContent('Save changes');
  });

  it('passes native attributes and events through', async () => {
    const onclick = vi.fn();
    const { getByRole } = render(Button, {
      children: label,
      name: 'save',
      onclick,
      type: 'submit',
    });
    const button = getByRole('button', { name: 'Save changes' });

    await fireEvent.click(button);

    expect(onclick).toHaveBeenCalledOnce();
    expect(button).toHaveAttribute('name', 'save');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(Button, { children: label });

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
