"use client";
import { Button, BUTTON_VARIANTS } from "@/components";
import { useModal } from "@/components/ui/modal/hooks/use-modal-context";
import { OpenAccountForm } from "../open-account-form/open-account-form";

export const HomeHeaderButtons = () => {
  const { open, close } = useModal();
  return (
    <div className="flex flex-row gap-5">
      <Button
        onClick={() =>
          open({
            title: "Abrir minha conta",
            content: (
              <OpenAccountForm onClose={close} onSubmit={() => void 0} />
            ),
          })
        }
      >
        Abrir minha conta
      </Button>
      <Button variant={BUTTON_VARIANTS.ghost}>Já tenho conta</Button>
    </div>
  );
};
