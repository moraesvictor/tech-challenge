import { useMemo } from "react";
import { AdvantageCard } from "../components/advantage-card/advantage-card";

export const AdvantagesSection = () => {
  const advantages = useMemo(
    () => [
      {
        icon: "/icone_presente.svg",
        title: "Conta e cartão gratuitos",
        description:
          "Isso mesmo, nossa conta é digital, sem custo fixo e sem tarifa de manutenção.",
      },
      {
        icon: "/icone_saque.svg",
        title: "Saques sem custo",
        description:
          "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
      },
      {
        icon: "/icone_pontos.svg",
        title: "Programa de pontos",
        description:
          "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
      },
      {
        icon: "/icone_dispositivos.svg",
        title: "Seguro Dispositivos",
        description:
          "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
      },
    ],
    []
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-20 px-4 flex flex-col items-center ">
      <p className="font-inter text-2xl text-gray-900 font-semibold mb-8 text-center">
        Vantagens do nosso banco:
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center pb-8">
        {advantages.map((adv, index) => (
          <AdvantageCard
            key={index}
            icon={adv.icon}
            title={adv.title}
            description={adv.description}
          />
        ))}
      </div>
    </div>
  );
};
