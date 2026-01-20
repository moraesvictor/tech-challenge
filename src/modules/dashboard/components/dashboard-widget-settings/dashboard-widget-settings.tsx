"use client";
import { Button, BUTTON_VARIANTS, Checkbox } from "@/components";
import { useModal } from "@/components/ui/modal/hooks/use-modal-context";
import { useDashboardWidgets, DashboardWidget } from "@/lib/hooks/use-dashboard-widgets";
import { FaCog } from "react-icons/fa";

const WIDGET_LABELS: Record<DashboardWidget, string> = {
  "balance-card": "Card de Saldo",
  "bank-statement": "Extrato Bancário",
  "balance-chart": "Gráfico de Evolução",
  "category-chart": "Gráfico de Categorias",
  "financial-summary": "Resumo Financeiro",
};

const DashboardWidgetSettingsContent = () => {
  const { widgets, toggleWidget, resetWidgets } = useDashboardWidgets();
  const { close } = useModal();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        Selecione os widgets que deseja exibir no seu dashboard. As alterações são aplicadas instantaneamente.
      </p>

      <div className="flex flex-col gap-2">
        {(Object.keys(WIDGET_LABELS) as DashboardWidget[]).map((widget) => {
          const isEnabled = widgets.includes(widget);
          return (
            <div
              key={widget}
              className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Checkbox
                id={`widget-${widget}`}
                checked={isEnabled}
                onChange={() => toggleWidget(widget)}
                label={WIDGET_LABELS[widget]}
                variant="cyan"
              />
            </div>
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
          Fechar
        </Button>
      </div>
    </div>
  );
};

export const DashboardWidgetSettings = () => {
  const { open } = useModal();

  const handleOpenSettings = () => {
    open({
      title: "Personalizar Dashboard",
      content: <DashboardWidgetSettingsContent />,
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
