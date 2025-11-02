/**
 * Utilitário para formatação consistente de moeda brasileira
 */
export const formatCurrencyBR = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

