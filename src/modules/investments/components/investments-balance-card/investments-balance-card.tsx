"use client";
import { CardBase } from "@/components/ui/card-base/card-base";
import { useInvestmentsBalance } from "./hooks/use-investments-balance";
import { AiOutlinePieChart } from "react-icons/ai";
import { BiTrendingUp, BiWallet } from "react-icons/bi";

export const InvestmentsBalanceCard = () => {
  const {
    totalInvested,
    currentValue,
    totalReturn,
    returnPercentage,
    variationPercentage,
    totalInvestments,
  } = useInvestmentsBalance();

  const formattedCurrentValue = currentValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const formattedTotalReturn = totalReturn.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const formattedTotalInvested = totalInvested.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <CardBase size="xl" colorSchema="light">
      <div className="flex flex-col gap-4">
        <span className="text-3xl text-gray-900">Meus Investimentos</span>

        <div>
          <p className="text-gray-800 text-sm">Valor atual dos investimentos</p>
          <p className="text-4xl font-semibold">{formattedCurrentValue}</p>
          <span
            className={
              variationPercentage >= 0
                ? "text-green-700 text-sm"
                : "text-red-700 text-sm"
            }
          >
            {variationPercentage >= 0 ? "▲" : "▼"}{" "}
            {Math.abs(variationPercentage).toFixed(1)}% desde o mês passado
          </span>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-800">
          <span className="flex items-center gap-2">
            <BiWallet /> Total investido:{" "}
            <strong className="text-gray-900">{formattedTotalInvested}</strong>
          </span>
          <span className="flex items-center gap-2">
            <BiTrendingUp /> Retorno acumulado:{" "}
            <strong
              className={
                totalReturn >= 0 ? "text-green-700" : "text-red-700"
              }
            >
              {formattedTotalReturn} ({returnPercentage >= 0 ? "+" : ""}
              {returnPercentage.toFixed(2)}%)
            </strong>
          </span>
          <span className="flex items-center gap-2">
            <AiOutlinePieChart /> Total de investimentos:{" "}
            <strong className="text-gray-900">{totalInvestments}</strong>
          </span>
        </div>
      </div>
    </CardBase>
  );
};

