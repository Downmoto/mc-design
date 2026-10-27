import type { MenuAlign } from '../menu.types.js';

export type MenuPosition =
  | {
      align: MenuAlign;
      anchor: HTMLElement;
      kind: 'anchor';
      side: 'block' | 'inline';
    }
  | {
      kind: 'point';
      x: number;
      y: number;
    };

function tokenPixels(element: HTMLElement, token: string) {
  const value = getComputedStyle(element).getPropertyValue(token);
  const pixels = Number.parseFloat(value);
  return Number.isFinite(pixels) ? pixels : 0;
}

export function positionMenu(menu: HTMLElement, position: MenuPosition): void {
  const viewportPadding = tokenPixels(menu, '--mc-space-2');
  const gap = tokenPixels(menu, '--mc-space-1');
  const menuRect = menu.getBoundingClientRect();
  let left: number;
  let top: number;

  menu.style.minInlineSize = '';

  if (position.kind === 'point') {
    left = position.x;
    top = position.y;
  } else {
    const anchorRect = position.anchor.getBoundingClientRect();

    if (position.side === 'inline') {
      left = anchorRect.right + gap;
      top = anchorRect.top;

      if (
        left + menuRect.width > window.innerWidth - viewportPadding &&
        anchorRect.left - gap - menuRect.width >= viewportPadding
      ) {
        left = anchorRect.left - gap - menuRect.width;
      }
    } else {
      left =
        position.align === 'end'
          ? anchorRect.right - menuRect.width
          : anchorRect.left;
      top = anchorRect.bottom + gap;

      if (
        top + menuRect.height > window.innerHeight - viewportPadding &&
        anchorRect.top - gap - menuRect.height >= viewportPadding
      ) {
        top = anchorRect.top - gap - menuRect.height;
      }

      menu.style.minInlineSize = `${anchorRect.width}px`;
    }
  }

  left = Math.min(
    Math.max(left, viewportPadding),
    Math.max(
      viewportPadding,
      window.innerWidth - menuRect.width - viewportPadding,
    ),
  );
  top = Math.min(
    Math.max(top, viewportPadding),
    Math.max(
      viewportPadding,
      window.innerHeight - menuRect.height - viewportPadding,
    ),
  );

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}
