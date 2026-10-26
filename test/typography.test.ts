import { createRawSnippet } from 'svelte';
import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import { Typography } from '../src/lib/index.js';

const content = createRawSnippet(() => ({
  render: () => 'Build with intent',
}));

describe('Typography', () => {
  it('renders a paragraph by default', () => {
    const { container, getByText } = render(Typography, {
      children: content,
    });
    const paragraph = container.querySelector('p');

    expect(paragraph).toBe(getByText('Build with intent'));
    expect(paragraph).toHaveAttribute('data-variant', 'p');
  });

  it.each([
    ['display', 'div'],
    ['h1', 'h1'],
    ['h2', 'h2'],
    ['h3', 'h3'],
    ['h4', 'h4'],
    ['p', 'p'],
    ['blockquote', 'blockquote'],
    ['list', 'ul'],
    ['inline-code', 'code'],
    ['lead', 'p'],
    ['large', 'div'],
    ['small', 'small'],
    ['muted', 'p'],
  ] as const)('renders the %s pattern as <%s>', (variant, element) => {
    const { container } = render(Typography, {
      children: content,
      variant,
    });

    expect(container.querySelector(element)).toHaveAttribute(
      'data-variant',
      variant,
    );
  });

  it('passes native attributes and classes to the rendered element', () => {
    const { getByRole } = render(Typography, {
      children: content,
      class: 'page-heading',
      id: 'page-heading',
      variant: 'h2',
    });
    const heading = getByRole('heading', {
      level: 2,
      name: 'Build with intent',
    });

    expect(heading).toHaveClass('mc-typography', 'page-heading');
    expect(heading).toHaveAttribute('id', 'page-heading');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(Typography, {
      children: content,
      variant: 'h1',
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
