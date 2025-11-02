import { useToastMethods } from "@/components/ui/toast/hooks/use-toast-methods";
import { useAuth } from "@/lib/indexedDb/auth-context";
import { useState } from "react";
import { logger } from "@/lib/utils/logger";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/lib/constants/messages";

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
      setMsg(ERROR_MESSAGES.DATABASE_NOT_READY);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const emailNormalized = email.toLowerCase().trim();

    try {
      await addUser({ username: name, email: emailNormalized, password });
      toast.success(SUCCESS_MESSAGES.ACCOUNT_CREATED, "bottom-right");
      e.currentTarget?.reset();
      onClose();
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "ConstraintError") {
        toast.error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS, "top-center");
      } else {
        toast.error(ERROR_MESSAGES.ACCOUNT_CREATION_FAILED, "top-center");
        logger.error(err, "useSignupForm");
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
