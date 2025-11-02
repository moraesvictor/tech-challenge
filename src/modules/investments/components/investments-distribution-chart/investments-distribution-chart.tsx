"use client";
import { useState, useEffect } from "react";
import { CardBase } from "@/components/ui/card-base/card-base";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useInvestmentsDistribution } from "./hooks/use-investments-distribution";

export const InvestmentsDistributionChart = () => {
  const distribution = useInvestmentsDistribution();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const chartData =
    distribution.length > 0
      ? distribution
      : [
          { name: "Sem dados", value: 0, fill: "#e5e7eb" },
        ];

  return (
    <CardBase size="xl" colorSchema="light" className="w-full">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Distribuição por tipo
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={
                !isMobile
                  ? ({ name, percent }) =>
                      `${name} ${typeof percent === "number" ? (percent * 100).toFixed(0) : "0"}%`
                  : false
              }
              outerRadius={isMobile ? 80 : 100}
              fill="#8884d8"
              dataKey="value"
              animationDuration={3000}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
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
            <Legend
              wrapperStyle={{ fontSize: isMobile ? "12px" : "14px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
};

