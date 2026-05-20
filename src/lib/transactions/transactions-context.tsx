"use client";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useAuth } from "../indexedDb/auth-context";
import {
  Transaction,
  BalanceHistory,
  BankBalance,
} from "../types/transaction.types";
import { createTransactionDependencies } from "@/lib/application/factories/transaction-dependencies.factory";
import { TransactionFinancialService } from "@/lib/domain/services/transaction-financial.service";

const { loadUserTransactions } = createTransactionDependencies();

type TransactionsContextValue = {
  transactions: Transaction[];
  balanceHistory: BalanceHistory[];
  bankBalance: BankBalance;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
};

const TransactionsContext = createContext<TransactionsContextValue | null>(
  null
);

export const TransactionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentUser, ready } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !ready) return;

    const userSeed = currentUser?.id ?? 0;

    loadUserTransactions.execute(userSeed).then(setTransactions);
  }, [isClient, ready, currentUser?.id]);

  const userName = currentUser?.username || "Usuário";
  const isDataReady = isClient && transactions.length > 0;

  const bankBalance = useMemo(
    () =>
      TransactionFinancialService.calculateBankBalance({
        transactions,
        userName,
        isReady: isDataReady,
      }),
    [transactions, userName, isDataReady]
  );

  const balanceHistory = useMemo(
    () =>
      TransactionFinancialService.calculateBalanceHistory(
        transactions,
        isDataReady
      ),
    [transactions, isDataReady]
  );

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const updateTransaction = (id: string, updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? updatedTransaction : tx))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const value: TransactionsContextValue = {
    transactions,
    balanceHistory,
    bankBalance,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
};
