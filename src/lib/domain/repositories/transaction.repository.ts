import type { Transaction } from "@/lib/types/transaction.types";

/**
 * Port (Clean Architecture): contrato de acesso a dados de transações.
 * A camada de domínio/aplicação depende desta abstração, não da implementação.
 */
export interface ITransactionRepository {
  findByUserSeed(userSeed: number): Promise<Transaction[]>;
}
