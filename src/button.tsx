import { type ButtonHTMLAttributes, type ReactNode, type Ref } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className,
  ref,
  type = "button",
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "mc-focus-ring",
        "mc-button",
        `mc-button--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
