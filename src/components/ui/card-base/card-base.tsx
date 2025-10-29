import clsx from "clsx";
import { PropsWithChildren, useMemo } from "react";

type CardBaseProps = {
  children: PropsWithChildren["children"];
  colorSchema?: "light" | "dark";
  size?: "xl" | "l" | "md" | "sm" | "xsm" | "full";
  className?: string;
};

export const CardBase = ({
  children,
  colorSchema = "light",
  size = "md",
  className,
}: CardBaseProps) => {
  const cardColorMap = useMemo(
    () => ({
      dark: "bg-cyan-800 border border-cyan-900 text-white",
      light: "bg-gray-100 border border-gray-300 text-gray-900",
    }),
    []
  );

  const cardSizeMap = useMemo(
    () => ({
      xl: "p-8 text-xl rounded-3xl",
      l: "p-6 text-lg rounded-2xl",
      md: "p-4 text-base rounded-xl",
      sm: "p-3 text-sm rounded-lg",
      xsm: "p-2 text-xs rounded-md",
      full: 'p-10 text-xl rounded-4xl'
    }),
    []
  );

  const cardColorClass = cardColorMap[colorSchema];
  const cardSizeClass = cardSizeMap[size];

  return (
    <div
      className={clsx(
        "transition-colors",
        cardColorClass,
        cardSizeClass,
        className
      )}
    >
      {children}
    </div>
  );
};
