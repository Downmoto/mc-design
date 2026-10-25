import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { NumericInput } from '../src/lib/index.js';

describe('NumericInput', () => {
  it('renders a labelled native numeric input', () => {
    const { getByLabelText } = render(NumericInput, {
      label: 'Quantity',
      name: 'quantity',
      value: 12,
    });
    const input = getByLabelText('Quantity');

    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('name', 'quantity');
    expect(input).toHaveValue(12);
  });

  it('passes numeric constraints to the input', () => {
    const { getByRole } = render(NumericInput, {
      label: 'Opacity',
      max: 100,
      min: 0,
      step: 5,
    });
    const input = getByRole('spinbutton', { name: 'Opacity' });

    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
    expect(input).toHaveAttribute('step', '5');
  });

  it('renders accessible prefix and suffix adornments', () => {
    const { getByLabelText, getByText } = render(NumericInput, {
      label: 'Price per kilogram',
      prefix: '$',
      suffix: 'kg',
      value: 20,
    });
    const input = getByLabelText('Price per kilogram');
    const prefix = getByText('$');
    const suffix = getByText('kg');

    expect(input.getAttribute('aria-describedby')).toContain(prefix.id);
    expect(input.getAttribute('aria-describedby')).toContain(suffix.id);
  });

  it('connects its description to the input', () => {
    const { getByRole, getByText } = render(NumericInput, {
      description: 'Enter a value from 0 to 100',
      label: 'Opacity',
    });
    const input = getByRole('spinbutton', { name: 'Opacity' });
    const description = getByText('Enter a value from 0 to 100');

    expect(input).toHaveAttribute('aria-describedby', description.id);
  });

  it('communicates errors and the native required state', () => {
    const { getByRole, getByText } = render(NumericInput, {
      error: 'Enter a value from 1 to 10',
      label: 'Quantity',
      required: true,
    });
    const input = getByRole('spinbutton', { name: 'Quantity' });
    const error = getByText('Enter a value from 1 to 10');

    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', error.id);
  });

  it('supports compact, disabled, and read-only fields', () => {
    const compact = render(NumericInput, {
      disabled: true,
      label: 'Quantity',
      size: 'compact',
    });
    expect(compact.getByLabelText('Quantity')).toBeDisabled();
    expect(compact.container.firstElementChild).toHaveAttribute(
      'data-size',
      'compact',
    );
    compact.unmount();

    const readonly = render(NumericInput, {
      label: 'Quantity',
      readonly: true,
      value: 12,
    });
    expect(readonly.getByLabelText('Quantity')).toHaveAttribute('readonly');
  });

  it('passes native events to the input', async () => {
    const oninput = vi.fn();
    const { getByLabelText } = render(NumericInput, {
      label: 'Quantity',
      oninput,
    });
    const input = getByLabelText('Quantity');

    await fireEvent.input(input, { target: { value: '24' } });

    expect(oninput).toHaveBeenCalledOnce();
  });

  it('steps the native value with visible controls', async () => {
    const oninput = vi.fn();
    const { getByLabelText, getByRole } = render(NumericInput, {
      label: 'Quantity',
      oninput,
      step: 5,
      value: 10,
    });
    const input = getByLabelText('Quantity');

    await fireEvent.click(getByRole('button', { name: 'Increase Quantity' }));
    expect(input).toHaveValue(15);

    await fireEvent.click(getByRole('button', { name: 'Decrease Quantity' }));
    expect(input).toHaveValue(10);
    expect(oninput).toHaveBeenCalledTimes(2);
  });

  it('repeats stepping while the mouse is held', async () => {
    vi.useFakeTimers();
    const { getByLabelText, getByRole } = render(NumericInput, {
      label: 'Quantity',
      value: 10,
    });

    const increase = getByRole('button', { name: 'Increase Quantity' });
    await fireEvent.mouseDown(increase, { button: 0 });
    vi.advanceTimersByTime(560);
    expect(getByLabelText('Quantity')).toHaveValue(13);

    await fireEvent.mouseUp(increase, { button: 0 });
    vi.advanceTimersByTime(160);

    expect(getByLabelText('Quantity')).toHaveValue(13);
    vi.useRealTimers();
  });

  it('applies a consumer mapping', () => {
    const { container } = render(NumericInput, {
      consumer: 'website',
      label: 'Quantity',
    });

    expect(container.firstElementChild).toHaveAttribute(
      'data-mc-product',
      'website',
    );
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(NumericInput, {
      description: 'Enter a value from 0 to 100',
      label: 'Opacity',
      max: 100,
      min: 0,
      required: true,
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
