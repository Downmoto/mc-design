import type { HTMLImgAttributes } from 'svelte/elements';

export type LogoAppearance = 'default' | 'inverse';
export type LogoVariant =
  'mark' | 'mark-bordered' | 'wordmark' | 'wordmark-full';

type NativeImageAttributes = Omit<HTMLImgAttributes, 'alt' | 'class' | 'src'>;

export type LogoProps = NativeImageAttributes & {
  alt?: string;
  appearance?: LogoAppearance;
  class?: string;
  variant?: LogoVariant;
};
