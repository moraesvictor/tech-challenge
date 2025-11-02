import { DashboardBankStatement } from "../dashboard/components/dashboard-bank-statement/dashboard-bank-statement";
import { BankTransferCard } from "./components/bank-transfer-card/bank-transfer-card";
export const TransfersContainer = () => {
  return (
    <div className="flex flex-col gap-8 w-full py-8 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <DashboardBankStatement />
        <BankTransferCard />
      </div>
    </div>
  );
};
