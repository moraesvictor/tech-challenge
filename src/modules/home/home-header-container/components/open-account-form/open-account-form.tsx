"use client";
import { useState } from "react";
import { Button, BUTTON_VARIANTS, Input } from "@/components";
import { Checkbox } from "@/components/ui/input";

type OpenAccountFormProps = {
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const OpenAccountForm = ({
  onClose,
  onSubmit,
}: OpenAccountFormProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedTerms) {
      return;
    }
    onSubmit(e);
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Digite seu nome..."
        label="Nome"
        required
      />
      <Input
        type="email"
        placeholder="Digite seu email..."
        label="Email"
        required
      />
      <Input
        type="password"
        placeholder="Digite sua senha..."
        label="Senha"
        required
      />

      <div className="flex items-start">
        <Checkbox
          label="Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco."
          checked={acceptedTerms}
          onChange={setAcceptedTerms}
        />
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          variant={BUTTON_VARIANTS.ghost}
          onClick={onClose}
          fullWidth
        >
          Já tenho conta
        </Button>
        <Button type="submit" fullWidth disabled={!acceptedTerms}>
          Criar Conta
        </Button>
      </div>
    </form>
  );
};
