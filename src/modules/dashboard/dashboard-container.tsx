import { DashboardBalanceChart } from "./components/dashboard-balance-chart/dashboard-balance-chart";
import { DashBoardBankBalanceCard } from "./components/dashboard-bank-balance-card/dashboard-bank-balance-card";
import { DashboardBankStatement } from "./components/dashboard-bank-statement/dashboard-bank-statement";

export const DashboardContainer = () => {
  return (
    <div className="flex flex-col gap-8 w-full py-8 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <DashBoardBankBalanceCard />
        <DashboardBankStatement />
      </div>
      <DashboardBalanceChart />
    </div>
  );
};
