import { Input, Button, BUTTON_VARIANTS } from "@/components";
import { Checkbox } from "@/components/ui/input";
import { useSignupForm } from "./hook/open-account-form";

export const OpenAccountForm = ({ onClose }: { onClose: () => void }) => {
  const { acceptedTerms, setAcceptedTerms, msg, handleSubmit } =
    useSignupForm(onClose);

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <Input
        name="name"
        type="text"
        placeholder="Digite seu nome..."
        label="Nome"
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="Digite seu email..."
        label="Email"
        required
        pattern="\S+@\S+\.\S+"
        autoComplete="username"
      />
      <Input
        name="password"
        type="password"
        placeholder="Digite sua senha..."
        label="Senha"
        required
        autoComplete="new-password"
      />

      <div className="flex items-start">
        <Checkbox
          label="Li e estou ciente quanto às condições de tratamento dos meus dados..."
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

      {msg && <p className="text-red-500 mt-2">{msg}</p>}
    </form>
  );
};
