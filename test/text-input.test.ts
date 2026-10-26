import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { TextInput } from '../src/lib/index.js';

const icon = createRawSnippet(() => ({
  render: () => '<svg viewBox="0 0 16 16"><path d="M2 8h12" /></svg>',
}));

describe('TextInput', () => {
  it('renders a labelled native text input', () => {
    const { container, getByLabelText } = render(TextInput, {
      label: 'Email address',
      name: 'email',
      placeholder: 'name@example.com',
    });
    const input = getByLabelText('Email address');

    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('placeholder', 'name@example.com');
    expect(container.querySelector('.mc-text-input__message')).toBeNull();
  });

  it('connects its description to the input', () => {
    const { getByRole, getByText } = render(TextInput, {
      description: 'Used for account notices',
      label: 'Email address',
    });
    const input = getByRole('textbox', { name: 'Email address' });
    const description = getByText('Used for account notices');

    expect(input).toHaveAttribute('aria-describedby', description.id);
  });

  it('communicates an error and preserves the native required state', () => {
    const { getByRole, getByText } = render(TextInput, {
      error: 'Enter a valid email address',
      label: 'Email address',
      required: true,
      type: 'email',
    });
    const input = getByRole('textbox', { name: 'Email address' });
    const error = getByText('Enter a valid email address');

    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', error.id);
  });

  it('supports compact, disabled, and read-only fields', () => {
    const compact = render(TextInput, {
      disabled: true,
      label: 'Project name',
      size: 'compact',
    });
    expect(compact.getByLabelText('Project name')).toBeDisabled();
    expect(compact.container.firstElementChild).toHaveAttribute(
      'data-size',
      'compact',
    );
    compact.unmount();

    const readonly = render(TextInput, {
      label: 'Project name',
      readonly: true,
      value: 'MemoryCore',
    });
    expect(readonly.getByLabelText('Project name')).toHaveAttribute('readonly');
  });

  it('renders decorative leading and trailing icons', () => {
    const { container, getByLabelText } = render(TextInput, {
      label: 'Search',
      leadingIcon: icon,
      trailingIcon: icon,
    });
    const field = container.firstElementChild;
    const icons = container.querySelectorAll('.mc-text-input__icon');

    expect(field).toHaveAttribute('data-leading-icon', 'true');
    expect(field).toHaveAttribute('data-trailing-icon', 'true');
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveAttribute('aria-hidden', 'true');
    expect(icons[1]).toHaveAttribute('aria-hidden', 'true');
    expect(getByLabelText('Search')).toHaveAttribute('type', 'text');
  });

  it('passes native events and attributes to the input', async () => {
    const oninput = vi.fn();
    const { getByLabelText } = render(TextInput, {
      autocomplete: 'email',
      label: 'Email address',
      maxlength: 80,
      oninput,
    });
    const input = getByLabelText('Email address');

    await fireEvent.input(input, { target: { value: 'hello@example.com' } });

    expect(input).toHaveAttribute('autocomplete', 'email');
    expect(input).toHaveAttribute('maxlength', '80');
    expect(oninput).toHaveBeenCalledOnce();
  });

  it('applies a consumer mapping', () => {
    const { container } = render(TextInput, {
      consumer: 'website',
      label: 'Email address',
    });

    expect(container.firstElementChild).toHaveAttribute(
      'data-mc-product',
      'website',
    );
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(TextInput, {
      description: 'Used for account notices',
      label: 'Email address',
      required: true,
      type: 'email',
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
