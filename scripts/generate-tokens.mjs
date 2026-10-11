// @ts-nocheck
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const sourcePath = path.join(projectRoot, 'tokens/tokens.json');
const outputPaths = {
  css: path.join(projectRoot, 'src/lib/generated/tokens.css'),
  typescript: path.join(projectRoot, 'src/lib/generated/tokens.ts'),
  documentation: path.join(projectRoot, 'docs/tokens.md'),
};

const tokenNamePattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)+$/;
const referencePattern = /^\{([a-z][a-z0-9]*(?:-[a-z0-9]+)+)\}$/;

const valuePatterns = {
  colour: /^#[0-9a-f]{6}$/i,
  dimension: /^(?:0|-?(?:\d+|\d*\.\d+)(?:px|rem|ch|vw|vh|%))$/,
  duration: /^(?:0|(?:\d+|\d*\.\d+)(?:ms|s))$/,
  easing: /^(?:linear|cubic-bezier\(.+\))$/,
};

function fail(message) {
  throw new Error(`Token validation failed: ${message}`);
}

function validateTokenShape(token, location) {
  if (!token || typeof token !== 'object') {
    fail(`${location} must be an object`);
  }

  if (!tokenNamePattern.test(token.name)) {
    fail(`${location} has invalid name "${token.name}"`);
  }

  if (typeof token.type !== 'string' || token.type.length === 0) {
    fail(`${location} must declare a type`);
  }

  if (typeof token.description !== 'string' || token.description.length === 0) {
    fail(`${location} must include a description`);
  }

  if (token.override !== undefined && !tokenNamePattern.test(token.override)) {
    fail(`${location} has invalid override "${token.override}"`);
  }

  validateValue(token.value, token.type, `${location}.value`, true);

  if (token.reducedValue !== undefined) {
    validateValue(
      token.reducedValue,
      token.type,
      `${location}.reducedValue`,
      false,
    );
  }
}

function validateValue(value, type, location, allowReference) {
  if (
    allowReference &&
    typeof value === 'string' &&
    referencePattern.test(value)
  ) {
    return;
  }

  if (type === 'number' || type === 'font-weight') {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      fail(`${location} must be a finite number`);
    }
    return;
  }

  if (typeof value !== 'string' || value.length === 0) {
    fail(`${location} must be a non-empty string`);
  }

  const pattern = valuePatterns[type];
  if (pattern && !pattern.test(value)) {
    fail(`${location} is not a valid ${type}`);
  }
}

function mapUnique(tokens, location) {
  if (!Array.isArray(tokens)) {
    fail(`${location} must be an array`);
  }

  const mapped = new Map();
  for (const [index, token] of tokens.entries()) {
    validateTokenShape(token, `${location}[${index}]`);
    if (mapped.has(token.name)) {
      fail(`${location} contains duplicate token "${token.name}"`);
    }
    mapped.set(token.name, token);
  }
  return mapped;
}

function resolveTokens(tokens) {
  const resolved = new Map();
  const resolving = new Set();

  function resolve(name) {
    if (resolved.has(name)) return resolved.get(name);
    const token = tokens.get(name);
    if (!token) fail(`token "${name}" references a missing token`);
    if (resolving.has(name)) fail(`token "${name}" has a circular reference`);

    resolving.add(name);
    const match =
      typeof token.value === 'string'
        ? token.value.match(referencePattern)
        : null;
    const value = match ? resolve(match[1]).value : token.value;
    validateValue(value, token.type, `${name}.resolvedValue`, false);
    const result = { ...token, value };
    resolving.delete(name);
    resolved.set(name, result);
    return result;
  }

  for (const name of tokens.keys()) resolve(name);
  return resolved;
}

function relativeLuminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(foreground, background) {
  const light = Math.max(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  const dark = Math.min(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  return (light + 0.05) / (dark + 0.05);
}

export function validateTokenSource(source) {
  if (source.schemaVersion !== 1) fail('schemaVersion must be 1');
  if (!/^[a-z][a-z0-9]*$/.test(source.prefix)) {
    fail('prefix must be lowercase alphanumeric text');
  }

  const foundation = mapUnique(source.foundation, 'foundation');
  const global = mapUnique(source.semantic?.global, 'semantic.global');
  const light = mapUnique(source.semantic?.light, 'semantic.light');
  const dark = mapUnique(source.semantic?.dark, 'semantic.dark');

  for (const name of global.keys()) {
    if (foundation.has(name)) fail(`semantic.global repeats "${name}"`);
  }

  const lightNames = [...light.keys()].sort();
  const darkNames = [...dark.keys()].sort();
  if (JSON.stringify(lightNames) !== JSON.stringify(darkNames)) {
    fail('light and dark themes must define the same semantic token names');
  }

  for (const name of lightNames) {
    const lightToken = light.get(name);
    const darkToken = dark.get(name);
    if (lightToken.type !== darkToken.type) {
      fail(`theme token "${name}" must use the same type in both themes`);
    }
    if (lightToken.override !== darkToken.override) {
      fail(`theme token "${name}" must use the same override in both themes`);
    }
  }

  const base = new Map([...foundation, ...global]);
  const resolvedFoundation = resolveTokens(foundation);
  const resolvedGlobal = resolveTokens(base);
  const resolvedThemes = {
    light: resolveTokens(new Map([...base, ...light])),
    dark: resolveTokens(new Map([...base, ...dark])),
  };

  const checks = source.contrastChecks;
  if (!Array.isArray(checks) || checks.length === 0) {
    fail('contrastChecks must contain at least one check');
  }

  const contrast = [];
  for (const theme of ['light', 'dark']) {
    for (const check of checks) {
      const foreground = resolvedThemes[theme].get(check.foreground);
      const background = resolvedThemes[theme].get(check.background);
      if (!foreground || !background) {
        fail(`contrast check references a missing ${theme} theme token`);
      }
      if (foreground.type !== 'colour' || background.type !== 'colour') {
        fail('contrast checks must reference colour tokens');
      }
      if (typeof check.minimum !== 'number' || check.minimum <= 0) {
        fail('contrast check minimum must be a positive number');
      }

      const ratio = contrastRatio(foreground.value, background.value);
      if (ratio + Number.EPSILON < check.minimum) {
        fail(
          `${theme} ${check.foreground} on ${check.background} is ${ratio.toFixed(2)}:1; ${check.minimum}:1 is required`,
        );
      }
      contrast.push({ theme, ...check, ratio });
    }
  }

  return {
    foundation,
    global,
    themes: { light, dark },
    resolvedFoundation,
    resolvedGlobal,
    resolvedThemes,
    contrast,
  };
}

function cssValue(token, prefix) {
  const match =
    typeof token.value === 'string'
      ? token.value.match(referencePattern)
      : null;
  const value = match ? `var(--${prefix}-${match[1]})` : String(token.value);
  return token.override
    ? `var(--${prefix}-${token.override}, ${value})`
    : value;
}

function cssDeclarations(tokens, prefix) {
  return [...tokens.values()]
    .map((token) => `  --${prefix}-${token.name}: ${cssValue(token, prefix)};`)
    .join('\n');
}

function generateCss(source, validated) {
  const prefix = source.prefix;
  const foundation = cssDeclarations(validated.foundation, prefix);
  const global = cssDeclarations(validated.global, prefix);
  const dark = cssDeclarations(validated.themes.dark, prefix);
  const light = cssDeclarations(validated.themes.light, prefix);
  const reduced = [...validated.foundation.values()]
    .filter((token) => token.reducedValue !== undefined)
    .map(
      (token) =>
        `    --${prefix}-${token.name}: ${String(token.reducedValue)};`,
    )
    .join('\n');

  return `/* Generated from tokens/tokens.json. Do not edit directly. */
:root {
${foundation}
${global}
${dark}
  color-scheme: dark;
}

[data-mc-theme='dark'],
[data-mc-theme='system'] {
${dark}
  color-scheme: dark;
}

[data-mc-theme='light'] {
${light}
  color-scheme: light;
}

@media (prefers-color-scheme: light) {
  [data-mc-theme='system'] {
${light
  .split('\n')
  .map((line) => `  ${line}`)
  .join('\n')}
    color-scheme: light;
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
${reduced}
  }
}
`;
}

function objectFromResolved(tokens, names) {
  return Object.fromEntries(
    names.map((name) => [name, tokens.get(name).value]),
  );
}

function generateTypescript(validated) {
  const foundationNames = [...validated.foundation.keys()];
  const globalNames = [...validated.global.keys()];
  const themeNames = [...validated.themes.light.keys()];
  const foundation = objectFromResolved(
    validated.resolvedFoundation,
    foundationNames,
  );
  const global = objectFromResolved(validated.resolvedGlobal, globalNames);
  const light = objectFromResolved(validated.resolvedThemes.light, themeNames);
  const dark = objectFromResolved(validated.resolvedThemes.dark, themeNames);

  return `// Generated from tokens/tokens.json. Do not edit directly.
export const foundationTokens = ${JSON.stringify(foundation, null, 2)} as const;

export const semanticTokens = ${JSON.stringify(
    { global, light, dark },
    null,
    2,
  )} as const;

export const tokens = {
  foundation: foundationTokens,
  semantic: semanticTokens,
} as const;

export type FoundationTokenName = keyof typeof foundationTokens;
export type GlobalSemanticTokenName = keyof typeof semanticTokens.global;
export type ThemeTokenName = keyof typeof semanticTokens.light;
`;
}

function markdownTable(tokens, prefix) {
  const rows = [...tokens.values()].map(
    (token) =>
      `| \`${token.name}\` | \`--${prefix}-${token.name}\` | \`${String(token.value)}\` | ${token.description} |`,
  );
  return [
    '| Token | CSS property | Value | Purpose |',
    '|---|---|---|---|',
    ...rows,
  ].join('\n');
}

function generateDocumentation(source, validated) {
  const contrastRows = validated.contrast.map(
    (check) =>
      `| ${check.theme} | \`${check.foreground}\` | \`${check.background}\` | ${check.ratio.toFixed(2)}:1 | ${check.minimum}:1 |`,
  );

  return `# Token reference

Generated from \`tokens/tokens.json\`. Edit the source and run
\`npm run tokens:generate\` to update this file.

## Foundation tokens

${markdownTable(validated.foundation, source.prefix)}

## Global semantic tokens

${markdownTable(validated.global, source.prefix)}

## Light theme

${markdownTable(validated.themes.light, source.prefix)}

## Dark theme

${markdownTable(validated.themes.dark, source.prefix)}

## Product accent override

Set \`--mc-product-primary\` within each product theme. The
\`--mc-colour-interactive\` property uses this override and falls back to the
approved MemoryCore interactive colour.

## Contrast verification

| Theme | Foreground | Background | Actual | Required |
|---|---|---|---:|---:|
${contrastRows.join('\n')}
`;
}

async function generate() {
  const source = JSON.parse(await readFile(sourcePath, 'utf8'));
  const validated = validateTokenSource(source);
  return {
    css: generateCss(source, validated),
    typescript: generateTypescript(validated),
    documentation: generateDocumentation(source, validated),
  };
}

async function main() {
  const generated = await generate();
  const check = process.argv.includes('--check');

  for (const [name, outputPath] of Object.entries(outputPaths)) {
    if (check) {
      let current;
      try {
        current = await readFile(outputPath, 'utf8');
      } catch {
        fail(`${path.relative(projectRoot, outputPath)} is missing`);
      }
      if (current !== generated[name]) {
        fail(`${path.relative(projectRoot, outputPath)} is out of date`);
      }
      continue;
    }

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, generated[name]);
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  await main();
}
