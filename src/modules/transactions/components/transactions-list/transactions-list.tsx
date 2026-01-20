"use client";
import { useMemo, memo, useState, useCallback, useEffect, useRef } from "react";
import { CardBase } from "@/components/ui/card-base/card-base";
import { Button, BUTTON_VARIANTS } from "@/components";
import { useTransactions } from "@/lib/transactions/transactions-context";
import { Transaction } from "@/lib/types/transaction.types";
import { useModal } from "@/components/ui/modal/hooks/use-modal-context";
import { EditTransactionModal } from "../edit-transaction-modal/edit-transaction-modal";
import { DeleteTransactionModal } from "../delete-transaction-modal/delete-transaction-modal";
import { TransactionsFilters } from "../transactions-filters/transactions-filters";
import { TransactionCard } from "../transaction-card/transaction-card";
import { useToastMethods } from "@/components/ui/toast/hooks/use-toast-methods";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { SUCCESS_MESSAGES } from "@/lib/constants/messages";
import { CATEGORY_LABELS } from "@/lib/constants/categories";

const ITEMS_PER_PAGE = 20;

export const TransactionsList = memo(() => {
  const { transactions, deleteTransaction } = useTransactions();
  const { open, close } = useModal();
  const toast = useToastMethods();
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  }, [filteredTransactions.length]);

  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    setDisplayedTransactions(filteredTransactions.slice(startIndex, endIndex));
  }, [filteredTransactions, currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [currentPage, totalPages]);

  const handleFilteredChange = useCallback((filtered: Transaction[]) => {
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, []);

  const handleEdit = (transaction: Transaction) => {
    open({
      title: "Editar Transação",
      content: (
        <EditTransactionModal
          transaction={transaction}
          onClose={close}
        />
      ),
    });
  };

  const handleView = (transaction: Transaction) => {
    open({
      title: "Detalhes da Transação",
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Descrição</span>
            <span className="text-lg font-semibold text-gray-900">
              {transaction.description}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Tipo</span>
            <span className="text-lg font-semibold text-gray-900">
              {transaction.type === "credit" ? "Receita" : "Despesa"}
            </span>
          </div>
          {transaction.category && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500">Categoria</span>
              <span className="text-lg font-semibold text-gray-900">
                {CATEGORY_LABELS[transaction.category]}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Valor</span>
            <span
              className={`text-lg font-semibold ${
                transaction.type === "credit"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "credit" ? "+" : "-"} R${" "}
              {Math.abs(transaction.amount).toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Data</span>
            <span className="text-lg font-semibold text-gray-900">
              {transaction.date}
            </span>
          </div>
          {transaction.attachmentUrl && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500">Anexo</span>
              <a
                href={transaction.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 hover:text-cyan-700 underline"
              >
                Ver anexo
              </a>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">ID</span>
            <span className="text-sm font-mono text-gray-600">
              {transaction.id}
            </span>
          </div>
          <div className="flex justify-center mt-4">
            <Button variant={BUTTON_VARIANTS.ghost} onClick={close}>
              Fechar
            </Button>
          </div>
        </div>
      ),
    });
  };

  const handleDelete = (transaction: Transaction) => {
    open({
      title: "Confirmar Exclusão",
      content: (
        <DeleteTransactionModal
          transaction={transaction}
          onConfirm={() => {
            deleteTransaction(transaction.id);
            toast.success(SUCCESS_MESSAGES.TRANSACTION_DELETED, "bottom-right");
            close();
          }}
          onCancel={close}
        />
      ),
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <TransactionsFilters
        transactions={transactions}
        onFilteredChange={handleFilteredChange}
      />

      <CardBase size="xl" colorSchema="light" className="w-full">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Listagem de Transações
            </h2>
            <span className="text-sm text-gray-500">
              {displayedTransactions.length} de {filteredTransactions.length} transação(ões)
            </span>
          </div>

          {displayedTransactions.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              Nenhuma transação encontrada
            </div>
          ) : (
            <>
              <div className="hidden md:flex flex-col divide-y divide-gray-300">
                {displayedTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex justify-between items-center py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-medium text-gray-900">
                        {tx.description}
                      </span>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">{tx.date}</span>
                        <span
                          className={`text-xs font-medium ${
                            tx.type === "credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.type === "credit" ? "Receita" : "Despesa"}
                        </span>
                        {tx.category && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {CATEGORY_LABELS[tx.category]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`text-lg font-semibold mr-4 ${
                          tx.type === "credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.type === "credit" ? "+" : "-"} R${" "}
                        {Math.abs(tx.amount).toFixed(2)}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(tx)}
                          className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                          title="Visualizar detalhes"
                          aria-label="Visualizar detalhes"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(tx)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar transação"
                          aria-label="Editar transação"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(tx)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Deletar transação"
                          aria-label="Deletar transação"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:hidden flex flex-col gap-3">
                {displayedTransactions.map((tx) => (
                  <TransactionCard
                    key={tx.id}
                    transaction={tx}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </>
          )}

          {currentPage < totalPages && (
            <div ref={observerTarget} className="py-4 text-center text-gray-500">
              Carregando mais transações...
            </div>
          )}

          {displayedTransactions.length > 0 && currentPage >= totalPages && (
            <div className="py-4 text-center text-gray-500 text-sm">
              Todas as transações foram carregadas
            </div>
          )}
        </div>
      </CardBase>
    </div>
  );
});

TransactionsList.displayName = "TransactionsList";

