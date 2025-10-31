export type Transaction = {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
};

export type BalanceHistory = {
  month: string;
  balance: number;
};

export type BankBalance = {
  userName: string;
  balance: number;
  balanceVariation: number;
  income: number;
  expenses: number;
  progress: number;
};
