import { atom } from "recoil";
import { Transaction } from "@/lib/types/transaction.types";

export const transactionsAtom = atom<Transaction[]>({
  key: "transactionsAtom",
  default: [],
});

export const transactionsFilterAtom = atom<{
  search: string;
  type: "all" | "credit" | "debit";
  category: string;
  dateFrom: string;
  dateTo: string;
}>({
  key: "transactionsFilterAtom",
  default: {
    search: "",
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
  },
});
