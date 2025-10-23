"use client";
import { ToastPosition } from "../toast.types";
import { useToastContext } from "./use-toast-context";

export const useToastMethods = () => {
  const { addToast } = useToastContext();

  return {
    success: (msg: string, position?: ToastPosition) =>
      addToast(msg, "success", position),
    error: (msg: string, position?: ToastPosition) =>
      addToast(msg, "error", position),
    warning: (msg: string, position?: ToastPosition) =>
      addToast(msg, "warning", position),
    info: (msg: string, position?: ToastPosition) =>
      addToast(msg, "info", position),
  };
};
