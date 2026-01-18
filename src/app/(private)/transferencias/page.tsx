import { TransfersContainer } from "@/modules/transfers/transfers-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transferências | Finanças Inteligentes",
  description: "Realize transferências PIX e bancárias de forma rápida e segura",
};

export const dynamic = "force-dynamic";

export default function TransfersPage() {
  return <TransfersContainer />;
}
