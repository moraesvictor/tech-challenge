import { ReactNode } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: number;
  message: string;
  type: ToastType;
  onClose: (id: number) => void;
}

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  position?: ToastPosition;
}

export interface ToastContextType {
  addToast: (
    message: string,
    type: ToastType,
    position?: ToastPosition
  ) => void;
  removeToast: (id: number) => void;
}

export interface ToastContainerProps {
  children: ReactNode;
  position?: ToastPosition;
}
