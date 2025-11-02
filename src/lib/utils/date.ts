/**
 * Utilitários para formatação e manipulação de datas
 */
export const dateUtils = {
  /**
   * Formata data para formato brasileiro (DD/MM/YYYY)
   */
  formatBR: (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("pt-BR");
  },

  /**
   * Converte string no formato brasileiro para Date
   * @param dateStr - Data no formato DD/MM/YYYY
   */
  parseBR: (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  },

  /**
   * Converte data brasileira para formato de input date (YYYY-MM-DD)
   * @param dateStr - Data no formato DD/MM/YYYY
   */
  toInputDate: (dateStr: string): string => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  },

  /**
   * Converte data de input date para formato brasileiro
   * @param inputDate - Data no formato YYYY-MM-DD
   */
  fromInputDate: (inputDate: string): string => {
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  },

  /**
   * Obtém mês e ano atual
   */
  getCurrentMonth: () => {
    const now = new Date();
    return {
      month: now.getMonth(),
      year: now.getFullYear(),
    };
  },
};

