"use client";

import React from "react";
import { Transaction } from "@/lib/types/transaction.types";
import { CATEGORY_LABELS } from "@/lib/constants/categories";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

type TransactionCardProps = {
  transaction: Transaction;
  onView: (transaction: Transaction) => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
};

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              {transaction.description}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">{transaction.date}</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  transaction.type === "credit"
                    ? "text-green-700 bg-green-50"
                    : "text-red-700 bg-red-50"
                }`}
              >
                {transaction.type === "credit" ? "Receita" : "Despesa"}
              </span>
              {transaction.category && (
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                  {CATEGORY_LABELS[transaction.category]}
                </span>
              )}
            </div>
          </div>
          <span
            className={`text-xl font-bold ${
              transaction.type === "credit" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type === "credit" ? "+" : "-"} R${" "}
            {Math.abs(transaction.amount).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => onView(transaction)}
            className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
            title="Visualizar detalhes"
            aria-label="Visualizar detalhes"
          >
            <FaEye size={16} />
          </button>
          <button
            onClick={() => onEdit(transaction)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar transação"
            aria-label="Editar transação"
          >
            <FaEdit size={16} />
          </button>
          <button
            onClick={() => onDelete(transaction)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Deletar transação"
            aria-label="Deletar transação"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
