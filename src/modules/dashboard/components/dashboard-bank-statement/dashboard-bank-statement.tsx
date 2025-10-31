"use client";
import { CardBase } from "@/components/ui/card-base/card-base";
import { useBankStatement } from "./hooks/use-bank-statement";

export const DashboardBankStatement = () => {
  const transactions = useBankStatement();
  return (
    <CardBase size="l" colorSchema="light" className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Extrato bancário
          </h2>
          <span className="text-sm text-gray-500">Últimos lançamentos</span>
        </div>

        <div className="flex flex-col divide-y divide-gray-300">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center py-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {tx.description}
                </span>
                <span className="text-xs text-gray-500">{tx.date}</span>
              </div>

              <span
                className={
                  tx.type === "credit"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {tx.type === "credit" ? "+" : "-"} R${" "}
                {Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardBase>
  );
};
