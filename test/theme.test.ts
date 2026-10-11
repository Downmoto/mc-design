import { beforeEach, describe, expect, it } from 'vitest';

import {
  applyTheme,
  getStoredTheme,
  initialiseTheme,
  setTheme,
  themeStorageKey,
  type Theme,
} from '../src/lib/theme.js';

describe('theme settings', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-mc-theme');
  });

  it('uses and applies dark when no preference has been stored', () => {
    expect(initialiseTheme()).toBe('dark');
    expect(document.documentElement).toHaveAttribute('data-mc-theme', 'dark');
  });

  it('restores a stored system preference', () => {
    localStorage.setItem(themeStorageKey, 'system');

    expect(getStoredTheme()).toBe('system');
    expect(initialiseTheme()).toBe('system');
    expect(document.documentElement).toHaveAttribute('data-mc-theme', 'system');
  });

  it('persists and applies a selected theme', () => {
    setTheme('light');

    expect(localStorage.getItem(themeStorageKey)).toBe('light');
    expect(document.documentElement).toHaveAttribute('data-mc-theme', 'light');
  });

  it('rejects unsupported runtime values', () => {
    expect(() => applyTheme('sepia' as Theme)).toThrow(TypeError);
  });
});
