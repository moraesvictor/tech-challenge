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

const mockBalanceHistory = [
  { month: "Mai", balance: 8700 },
  { month: "Jun", balance: 9600 },
  { month: "Jul", balance: 11200 },
  { month: "Ago", balance: 12500 },
  { month: "Set", balance: 11900 },
  { month: "Out", balance: 12939 },
];

export const DashboardBalanceChart = () => {
  return (
    <CardBase size="xl" colorSchema="light" className="w-full">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Evolução do patrimônio
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={mockBalanceHistory}>
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
