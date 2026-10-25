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
    for (const control of [
      ...inherited.getAllByRole('button'),
      inherited.getByRole('link'),
    ]) {
      expect(control).toHaveAttribute('data-mc-product', 'website');
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

  it('renders an anchor when a destination is provided', async () => {
    const onclick = vi.fn((event: MouseEvent) => event.preventDefault());
    const { getByRole } = render(Button, {
      props: {
        children: label,
        href: '/save',
        onclick,
        rel: 'external',
        target: '_blank',
      },
    });
    const link = getByRole('link', { name: 'Save changes' });

    await fireEvent.click(link);

    expect(link).toHaveAttribute('href', '/save');
    expect(link).toHaveAttribute('data-appearance', 'primary');
    expect(link).toHaveAttribute('rel', 'external');
    expect(link).toHaveAttribute('target', '_blank');
    expect(onclick).toHaveBeenCalledOnce();
  });

  it('supports the existing inline link appearance', () => {
    const { getByRole } = render(Button, {
      appearance: 'link',
      children: label,
      href: '/save',
    });

    expect(getByRole('link', { name: 'Save changes' })).toHaveAttribute(
      'data-appearance',
      'link',
    );
  });

  it('supports the ghost appearance', () => {
    const { getByRole } = render(Button, {
      appearance: 'ghost',
      children: label,
    });

    expect(getByRole('button', { name: 'Save changes' })).toHaveAttribute(
      'data-appearance',
      'ghost',
    );
  });

  it('supports accessible square icon sizes', () => {
    const icon = createRawSnippet(() => ({
      render: () =>
        '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12" /></svg>',
    }));
    const { getByRole } = render(Button, {
      'aria-label': 'Add item',
      children: icon,
      size: 'icon',
      title: 'Add item',
    });
    const button = getByRole('button', { name: 'Add item' });

    expect(button).toHaveAttribute('data-size', 'icon');
    expect(button).toHaveAttribute('title', 'Add item');
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

  it('prevents activation when disabled', async () => {
    const onclick = vi.fn();
    const { getByRole } = render(Button, {
      children: label,
      disabled: true,
      onclick,
    });
    const button = getByRole('button', { name: 'Save changes' });

    await fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(onclick).not.toHaveBeenCalled();
  });

  it('removes unavailable anchor destinations and prevents activation', async () => {
    const onclick = vi.fn();
    const { getByRole } = render(Button, {
      children: label,
      href: '/save',
      loading: true,
      onclick,
    });
    const link = getByRole('link', { name: 'Save changes' });

    await fireEvent.click(link);

    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-busy', 'true');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    expect(onclick).not.toHaveBeenCalled();
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
    const icon = createRawSnippet(() => ({
      render: () =>
        '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12" /></svg>',
    }));
    const { container } = render(Button, {
      'aria-label': 'Add item',
      children: icon,
      size: 'icon',
      title: 'Add item',
    });

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
