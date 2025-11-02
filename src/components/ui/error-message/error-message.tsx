import clsx from "clsx";

type ErrorMessageProps = {
  message?: string | null;
  className?: string;
  id?: string;
};

/**
 * Componente reutilizável para exibir mensagens de erro
 */
export const ErrorMessage = ({
  message,
  className,
  id,
}: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p id={id} className={clsx("text-sm text-red-600 mt-1", className)} role="alert">
      {message}
    </p>
  );
};

