export type TransactionCategory =
  | "alimentacao"
  | "transporte"
  | "moradia"
  | "saude"
  | "educacao"
  | "lazer"
  | "compras"
  | "servicos"
  | "salario"
  | "investimentos"
  | "outros";

export type Transaction = {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  category?: TransactionCategory;
  attachmentUrl?: string;
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
