import {
  cloneElement,
  useId,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

type TooltipTriggerProps = {
  "aria-describedby"?: string;
};

export interface TooltipProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "content"
> {
  children: ReactElement<TooltipTriggerProps>;
  content: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

export function Tooltip({
  children,
  className,
  content,
  onBlur,
  onClickCapture,
  onPointerLeave,
  ref,
  ...props
}: TooltipProps) {
  const tooltipId = useId();
  const [dismissed, setDismissed] = useState(false);
  const describedBy = [children.props["aria-describedby"], tooltipId]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={["mc-tooltip", className].filter(Boolean).join(" ")}
      data-dismissed={dismissed || undefined}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setDismissed(false);
        onBlur?.(event);
      }}
      onClickCapture={(event) => {
        setDismissed(true);
        onClickCapture?.(event);
      }}
      onPointerLeave={(event) => {
        if (!event.currentTarget.querySelector(":focus-visible")) {
          setDismissed(false);
        }
        onPointerLeave?.(event);
      }}
      ref={ref}
      {...props}
    >
      {cloneElement(children, { "aria-describedby": describedBy })}
      <span className="mc-tooltip__content" id={tooltipId} role="tooltip">
        {content}
      </span>
    </span>
  );
}
