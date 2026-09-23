import {
  Children,
  isValidElement,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
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
  variant?: "default" | "ghost";
}

export interface ToggleButtonIconProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}

function ToggleButtonIcon({ className, ref, ...props }: ToggleButtonIconProps) {
  return (
    <span
      className={["mc-toggle-button__icon", className]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
      {...props}
    />
  );
}

function ToggleButtonRoot({
  checked,
  children,
  className,
  defaultChecked = false,
  onClick,
  onCheckedChange,
  ref,
  type = "button",
  variant = "default",
  ...props
}: ToggleButtonProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked ?? internalChecked;
  const icon = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ToggleButtonIcon,
  );

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
      className={[
        "mc-focus-ring",
        "mc-toggle-button",
        icon && "mc-toggle-button--icon",
        `mc-toggle-button--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
      ref={ref}
      role="switch"
      type={type}
      {...props}
    >
      {icon ?? (
        <>
          <span>{children}</span>
          <span aria-hidden="true" className="mc-toggle-button__track">
            <span className="mc-toggle-button__thumb" />
          </span>
        </>
      )}
    </button>
  );
}

export const ToggleButton = Object.assign(ToggleButtonRoot, {
  Icon: ToggleButtonIcon,
});
