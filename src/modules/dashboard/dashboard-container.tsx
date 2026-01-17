"use client";
import { DashboardBalanceChart } from "./components/dashboard-balance-chart/dashboard-balance-chart";
import { DashBoardBankBalanceCard } from "./components/dashboard-bank-balance-card/dashboard-bank-balance-card";
import { DashboardBankStatement } from "./components/dashboard-bank-statement/dashboard-bank-statement";
import { DashboardCategoryChart } from "./components/dashboard-category-chart/dashboard-category-chart";
import { DashboardFinancialSummary } from "./components/dashboard-financial-summary/dashboard-financial-summary";
import { DashboardWidgetSettings } from "./components/dashboard-widget-settings/dashboard-widget-settings";
import { useDashboardWidgets } from "@/lib/hooks/use-dashboard-widgets";

const WIDGET_COMPONENTS = {
  "balance-card": DashBoardBankBalanceCard,
  "bank-statement": DashboardBankStatement,
  "balance-chart": DashboardBalanceChart,
  "category-chart": DashboardCategoryChart,
  "financial-summary": DashboardFinancialSummary,
};

export const DashboardContainer = () => {
  const { widgets, isLoaded } = useDashboardWidgets();

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-8 w-full py-8 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
        <div className="text-center text-gray-500">Carregando dashboard...</div>
      </div>
    );
  }

  const renderWidget = (widget: string) => {
    const Component = WIDGET_COMPONENTS[widget as keyof typeof WIDGET_COMPONENTS];
    return Component ? <Component key={widget} /> : null;
  };

  return (
    <div className="flex flex-col gap-8 w-full py-8 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <div className="flex justify-end">
        <DashboardWidgetSettings />
      </div>

      {widgets.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Nenhum widget selecionado. Use o botão de configurações para adicionar widgets ao seu dashboard.
        </div>
      ) : (
        <>
          {widgets.includes("balance-card") && widgets.includes("bank-statement") && (
            <div className="flex flex-col lg:flex-row justify-center gap-8">
              {renderWidget("balance-card")}
              {renderWidget("bank-statement")}
            </div>
          )}

          {widgets.includes("financial-summary") && !widgets.includes("balance-card") && !widgets.includes("bank-statement") && (
            renderWidget("financial-summary")
          )}

          {widgets.includes("financial-summary") && (widgets.includes("balance-card") || widgets.includes("bank-statement")) && (
            renderWidget("financial-summary")
          )}

          {widgets.includes("balance-chart") && widgets.includes("category-chart") && (
            <div className="flex flex-col lg:flex-row justify-center gap-8">
              {renderWidget("balance-chart")}
              {renderWidget("category-chart")}
            </div>
          )}

          {widgets.filter((w) => !["balance-card", "bank-statement", "financial-summary", "balance-chart", "category-chart"].includes(w)).map(renderWidget)}
        </>
      )}
    </div>
  );
};
