/**
 * Mensagens de erro centralizadas
 * Facilita manutenção e futura internacionalização
 */
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "Este campo é obrigatório",
  INVALID_EMAIL: "Email inválido",
  TRANSACTION_FAILED: "Erro ao realizar transação",
  TRANSACTION_UPDATE_FAILED: "Erro ao atualizar transação",
  TRANSACTION_DELETE_FAILED: "Erro ao deletar transação",
  FILL_ALL_PIX_FIELDS: "Preencha todos os campos do PIX",
  FILL_ALL_TRANSFER_FIELDS: "Preencha todos os campos da transferência",
  DATABASE_NOT_READY: "Banco de dados ainda não está pronto",
  INVALID_CREDENTIALS: "Email ou senha inválidos",
  EMAIL_ALREADY_EXISTS: "Email já cadastrado",
  ACCOUNT_CREATION_FAILED: "Erro ao criar conta",
  DESCRIPTION_REQUIRED: "Descrição é obrigatória",
} as const;

export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: "Conta criada com sucesso!",
  TRANSACTION_CREATED: "Transação realizada com sucesso!",
  TRANSACTION_UPDATED: "Transação atualizada com sucesso!",
  TRANSACTION_DELETED: "Transação deletada com sucesso!",
} as const;

