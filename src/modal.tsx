import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type DialogHTMLAttributes,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from "react";

export type ModalVariant = "centered" | "movable";

export interface ModalRootProps {
  children: ReactNode;
  defaultOpen?: boolean;
  dimBg?: boolean;
  initialPosition?: "target" | "center";
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  variant?: ModalVariant;
}

export interface ModalTargetProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
}

export interface ModalCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
}

export interface ModalContentProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "open"
> {
  ref?: Ref<HTMLDialogElement>;
}

type ModalContextValue = {
  dimBg: boolean;
  initialPosition: "target" | "center";
  open: boolean;
  setOpen: (open: boolean) => void;
  setTarget: (point: { x: number; y: number }) => void;
  target: { x: number; y: number } | null;
  variant: ModalVariant;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("Modal.Target and Modal.Content need Modal.Root");
  return context;
}

export function clampModalPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  viewportWidth: number,
  viewportHeight: number,
) {
  return {
    x: Math.max(0, Math.min(x, viewportWidth - width)),
    y: Math.max(0, Math.min(y, viewportHeight - height)),
  };
}

// ponytail: one document-wide lock covers every modal in this package.
let openModalCount = 0;
let previousOverflow = "";

function ModalRoot({
  children,
  defaultOpen = false,
  dimBg = true,
  initialPosition = "target",
  onOpenChange,
  open: controlledOpen,
  variant = "centered",
}: ModalRootProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const open = controlledOpen ?? internalOpen;

  function setOpen(nextOpen: boolean) {
    if (controlledOpen === undefined) setInternalOpen(nextOpen);
    if (nextOpen !== open) onOpenChange?.(nextOpen);
  }

  return (
    <ModalContext.Provider
      value={{
        dimBg,
        initialPosition,
        open,
        setOpen,
        setTarget,
        target,
        variant,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function ModalTarget({
  onClick,
  ref,
  type = "button",
  ...props
}: ModalTargetProps) {
  const { setOpen, setTarget } = useModal();

  return (
    <button
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTarget(
          event.detail
            ? { x: event.clientX, y: event.clientY }
            : { x: rect.left, y: rect.bottom },
        );
        setOpen(true);
        onClick?.(event);
      }}
      ref={ref}
      type={type}
      {...props}
    />
  );
}

function ModalClose({
  onClick,
  ref,
  type = "button",
  ...props
}: ModalCloseProps) {
  const { setOpen } = useModal();
  return (
    <button
      onClick={(event) => {
        setOpen(false);
        onClick?.(event);
      }}
      ref={ref}
      type={type}
      {...props}
    />
  );
}

function ModalContent({
  children,
  className,
  onCancel,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  ref,
  ...props
}: ModalContentProps) {
  const { dimBg, initialPosition, open, setOpen, target, variant } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);

  function place(x: number, y: number) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    position.current = clampModalPosition(
      x,
      y,
      dialog.offsetWidth,
      dialog.offsetHeight,
      window.innerWidth,
      window.innerHeight,
    );
    dialog.style.left = `${position.current.x}px`;
    dialog.style.top = `${position.current.y}px`;
  }

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    if (!dialog.open) dialog.showModal();
    if (variant === "movable") {
      if (initialPosition === "center") {
        place(
          (window.innerWidth - dialog.offsetWidth) / 2,
          (window.innerHeight - dialog.offsetHeight) / 2,
        );
      } else {
        place(target?.x ?? 0, target?.y ?? 0);
      }
    }
    return () => dialog.close();
  }, [initialPosition, open, target, variant]);

  useEffect(() => {
    if (!open) return;
    if (openModalCount++ === 0) {
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      if (--openModalCount === 0)
        document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || variant !== "movable") return;
    const onResize = () => place(position.current.x, position.current.y);
    const observer = new ResizeObserver(onResize);
    if (dialogRef.current) observer.observe(dialogRef.current);
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [open, variant]);

  return (
    <dialog
      className={[
        "mc-modal",
        `mc-modal--${variant}`,
        dimBg && "mc-modal--dimmed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onCancel={(event) => {
        event.preventDefault();
        setOpen(false);
        onCancel?.(event);
      }}
      onPointerDown={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const outside =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom;
        if (event.target === event.currentTarget && outside) {
          setOpen(false);
        } else if (
          variant === "movable" &&
          event.button === 0 &&
          !outside &&
          event.target instanceof Element &&
          !event.target.closest(
            "button, a, input, select, textarea, [contenteditable]",
          )
        ) {
          drag.current = {
            x: event.clientX - position.current.x,
            y: event.clientY - position.current.y,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        onPointerDown?.(event);
      }}
      onPointerMove={(event: PointerEvent<HTMLDialogElement>) => {
        if (drag.current)
          place(event.clientX - drag.current.x, event.clientY - drag.current.y);
        onPointerMove?.(event);
      }}
      onPointerUp={(event) => {
        drag.current = null;
        onPointerUp?.(event);
      }}
      onPointerCancel={(event) => {
        drag.current = null;
        onPointerCancel?.(event);
      }}
      ref={(node) => {
        dialogRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      {...props}
    >
      {children}
    </dialog>
  );
}

export const Modal = {
  Root: ModalRoot,
  Target: ModalTarget,
  Close: ModalClose,
  Content: ModalContent,
};
