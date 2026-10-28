import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import CardExample from './fixtures/CardExample.svelte';

describe('Card', () => {
  it('renders the complete semantic composition', () => {
    const { container, getByRole } = render(CardExample);
    const card = container.querySelector('.mc-card');

    expect(card).toHaveClass('custom-card');
    expect(card).toHaveAttribute('data-example', 'project');
    expect(card).toHaveAttribute('data-mc-product', 'website');
    expect(card).toHaveAttribute('data-orientation', 'vertical');
    expect(card?.querySelector(':scope > .mc-card-hero')).toBeInTheDocument();
    expect(
      getByRole('heading', { name: 'Project atlas' }).closest('header'),
    ).toHaveClass('mc-card-header');
    expect(card?.querySelector(':scope > .mc-card-content')).toHaveTextContent(
      'Project description',
    );
    expect(getByRole('contentinfo')).toHaveClass('mc-card-footer');
  });

  it.each(['vertical', 'horizontal'] as const)(
    'supports every optional-piece combination in %s orientation',
    (orientation) => {
      for (let combination = 0; combination < 16; combination += 1) {
        const parts = {
          hero: Boolean(combination & 1),
          header: Boolean(combination & 2),
          content: Boolean(combination & 4),
          footer: Boolean(combination & 8),
        };
        const { container, unmount } = render(CardExample, {
          ...parts,
          orientation,
        });
        const card = container.querySelector('.mc-card');

        expect(card).toHaveAttribute('data-orientation', orientation);
        expect(card?.children).toHaveLength(
          Object.values(parts).filter(Boolean).length,
        );
        for (const [part, visible] of Object.entries(parts)) {
          expect(Boolean(card?.querySelector(`[data-part="${part}"]`))).toBe(
            visible,
          );
        }

        unmount();
      }
    },
  );

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(CardExample);
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
