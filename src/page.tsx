import type { HTMLAttributes, Ref } from "react";

export interface PageRootProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface PageBodyProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

function PageRoot({ className, ref, ...props }: PageRootProps) {
  return (
    <div
      className={["mc-page", className].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    />
  );
}

function PageBody({ className, ref, ...props }: PageBodyProps) {
  return (
    <div
      className={["mc-page__body", className].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    />
  );
}

export const Page = {
  Body: PageBody,
  Root: PageRoot,
};
