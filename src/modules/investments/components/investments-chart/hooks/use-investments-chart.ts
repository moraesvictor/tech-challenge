"use client";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/lib/indexedDb/auth-context";
import {
  createInvestments,
  createInvestmentHistory,
} from "@/lib/faker/investment.factory";

export const useInvestmentsChart = () => {
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

  const investmentHistory = useMemo(() => {
    if (!isClient || investments.length === 0) {
      return [];
    }

    return createInvestmentHistory(investments);
  }, [investments, isClient]);

  return investmentHistory;
};

