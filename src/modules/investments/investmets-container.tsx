import { InvestmentsChart } from "./components/investments-chart/investments-chart";
import { InvestmentsBalanceCard } from "./components/investments-balance-card/investments-balance-card";
import { InvestmentsDistributionChart } from "./components/investments-distribution-chart/investments-distribution-chart";

export const InvestmentsContainer = () => {
  return (
    <div className="flex flex-col gap-8 w-full py-8 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <InvestmentsBalanceCard />
        <InvestmentsDistributionChart />
      </div>
      <InvestmentsChart />
    </div>
  );
};
