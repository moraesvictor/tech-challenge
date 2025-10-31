import { Button, BUTTON_VARIANTS } from "@/components";

export const MoreAboutModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Sobre o ByteBank
      </h3>

      <div className="flex flex-col gap-3 text-gray-700">
        <p className="text-base leading-relaxed">
          O ByteBank é uma plataforma financeira moderna e inovadora,
          desenvolvida para oferecer controle total sobre suas finanças
          pessoais. Nossa missão é democratizar o acesso a serviços bancários de
          qualidade.
        </p>

        <div className="flex flex-col gap-2 mt-2">
          <h4 className="font-semibold text-gray-900">Nossos Valores:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Transparência em todas as operações</li>
            <li>Segurança dos dados e transações</li>
            <li>Inovação constante para melhor atendimento</li>
            <li>Foco no cliente e suas necessidades</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Tech Challenge FIAP 2025</strong> - Desenvolvido como parte
            do projeto acadêmico da FIAP, demonstrando as melhores práticas em
            desenvolvimento web moderno.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={onClose} variant={BUTTON_VARIANTS.ghost}>Fechar</Button>
      </div>
    </div>
  );
};
