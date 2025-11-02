"use client";
import { useMemo, memo } from "react";
import { CardBase } from "@/components/ui/card-base/card-base";
import { Button, BUTTON_VARIANTS } from "@/components";
import { useTransactions } from "@/lib/transactions/transactions-context";
import { Transaction } from "@/lib/types/transaction.types";
import { useModal } from "@/components/ui/modal/hooks/use-modal-context";
import { EditTransactionModal } from "../edit-transaction-modal/edit-transaction-modal";
import { DeleteTransactionModal } from "../delete-transaction-modal/delete-transaction-modal";
import { useToastMethods } from "@/components/ui/toast/hooks/use-toast-methods";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { SUCCESS_MESSAGES } from "@/lib/constants/messages";

export const TransactionsList = memo(() => {
  const { transactions, deleteTransaction } = useTransactions();
  const { open, close } = useModal();
  const toast = useToastMethods();

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });
  }, [transactions]);

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
    <CardBase size="xl" colorSchema="light" className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Listagem de Transações
          </h2>
          <span className="text-sm text-gray-500">
            {sortedTransactions.length} transação(ões)
          </span>
        </div>

        <div className="flex flex-col divide-y divide-gray-300">
          {sortedTransactions.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              Nenhuma transação encontrada
            </div>
          ) : (
            sortedTransactions.map((tx) => (
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
            ))
          )}
        </div>
      </div>
    </CardBase>
  );
});

TransactionsList.displayName = "TransactionsList";

