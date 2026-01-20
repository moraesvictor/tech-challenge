import { DashboardMicrofrontend } from "@/components/microfrontends/dashboard-microfrontend";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Finanças Inteligentes",
  description: "Visualize suas finanças, saldo, transações e análises detalhadas",
};

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DashboardMicrofrontend />
      </main>
    </div>
  );
}
