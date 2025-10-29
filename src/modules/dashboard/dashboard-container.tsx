import { DashBoardBankBalanceCard } from "./components/dashboard-bank-balance-card/dashboard-bank-balance-card";
import { DashboardBankStatement } from "./components/dashboard-bank-statement/dashboard-bank-statement";

export const DashboardContainer = () => {
  return (
    <div className="flex justify-center gap-8 w-dvw py-12 px-64">
      <DashBoardBankBalanceCard />
      <DashboardBankStatement />
    </div>
  );
};
