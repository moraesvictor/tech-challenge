import { useAuth } from "@/lib/indexedDb/auth-context";
import { useState } from "react";
import { logger } from "@/lib/utils/logger";
import { ERROR_MESSAGES } from "@/lib/constants/messages";

export function useLogin() {
  const { ready, validateCredentials, login: loginUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setError(null);
    if (!ready) {
      setError(ERROR_MESSAGES.DATABASE_NOT_READY);
      return null;
    }

    setLoading(true);

    try {
      const { valid, user } = await validateCredentials(email, password);

      if (!valid || !user) {
        setError(ERROR_MESSAGES.INVALID_CREDENTIALS);
        setLoading(false);
        return null;
      }

      await loginUser(email, password);

      setLoading(false);
      return user;
    } catch (error) {
      setError(ERROR_MESSAGES.INVALID_CREDENTIALS);
      setLoading(false);
      logger.error(error, "useLogin");
      return null;
    }
  };

  return { login, error, loading };
}
