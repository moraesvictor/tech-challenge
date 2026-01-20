"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";
import { Input, InputProps } from "../input/input";

type InputWithIconProps = InputProps & {
  icon: ReactNode;
  iconPosition?: "left" | "right";
};

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  iconPosition = "left",
  label,
  errorLabel,
  currency,
  inputSize = "md",
  className,
  ...props
}) => {
  const iconPadding = iconPosition === "left" ? "pl-10" : "pr-10";

  return (
    <div className="w-full">
      <div className="relative">
        <div
          className={clsx(
            "absolute top-1 -translate-y-1/2 z-10 flex items-center pointer-events-none",
            iconPosition === "left" ? "left-3" : "right-3"
          )}
          style={{ top: label ? "calc(50% + 0.5rem)" : "50%" }}
        >
          {icon}
        </div>
        <Input
          {...props}
          label={label}
          errorLabel={errorLabel}
          currency={currency}
          inputSize={inputSize}
          className={clsx(iconPadding, className)}
        />
      </div>
    </div>
  );
};
