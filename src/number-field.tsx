import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
} from "react";

import { IconButton } from "./icon-button";

export function clampNumber(value: number, min?: number, max?: number) {
  if (min !== undefined && Number.isFinite(min)) value = Math.max(min, value);
  if (max !== undefined && Number.isFinite(max)) value = Math.min(max, value);
  return value;
}

export interface NumberFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue" | "type" | "value"
> {
  decrementLabel?: string;
  defaultValue?: number;
  incrementLabel?: string;
  onValueChange?: (value: number | null) => void;
  ref?: Ref<HTMLInputElement>;
  value?: number | "";
}

export function NumberField({
  className,
  decrementLabel = "Decrease value",
  defaultValue,
  disabled = false,
  incrementLabel = "Increase value",
  onChange,
  onClick,
  onKeyDown,
  onValueChange,
  readOnly = false,
  ref,
  value,
  ...props
}: NumberFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const pointerDownRef = useRef(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;

      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    let nextValue = input.valueAsNumber;

    if (!Number.isNaN(nextValue)) {
      nextValue = clampNumber(
        nextValue,
        input.min === "" ? undefined : Number(input.min),
        input.max === "" ? undefined : Number(input.max),
      );

      if (nextValue !== input.valueAsNumber) input.value = String(nextValue);
    }

    onChange?.(event);
    onValueChange?.(Number.isNaN(nextValue) ? null : nextValue);
  }

  function step(direction: 1 | -1) {
    const input = inputRef.current;
    if (!input) return;

    if (direction === 1) input.stepUp();
    else input.stepDown();

    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "Enter") {
      event.currentTarget.blur();
      return;
    }

    if (
      event.key.length === 1 &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      !/[\d.+-]/.test(event.key)
    ) {
      event.preventDefault();
    }
  }

  function handleClick(event: MouseEvent<HTMLInputElement>) {
    onClick?.(event);
    if (!event.defaultPrevented) event.currentTarget.select();
  }

  const controlsDisabled = disabled || readOnly;

  return (
    <div
      className="mc-number-field"
      data-keyboard-focus={keyboardFocused || undefined}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          pointerDownRef.current = false;
          setKeyboardFocused(false);
        }
      }}
      onFocusCapture={() => {
        setKeyboardFocused(!pointerDownRef.current);
        pointerDownRef.current = false;
      }}
      onKeyDownCapture={(event) => {
        if (event.key === "Tab") pointerDownRef.current = false;
      }}
      onPointerDownCapture={() => {
        pointerDownRef.current = true;
        setKeyboardFocused(false);
      }}
    >
      <IconButton
        aria-label={decrementLabel}
        className="mc-number-field__stepper"
        disabled={controlsDisabled}
        onClick={() => step(-1)}
        variant="ghost"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M5 12h14" />
        </svg>
      </IconButton>
      <input
        className={["mc-number-field__input", className]
          .filter(Boolean)
          .join(" ")}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        ref={setInputRef}
        type="number"
        value={value}
        {...props}
      />
      <IconButton
        aria-label={incrementLabel}
        className="mc-number-field__stepper"
        disabled={controlsDisabled}
        onClick={() => step(1)}
        variant="ghost"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </IconButton>
    </div>
  );
}
