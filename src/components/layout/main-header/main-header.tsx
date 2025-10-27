import clsx from "clsx";
import { HEADER_COLORS, MainHeaderProps } from "./main-header.types";

export const MainHeader = ({
  children,
  className,
  color = HEADER_COLORS.light,
}: MainHeaderProps) => {
  const bgColors: Record<HEADER_COLORS, string> = {
    [HEADER_COLORS.dark]: "bg-gray-900",
    [HEADER_COLORS.light]: "bg-cyan-900",
  };

  const selectedColor = bgColors[color];

  return (
    <header
      className={clsx(
        "w-full py-4 flex items-center",
        className,
        selectedColor
      )}
    >
      {children}
    </header>
  );
};
