"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import { ToastBase } from "../toast-base";
import {
  Toast,
  ToastContainerProps,
  ToastContextType,
  ToastType,
} from "../toast.types";
import { ToastContainer } from "../toast-container";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (
      message: string,
      type: ToastType,
      position: ToastContainerProps["position"] = "bottom-right"
    ) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type, position }]);
      setTimeout(() => removeToast(id), 3000);
    },
    [removeToast]
  );

  const positions: ToastContainerProps["position"][] = [
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
    "top-center",
    "bottom-center",
  ];

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {positions.map((pos) => {
        const filteredToasts = toasts.filter((t) => t.position === pos);
        if (filteredToasts.length === 0) return null;

        return (
          <ToastContainer key={pos} position={pos}>
            {filteredToasts.map((t) => (
              <ToastBase key={t.id} {...t} onClose={removeToast} />
            ))}
          </ToastContainer>
        );
      })}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToastContext must be used within a ToastProvider");
  return ctx;
};
