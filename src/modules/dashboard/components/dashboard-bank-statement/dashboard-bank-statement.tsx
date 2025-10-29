import { CardBase } from "@/components/ui/card-base/card-base"

type Transaction = {
  id: string
  description: string
  date: string
  amount: number
  type: "credit" | "debit"
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Depósito recebido",
    date: "28/10/2025",
    amount: 4200,
    type: "credit",
  },
  {
    id: "2",
    description: "Pagamento de conta de luz",
    date: "26/10/2025",
    amount: -230,
    type: "debit",
  },
  {
    id: "3",
    description: "Transferência para João",
    date: "25/10/2025",
    amount: -1500,
    type: "debit",
  },
  {
    id: "4",
    description: "Cashback recebido",
    date: "20/10/2025",
    amount: 35.5,
    type: "credit",
  },
]

export const DashboardBankStatement = () => {
  return (
    <CardBase size="l" colorSchema="light" className="w-full">
      <div className="flex flex-col gap-4">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Extrato bancário</h2>
          <span className="text-sm text-gray-500">Últimos lançamentos</span>
        </div>

        {/* Lista de transações */}
        <div className="flex flex-col divide-y divide-gray-300">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center py-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{tx.description}</span>
                <span className="text-xs text-gray-500">{tx.date}</span>
              </div>

              <span
                className={
                  tx.type === "credit"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {tx.type === "credit" ? "+" : "-"} R$ {Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardBase>
  )
}
