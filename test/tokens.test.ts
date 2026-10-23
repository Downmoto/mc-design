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

  it('maps the website consumer primary pair to the interactive role', () => {
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
  });

  it('keeps reserved consumer primaries out of usable tokens', () => {
    const validated = validateTokenSource(source);

    expect(validated.consumerRegistry.get('dithertool')?.resolved).toEqual({});
    expect(validated.consumerRegistry.get('aetheltool')?.resolved).toEqual({});
    expect(
      validated.resolvedGlobal.has('colour-consumer-dithertool-primary-light'),
    ).toBe(false);
    expect(
      validated.resolvedGlobal.has('colour-consumer-aetheltool-primary-dark'),
    ).toBe(false);
  });

  it('rejects active consumers with missing primary tokens', () => {
    const invalid = structuredClone(source);
    invalid.consumerRegistry.website.primaryTokens.light =
      'colour-consumer-website-primary-missing';

    expect(() => validateTokenSource(invalid)).toThrow(/must register light/);
  });

  it('rejects values assigned to reserved consumer primaries', () => {
    const invalid = structuredClone(source);
    invalid.foundation.push({
      name: 'colour-consumer-dithertool-primary-light',
      type: 'colour',
      value: '#000000',
      description: 'Invalid reserved value',
    });

    expect(() => validateTokenSource(invalid)).toThrow(
      /reserved consumer "dithertool" must not have usable values/,
    );
  });
});
