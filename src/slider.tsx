import type {
  CSSProperties,
  ChangeEvent,
  InputEvent,
  InputHTMLAttributes,
  Ref,
} from "react";

export interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue" | "type" | "value"
> {
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  ref?: Ref<HTMLInputElement>;
  value?: number;
}

export function getSliderPercentage(value: number, min: number, max: number) {
  if (max <= min) return 0;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

export function Slider({
  className,
  defaultValue,
  max = 100,
  min = 0,
  onChange,
  onInput,
  onValueChange,
  ref,
  style,
  value,
  ...props
}: SliderProps) {
  const percentage = getSliderPercentage(
    Number(value ?? defaultValue ?? min),
    Number(min),
    Number(max),
  );

  function updateFill(event: InputEvent<HTMLInputElement>) {
    event.currentTarget.style.setProperty(
      "--mc-slider-value",
      `${getSliderPercentage(
        event.currentTarget.valueAsNumber,
        Number(min),
        Number(max),
      )}%`,
    );
    onInput?.(event);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
    onValueChange?.(event.currentTarget.valueAsNumber);
  }

  return (
    <input
      className={["mc-focus-ring", "mc-slider", className]
        .filter(Boolean)
        .join(" ")}
      defaultValue={defaultValue}
      max={max}
      min={min}
      onChange={handleChange}
      onInput={updateFill}
      ref={ref}
      style={
        {
          ...style,
          "--mc-slider-value": `${percentage}%`,
        } as CSSProperties
      }
      type="range"
      value={value}
      {...props}
    />
  );
}
