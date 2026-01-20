import { TransactionsMicrofrontend } from "@/components/microfrontends/transactions-microfrontend";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transações | Finanças Inteligentes",
  description: "Visualize, filtre e gerencie todas as suas transações financeiras",
};

export const dynamic = "force-dynamic";

export default function TransactionsPage() {
  return <TransactionsMicrofrontend />;
}

