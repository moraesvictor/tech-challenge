"use client";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input/input";
import { Dropdown } from "@/components/ui/dropdown/dropdown";
import { Transaction, TransactionCategory } from "@/lib/types/transaction.types";
import { CATEGORY_LABELS, TRANSACTION_CATEGORIES } from "@/lib/constants/categories";
import { FaSearch, FaFilter } from "react-icons/fa";

type TransactionsFiltersProps = {
  transactions: Transaction[];
  onFilteredChange: (filtered: Transaction[]) => void;
};

type FilterState = {
  search: string;
  type: "all" | "credit" | "debit";
  category: "all" | TransactionCategory;
  dateFrom: string;
  dateTo: string;
};

export const TransactionsFilters = ({
  transactions,
  onFilteredChange,
}: TransactionsFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
  });

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Filtro de busca (descrição)
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((tx) =>
        tx.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtro de tipo
    if (filters.type !== "all") {
      filtered = filtered.filter((tx) => tx.type === filters.type);
    }

    // Filtro de categoria
    if (filters.category !== "all") {
      filtered = filtered.filter((tx) => tx.category === filters.category);
    }

    // Filtro de data (de)
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter((tx) => {
        const txDate = new Date(tx.date.split("/").reverse().join("-"));
        return txDate >= fromDate;
      });
    }

    // Filtro de data (até)
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((tx) => {
        const txDate = new Date(tx.date.split("/").reverse().join("-"));
        return txDate <= toDate;
      });
    }

    // Ordenar por data (mais recente primeiro)
    filtered.sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });

    return filtered;
  }, [transactions, filters]);

  useMemo(() => {
    onFilteredChange(filteredTransactions);
  }, [filteredTransactions, onFilteredChange]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "all",
      category: "all",
      dateFrom: "",
      dateTo: "",
    });
  };

  const typeOptions = [
    { label: "Todos", value: "all" },
    { label: "Receitas", value: "credit" },
    { label: "Despesas", value: "debit" },
  ];

  const categoryOptions = useMemo(() => {
    const categories: TransactionCategory[] = [];
    if (filters.type === "all") {
      categories.push(...TRANSACTION_CATEGORIES.credit, ...TRANSACTION_CATEGORIES.debit);
    } else {
      categories.push(...TRANSACTION_CATEGORIES[filters.type]);
    }
    const uniqueCategories = Array.from(new Set(categories));
    
    return [
      { label: "Todas", value: "all" },
      ...uniqueCategories.map((cat) => ({
        label: CATEGORY_LABELS[cat],
        value: cat,
      })),
    ];
  }, [filters.type]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== "" ||
      filters.type !== "all" ||
      filters.category !== "all" ||
      filters.dateFrom !== "" ||
      filters.dateTo !== ""
    );
  }, [filters]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <FaFilter className="text-cyan-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filtros e Busca</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-cyan-600 hover:text-cyan-700 underline"
            aria-label="Limpar filtros"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Busca */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por descrição..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-10"
            aria-label="Buscar transações"
          />
        </div>

        {/* Filtro de tipo */}
        <Dropdown
          label="Tipo"
          options={typeOptions}
          value={filters.type}
          onChange={(value) => {
            handleFilterChange("type", value);
            if (value !== filters.type) {
              handleFilterChange("category", "all");
            }
          }}
          placeholder="Selecione o tipo"
        />

        {/* Filtro de categoria */}
        <Dropdown
          label="Categoria"
          options={categoryOptions}
          value={filters.category}
          onChange={(value) => handleFilterChange("category", value)}
          placeholder="Selecione a categoria"
          disabled={filters.type === "all" && categoryOptions.length === 1}
        />

        {/* Filtro de data (de) */}
        <Input
          type="date"
          label="Data inicial"
          value={filters.dateFrom}
          onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
        />

        {/* Filtro de data (até) */}
        <Input
          type="date"
          label="Data final"
          value={filters.dateTo}
          onChange={(e) => handleFilterChange("dateTo", e.target.value)}
          min={filters.dateFrom || undefined}
        />
      </div>

      {hasActiveFilters && (
        <div className="text-sm text-gray-600">
          Mostrando {filteredTransactions.length} de {transactions.length} transação(ões)
        </div>
      )}
    </div>
  );
};
