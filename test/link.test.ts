import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Link } from '../src/lib/index.js';
import ConsumerLink from './fixtures/ConsumerLink.svelte';

const label = createRawSnippet(() => ({
  render: () => '<span>About MemoryCore</span>',
}));

describe('Link', () => {
  it('renders a native anchor with a required destination', () => {
    const { getByRole } = render(Link, {
      children: label,
      href: '/about',
    });
    const link = getByRole('link', { name: 'About MemoryCore' });

    expect(link).toHaveAttribute('href', '/about');
    expect(link).not.toHaveAttribute('data-mc-product');
  });

  it('applies a consumer from its prop', () => {
    const { getByRole } = render(Link, {
      children: label,
      consumer: 'dithertool',
      href: '/about',
    });

    expect(getByRole('link', { name: 'About MemoryCore' })).toHaveAttribute(
      'data-mc-product',
      'dithertool',
    );
  });

  it('inherits a consumer and allows its prop to override it', () => {
    const inherited = render(ConsumerLink, { consumer: 'website' });
    expect(inherited.getByRole('link')).toHaveAttribute(
      'data-mc-product',
      'website',
    );
    inherited.unmount();

    const overridden = render(ConsumerLink, {
      consumer: 'website',
      linkConsumer: 'aetheltool',
    });
    expect(overridden.getByRole('link')).toHaveAttribute(
      'data-mc-product',
      'aetheltool',
    );
  });

  it('passes native attributes and events through', async () => {
    const onclick = vi.fn((event: MouseEvent) => event.preventDefault());
    const { getByRole } = render(Link, {
      props: {
        children: label,
        href: '#about',
        onclick,
        rel: 'external',
        target: '_blank',
      },
    });
    const link = getByRole('link', { name: 'About MemoryCore' });

    await fireEvent.click(link);

    expect(onclick).toHaveBeenCalledOnce();
    expect(link).toHaveAttribute('rel', 'external');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(Link, {
      children: label,
      href: '/about',
    });

    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
