import { faker } from "@faker-js/faker";
import { Investment, InvestmentHistory } from "../types/investment.types";

const investmentTypes = [
  "Tesouro Direto",
  "CDB",
  "LCI",
  "LCA",
  "Fundos de Renda Fixa",
  "Fundos Multimercado",
  "Ações",
  "ETF",
  "Debêntures",
  "Poupança",
];

const investmentNames = [
  "Tesouro Selic 2025",
  "CDB Banco XYZ",
  "LCI Imobiliário",
  "Fundo ABC Renda Fixa",
  "Ações Petrobras",
  "ETF BOVA11",
  "Debêntures Infraestrutura",
  "Poupança",
];

const generateInvestmentDate = (monthsAgo: number): string => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  return date.toLocaleDateString("pt-BR");
};

export const createInvestment = (monthsAgo: number): Investment => {
  const type = faker.helpers.arrayElement(investmentTypes);
  const name = faker.helpers.arrayElement(investmentNames);
  const amount = faker.number.float({
    min: 1000,
    max: 50000,
    fractionDigits: 2,
  });
  const returnRate = faker.number.float({
    min: 0.5,
    max: 15,
    fractionDigits: 2,
  });

  return {
    id: faker.string.uuid(),
    name,
    type,
    amount,
    date: generateInvestmentDate(monthsAgo),
    returnRate,
  };
};

export const createInvestments = (count: number): Investment[] => {
  return Array.from({ length: count }, (_, index) =>
    createInvestment(index)
  ).sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });
};

export const createInvestmentHistory = (
  investments: Investment[]
): InvestmentHistory[] => {
  const now = new Date();
  const history: InvestmentHistory[] = [];

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

    let totalValue = 0;

    for (const investment of investments) {
      const investmentDate = new Date(
        investment.date.split("/").reverse().join("-")
      );

      if (investmentDate <= endOfMonth) {
        const monthsHeld =
          (endOfMonth.getTime() - investmentDate.getTime()) /
          (1000 * 60 * 60 * 24 * 30);
        const returnAmount =
          investment.amount * (investment.returnRate / 100) * (monthsHeld / 12);
        totalValue += investment.amount + returnAmount;
      }
    }

    const monthName = targetDate.toLocaleDateString("pt-BR", {
      month: "short",
    });
    history.push({
      month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      value: Number(totalValue.toFixed(2)),
    });
  }

  return history;
};

