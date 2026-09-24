import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
} from "react";

export interface SelectOptionProps {
  children: ReactNode;
  disabled?: boolean;
  value: string;
}

export interface SelectProps {
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "false" | "true";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  ref?: Ref<HTMLButtonElement>;
  value?: string;
}

type Option = SelectOptionProps & { id: string; text: string };

export function getNextEnabledIndex(
  options: readonly Pick<Option, "disabled">[],
  current: number,
  direction: 1 | -1,
) {
  for (let offset = 1; offset <= options.length; offset += 1) {
    const index =
      (current + direction * offset + options.length) % options.length;

    if (!options[index]?.disabled) return index;
  }

  return -1;
}

export function shouldOpenUpward(
  listboxBottom: number,
  viewportHeight: number,
) {
  return listboxBottom > viewportHeight;
}

function SelectOption(_props: SelectOptionProps) {
  return null;
}

function SelectRoot({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  defaultValue,
  disabled = false,
  id,
  name,
  onValueChange,
  placeholder = "Select an option",
  ref,
  value,
}: SelectProps) {
  const generatedId = useId();
  const listboxId = `${id ?? generatedId}-listbox`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const setTriggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node;

      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectedValue = value ?? internalValue;
  const options: Option[] = Children.toArray(children).flatMap(
    (child, index) => {
      if (
        !isValidElement<SelectOptionProps>(child) ||
        child.type !== SelectOption
      ) {
        return [];
      }

      return [
        {
          ...child.props,
          id: `${listboxId}-option-${index}`,
          text:
            typeof child.props.children === "string" ||
            typeof child.props.children === "number"
              ? String(child.props.children)
              : child.props.value,
        },
      ];
    },
  );
  const selectedIndex = options.findIndex(
    (option) => option.value === selectedValue,
  );

  useEffect(() => {
    if (open) listboxRef.current?.focus();
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !listboxRef.current) return;

    setOpenUpward(
      shouldOpenUpward(
        listboxRef.current.getBoundingClientRect().bottom,
        window.innerHeight,
      ),
    );
  }, [open]);

  function openList(direction: 1 | -1 = 1) {
    const start =
      selectedIndex >= 0 ? selectedIndex - direction : direction > 0 ? -1 : 0;
    setActiveIndex(getNextEnabledIndex(options, start, direction));
    setOpenUpward(false);
    setOpen(true);
  }

  function closeList(returnFocus = false) {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }

  function selectOption(index: number) {
    const option = options[index];
    if (!option || option.disabled) return;

    if (value === undefined) setInternalValue(option.value);
    onValueChange?.(option.value);
    closeList(true);
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openList(event.key === "ArrowUp" ? -1 : 1);
    }
  }

  function handleListboxKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        getNextEnabledIndex(
          options,
          current,
          event.key === "ArrowDown" ? 1 : -1,
        ),
      );
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(
        getNextEnabledIndex(
          options,
          event.key === "Home" ? -1 : 0,
          event.key === "Home" ? 1 : -1,
        ),
      );
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(activeIndex);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeList(true);
      return;
    }

    if (event.key === "Tab") {
      closeList();
      return;
    }

    if (
      event.key.length === 1 &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      const query = event.key.toLocaleLowerCase();
      const match = options.findIndex(
        (option, index) =>
          index > activeIndex &&
          !option.disabled &&
          option.text.toLocaleLowerCase().startsWith(query),
      );
      const wrappedMatch = options.findIndex(
        (option) =>
          !option.disabled && option.text.toLocaleLowerCase().startsWith(query),
      );

      if (match >= 0 || wrappedMatch >= 0) {
        event.preventDefault();
        setActiveIndex(match >= 0 ? match : wrappedMatch);
      }
    }
  }

  const selectedOption = options[selectedIndex];

  return (
    <div
      className="mc-select-field"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeList();
      }}
    >
      <button
        aria-controls={listboxId}
        aria-describedby={ariaDescribedBy}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={ariaInvalid}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={["mc-focus-ring", "mc-select", className]
          .filter(Boolean)
          .join(" ")}
        disabled={disabled}
        id={id}
        onClick={() => (open ? closeList() : openList())}
        onKeyDown={handleTriggerKeyDown}
        ref={setTriggerRef}
        type="button"
      >
        <span className={selectedOption ? undefined : "mc-select__placeholder"}>
          {selectedOption?.children ?? placeholder}
        </span>
      </button>

      {open && (
        <ul
          aria-activedescendant={options[activeIndex]?.id}
          className="mc-select__listbox"
          data-placement={openUpward ? "top" : "bottom"}
          id={listboxId}
          onKeyDown={handleListboxKeyDown}
          ref={listboxRef}
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              aria-disabled={option.disabled || undefined}
              aria-selected={index === selectedIndex}
              className="mc-select__option"
              data-active={index === activeIndex || undefined}
              id={option.id}
              key={option.value}
              onClick={() => selectOption(index)}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => {
                if (!option.disabled) setActiveIndex(index);
              }}
              role="option"
            >
              {option.children}
            </li>
          ))}
        </ul>
      )}

      {name && (
        <input
          disabled={disabled}
          name={name}
          type="hidden"
          value={selectedValue ?? ""}
        />
      )}
    </div>
  );
}

export const Select = Object.assign(SelectRoot, { Option: SelectOption });
