import { APP_CONSTANTS } from "@/lib/config/constants";
import { createTransactions } from "@/lib/faker/transaction.factory";
import type { ITransactionRepository } from "@/lib/domain/repositories/transaction.repository";


export class FakerTransactionRepository implements ITransactionRepository {
  async findByUserSeed(userSeed: number): Promise<ReturnType<typeof createTransactions>> {
    const range =
      APP_CONSTANTS.TRANSACTION_COUNT_MAX -
      APP_CONSTANTS.TRANSACTION_COUNT_MIN +
      1;
    const count =
      APP_CONSTANTS.TRANSACTION_COUNT_MIN + (userSeed % range);

    return createTransactions(count);
  }
}
