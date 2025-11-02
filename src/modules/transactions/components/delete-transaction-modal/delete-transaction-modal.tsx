"use client";
import { Button, BUTTON_VARIANTS } from "@/components";
import { Transaction } from "@/lib/types/transaction.types";

type DeleteTransactionModalProps = {
  transaction: Transaction;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteTransactionModal = ({
  transaction,
  onConfirm,
  onCancel,
}: DeleteTransactionModalProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-700">
        Tem certeza que deseja deletar a transação{" "}
        <strong className="text-gray-900">
          &ldquo;{transaction.description}&rdquo;
        </strong>
        ?
      </p>
      <p className="text-sm text-gray-500">
        Esta ação não pode ser desfeita.
      </p>

      <div className="flex gap-3 justify-center mt-2">
        <Button
          type="button"
          variant={BUTTON_VARIANTS.ghost}
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant={BUTTON_VARIANTS.alert}
          onClick={onConfirm}
        >
          Deletar
        </Button>
      </div>
    </div>
  );
};

