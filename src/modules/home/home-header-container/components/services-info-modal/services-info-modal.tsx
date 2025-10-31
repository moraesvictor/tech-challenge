import { Button, BUTTON_VARIANTS } from "@/components";

export const ServicesInfoModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Nossos Serviços</h3>

      <div className="flex flex-col gap-4 text-gray-700">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-cyan-600">📊</span> Dashboard Financeiro
          </h4>
          <p className="text-sm leading-relaxed">
            Acompanhe sua evolução financeira com gráficos e estatísticas
            detalhadas. Visualize sua renda, gastos e patrimônio de forma clara
            e intuitiva.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-cyan-600">💸</span> Transferências
          </h4>
          <p className="text-sm leading-relaxed">
            Realize transferências de forma rápida e segura. Transfira para
            outras contas ByteBank ou para contas externas com praticidade.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-cyan-600">📈</span> Investimentos
          </h4>
          <p className="text-sm leading-relaxed">
            Gerencie seus investimentos e acompanhe a rentabilidade do seu
            portfólio. Diversifique sua carteira com diversas opções de
            aplicações.
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
        <p className="text-sm text-gray-700">
          <strong className="text-cyan-900">Todos os nossos serviços</strong>{" "}
          são desenvolvidos com foco em segurança, praticidade e experiência do
          usuário.
        </p>
        
      </div>
      <div className="flex justify-center">
        <Button onClick={onClose} variant={BUTTON_VARIANTS.ghost}>Fechar</Button>
      </div>
    </div>
  );
};
