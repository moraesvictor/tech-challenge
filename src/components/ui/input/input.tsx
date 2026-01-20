"use client";
import React, { InputHTMLAttributes, useId } from "react";
import clsx from "clsx";
import { useCurrencyMask } from "./hooks/use-currency-mask";
import { parseCurrency } from "@/lib/utils/currency-mask";
import { ErrorMessage } from "../error-message/error-message";

export type InputSize = "sm" | "md" | "lg";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  errorLabel?: string;
  currency?: boolean;
  inputSize?: InputSize;
};

const INPUT_SIZE_CLASSES: Record<InputSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export const Input: React.FC<InputProps> = ({
  label,
  className,
  errorLabel,
  currency,
  value,
  onChange,
  onBlur,
  inputSize = "md",
  ...props
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const currencyMask = useCurrencyMask(
    currency ? (value as string | number | undefined) : undefined
  );

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.setCustomValidity(errorLabel || "Campo inválido");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currency) {
      const numericValue = parseCurrency(e.target.value);
      currencyMask.handleChange(e);
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: numericValue.toString(),
          },
          currentTarget: {
            ...e.currentTarget,
            value: numericValue.toString(),
          },
        };
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }
    } else {
      onChange?.(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (currency) {
      currencyMask.handleBlur(e);
    }
    onBlur?.(e);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        id={inputId}
        aria-describedby={errorLabel ? errorId : undefined}
        aria-invalid={!!errorLabel}
        value={currency ? currencyMask.displayValue : value}
        onChange={handleChange}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          e.currentTarget.setCustomValidity("");
        }}
        className={clsx(
          "w-full border rounded-lg shadow-sm placeholder-gray-400",
          INPUT_SIZE_CLASSES[inputSize],
          "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
          "disabled:opacity-50 disabled:cursor-not-allowed transition duration-200",
          errorLabel && "border-red-500",
          className
        )}
      />
      <ErrorMessage message={errorLabel} id={errorId} />
    </div>
  );
};
