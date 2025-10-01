import clsx from "clsx";
import { HEADER_COLORS, MainHeaderProps } from "./main-header.types";

export const MainHeader = ({
  children,
  className,
  color = HEADER_COLORS.light,
}: MainHeaderProps) => {
  const bgColors: Record<HEADER_COLORS, string> = {
    [HEADER_COLORS.dark]: "bg-gray-900",
    [HEADER_COLORS.light]: "bg-gray-200",
  };

  const selectedColor = bgColors[color];

  return (
    <header
      className={clsx(
        "w-full bg-gray-200 py-4 flex items-center",
        className,
        selectedColor
      )}
    >
      {children}
    </header>
  );
};
