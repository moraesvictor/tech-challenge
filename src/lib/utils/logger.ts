/**
 * Utilitário de logging para o aplicativo
 * Logs são apenas exibidos em desenvolvimento
 * Em produção, logs devem ser enviados para um serviço de logging
 */
export const logger = {
  error: (error: unknown, context?: string) => {
    if (process.env.NODE_ENV === "development") {
      if (context) {
        console.error(`[${context}]`, error);
      } else {
        console.error(error);
      }
    }
  },

  warn: (message: string, context?: string) => {
    if (process.env.NODE_ENV === "development") {
      if (context) {
        console.warn(`[${context}]`, message);
      } else {
        console.warn(message);
      }
    }
  },

  info: (message: string, context?: string) => {
    if (process.env.NODE_ENV === "development") {
      if (context) {
        console.info(`[${context}]`, message);
      } else {
        console.info(message);
      }
    }
  },
};

