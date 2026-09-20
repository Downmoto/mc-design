import type { HTMLAttributes, Ref } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function Container({ className, ref, ...props }: ContainerProps) {
  return (
    <div
      className={["mc-container", className].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    />
  );
}
