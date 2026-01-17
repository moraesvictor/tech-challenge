"use client";
import { useMemo } from "react";
import { CardBase } from "@/components/ui/card-base/card-base";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useTransactions } from "@/lib/transactions/transactions-context";
import { CATEGORY_LABELS } from "@/lib/constants/categories";
import { dateUtils } from "@/lib/utils/date";

const COLORS = [
  "#0d9488",
  "#14b8a6",
  "#2dd4bf",
  "#5eead4",
  "#99f6e4",
  "#ccfbf1",
  "#f0fdfa",
  "#a7f3d0",
  "#6ee7b7",
  "#34d399",
  "#10b981",
];

export const DashboardCategoryChart = () => {
  const { transactions } = useTransactions();
  const { month: currentMonth, year: currentYear } = dateUtils.getCurrentMonth();

  const categoryData = useMemo(() => {
    const monthlyTransactions = transactions.filter((tx) => {
      const txDate = dateUtils.parseBR(tx.date);
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear &&
        tx.type === "debit" &&
        tx.category
      );
    });

    const categoryMap = new Map<string, number>();

    monthlyTransactions.forEach((tx) => {
      if (tx.category) {
        const current = categoryMap.get(tx.category) || 0;
        categoryMap.set(tx.category, current + Math.abs(tx.amount));
      }
    });

    return Array.from(categoryMap.entries())
      .map(([category, value]) => ({
        name: CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS],
        value: Number(value.toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions, currentMonth, currentYear]);

  if (categoryData.length === 0) {
    return (
      <CardBase size="xl" colorSchema="light" className="w-full">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Gastos por Categoria
          </h2>
          <p className="text-sm text-gray-500 text-center py-8">
            Nenhum gasto categorizado este mês
          </p>
        </div>
      </CardBase>
    );
  }

  return (
    <CardBase size="xl" colorSchema="light" className="w-full">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Gastos por Categoria
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                `R$ ${value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
};
