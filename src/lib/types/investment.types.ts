export type Investment = {
  id: string;
  name: string;
  type: string;
  amount: number;
  date: string;
  returnRate: number;
};

export type InvestmentHistory = {
  month: string;
  value: number;
};

