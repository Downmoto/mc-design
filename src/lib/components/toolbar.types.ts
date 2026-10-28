import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type ToolbarOrientation = 'horizontal' | 'vertical';
export type ToolbarVariant = 'ghost' | 'surface';

type NativeDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-orientation'
  | 'children'
  | 'class'
  | 'role'
>;

type ToolbarAccessibleName =
  | {
      'aria-label': string;
      'aria-labelledby'?: string;
    }
  | {
      'aria-label'?: never;
      'aria-labelledby': string;
    };

export type ToolbarProps = NativeDivAttributes &
  ToolbarAccessibleName & {
    children: Snippet;
    class?: string;
    orientation?: ToolbarOrientation;
    variant?: ToolbarVariant;
  };
