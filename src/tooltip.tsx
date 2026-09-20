import {
  cloneElement,
  useId,
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
  ref,
  ...props
}: TooltipProps) {
  const tooltipId = useId();
  const describedBy = [children.props["aria-describedby"], tooltipId]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={["mc-tooltip", className].filter(Boolean).join(" ")}
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
