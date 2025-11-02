import { useTransactions } from "@/lib/transactions/transactions-context";
import { useMemo } from "react";

export const useBankStatement = () => {
  const { transactions } = useTransactions();

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });
  }, [transactions]);

  return sortedTransactions.slice(0, 10);
};
