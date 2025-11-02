"use client";
import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { useCurrencyMask } from "./hooks/use-currency-mask";
import { parseCurrency } from "@/lib/utils/currency-mask";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorLabel?: string;
  currency?: boolean;
};

export const Input: React.FC<InputProps> = ({
  label,
  className,
  errorLabel,
  currency,
  value,
  onChange,
  onBlur,
  ...props
}) => {
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
        <label className="mb-1 font-medium text-gray-700">{label}</label>
      )}
      <input
        {...props}
        value={currency ? currencyMask.displayValue : value}
        onChange={handleChange}
        onBlur={handleBlur}
        onInvalid={handleInvalid}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          e.currentTarget.setCustomValidity("");
        }}
        className={clsx(
          "w-full px-4 py-2 border rounded-lg shadow-sm placeholder-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
          "disabled:opacity-50 disabled:cursor-not-allowed transition duration-200",
          className
        )}
      />
    </div>
  );
};
