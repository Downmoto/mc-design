// @ts-expect-error Node types are not a package dependency.
import { readFileSync } from 'node:fs';
import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { afterEach, describe, expect, it } from 'vitest';

import ControlledToggle from './fixtures/ControlledToggle.svelte';
import ToggleExample from './fixtures/ToggleExample.svelte';

const styles = readFileSync('src/lib/styles.css', 'utf8');
const pressedSelector =
  "button.mc-button[aria-pressed='true'][data-appearance]:not(:disabled):not([aria-disabled='true'])";

describe('Toggle', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-mc-theme');
    document.getElementById('toggle-style-test')?.remove();
  });

  it('renders an unpressed native button by default', () => {
    const { getByRole } = render(ToggleExample);
    const toggle = getByRole('button', { name: 'Bold' });

    expect(toggle).toHaveClass('mc-button', 'mc-toggle', 'custom-toggle');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(toggle).toHaveAttribute('data-example', 'bold');
    expect(toggle).toHaveAttribute('data-appearance', 'ghost');
  });

  it('supports the secondary Button appearance', () => {
    const { getByRole } = render(ToggleExample, { appearance: 'secondary' });

    expect(getByRole('button', { name: 'Bold' })).toHaveAttribute(
      'data-appearance',
      'secondary',
    );
  });

  it.each(['dark', 'light'] as const)(
    'renders a pressed %s Toggle above its resting appearance styles',
    (theme) => {
      document.documentElement.dataset.mcTheme = theme;

      for (const appearance of ['ghost', 'secondary'] as const) {
        const { getByRole, unmount } = render(ToggleExample, { appearance });
        const toggle = getByRole('button', { name: 'Bold' });
        const style = document.createElement('style');

        style.id = 'toggle-style-test';
        expect(styles.replace(/\s/g, '')).toContain(pressedSelector);
        style.textContent = `${pressedSelector} {
            color: rgb(1, 2, 3);
            background: rgb(4, 5, 6);
          }
          .mc-button.mc-test-scope[data-appearance='${appearance}'] {
            color: rgb(7, 8, 9);
            background: rgb(10, 11, 12);
          }`;
        document.head.append(style);
        toggle.classList.add('mc-test-scope');

        toggle.setAttribute('aria-pressed', 'true');
        toggle.focus();

        expect(toggle).toHaveFocus();
        expect(getComputedStyle(toggle).backgroundColor).toBe('rgb(4, 5, 6)');
        expect(getComputedStyle(toggle).color).toBe('rgb(1, 2, 3)');
        style.remove();
        unmount();
      }
    },
  );

  it('updates its pressed state and binding', async () => {
    const { getByRole, getByTestId } = render(ToggleExample);
    const labelled = getByRole('button', { name: 'Bold' });
    const icon = getByRole('button', { name: 'Bold icon' });

    await fireEvent.click(labelled);
    expect(labelled).toHaveAttribute('aria-pressed', 'true');
    expect(icon).toHaveAttribute('aria-pressed', 'true');
    expect(getByTestId('pressed')).toHaveTextContent('true');

    await fireEvent.click(icon);
    expect(labelled).toHaveAttribute('aria-pressed', 'false');
    expect(getByTestId('pressed')).toHaveTextContent('false');
  });

  it('preserves the pressed state when disabled', async () => {
    const { getByRole, getByTestId } = render(ToggleExample, {
      disabled: true,
    });
    const toggle = getByRole('button', { name: 'Bold' });

    expect(toggle).toBeDisabled();
    toggle.setAttribute('aria-pressed', 'true');
    expect(toggle.matches(pressedSelector)).toBe(false);
    await fireEvent.click(toggle);
    expect(getByTestId('pressed')).toHaveTextContent('false');
  });

  it('keeps a synchronous controlled update after click handling', async () => {
    const { getByRole, getByTestId } = render(ControlledToggle);
    const toggle = getByRole('button', { name: 'Bold' });

    await fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(getByTestId('pressed')).toHaveTextContent('true');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(ToggleExample);
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
