export const themeStorageKey = 'mc-theme';

export const themes = ['dark', 'light', 'system'] as const;

export type Theme = (typeof themes)[number];

type ThemeStorage = Pick<Storage, 'getItem' | 'setItem'>;

export interface ThemeOptions {
  root?: HTMLElement | null;
  storage?: ThemeStorage | null;
}

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && themes.includes(value as Theme);
}

function browserRoot(): HTMLElement | null {
  return typeof document === 'undefined' ? null : document.documentElement;
}

function browserStorage(): ThemeStorage | null {
  return typeof localStorage === 'undefined' ? null : localStorage;
}

export function getStoredTheme(
  storage: ThemeStorage | null = browserStorage(),
): Theme {
  try {
    const stored = storage?.getItem(themeStorageKey);
    return isTheme(stored) ? stored : 'dark';
  } catch {
    return 'dark';
  }
}

export function applyTheme(
  theme: Theme,
  root: HTMLElement | null = browserRoot(),
): void {
  if (!isTheme(theme))
    throw new TypeError(`Unsupported theme: ${String(theme)}`);
  root?.setAttribute('data-mc-theme', theme);
}

export function setTheme(theme: Theme, options: ThemeOptions = {}): void {
  if (!isTheme(theme))
    throw new TypeError(`Unsupported theme: ${String(theme)}`);

  const storage = options.storage ?? browserStorage();
  try {
    storage?.setItem(themeStorageKey, theme);
  } catch {
    // Applying the theme still works when storage is unavailable.
  }

  applyTheme(theme, options.root ?? browserRoot());
}

export function initialiseTheme(options: ThemeOptions = {}): Theme {
  const theme = getStoredTheme(options.storage ?? browserStorage());
  applyTheme(theme, options.root ?? browserRoot());
  return theme;
}
