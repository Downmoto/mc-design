import {
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from "react";

export interface ToggleButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-checked" | "children" | "defaultChecked" | "role"
> {
  children: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  ref?: Ref<HTMLButtonElement>;
}

export function ToggleButton({
  checked,
  children,
  className,
  defaultChecked = false,
  onClick,
  onCheckedChange,
  ref,
  type = "button",
  ...props
}: ToggleButtonProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked ?? internalChecked;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const nextChecked = !isChecked;
    if (checked === undefined) setInternalChecked(nextChecked);
    onCheckedChange?.(nextChecked);
  }

  return (
    <button
      aria-checked={isChecked}
      className={["mc-focus-ring", "mc-toggle-button", className]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
      ref={ref}
      role="switch"
      type={type}
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="mc-toggle-button__track">
        <span className="mc-toggle-button__thumb" />
      </span>
    </button>
  );
}
