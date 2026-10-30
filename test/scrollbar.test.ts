import { render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import ScrollbarExample from './fixtures/ScrollbarExample.svelte';

describe('Scrollbar', () => {
  it('scopes shared scrollbar styling to its descendants', () => {
    const { container, getByTestId } = render(ScrollbarExample);
    const provider = container.querySelector('.mc-scrollbar');
    const region = getByTestId('scroll-region');

    expect(provider).toContainElement(region);
  });

  it('has no automated accessibility violations', async () => {
    const { container } = render(ScrollbarExample);

    expect((await axe.run(container)).violations).toEqual([]);
  });
});
