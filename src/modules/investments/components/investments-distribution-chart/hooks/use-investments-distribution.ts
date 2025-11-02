"use client";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/lib/indexedDb/auth-context";
import { createInvestments } from "@/lib/faker/investment.factory";

export type InvestmentDistribution = {
  name: string;
  value: number;
  fill: string;
};

const colors = [
  "#0d9488",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#ef4444",
  "#6366f1",
  "#14b8a6",
  "#22c55e",
];

export const useInvestmentsDistribution = (): InvestmentDistribution[] => {
  const { currentUser, ready } = useAuth();
  const [investments, setInvestments] = useState<
    Awaited<ReturnType<typeof createInvestments>>
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !ready) return;

    const seed = currentUser?.id || 0;
    const count = 10 + (seed % 10);

    const generatedInvestments = createInvestments(count);
    setInvestments(generatedInvestments);
  }, [isClient, ready, currentUser?.id]);

  const distribution = useMemo(() => {
    if (!isClient || investments.length === 0) {
      return [];
    }

    const now = new Date();
    const typeMap: Record<string, number> = {};

    for (const investment of investments) {
      const investmentDate = new Date(
        investment.date.split("/").reverse().join("-")
      );
      const monthsHeld =
        (now.getTime() - investmentDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      const returnAmount =
        investment.amount *
        (investment.returnRate / 100) *
        (monthsHeld / 12);
      const currentValue = investment.amount + returnAmount;

      if (typeMap[investment.type]) {
        typeMap[investment.type] += currentValue;
      } else {
        typeMap[investment.type] = currentValue;
      }
    }

    return Object.entries(typeMap)
      .map(([name, value], index) => ({
        name,
        value: Number(value.toFixed(2)),
        fill: colors[index % colors.length],
      }))
      .sort((a, b) => b.value - a.value);
  }, [investments, isClient]);

  return distribution;
};

