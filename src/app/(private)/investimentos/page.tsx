import { InvestmentsMicrofrontend } from "@/components/microfrontends/investments-microfrontend";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investimentos | Finanças Inteligentes",
  description: "Visualize sua carteira de investimentos e performance",
};

export const dynamic = "force-dynamic";

export default function InvestimentosPage() {
  return <InvestmentsMicrofrontend />;
}
