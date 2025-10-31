import { useTransactions } from "@/lib/transactions/transactions-context";

export const useBankStatement = () => {
  const { transactions } = useTransactions();

  return transactions.slice(0, 10);
};
