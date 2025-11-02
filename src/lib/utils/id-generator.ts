/**
 * Gera um ID único usando timestamp e caracteres aleatórios
 * Mais robusto que Date.now() + Math.random()
 */
export const generateId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).slice(2, 11);
  return `${timestamp}-${randomPart}`;
};

