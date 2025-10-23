"use client";
import clsx from "clsx";
import { MdClose } from "react-icons/md";
import { ToastProps } from "./toast.types";
import { useMemo } from "react";

export const ToastBase = ({ id, message, type, onClose }: ToastProps) => {
  const colors = useMemo(
    () => ({
      "bg-green-500": type === "success",
      "bg-red-500": type === "error",
      "bg-yellow-400 text-black": type === "warning",
      "bg-cyan-500": type === "info",
    }),
    [type]
  );

  return (
    <div
      className={clsx(
        "fixed z-50 flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-lg min-w-[260px] text-white animate-fade-in-up",
        colors
      )}
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="text-white/80 hover:text-white transition-colors"
      >
        <MdClose size={20} className="cursor-pointer" />
      </button>
    </div>
  );
};
