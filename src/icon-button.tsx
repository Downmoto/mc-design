import type { ReactNode } from "react";

import { Button, type ButtonProps } from "./button";

export interface IconButtonProps extends Omit<
  ButtonProps,
  "aria-label" | "children"
> {
  "aria-label": string;
  children: ReactNode;
}

export function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <Button
      className={["mc-icon-button", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
