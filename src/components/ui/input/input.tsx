"use client";
import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorLabel?: string;
};

export const Input: React.FC<InputProps> = ({
  label,
  className,
  errorLabel,
  ...props
}) => {
  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.setCustomValidity(errorLabel || "Campo inválido");
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 font-medium text-gray-700">{label}</label>
      )}
      <input
        {...props}
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
