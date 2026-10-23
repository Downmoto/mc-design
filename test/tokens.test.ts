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
});
