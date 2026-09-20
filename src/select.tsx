import type { ReactNode, Ref, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  ref?: Ref<HTMLSelectElement>;
}

export function Select({ children, className, ref, ...props }: SelectProps) {
  return (
    <span className="mc-select-field">
      <select
        className={["mc-focus-ring", "mc-select", className]
          .filter(Boolean)
          .join(" ")}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    </span>
  );
}
