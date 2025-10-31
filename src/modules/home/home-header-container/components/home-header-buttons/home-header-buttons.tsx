"use client";
import { Button, BUTTON_VARIANTS } from "@/components";
import { useModal } from "@/components/ui/modal/hooks/use-modal-context";
import { OpenAccountForm } from "../open-account-form/open-account-form";
import { LoginForm } from "../login-form/login-form";

export const HomeHeaderButtons = ({ isVertical = false }: { isVertical?: boolean }) => {
  const { open, close } = useModal();
  return (
    <div className={`flex ${isVertical ? "flex-col" : "flex-row"} gap-5`}>
      <Button
        onClick={() =>
          open({
            title: "Abrir minha conta",
            content: <OpenAccountForm onClose={close} />,
          })
        }
      >
        Abrir minha conta
      </Button>
      <Button
        variant={BUTTON_VARIANTS.ghost}
        onClick={() =>
          open({
            title: "Acessar conta",
            content: <LoginForm onClose={close} />,
          })
        }
      >
        Já tenho conta
      </Button>
    </div>
  );
};
