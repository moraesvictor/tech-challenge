import { DashboardContainer } from "@/modules/dashboard/dashboard-container";

export default function DashboardPage() {
  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DashboardContainer />
      </main>
    </div>
  );
}
