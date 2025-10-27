import { useToastMethods } from "@/components/ui/toast/hooks/use-toast-methods";
import { useAuth } from "@/lib/indexedDb/auth-context";
import { useState } from "react";

export const useSignupForm = (onClose: () => void) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [msg, setMsg] = useState("");
  const { ready, addUser } = useAuth();
  const toast = useToastMethods();

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

    const emailNormalized = email.toLowerCase().trim();

    try {
      await addUser({ username: name, email: emailNormalized, password });
      toast.success("Conta criada com sucesso!", "bottom-right");
      e.currentTarget?.reset();
      onClose();
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "ConstraintError") {
        toast.error("Email já cadastrado", "top-center");
      } else {
        toast.error("Erro ao criar conta", "top-center");
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
