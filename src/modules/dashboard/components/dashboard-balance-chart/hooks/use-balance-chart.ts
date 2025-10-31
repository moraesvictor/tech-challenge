import { useTransactions } from "@/lib/transactions/transactions-context";

export const useBalanceChart = () => {
  const { balanceHistory } = useTransactions();

  return balanceHistory;
};
