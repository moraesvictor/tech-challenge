import { Button, ProgressBar } from "@/components"
import { CardBase } from "@/components/ui/card-base/card-base"
import { AiOutlineAccountBook } from "react-icons/ai"
import { BiMoney } from "react-icons/bi"

const mockBankBalance = {
  userName: "Victor Moraes",
  balance: 12939,
  balanceVariation: 5.8, 
  income: 4200,
  expenses: 2100,
  progress: 70, 
}

export const DashBoardBankBalanceCard = () => {
  const {
    userName,
    balance,
    balanceVariation,
    income,
    expenses,
    progress,
  } = mockBankBalance

  const formattedBalance = balance.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  const formattedIncome = income.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  const formattedExpenses = expenses.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return (
    <CardBase size="xl" colorSchema="light">
      <div className="flex flex-col gap-4">
        <span className="text-3xl text-gray-900">
          Bem-vindo, {userName}
        </span>

        <div>
          <p className="text-gray-800 text-sm">Saldo bancário</p>
          <p className="text-4xl font-semibold">{formattedBalance}</p>
          <span
            className={
              balanceVariation >= 0
                ? "text-green-700 text-sm"
                : "text-red-700 text-sm"
            }
          >
            {balanceVariation >= 0 ? "▲" : "▼"}{" "}
            {balanceVariation.toFixed(1)}% desde o mês passado
          </span>
        </div>

        <div className="flex gap-4 text-sm text-gray-800">
          <span className="flex items-center gap-2">
            <BiMoney /> Entradas:{" "}
            <strong className="text-green-700">{formattedIncome}</strong>
          </span>
          <span className="flex items-center gap-2">
            <AiOutlineAccountBook /> Saídas:{" "}
            <strong className="text-red-700">{formattedExpenses}</strong>
          </span>
        </div>

        <ProgressBar value={progress} color="green" label="{value} da meta mensal atingida" />

        <div className="flex gap-3 mt-2 justify-center">
          <Button>Transferências</Button>
        </div>
      </div>
    </CardBase>
  )
}
