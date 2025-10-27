import { useAuth } from "@/lib/indexedDb/auth-context";
import { useState } from "react";

export function useLogin() {
  const { ready, validateCredentials, login: loginUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setError(null);
    if (!ready) {
      setError("Banco de dados ainda não está pronto");
      return null;
    }

    setLoading(true);

    const { valid, user } = await validateCredentials(email, password);

    if (!valid || !user) {
      setError("Email ou senha inválidos");
      setLoading(false);
      return null;
    }

    await loginUser(email, password);

    setLoading(false);
    return user;
  };

  return { login, error, loading };
}
