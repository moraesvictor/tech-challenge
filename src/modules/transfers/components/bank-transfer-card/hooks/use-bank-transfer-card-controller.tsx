"use client";
import { useMemo, useState } from "react";
import { TransferForm } from "../../transfer-form/transfer-form";
import { PixForm } from "../../pix-form/pix-form";

export const useBankTransferCardController = () => {
  const [type, setType] = useState<"pix" | "transfer">("pix");
  const handleTypeChange = (value: string) => {
    setType(value as "pix" | "transfer");
  };

  const mapForm = useMemo<Record<"pix" | "transfer", React.ReactNode>>(
    () => ({
      pix: <PixForm onChangeKeyPix={() => {}} onChangeValue={() => {}} />,
      transfer: <TransferForm />,
    }),
    []
  );

  const form = useMemo(
    () => mapForm[type as "pix" | "transfer"],
    [type, mapForm]
  );

  return { handleTypeChange, form };
};
