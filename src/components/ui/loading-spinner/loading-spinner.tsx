import clsx from "clsx";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Componente de loading spinner reutilizável
 */
export const LoadingSpinner = ({
  size = "md",
  className,
}: LoadingSpinnerProps) => {
  return (
    <div
      className={clsx(
        "animate-spin rounded-full border-2 border-gray-300 border-t-cyan-600",
        {
          "h-4 w-4": size === "sm",
          "h-8 w-8": size === "md",
          "h-12 w-12": size === "lg",
        },
        className
      )}
    />
  );
};

