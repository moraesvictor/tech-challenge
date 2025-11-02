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
import { APP_CONSTANTS } from "../config/constants";
import { dateUtils } from "../utils/date";

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
    const count =
      APP_CONSTANTS.TRANSACTION_COUNT_MIN +
      (seed % (APP_CONSTANTS.TRANSACTION_COUNT_MAX - APP_CONSTANTS.TRANSACTION_COUNT_MIN + 1));

    const generatedTransactions = createTransactions(count);
    setTransactions(generatedTransactions);
  }, [isClient, ready, currentUser?.id]);

  const { month: currentMonth, year: currentYear } = dateUtils.getCurrentMonth();

  const monthlyTransactions = useMemo(() => {
    if (!isClient || transactions.length === 0) return [];

    return transactions.filter((tx) => {
      const txDate = dateUtils.parseBR(tx.date);
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    });
  }, [transactions, currentMonth, currentYear, isClient]);

  const lastMonthTransactions = useMemo(() => {
    if (!isClient || transactions.length === 0) return [];

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    return transactions.filter((tx) => {
      const txDate = dateUtils.parseBR(tx.date);
      return (
        txDate.getMonth() === lastMonth &&
        txDate.getFullYear() === lastMonthYear
      );
    });
  }, [transactions, currentMonth, currentYear, isClient]);

  const income = useMemo(() => {
    return monthlyTransactions
      .filter((tx) => tx.type === "credit")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }, [monthlyTransactions]);

  const expenses = useMemo(() => {
    return monthlyTransactions
      .filter((tx) => tx.type === "debit")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }, [monthlyTransactions]);

  const currentMonthBalance = useMemo(() => {
    return monthlyTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  }, [monthlyTransactions]);

  const lastMonthBalance = useMemo(() => {
    return lastMonthTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  }, [lastMonthTransactions]);

  const balanceVariation = useMemo(() => {
    if (lastMonthBalance !== 0) {
      return (
        ((currentMonthBalance - lastMonthBalance) /
          Math.abs(lastMonthBalance)) *
        100
      );
    }
    return currentMonthBalance !== 0 ? 100 : 0;
  }, [currentMonthBalance, lastMonthBalance]);

  const bankBalance = useMemo(() => {
    if (!isClient || transactions.length === 0) {
      return {
        userName: currentUser?.username || "Usuário",
        balance: APP_CONSTANTS.INITIAL_BALANCE,
        balanceVariation: 0,
        income: 0,
        expenses: 0,
        progress: 0,
      };
    }

    const totalBalance = transactions.reduce<number>(
      (sum, tx) => sum + tx.amount,
      APP_CONSTANTS.INITIAL_BALANCE
    );

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
  }, [
    transactions,
    currentUser?.username,
    isClient,
    income,
    expenses,
    balanceVariation,
  ]);

  const balanceHistory = useMemo(() => {
    if (!isClient || transactions.length === 0) {
      return [];
    }

    const sortedTransactions = [...transactions].sort((a, b) => {
      const dateA = dateUtils.parseBR(a.date);
      const dateB = dateUtils.parseBR(b.date);
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

      let balance = APP_CONSTANTS.INITIAL_BALANCE;

      for (const tx of sortedTransactions) {
        const txDate = dateUtils.parseBR(tx.date);

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
