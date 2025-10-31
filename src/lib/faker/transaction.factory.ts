import { faker } from "@faker-js/faker";
import { Transaction } from "../types/transaction.types";

const transactionDescriptions = {
  credit: [
    "Depósito recebido",
    "Salário creditado",
    "Cashback recebido",
    "Transferência recebida",
    "Rendimento de investimento",
    "Devolução de compra",
    "Bônus recebido",
    "Reembolso",
  ],
  debit: [
    "Pagamento de conta de luz",
    "Pagamento de conta de água",
    "Transferência para",
    "Pagamento de cartão de crédito",
    "Compra em",
    "Taxa bancária",
    "Pagamento de internet",
    "Saque realizado",
    "Pagamento de aluguel",
  ],
};

const generateTransactionDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString("pt-BR");
};

export const createTransaction = (daysAgo: number): Transaction => {
  const isCredit = Math.random() > 0.4; // 60% crédito, 40% débito
  const type = isCredit ? "credit" : "debit";
  const descriptions = transactionDescriptions[type];
  const description = faker.helpers.arrayElement(descriptions);

  let amount: number;
  if (type === "credit") {
    amount = faker.number.float({ min: 50, max: 5000, fractionDigits: 2 });
  } else {
    amount = faker.number.float({ min: 50, max: 3000, fractionDigits: 2 });
  }

  // Adiciona nome aleatório para transferências e compras
  let finalDescription = description;
  if (description.includes("para") || description.includes("em")) {
    finalDescription = `${description} ${faker.person.firstName()}`;
  }

  return {
    id: faker.string.uuid(),
    description: finalDescription,
    date: generateTransactionDate(daysAgo),
    amount: type === "credit" ? amount : -amount,
    type,
  };
};

export const createTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, (_, index) =>
    createTransaction(index)
  ).sort((a, b) => {
    // Ordena por data (mais recentes primeiro)
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });
};
