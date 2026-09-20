import type { HTMLAttributes, Ref } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface CardEyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface CardFooterProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

function CardRoot({ className, ref, ...props }: CardProps) {
  return (
    <div
      className={["mc-card", className].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    />
  );
}

function CardEyebrow({ className, ref, ...props }: CardEyebrowProps) {
  return (
    <p
      className={["mc-card__eyebrow", className].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    />
  );
}

function CardTitle({ className, ref, ...props }: CardTitleProps) {
  return (
    <h3
      className={["mc-card__title", className].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    />
  );
}

function CardBody({ className, ref, ...props }: CardBodyProps) {
  return (
    <div
      className={["mc-card__body", className].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    />
  );
}

function CardFooter({ className, ref, ...props }: CardFooterProps) {
  return (
    <footer
      className={["mc-card__footer", className].filter(Boolean).join(" ")}
      ref={ref}
      {...props}
    />
  );
}

export const Card = Object.assign(CardRoot, {
  Body: CardBody,
  Eyebrow: CardEyebrow,
  Footer: CardFooter,
  Title: CardTitle,
});
