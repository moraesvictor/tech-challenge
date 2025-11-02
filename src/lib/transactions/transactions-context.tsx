"use client";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useAuth } from "../indexedDb/auth-context";
import { createTransactions } from "../faker/transaction.factory";
import {
  Transaction,
  BalanceHistory,
  BankBalance,
} from "../types/transaction.types";

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

    const seed = currentUser?.id || 0;
    const count = 15 + (seed % 15);

    const generatedTransactions = createTransactions(count);
    setTransactions(generatedTransactions);
  }, [isClient, ready, currentUser?.id]);

  const bankBalance = useMemo(() => {
    if (!isClient || transactions.length === 0) {
      return {
        userName: currentUser?.username || "Usuário",
        balance: 10000,
        balanceVariation: 0,
        income: 0,
        expenses: 0,
        progress: 0,
      };
    }

    const initialBalance = 10000;

    const totalBalance = transactions.reduce(
      (sum, tx) => sum + tx.amount,
      initialBalance
    );

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.date.split("/").reverse().join("-"));
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    });

    const income = monthlyTransactions
      .filter((tx) => tx.type === "credit")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const expenses = monthlyTransactions
      .filter((tx) => tx.type === "debit")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const currentMonthBalance = monthlyTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    const lastMonthTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.date.split("/").reverse().join("-"));
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      return (
        txDate.getMonth() === lastMonth &&
        txDate.getFullYear() === lastMonthYear
      );
    });

    const lastMonthBalance = lastMonthTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    const balanceVariation =
      lastMonthBalance !== 0
        ? ((currentMonthBalance - lastMonthBalance) /
            Math.abs(lastMonthBalance)) *
          100
        : currentMonthBalance !== 0
        ? 100
        : 0;

    const monthlyGoal = income * 0.8;
    const progress = monthlyGoal > 0 ? (expenses / monthlyGoal) * 100 : 0;

    return {
      userName: currentUser?.username || "Usuário",
      balance: Number(totalBalance.toFixed(2)),
      balanceVariation: Number(balanceVariation.toFixed(1)),
      income: Number(income.toFixed(2)),
      expenses: Number(expenses.toFixed(2)),
      progress: Number(Math.min(progress, 100).toFixed(0)),
    };
  }, [transactions, currentUser?.username, isClient]);

  const balanceHistory = useMemo(() => {
    if (!isClient || transactions.length === 0) {
      return [];
    }

    const initialBalance = 10000;

    const sortedTransactions = [...transactions].sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    });

    const now = new Date();
    const history: BalanceHistory[] = [];

    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const endOfMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        0,
        23,
        59,
        59
      );

      let balance = initialBalance;

      for (const tx of sortedTransactions) {
        const txDate = new Date(tx.date.split("/").reverse().join("-"));

        if (txDate <= endOfMonth) {
          balance += tx.amount;
        } else {
          break;
        }
      }

      const monthName = targetDate.toLocaleDateString("pt-BR", {
        month: "short",
      });
      history.push({
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        balance: Number(balance.toFixed(2)),
      });
    }

    return history;
  }, [transactions, isClient]);

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
