"use client";
import { useTransactions } from "@/lib/transactions/transactions-context";

export const useBankBalance = () => {
  const { bankBalance } = useTransactions();

  return bankBalance;
};
