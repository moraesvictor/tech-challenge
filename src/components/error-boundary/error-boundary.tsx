"use client";
import React, { useState, useCallback } from "react";
import { logger } from "@/lib/utils/logger";
import { Button, BUTTON_VARIANTS } from "@/components";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

type ErrorBoundaryClassProps = ErrorBoundaryProps & {
  onReset: () => void;
};

/**
 * Componente funcional para exibir o fallback de erro
 */
const ErrorFallback = ({
  error,
  onReset,
  fallback,
}: {
  error?: Error;
  onReset: () => void;
  fallback?: React.ReactNode;
}) => {
  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Algo deu errado
        </h1>
        <p className="text-gray-600 mb-6">
          Ocorreu um erro inesperado. Por favor, tente novamente.
        </p>
        {process.env.NODE_ENV === "development" && error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-mono text-red-800">{error.message}</p>
          </div>
        )}
        <Button variant={BUTTON_VARIANTS.default} onClick={onReset}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
};

/**
 * Classe interna necessária para Error Boundary
 * Error Boundaries só podem ser implementados como classes em React
 * Esta classe é encapsulada pelo componente funcional abaixo
 */
class ErrorBoundaryClass extends React.Component<
  ErrorBoundaryClassProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryClassProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error(error, "ErrorBoundary");
    if (errorInfo.componentStack) {
      logger.warn(errorInfo.componentStack, "ErrorBoundary");
    }
  }

  render() {
    const { hasError, error } = this.state;
    const { children, fallback, onReset } = this.props;

    if (hasError) {
      return <ErrorFallback error={error} onReset={onReset} fallback={fallback} />;
    }

    return <>{children}</>;
  }
}

/**
 * Error Boundary wrapper funcional
 * Mantém API funcional enquanto encapsula classe necessária para Error Boundaries
 */
export const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
  const [errorKey, setErrorKey] = useState(0);

  const handleReset = useCallback(() => {
    setErrorKey((prev) => prev + 1);
  }, []);

  return (
    <ErrorBoundaryClass key={errorKey} onReset={handleReset} fallback={fallback}>
      {children}
    </ErrorBoundaryClass>
  );
};

