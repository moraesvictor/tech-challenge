"use client";
import { Button, BUTTON_VARIANTS, Input } from "@/components";
import { useLogin } from "./hook/use-login";
import { redirect } from "next/navigation";

type LoginFormProps = {
  onClose: () => void;
};

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const { login, error, loading } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const user = await login(email, password);
    if (user) {
      redirect("/dashboard");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <Input
        name="email"
        type="email"
        placeholder="Digite seu email..."
        label="Email"
        pattern="\S+@\S+\.\S+"
        required
        errorLabel="Por favor, informe um email válido"
      />
      <Input
        name="password"
        type="password"
        placeholder="Digite sua senha..."
        label="Senha"
        required
        errorLabel="Por favor, informe uma senha válida"
        autoComplete="current-password"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          variant={BUTTON_VARIANTS.ghost}
          onClick={onClose}
          fullWidth
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Entrando..." : "Login"}
        </Button>
      </div>
    </form>
  );
};
