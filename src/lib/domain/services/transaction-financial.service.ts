import { APP_CONSTANTS } from "@/lib/config/constants";
import type {
  BalanceHistory,
  BankBalance,
  Transaction,
} from "@/lib/types/transaction.types";
import { dateUtils } from "@/lib/utils/date";

export type TransactionFinancialInput = {
  transactions: Transaction[];
  userName: string;
  isReady: boolean;
};


export class TransactionFinancialService {
  static calculateBankBalance({
    transactions,
    userName,
    isReady,
  }: TransactionFinancialInput): BankBalance {
    if (!isReady || transactions.length === 0) {
      return {
        userName,
        balance: APP_CONSTANTS.INITIAL_BALANCE,
        balanceVariation: 0,
        income: 0,
        expenses: 0,
        progress: 0,
      };
    }

    const { month: currentMonth, year: currentYear } =
      dateUtils.getCurrentMonth();

    const monthlyTransactions = transactions.filter((tx) => {
      const txDate = dateUtils.parseBR(tx.date);
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    });

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const lastMonthTransactions = transactions.filter((tx) => {
      const txDate = dateUtils.parseBR(tx.date);
      return (
        txDate.getMonth() === lastMonth &&
        txDate.getFullYear() === lastMonthYear
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

    const totalBalance = transactions.reduce<number>(
      (sum, tx) => sum + tx.amount,
      APP_CONSTANTS.INITIAL_BALANCE
    );

    const monthlyGoal = income * 0.8;
    const progress = monthlyGoal > 0 ? (expenses / monthlyGoal) * 100 : 0;

    return {
      userName,
      balance: Number(totalBalance.toFixed(2)),
      balanceVariation: Number(balanceVariation.toFixed(1)),
      income: Number(income.toFixed(2)),
      expenses: Number(expenses.toFixed(2)),
      progress: Number(Math.min(progress, 100).toFixed(0)),
    };
  }

  static calculateBalanceHistory(
    transactions: Transaction[],
    isReady: boolean
  ): BalanceHistory[] {
    if (!isReady || transactions.length === 0) {
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
  }
}
