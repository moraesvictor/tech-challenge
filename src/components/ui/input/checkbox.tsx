"use client";
import React, { useMemo, useState } from "react";
import clsx from "clsx";

type CheckboxProps = {
  id?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  variant?: "cyan" | "red" | "gray";
  onChange?: (checked: boolean) => void;
};

export const Checkbox = ({
  id,
  label,
  checked,
  defaultChecked = false,
  disabled = false,
  variant = "cyan",
  onChange,
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    if (!isControlled) setInternalChecked(newValue);
    onChange?.(newValue);
  };

  const variantStyles = useMemo(
    () => ({
      cyan: "border-cyan-500 bg-cyan-100 checked:bg-cyan-500 checked:border-cyan-600 focus:ring-cyan-400",
      red: "border-red-500 bg-red-100 checked:bg-red-500 checked:border-red-600 focus:ring-red-400",
      gray: "border-gray-400 bg-gray-100 checked:bg-gray-600 checked:border-gray-700 focus:ring-gray-400",
    }),
    []
  );

  return (
    <label
      htmlFor={id}
      className={clsx(
        "flex space-x-2 select-none ",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <div className="relative flex-shrink-0 w-4 h-4">
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          checked={isChecked}
          onChange={handleChange}
          className={clsx(
            "appearance-none w-4 h-4 rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 cursor-pointer relative z-10",
            variantStyles[variant]
          )}
        />
        <span
          className={clsx(
            "absolute top-0 left-0 w-4 h-4 flex items-center justify-center text-[10px] leading-none text-white font-bold pointer-events-none transition-opacity duration-200 z-20",
            isChecked ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
          style={{ lineHeight: "1" }}
        >
          ✓
        </span>
      </div>
      {label && <span className="text-sm text-gray-800">{label}</span>}
    </label>
  );
};
