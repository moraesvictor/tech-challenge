import { Button, BUTTON_VARIANTS } from "@/components";

type LogoutModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const LogoutModal = ({ onConfirm, onCancel }: LogoutModalProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Confirmar saída
        </h3>
        <p className="text-gray-600">
          Tem certeza que deseja sair? Você precisará fazer login novamente para
          acessar sua conta.
        </p>
      </div>
      <div className="flex gap-3 justify-end">
        <Button variant={BUTTON_VARIANTS.ghost} onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant={BUTTON_VARIANTS.alert} onClick={onConfirm}>
          Sair
        </Button>
      </div>
    </div>
  );
};

