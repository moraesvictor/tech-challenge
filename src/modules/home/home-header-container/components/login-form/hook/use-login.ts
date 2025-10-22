import { useAuthIndexedDB } from "@/lib/indexedDb/useAuthIndexedDb";
import { useState } from "react";

export function useLogin() {
  const { ready, validateCredentials } = useAuthIndexedDB();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setError(null);
    if (!ready) return setError("Banco de dados ainda não pronto");
    setLoading(true);

    const { valid, user } = await validateCredentials(email, password);
    setLoading(false);

    if (valid && user) return user;
    setError("Email ou senha inválidos");
    return null;
  };

  return { login, error, loading };
}
