import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { TextArea } from '../src/lib/index.js';

describe('TextArea', () => {
  it('renders a labelled native textarea with standard defaults', () => {
    const { container, getByLabelText } = render(TextArea, {
      label: 'Project notes',
      name: 'notes',
      placeholder: 'Add context',
    });
    const textarea = getByLabelText('Project notes');

    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('name', 'notes');
    expect(textarea).toHaveAttribute('placeholder', 'Add context');
    expect(textarea).toHaveAttribute('rows', '4');
    expect(container.querySelector('.mc-text-area__message')).toHaveTextContent(
      /^$/,
    );
  });

  it('uses two rows for compact fields and honours an explicit row count', () => {
    const compact = render(TextArea, {
      label: 'Compact notes',
      size: 'compact',
    });
    expect(compact.getByLabelText('Compact notes')).toHaveAttribute(
      'rows',
      '2',
    );
    expect(compact.container.firstElementChild).toHaveAttribute(
      'data-size',
      'compact',
    );
    compact.unmount();

    const custom = render(TextArea, {
      label: 'Long response',
      rows: 6,
    });
    expect(custom.getByLabelText('Long response')).toHaveAttribute('rows', '6');
  });

  it('connects its description to the textarea', () => {
    const { getByRole, getByText } = render(TextArea, {
      description: 'Add context for collaborators',
      label: 'Project notes',
    });
    const textarea = getByRole('textbox', { name: 'Project notes' });
    const description = getByText('Add context for collaborators');

    expect(textarea).toHaveAttribute('aria-describedby', description.id);
  });

  it('communicates errors and required state', () => {
    const { getByRole, getByText } = render(TextArea, {
      error: 'Add a short project description',
      label: 'Project notes',
      required: true,
    });
    const textarea = getByRole('textbox', { name: 'Project notes' });
    const error = getByText('Add a short project description');

    expect(textarea).toBeRequired();
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', error.id);
  });

  it('supports disabled and read-only fields', () => {
    const disabled = render(TextArea, {
      disabled: true,
      label: 'Project notes',
    });
    expect(disabled.getByLabelText('Project notes')).toBeDisabled();
    disabled.unmount();

    const readonly = render(TextArea, {
      label: 'Project notes',
      readonly: true,
      value: 'Approved context',
    });
    expect(readonly.getByLabelText('Project notes')).toHaveAttribute(
      'readonly',
    );
  });

  it('passes native events and attributes to the textarea', async () => {
    const oninput = vi.fn();
    const { getByLabelText } = render(TextArea, {
      label: 'Project notes',
      maxlength: 500,
      oninput,
    });
    const textarea = getByLabelText('Project notes');

    await fireEvent.input(textarea, { target: { value: 'Project context' } });

    expect(textarea).toHaveAttribute('maxlength', '500');
    expect(oninput).toHaveBeenCalledOnce();
  });

  it('applies a consumer mapping', () => {
    const { container } = render(TextArea, {
      consumer: 'aetheltool',
      label: 'Project notes',
    });

    expect(container.firstElementChild).toHaveAttribute(
      'data-mc-product',
      'aetheltool',
    );
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(TextArea, {
      description: 'Add context for collaborators',
      label: 'Project notes',
      required: true,
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
