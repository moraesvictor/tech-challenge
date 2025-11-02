"use client";
import { Button } from "@/components";
import { CardBase } from "@/components/ui/card-base/card-base";
import { Dropdown } from "@/components/ui/dropdown/dropdown";
import { useBankTransferCardController } from "./hooks/use-bank-transfer-card-controller";

export const BankTransferCard = () => {
  const { handleTypeChange, form } = useBankTransferCardController();

  return (
    <CardBase size="l" colorSchema="light" className="w-full">
      <form className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Transferência e PIX
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 w-12 shrink-0">Tipo</span>
            <Dropdown
              onChange={handleTypeChange}
              options={[
                { label: "PIX", value: "pix" },
                { label: "Transferência", value: "transfer" },
              ]}
            />
          </div>
          {form}
        </div>
        <div className="flex justify-center gap-2 w-full">
          <Button type="submit">Transferir</Button>
        </div>
      </form>
    </CardBase>
  );
};
