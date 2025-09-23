import clsx from "clsx";
import { BUTTON_VARIANTS, ButtonProps } from "./button.types";

export const Button = ({
  variant = BUTTON_VARIANTS.default,
  ...props
}: ButtonProps) => {
  const mapButtonColors: Record<BUTTON_VARIANTS, string> = {
    alert: "bg-red-600 text-white hover:bg-red-700",
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost:
      "bg-white text-black border border-gray-300 hover:bg-gray-100 hover:border-gray-400",
  };

  return (
    <button
      className={clsx(
        "rounded-xl h-[48px] px-4 font-medium transition-colors cursor-pointer",
        mapButtonColors[variant]
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
