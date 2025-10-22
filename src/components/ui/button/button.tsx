import clsx from "clsx";
import { BUTTON_VARIANTS, ButtonProps } from "./button.types";

export const Button = ({
  variant = BUTTON_VARIANTS.default,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const mapButtonColors: Record<BUTTON_VARIANTS, string> = {
    alert: "bg-red-600 text-white hover:bg-red-700",
    default: "bg-cyan-600 text-white hover:bg-cyan-800",
    ghost:
      "bg-white text-black border border-gray-300 hover:bg-gray-200 hover:border-gray-400",
  };

  return (
    <button
      className={clsx(
        "rounded-xl h-[48px] px-4 font-semibold transition-colors cursor-pointer cyan",
        mapButtonColors[variant],
        fullWidth ? "w-full" : "w-fit",
        "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
        mapButtonColors[variant],
        fullWidth ? "w-full" : "w-fit"
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
