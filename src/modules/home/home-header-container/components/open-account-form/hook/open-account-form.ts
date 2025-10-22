import { useAuthIndexedDB } from "@/lib/indexedDb/useAuthIndexedDb";
import { useState } from "react";

export const useSignupForm = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [msg, setMsg] = useState("");
  const { ready, addUser } = useAuthIndexedDB();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setMsg("Você precisa aceitar os termos");
      return;
    }

    if (!ready) {
      setMsg("DB não está pronto ainda");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const emailNormalized = email.toLowerCase().trim()

  try {
    await addUser({ username: name, email: emailNormalized, password });
    setMsg("Conta criada com sucesso!");
    e.currentTarget?.reset();
    setAcceptedTerms(false);
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "ConstraintError") {
      setMsg("Email já cadastrado!");
    } else {
      setMsg("Erro ao criar conta");
      console.error(err);
    }
  }
};

  return {
    acceptedTerms,
    setAcceptedTerms,
    msg,
    handleSubmit,
  };
};
