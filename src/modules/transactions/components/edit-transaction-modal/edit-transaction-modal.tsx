"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input/input";
import { Button, BUTTON_VARIANTS } from "@/components";
import { Dropdown } from "@/components/ui/dropdown/dropdown";
import { Transaction } from "@/lib/types/transaction.types";
import { useTransactions } from "@/lib/transactions/transactions-context";
import { useToastMethods } from "@/components/ui/toast/hooks/use-toast-methods";
import { parseCurrency } from "@/lib/utils/currency-mask";

type EditTransactionModalProps = {
  transaction: Transaction;
  onClose: () => void;
};

export const EditTransactionModal = ({
  transaction,
  onClose,
}: EditTransactionModalProps) => {
  const { updateTransaction } = useTransactions();
  const toast = useToastMethods();

  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState<number>(
    Math.abs(transaction.amount * 100)
  );
  const [type, setType] = useState<"credit" | "debit">(transaction.type);
  const [date, setDate] = useState(() => {
    const [day, month, year] = transaction.date.split("/");
    return `${year}-${month}-${day}`;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!description.trim()) {
        throw new Error("Descrição é obrigatória");
      }

      const [year, month, day] = date.split("-");
      const formattedDate = `${day}/${month}/${year}`;

      const amountValue = amount / 100;

      const updatedTransaction: Transaction = {
        ...transaction,
        description,
        amount: type === "credit" ? amountValue : -amountValue,
        type,
        date: formattedDate,
      };

      updateTransaction(transaction.id, updatedTransaction);
      toast.success("Transação atualizada com sucesso!", "bottom-right");
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao atualizar transação";
      toast.error(message, "top-center");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Descrição"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Tipo</label>
        <Dropdown
          onChange={(value) => setType(value as "credit" | "debit")}
          options={[
            { label: "Receita", value: "credit" },
            { label: "Despesa", value: "debit" },
          ]}
          value={type}
        />
      </div>

      <Input
        label="Valor"
        type="text"
        currency={true}
        value={amount}
        onChange={(e) => {
          const numericValue = parseCurrency(e.target.value);
          setAmount(numericValue);
        }}
        required
      />

      <Input
        label="Data"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <div className="flex gap-3 justify-center mt-2">
        <Button type="button" variant={BUTTON_VARIANTS.ghost} onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};

