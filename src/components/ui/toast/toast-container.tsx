import clsx from "clsx";
import { ToastContainerProps, ToastPosition } from "./toast.types";
import { useMemo } from "react";

export const ToastContainer = ({
  position = "bottom-right",
  children,
}: ToastContainerProps) => {
  const positions = useMemo<Record<ToastPosition, string>
  >(
    () => ({
      "bottom-right": "bottom-4 right-4 items-end",
      "bottom-left": "bottom-4 left-4 items-start",
      "top-right": "top-4 right-4 items-end",
      "top-left": "top-4 left-4 items-start",
      "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
      "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
    }),
    []
  );

  return (
    <div
      className={clsx(
        "fixed z-[9999] flex flex-col gap-2",
        positions[position]
      )}
    >
      {children}
    </div>
  );
};
