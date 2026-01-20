import { TransactionCategory } from "../types/transaction.types";

export const TRANSACTION_CATEGORIES: Record<
  "credit" | "debit",
  TransactionCategory[]
> = {
  credit: [
    "salario",
    "investimentos",
    "outros",
  ],
  debit: [
    "alimentacao",
    "transporte",
    "moradia",
    "saude",
    "educacao",
    "lazer",
    "compras",
    "servicos",
    "outros",
  ],
};

export const CATEGORY_LABELS: Record<TransactionCategory, string> = {
  alimentacao: "Alimentação",
  transporte: "Transporte",
  moradia: "Moradia",
  saude: "Saúde",
  educacao: "Educação",
  lazer: "Lazer",
  compras: "Compras",
  servicos: "Serviços",
  salario: "Salário",
  investimentos: "Investimentos",
  outros: "Outros",
};

export const CATEGORY_SUGGESTIONS: Record<string, TransactionCategory> = {
  restaurante: "alimentacao",
  lanche: "alimentacao",
  supermercado: "alimentacao",
  padaria: "alimentacao",
  delivery: "alimentacao",
  comida: "alimentacao",
  uber: "transporte",
  taxi: "transporte",
  onibus: "transporte",
  metro: "transporte",
  combustivel: "transporte",
  estacionamento: "transporte",
  aluguel: "moradia",
  condominio: "moradia",
  agua: "moradia",
  luz: "moradia",
  internet: "moradia",
  telefone: "moradia",
  farmacia: "saude",
  medico: "saude",
  hospital: "saude",
  plano: "saude",
  escola: "educacao",
  curso: "educacao",
  livro: "educacao",
  cinema: "lazer",
  viagem: "lazer",
  passeio: "lazer",
  compra: "compras",
  loja: "compras",
  servico: "servicos",
  salario: "salario",
  deposito: "salario",
  investimento: "investimentos",
  rendimento: "investimentos",
};

export const getCategoryFromDescription = (
  description: string
): TransactionCategory | undefined => {
  const lowerDescription = description.toLowerCase();
  
  for (const [keyword, category] of Object.entries(CATEGORY_SUGGESTIONS)) {
    if (lowerDescription.includes(keyword)) {
      return category;
    }
  }
  
  return undefined;
};
