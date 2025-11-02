"use client";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/lib/indexedDb/auth-context";
import { createInvestments } from "@/lib/faker/investment.factory";

export type InvestmentsBalance = {
  totalInvested: number;
  currentValue: number;
  totalReturn: number;
  returnPercentage: number;
  variationPercentage: number;
  totalInvestments: number;
};

export const useInvestmentsBalance = (): InvestmentsBalance => {
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

  const balance = useMemo(() => {
    if (!isClient || investments.length === 0) {
      return {
        totalInvested: 0,
        currentValue: 0,
        totalReturn: 0,
        returnPercentage: 0,
        variationPercentage: 0,
        totalInvestments: 0,
      };
    }

    const now = new Date();
    let totalInvested = 0;
    let currentValue = 0;

    for (const investment of investments) {
      totalInvested += investment.amount;

      const investmentDate = new Date(
        investment.date.split("/").reverse().join("-")
      );
      const monthsHeld =
        (now.getTime() - investmentDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      const returnAmount =
        investment.amount *
        (investment.returnRate / 100) *
        (monthsHeld / 12);
      currentValue += investment.amount + returnAmount;
    }

    const totalReturn = currentValue - totalInvested;
    const returnPercentage =
      totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

    const previousValue = totalInvested * (1 + returnPercentage * 0.9 / 100);
    const variationPercentage =
      currentValue > 0
        ? ((currentValue - previousValue) / previousValue) * 100
        : 0;

    return {
      totalInvested: Number(totalInvested.toFixed(2)),
      currentValue: Number(currentValue.toFixed(2)),
      totalReturn: Number(totalReturn.toFixed(2)),
      returnPercentage: Number(returnPercentage.toFixed(2)),
      variationPercentage: Number(variationPercentage.toFixed(1)),
      totalInvestments: investments.length,
    };
  }, [investments, isClient]);

  return balance;
};

