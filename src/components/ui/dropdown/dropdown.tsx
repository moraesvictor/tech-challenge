"use client";
import React from "react";
import clsx from "clsx";
import { InputSize } from "../input/input";

type DropdownOption = {
  label: string;
  value: string;
};

const DROPDOWN_SIZE_CLASSES: Record<InputSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

type DropdownProps = {
  options: DropdownOption[];
  label?: string;
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  inputSize?: InputSize;
};

export const Dropdown = ({
  options,
  label,
  onChange,
  value,
  placeholder,
  className,
  disabled = false,
  inputSize = "md",
}: DropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 font-medium text-gray-700">{label}</label>
      )}
      <select
        onChange={handleChange}
        value={value}
        disabled={disabled}
        className={clsx(
          "w-full px-4 py-2 border rounded-lg shadow-sm placeholder-gray-400",
          DROPDOWN_SIZE_CLASSES[inputSize],
          "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
          "disabled:opacity-50 disabled:cursor-not-allowed transition duration-200",
          className
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
