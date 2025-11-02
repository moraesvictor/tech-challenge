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
import { useInvestmentsChart } from "./hooks/use-investments-chart";

export const InvestmentsChart = () => {
  const investmentHistory = useInvestmentsChart();

  const chartData =
    investmentHistory.length > 0
      ? investmentHistory
      : [
          { month: "Jan", value: 0 },
          { month: "Fev", value: 0 },
          { month: "Mar", value: 0 },
          { month: "Abr", value: 0 },
          { month: "Mai", value: 0 },
          { month: "Jun", value: 0 },
        ];

  return (
    <CardBase size="xl" colorSchema="light" className="w-full">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Evolução dos investimentos
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
              dataKey="value"
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