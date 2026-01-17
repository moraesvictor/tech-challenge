"use client";
import { Button, BUTTON_VARIANTS } from "@/components";
import { useModal } from "@/components/ui/modal/hooks/use-modal-context";
import { useDashboardWidgets, DashboardWidget } from "@/lib/hooks/use-dashboard-widgets";
import { FaCog, FaCheck } from "react-icons/fa";

const WIDGET_LABELS: Record<DashboardWidget, string> = {
  "balance-card": "Card de Saldo",
  "bank-statement": "Extrato Bancário",
  "balance-chart": "Gráfico de Evolução",
  "category-chart": "Gráfico de Categorias",
  "financial-summary": "Resumo Financeiro",
};

export const DashboardWidgetSettings = () => {
  const { widgets, toggleWidget, resetWidgets } = useDashboardWidgets();
  const { open, close } = useModal();

  const handleOpenSettings = () => {
    open({
      title: "Personalizar Dashboard",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            Selecione os widgets que deseja exibir no seu dashboard:
          </p>

          <div className="flex flex-col gap-2">
            {(Object.keys(WIDGET_LABELS) as DashboardWidget[]).map((widget) => {
              const isEnabled = widgets.includes(widget);
              return (
                <label
                  key={widget}
                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() => toggleWidget(widget)}
                    className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                  />
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {WIDGET_LABELS[widget]}
                  </span>
                  {isEnabled && (
                    <FaCheck className="text-cyan-600" size={16} />
                  )}
                </label>
              );
            })}
          </div>

          <div className="flex gap-3 justify-center mt-4 pt-4 border-t">
            <Button
              type="button"
              variant={BUTTON_VARIANTS.ghost}
              onClick={resetWidgets}
            >
              Restaurar Padrão
            </Button>
            <Button type="button" onClick={close}>
              Salvar
            </Button>
          </div>
        </div>
      ),
    });
  };

  return (
    <button
      onClick={handleOpenSettings}
      className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
      title="Personalizar dashboard"
      aria-label="Personalizar dashboard"
    >
      <FaCog size={20} />
    </button>
  );
};
