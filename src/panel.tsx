import type { HTMLAttributes, Ref } from "react";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function Panel({ className, ref, ...props }: PanelProps) {
  return (
    <div
      className={["mc-panel", className].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    />
  );
}
