import { fireEvent, render, waitFor } from '@testing-library/svelte';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import TooltipExample from './fixtures/TooltipExample.svelte';

describe('Tooltip', () => {
  it('describes its trigger with a hidden tooltip', () => {
    const { getByRole } = render(TooltipExample);
    const trigger = getByRole('button', { name: 'Information' });
    const tooltip = getByRole('tooltip', { hidden: true });

    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    expect(tooltip).toHaveTextContent('More information');
    expect(tooltip).not.toBeVisible();
  });

  it('opens on pointer hover and closes after pointer leave', async () => {
    const { getByRole, getByTestId } = render(TooltipExample);
    const trigger = getByRole('button', { name: 'Information' });

    await fireEvent.pointerEnter(trigger);
    expect(getByRole('tooltip', { hidden: true })).not.toBeVisible();
    await waitFor(() => expect(getByRole('tooltip')).toBeVisible());
    await waitFor(() => expect(getByTestId('open')).toHaveTextContent('true'));

    await fireEvent.pointerLeave(trigger);
    await waitFor(() => {
      expect(getByRole('tooltip', { hidden: true })).not.toBeVisible();
    });
  });

  it('stays open while the tooltip itself is hovered', async () => {
    const { getByRole } = render(TooltipExample);
    const trigger = getByRole('button', { name: 'Information' });

    await fireEvent.pointerEnter(trigger);
    await waitFor(() => expect(getByRole('tooltip')).toBeVisible());
    const tooltip = getByRole('tooltip');
    await fireEvent.pointerLeave(trigger);
    await fireEvent.pointerEnter(tooltip);

    expect(tooltip).toBeVisible();

    await fireEvent.pointerLeave(tooltip);
    await waitFor(() => expect(tooltip).not.toBeVisible());
  });

  it('opens on focus and closes after blur', async () => {
    const { getByRole } = render(TooltipExample);
    const trigger = getByRole('button', { name: 'Information' });

    await fireEvent.focus(trigger);
    await waitFor(() => expect(getByRole('tooltip')).toBeVisible());

    await fireEvent.blur(trigger);
    await waitFor(() => {
      expect(getByRole('tooltip', { hidden: true })).not.toBeVisible();
    });
  });

  it('stays open while focus remains after pointer leave', async () => {
    const { getByRole } = render(TooltipExample);
    const trigger = getByRole('button', { name: 'Information' });

    await fireEvent.pointerEnter(trigger);
    await fireEvent.focus(trigger);
    await waitFor(() => expect(getByRole('tooltip')).toBeVisible());
    await fireEvent.pointerLeave(trigger);

    expect(getByRole('tooltip')).toBeVisible();
  });

  it('closes with Escape without moving focus', async () => {
    const { getByRole } = render(TooltipExample);
    const trigger = getByRole('button', { name: 'Information' });

    trigger.focus();
    await fireEvent.focus(trigger);
    await waitFor(() => expect(getByRole('tooltip')).toBeVisible());
    await fireEvent.keyDown(trigger, { key: 'Escape' });

    expect(getByRole('tooltip', { hidden: true })).not.toBeVisible();
    expect(trigger).toHaveFocus();
  });

  it('supports controlled state, consumer mapping, and native attributes', () => {
    const { container, getByRole } = render(TooltipExample, {
      consumer: 'website',
      initialOpen: true,
      size: 'compact',
    });

    expect(container.querySelector('.mc-tooltip')).toHaveClass(
      'custom-tooltip',
    );
    expect(container.querySelector('.mc-tooltip')).toHaveAttribute(
      'data-example',
      'information',
    );
    expect(container.querySelector('.mc-tooltip')).toHaveAttribute(
      'id',
      'example-tooltip',
    );
    expect(getByRole('tooltip')).toHaveAttribute(
      'id',
      'example-tooltip-content',
    );
    expect(getByRole('tooltip')).toHaveAttribute('data-mc-product', 'website');
    expect(getByRole('tooltip')).toHaveAttribute('data-size', 'compact');
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(TooltipExample, { initialOpen: true });
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
