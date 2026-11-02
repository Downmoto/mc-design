import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import borderedMarkInverse from '../src/lib/assets/m-border-inverse.svg?url';
import fullWordmark from '../src/lib/assets/MemoryCore.svg?url';
import { Logo } from '../src/lib/index.js';

describe('Logo', () => {
  it('renders the full wordmark by default', () => {
    const { getByRole } = render(Logo);
    const logo = getByRole('img', { name: 'MemoryCore' });

    expect(logo).toHaveClass('mc-logo');
    expect(logo).toHaveAttribute('data-appearance', 'default');
    expect(logo).toHaveAttribute('data-variant', 'wordmark-full');
    expect(logo).toHaveAttribute('src', fullWordmark);
  });

  it('supports each identity, inverse treatment, and native image attributes', () => {
    const { getByRole } = render(Logo, {
      alt: 'MemoryCore mark',
      appearance: 'inverse',
      class: 'site-logo',
      'data-example': 'brand',
      height: 48,
      variant: 'mark-bordered',
      width: 48,
    });
    const logo = getByRole('img', { name: 'MemoryCore mark' });

    expect(logo).toHaveClass('site-logo');
    expect(logo).toHaveAttribute('data-appearance', 'inverse');
    expect(logo).toHaveAttribute('data-example', 'brand');
    expect(logo).toHaveAttribute('data-variant', 'mark-bordered');
    expect(logo).toHaveAttribute('height', '48');
    expect(logo).toHaveAttribute('src', borderedMarkInverse);
    expect(logo).toHaveAttribute('width', '48');
  });

  it('permits a decorative logo', () => {
    const { container } = render(Logo, { alt: '', variant: 'mark' });

    expect(container.querySelector('.mc-logo')).toHaveAttribute('alt', '');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(Logo, {
      alt: 'MemoryCore logo',
      appearance: 'inverse',
      variant: 'wordmark',
    });
    const results = await axe.run(container);

    expect(results.violations).toEqual([]);
  });
});
