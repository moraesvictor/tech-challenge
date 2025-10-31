"use client";
import { CardBase } from "@/components/ui/card-base/card-base";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useBalanceChart } from "./hooks/use-balance-chart";

export const DashboardBalanceChart = () => {
  const balanceHistory = useBalanceChart();

  const chartData =
    balanceHistory.length > 0
      ? balanceHistory
      : [
          { month: "Jan", balance: 0 },
          { month: "Fev", balance: 0 },
          { month: "Mar", balance: 0 },
          { month: "Abr", balance: 0 },
          { month: "Mai", balance: 0 },
          { month: "Jun", balance: 0 },
        ];

  return (
    <CardBase size="xl" colorSchema="light" className="w-full">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Evolução do patrimônio
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" fontSize="15" fontWeight="bold" />
            <YAxis fontSize="15" fontWeight="bold" />
            <Tooltip
              formatter={(value: number) =>
                `R$ ${value.toLocaleString("pt-BR")}`
              }
            />
            <Line
              type="natural"
              dataKey="balance"
              stroke="#0d9488"
              animationDuration={3000}
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
};
