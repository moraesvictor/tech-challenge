import { LoadUserTransactionsUseCase } from "@/lib/application/use-cases/load-user-transactions.use-case";
import { FakerTransactionRepository } from "@/lib/infrastructure/repositories/faker-transaction.repository";


export function createTransactionDependencies() {
  const transactionRepository = new FakerTransactionRepository();

  return {
    loadUserTransactions: new LoadUserTransactionsUseCase(transactionRepository),
  };
}
