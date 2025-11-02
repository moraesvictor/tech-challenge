"use client";
import { useMemo, useState, useCallback } from "react";
import { TransferForm } from "../../transfer-form/transfer-form";
import { PixForm } from "../../pix-form/pix-form";
import { useTransactions } from "@/lib/transactions/transactions-context";
import { Transaction } from "@/lib/types/transaction.types";
import { useToastMethods } from "@/components/ui/toast/hooks/use-toast-methods";

type PixFormData = {
  keyPix: string;
  value: string;
};

type TransferFormData = {
  name: string;
  account: string;
  bank: string;
  agency: string;
  value: string;
};

export const useBankTransferCardController = () => {
  const [type, setType] = useState<"pix" | "transfer">("pix");
  const [formKey, setFormKey] = useState(0);
  const { addTransaction } = useTransactions();
  const toast = useToastMethods();

  // Estados dos formulários
  const [pixData, setPixData] = useState<PixFormData>({
    keyPix: "",
    value: "",
  });

  const [transferData, setTransferData] = useState<TransferFormData>({
    name: "",
    account: "",
    bank: "",
    agency: "",
    value: "",
  });

  const handleTypeChange = (value: string) => {
    setType(value as "pix" | "transfer");
  };

  const handlePixKeyChange = useCallback((value: string) => {
    setPixData((prev) => ({ ...prev, keyPix: value }));
  }, []);

  const handlePixValueChange = useCallback((value: string) => {
    setPixData((prev) => ({ ...prev, value }));
  }, []);

  const handleTransferNameChange = useCallback((value: string) => {
    setTransferData((prev) => ({ ...prev, name: value }));
  }, []);

  const handleTransferAccountChange = useCallback((value: string) => {
    setTransferData((prev) => ({ ...prev, account: value }));
  }, []);

  const handleTransferBankChange = useCallback((value: string) => {
    setTransferData((prev) => ({ ...prev, bank: value }));
  }, []);

  const handleTransferAgencyChange = useCallback((value: string) => {
    setTransferData((prev) => ({ ...prev, agency: value }));
  }, []);

  const handleTransferValueChange = useCallback((value: string) => {
    setTransferData((prev) => ({ ...prev, value }));
  }, []);

  const createTransaction = (): Transaction => {
    const now = new Date();
    const date = now.toLocaleDateString("pt-BR");
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    let description: string;
    let amountInCents: number;

    if (type === "pix") {
      if (!pixData.keyPix.trim() || !pixData.value) {
        throw new Error("Preencha todos os campos do PIX");
      }
      description = `PIX para ${pixData.keyPix}`;
      amountInCents = parseInt(pixData.value) || 0;
    } else {
      if (
        !transferData.name.trim() ||
        !transferData.account.trim() ||
        !transferData.bank.trim() ||
        !transferData.agency.trim() ||
        !transferData.value
      ) {
        throw new Error("Preencha todos os campos da transferência");
      }
      description = `Transferência para ${transferData.name} - ${transferData.bank}`;
      amountInCents = parseInt(transferData.value) || 0;
    }

    // Converter centavos para reais (negativo porque é débito)
    const amount = -amountInCents / 100;

    return {
      id,
      description,
      date,
      amount,
      type: "debit",
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const transaction = createTransaction();
      addTransaction(transaction);

      // Limpar formulários
      if (type === "pix") {
        setPixData({ keyPix: "", value: "" });
      } else {
        setTransferData({
          name: "",
          account: "",
          bank: "",
          agency: "",
          value: "",
        });
      }

      // Forçar remontagem dos formulários para limpar os inputs
      setFormKey((prev) => prev + 1);

      toast.success("Transação realizada com sucesso!", "bottom-right");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao realizar transação";
      toast.error(message, "top-center");
    }
  };

  const mapForm = useMemo<Record<"pix" | "transfer", React.ReactNode>>(
    () => ({
      pix: (
        <PixForm
          onChangeKeyPix={handlePixKeyChange}
          onChangeValue={handlePixValueChange}
        />
      ),
      transfer: (
        <TransferForm
          onChangeName={handleTransferNameChange}
          onChangeAccount={handleTransferAccountChange}
          onChangeBank={handleTransferBankChange}
          onChangeAgency={handleTransferAgencyChange}
          onChangeValue={handleTransferValueChange}
        />
      ),
    }),
    [
      handlePixKeyChange,
      handlePixValueChange,
      handleTransferNameChange,
      handleTransferAccountChange,
      handleTransferBankChange,
      handleTransferAgencyChange,
      handleTransferValueChange,
    ]
  );

  const form = useMemo(
    () => (
      <div key={formKey}>{mapForm[type as "pix" | "transfer"]}</div>
    ),
    [type, mapForm, formKey]
  );

  return { handleTypeChange, form, handleSubmit };
};
