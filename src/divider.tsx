import type { HTMLAttributes, Ref } from "react";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation;
  ref?: Ref<HTMLHRElement>;
}

export function Divider({
  className,
  orientation = "horizontal",
  ref,
  ...props
}: DividerProps) {
  return (
    <hr
      {...props}
      aria-orientation={orientation}
      className={["mc-divider", `mc-divider--${orientation}`, className]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
    />
  );
}
