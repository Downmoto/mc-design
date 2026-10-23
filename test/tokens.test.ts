import { describe, expect, it } from 'vitest';

import source from '../tokens/tokens.json';
import { validateTokenSource } from '../scripts/generate-tokens.mjs';

describe('token source validation', () => {
  it('accepts the canonical source and verifies theme contrast', () => {
    expect(() => validateTokenSource(source)).not.toThrow();
  });

  it('rejects duplicate token names', () => {
    const invalid = structuredClone(source);
    invalid.foundation.push(invalid.foundation[0]);

    expect(() => validateTokenSource(invalid)).toThrow(/duplicate token/);
  });

  it('rejects token names repeated across layers', () => {
    const invalid = structuredClone(source);
    invalid.semantic.light[0].name = invalid.foundation[0].name;
    invalid.semantic.dark[0].name = invalid.foundation[0].name;

    expect(() => validateTokenSource(invalid)).toThrow(/duplicate token/);
  });

  it('rejects missing references', () => {
    const invalid = structuredClone(source);
    invalid.semantic.light[0].value = '{brand-missing}';

    expect(() => validateTokenSource(invalid)).toThrow(/missing token/);
  });

  it('rejects incomplete theme mappings', () => {
    const invalid = structuredClone(source);
    invalid.semantic.dark.pop();

    expect(() => validateTokenSource(invalid)).toThrow(
      /same semantic token names/,
    );
  });

  it('registers consumer primary pairs and maps the website default', () => {
    const validated = validateTokenSource(source);

    expect(validated.consumerRegistry.get('website')?.resolved.light).toBe(
      '#2F6892',
    );
    expect(validated.consumerRegistry.get('website')?.resolved.dark).toBe(
      '#4E8BB7',
    );
    expect(
      validated.resolvedThemes.light.get('colour-interactive')?.value,
    ).toBe('#2F6892');
    expect(validated.resolvedThemes.dark.get('colour-interactive')?.value).toBe(
      '#4E8BB7',
    );
    expect(validated.consumerRegistry.get('dithertool')?.resolved).toEqual({
      light: '#506A4B',
      dark: '#728E6D',
    });
    expect(validated.consumerRegistry.get('aetheltool')?.resolved).toEqual({
      light: '#775591',
      dark: '#9676AE',
    });
    expect(validated.consumerContrast).toHaveLength(12);
    expect(
      validated.consumerContrast.every((check) => check.ratio >= check.minimum),
    ).toBe(true);
  });

  it('rejects active consumers with missing primary tokens', () => {
    const invalid = structuredClone(source);
    invalid.consumerRegistry.website.primaryTokens.light =
      'colour-consumer-website-primary-missing';

    expect(() => validateTokenSource(invalid)).toThrow(/must register light/);
  });

  it('rejects values assigned to a reserved consumer', () => {
    const invalid = structuredClone(source);
    (
      invalid.consumerRegistry
        .dithertool as typeof invalid.consumerRegistry.dithertool & {
        reserved?: boolean;
      }
    ).reserved = true;

    expect(() => validateTokenSource(invalid)).toThrow(
      /reserved consumer "dithertool" must not have usable values/,
    );
  });
});
