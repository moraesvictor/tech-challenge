import { InvestmentType } from "../types/investment.types";

/**
 * Mapeia tipos de investimento para nomes legíveis em português
 */
export const investmentTypeMap: Record<InvestmentType, string> = {
  FIXED_INCOME: "Renda Fixa",
  STOCKS: "Ações",
  REAL_ESTATE: "Imóveis",
  ETF: "ETF",
  DEBENTURES: "Debêntures",
  SAVINGS: "Poupança",
};

/**
 * Converte tipo de investimento para nome legível
 */
export const getInvestmentTypeName = (type: InvestmentType): string => {
  return investmentTypeMap[type] || type;
};

