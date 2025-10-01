"use client";
import { Button, BUTTON_VARIANTS, Input } from "@/components";

type OpenAccotunFormProps = {
  onClose: () => void;
  onSubmit: () => void;
};

export const OpenAccountForm = ({
  onClose,
  onSubmit,
}: OpenAccotunFormProps) => {
  return (
    <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={onSubmit}>
      <Input type="text" placeholder="Digite seu nome..." label="Nome" />
      <Input type="email" placeholder="Digite seu email..." label="Email" />
      <Input type="password" placeholder="Digite sua senha..." label="Senha" />
      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          variant={BUTTON_VARIANTS.ghost}
          onAbort={onClose}
          fullWidth
        >
          Já tenho conta
        </Button>
        <Button type="submit" fullWidth>
          Criar Conta
        </Button>
      </div>
    </form>
  );
};
