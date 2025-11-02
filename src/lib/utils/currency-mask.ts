/**
 * Formata um número como moeda brasileira (R$ 0,00)
 * @param value - Valor numérico em centavos ou string numérica
 * @returns String formatada como R$ 0,00
 */
export const formatCurrency = (value: string | number): string => {
  const numbers = String(value).replace(/\D/g, "");

  if (!numbers) return "R$ 0,00";

  const cents = parseInt(numbers, 10);
  const reais = cents / 100;

  return `R$ ${reais
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

/**
 * Remove a formatação de moeda e retorna apenas números (em centavos)
 * @param value - String formatada como R$ 0,00
 * @returns Número em centavos
 */
export const parseCurrency = (value: string): number => {
  const numbers = value.replace(/\D/g, "");
  return numbers ? parseInt(numbers, 10) : 0;
};

/**
 * Aplica máscara de moeda enquanto o usuário digita
 * @param value - Valor digitado
 * @returns Valor formatado como R$ 0,00
 */
export const applyCurrencyMask = (value: string): string => {
  const numbers = value.replace(/\D/g, "");

  if (!numbers) return "R$ 0,00";

  const limitedNumbers = numbers.slice(0, 11);

  return formatCurrency(limitedNumbers);
};
