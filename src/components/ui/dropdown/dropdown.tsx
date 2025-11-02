"use client";
import React from "react";
import clsx from "clsx";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: DropdownOption[];
  label?: string;
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export const Dropdown = ({
  options,
  label,
  onChange,
  value,
  placeholder,
  className,
  disabled = false,
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
          "w-full px-4 py-2 pr-3 border rounded-lg shadow-sm placeholder-gray-400",
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
