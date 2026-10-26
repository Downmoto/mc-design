import { fireEvent, render } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';

import { Slider } from '../src/lib/index.js';

describe('Slider', () => {
  it('renders a labelled native range input and visible value', () => {
    const { getByLabelText, getByText } = render(Slider, {
      label: 'Opacity',
      name: 'opacity',
      showValue: true,
      suffix: '%',
      value: 60,
    });
    const slider = getByLabelText('Opacity');

    expect(slider).toHaveAttribute('type', 'range');
    expect(slider).toHaveAttribute('name', 'opacity');
    expect(slider).toHaveValue('60');
    expect(slider).toHaveAttribute('aria-valuetext', '60%');
    expect(getByText('60%')).toBeInTheDocument();
  });

  it('passes numeric constraints to the input', () => {
    const { getByRole } = render(Slider, {
      label: 'Brush size',
      max: 64,
      min: 1,
      step: 1,
      value: 12,
    });
    const slider = getByRole('slider', { name: 'Brush size' });

    expect(slider).toHaveAttribute('min', '1');
    expect(slider).toHaveAttribute('max', '64');
    expect(slider).toHaveAttribute('step', '1');
  });

  it('hides the visible value by default', () => {
    const { getByRole, queryByText } = render(Slider, {
      label: 'Opacity',
      suffix: '%',
      value: 60,
    });

    expect(queryByText('60%')).not.toBeInTheDocument();
    expect(getByRole('slider', { name: 'Opacity' })).toHaveAttribute(
      'aria-valuetext',
      '60%',
    );
  });

  it('connects errors to the input', () => {
    const { getByRole, getByText } = render(Slider, {
      error: 'Choose a value from 20 to 80',
      label: 'Opacity',
    });
    const slider = getByRole('slider', { name: 'Opacity' });
    const error = getByText('Choose a value from 20 to 80');

    expect(slider).toHaveAttribute('aria-describedby', error.id);
    expect(slider).toHaveAttribute('aria-invalid', 'true');
  });

  it('supports compact and disabled controls', () => {
    const { container, getByRole } = render(Slider, {
      disabled: true,
      label: 'Opacity',
      size: 'compact',
      value: 50,
    });

    expect(getByRole('slider', { name: 'Opacity' })).toBeDisabled();
    expect(container.firstElementChild).toHaveAttribute('data-size', 'compact');
  });

  it('passes native input events to the slider', async () => {
    const oninput = vi.fn();
    const { getByRole } = render(Slider, {
      label: 'Opacity',
      oninput,
      value: 40,
    });
    const slider = getByRole('slider', { name: 'Opacity' });

    expect(slider).toHaveStyle('--mc-slider-fill: 40%');

    await fireEvent.input(slider, { target: { value: '75' } });

    expect(slider).toHaveValue('75');
    expect(slider).toHaveStyle('--mc-slider-fill: 75%');
    expect(oninput).toHaveBeenCalledOnce();
  });

  it('applies a consumer mapping', () => {
    const { container } = render(Slider, {
      consumer: 'website',
      label: 'Opacity',
    });

    expect(container.firstElementChild).toHaveAttribute(
      'data-mc-product',
      'website',
    );
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(Slider, {
      label: 'Opacity',
      suffix: '%',
      value: 60,
    });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
