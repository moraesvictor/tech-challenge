"use client";
import { useMemo, useState } from "react";
import { TransferForm } from "../../transfer-form/transfer-form";
import { PixForm } from "../../pix-form/pix-form";
import { useTransactions } from "@/lib/transactions/transactions-context";
import { Transaction } from "@/lib/types/transaction.types";
import { useToastMethods } from "@/components/ui/toast/hooks/use-toast-methods";
import { generateId } from "@/lib/utils/id-generator";
import { dateUtils } from "@/lib/utils/date";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/lib/constants/messages";

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

  const createFieldHandlers = <T extends Record<string, string>>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    fields: Array<keyof T>
  ): Record<keyof T, (value: string) => void> => {
    const handlers = {} as Record<keyof T, (value: string) => void>;
    fields.forEach((field) => {
      handlers[field] = (value: string) => {
        setter((prev) => ({ ...prev, [field]: value }));
      };
    });
    return handlers;
  };

  const pixHandlers = useMemo(
    () => createFieldHandlers(setPixData, ["keyPix", "value"]),
    [setPixData]
  );

  const transferHandlers = useMemo(
    () =>
      createFieldHandlers(setTransferData, [
        "name",
        "account",
        "bank",
        "agency",
        "value",
      ]),
    [setTransferData]
  );

  const handlePixKeyChange = pixHandlers.keyPix;
  const handlePixValueChange = pixHandlers.value;
  const handleTransferNameChange = transferHandlers.name;
  const handleTransferAccountChange = transferHandlers.account;
  const handleTransferBankChange = transferHandlers.bank;
  const handleTransferAgencyChange = transferHandlers.agency;
  const handleTransferValueChange = transferHandlers.value;

  const createTransaction = (): Transaction => {
    const date = dateUtils.formatBR(new Date());
    const id = generateId();

    let description: string;
    let amountInCents: number;

    if (type === "pix") {
      if (!pixData.keyPix.trim() || !pixData.value) {
        throw new Error(ERROR_MESSAGES.FILL_ALL_PIX_FIELDS);
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
        throw new Error(ERROR_MESSAGES.FILL_ALL_TRANSFER_FIELDS);
      }
      description = `Transferência para ${transferData.name} - ${transferData.bank}`;
      amountInCents = parseInt(transferData.value) || 0;
    }

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

      setFormKey((prev) => prev + 1);

      toast.success(SUCCESS_MESSAGES.TRANSACTION_CREATED, "bottom-right");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : ERROR_MESSAGES.TRANSACTION_FAILED;
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
    () => <div key={formKey}>{mapForm[type as "pix" | "transfer"]}</div>,
    [type, mapForm, formKey]
  );

  return { handleTypeChange, form, handleSubmit };
};
