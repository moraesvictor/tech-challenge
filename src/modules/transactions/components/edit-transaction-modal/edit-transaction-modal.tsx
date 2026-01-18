"use client";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input/input";
import { Button, BUTTON_VARIANTS, FileUpload } from "@/components";
import { Dropdown } from "@/components/ui/dropdown/dropdown";
import { Transaction, TransactionCategory } from "@/lib/types/transaction.types";
import { useTransactions } from "@/lib/transactions/transactions-context";
import { useToastMethods } from "@/components/ui/toast/hooks/use-toast-methods";
import { parseCurrency } from "@/lib/utils/currency-mask";
import { dateUtils } from "@/lib/utils/date";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/lib/constants/messages";
import {
  TRANSACTION_CATEGORIES,
  CATEGORY_LABELS,
  getCategoryFromDescription,
} from "@/lib/constants/categories";

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
  const [category, setCategory] = useState<TransactionCategory | undefined>(
    transaction.category
  );
  const [attachmentUrl, setAttachmentUrl] = useState<string | undefined>(
    transaction.attachmentUrl
  );
  const [date, setDate] = useState(() => {
    return dateUtils.toInputDate(transaction.date);
  });
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");

  // Sugestão automática de categoria baseada na descrição
  useEffect(() => {
    if (description.trim()) {
      const suggestedCategory = getCategoryFromDescription(description);
      if (suggestedCategory) {
        const availableCategories = TRANSACTION_CATEGORIES[type];
        if (availableCategories.includes(suggestedCategory) && !category) {
          setCategory(suggestedCategory);
        }
      }
    }
  }, [description, type, category]);

  // Validação em tempo real
  useEffect(() => {
    if (description.trim().length < 3) {
      setDescriptionError("A descrição deve ter pelo menos 3 caracteres");
    } else {
      setDescriptionError("");
    }
  }, [description]);

  useEffect(() => {
    if (amount <= 0) {
      setAmountError("O valor deve ser maior que zero");
    } else {
      setAmountError("");
    }
  }, [amount]);

  const categoryOptions = useMemo(() => {
    const categories = TRANSACTION_CATEGORIES[type];
    return [
      { label: "Sem categoria", value: "" },
      ...categories.map((cat) => ({
        label: CATEGORY_LABELS[cat],
        value: cat,
      })),
    ];
  }, [type]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validação avançada
      if (!description.trim()) {
        throw new Error(ERROR_MESSAGES.DESCRIPTION_REQUIRED);
      }

      if (description.trim().length < 3) {
        throw new Error("A descrição deve ter pelo menos 3 caracteres");
      }

      if (amount <= 0) {
        throw new Error("O valor deve ser maior que zero");
      }

      if (amount > 100000000) {
        throw new Error("O valor não pode ser maior que R$ 1.000.000,00");
      }

      const formattedDate = dateUtils.fromInputDate(date);
      const amountValue = amount / 100;

      // Sugestão automática de categoria se não houver
      let finalCategory = category;
      if (!finalCategory && description.trim()) {
        const suggestedCategory = getCategoryFromDescription(description);
        if (suggestedCategory) {
          const availableCategories = TRANSACTION_CATEGORIES[type];
          if (availableCategories.includes(suggestedCategory)) {
            finalCategory = suggestedCategory;
          }
        }
      }

      const updatedTransaction: Transaction = {
        ...transaction,
        description: description.trim(),
        amount: type === "credit" ? amountValue : -amountValue,
        type,
        category: finalCategory,
        attachmentUrl,
        date: formattedDate,
      };

      updateTransaction(transaction.id, updatedTransaction);
      toast.success(SUCCESS_MESSAGES.TRANSACTION_UPDATED, "bottom-right");
      onClose();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : ERROR_MESSAGES.TRANSACTION_UPDATE_FAILED;
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
        errorLabel={descriptionError}
        required
        minLength={3}
        maxLength={200}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Tipo</label>
        <Dropdown
          onChange={(value) => {
            setType(value as "credit" | "debit");
            setCategory(undefined);
          }}
          options={[
            { label: "Receita", value: "credit" },
            { label: "Despesa", value: "debit" },
          ]}
          value={type}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Categoria</label>
        <Dropdown
          onChange={(value) =>
            setCategory(value ? (value as TransactionCategory) : undefined)
          }
          options={categoryOptions}
          value={category || ""}
          placeholder="Selecione uma categoria (sugerida automaticamente)"
        />
        {category && (
          <p className="text-xs text-cyan-600">
            Categoria sugerida automaticamente baseada na descrição
          </p>
        )}
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
        errorLabel={amountError}
        required
        min="0.01"
        max="1000000"
      />

      <Input
        label="Data"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        max={new Date().toISOString().split("T")[0]}
      />

      <FileUpload
        label="Anexo (Recibo/Documento)"
        accept="image/*,.pdf"
        maxSize={5}
        value={attachmentUrl}
        onChange={(file, url) => {
          setAttachmentUrl(url || undefined);
        }}
      />

      <div className="flex gap-3 justify-center mt-2">
        <Button type="button" variant={BUTTON_VARIANTS.ghost} onClick={onClose}>
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={!!descriptionError || !!amountError}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
};

