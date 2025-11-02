export type InvestmentType =
  | "FIXED_INCOME"
  | "STOCKS"
  | "REAL_ESTATE"
  | "ETF"
  | "DEBENTURES"
  | "SAVINGS";

export type Investment = {
  id: string;
  name: string;
  type: InvestmentType;
  amount: number;
  date: string;
  returnRate: number;
};

export type InvestmentHistory = {
  month: string;
  value: number;
};

