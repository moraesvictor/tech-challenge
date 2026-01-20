"use client";
import { useMemo } from "react";
import { CardBase } from "@/components/ui/card-base/card-base";
import { useTransactions } from "@/lib/transactions/transactions-context";
import { dateUtils } from "@/lib/utils/date";
import { FaArrowUp, FaArrowDown, FaEquals } from "react-icons/fa";

export const DashboardFinancialSummary = () => {
  const { transactions } = useTransactions();
  const { month: currentMonth, year: currentYear } = dateUtils.getCurrentMonth();

  const summary = useMemo(() => {
    const currentMonthTransactions = transactions.filter((tx) => {
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

    const currentIncome = currentMonthTransactions
      .filter((tx) => tx.type === "credit")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const currentExpenses = currentMonthTransactions
      .filter((tx) => tx.type === "debit")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const lastIncome = lastMonthTransactions
      .filter((tx) => tx.type === "credit")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const lastExpenses = lastMonthTransactions
      .filter((tx) => tx.type === "debit")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const incomeVariation =
      lastIncome > 0
        ? ((currentIncome - lastIncome) / lastIncome) * 100
        : currentIncome > 0
        ? 100
        : 0;

    const expensesVariation =
      lastExpenses > 0
        ? ((currentExpenses - lastExpenses) / lastExpenses) * 100
        : currentExpenses > 0
        ? 100
        : 0;

    const savings = currentIncome - currentExpenses;
    const lastSavings = lastIncome - lastExpenses;
    const savingsVariation =
      lastSavings !== 0
        ? ((savings - lastSavings) / Math.abs(lastSavings)) * 100
        : savings !== 0
        ? 100
        : 0;

    return {
      currentIncome,
      currentExpenses,
      incomeVariation,
      expensesVariation,
      savings,
      savingsVariation,
      transactionCount: currentMonthTransactions.length,
    };
  }, [transactions, currentMonth, currentYear]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatVariation = (value: number) => {
    const absValue = Math.abs(value);
    const sign = value >= 0 ? "+" : "-";
    return `${sign}${absValue.toFixed(1)}%`;
  };

  const getVariationIcon = (value: number) => {
    if (value > 0) return <FaArrowUp className="text-green-600" />;
    if (value < 0) return <FaArrowDown className="text-red-600" />;
    return <FaEquals className="text-gray-600" />;
  };

  return (
    <CardBase size="xl" colorSchema="light" className="w-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Resumo Financeiro do Mês
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Receitas</span>
              {getVariationIcon(summary.incomeVariation)}
            </div>
            <p className="text-2xl font-bold text-green-700">
              {formatCurrency(summary.currentIncome)}
            </p>
            <p className="text-xs text-gray-500">
              {formatVariation(summary.incomeVariation)} vs mês anterior
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Despesas</span>
              {getVariationIcon(-summary.expensesVariation)}
            </div>
            <p className="text-2xl font-bold text-red-700">
              {formatCurrency(summary.currentExpenses)}
            </p>
            <p className="text-xs text-gray-500">
              {formatVariation(summary.expensesVariation)} vs mês anterior
            </p>
          </div>

          <div
            className={`flex flex-col gap-2 p-4 rounded-lg ${
              summary.savings >= 0 ? "bg-cyan-50" : "bg-orange-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Economia</span>
              {getVariationIcon(summary.savingsVariation)}
            </div>
            <p
              className={`text-2xl font-bold ${
                summary.savings >= 0 ? "text-cyan-700" : "text-orange-700"
              }`}
            >
              {formatCurrency(summary.savings)}
            </p>
            <p className="text-xs text-gray-500">
              {formatVariation(summary.savingsVariation)} vs mês anterior
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Total de transações este mês:{" "}
            <strong className="text-gray-900">{summary.transactionCount}</strong>
          </p>
        </div>
      </div>
    </CardBase>
  );
};
