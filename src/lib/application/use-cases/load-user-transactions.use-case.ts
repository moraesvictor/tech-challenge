import type { ITransactionRepository } from "@/lib/domain/repositories/transaction.repository";
import type { Transaction } from "@/lib/types/transaction.types";


export class LoadUserTransactionsUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(userSeed: number): Promise<Transaction[]> {
    return this.transactionRepository.findByUserSeed(userSeed);
  }
}
