import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

import type { ConsumerId } from '../generated/tokens.js';

export type CardOrientation = 'horizontal' | 'vertical';

type NativeArticleAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'class'
>;

type NativeDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'class'
>;

type NativeSectionAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'class'
>;

export type CardProps = NativeArticleAttributes & {
  children?: Snippet;
  class?: string;
  consumer?: ConsumerId;
  orientation?: CardOrientation;
};

export type CardContentProps = NativeDivAttributes & {
  children?: Snippet;
  class?: string;
};

export type CardFooterProps = NativeSectionAttributes & {
  children?: Snippet;
  class?: string;
};

export type CardHeaderProps = NativeSectionAttributes & {
  children?: Snippet;
  class?: string;
};

export type CardHeroProps = NativeDivAttributes & {
  children?: Snippet;
  class?: string;
};
