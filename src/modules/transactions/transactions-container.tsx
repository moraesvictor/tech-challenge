import { TransactionsList } from "./components/transactions-list/transactions-list";

export const TransactionsContainer = () => {
  return (
    <div className="flex flex-col gap-8 w-full py-8 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <TransactionsList />
    </div>
  );
};

