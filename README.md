# 💰 Tech Challenge Financial - Sistema de Gerenciamento Financeiro

Sistema de gerenciamento financeiro desenvolvido como projeto final da fase utilizando **Next.js** e **Design System**. A aplicação permite que usuários gerenciem suas transações financeiras de forma intuitiva e eficiente.

## 📋 Índice

- [Requisitos Implementados](#requisitos-implementados)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Design System](#design-system)
- [Funcionalidades](#funcionalidades)
- [Dados Mockados](#dados-mockados)
- [Scripts Disponíveis](#scripts-disponíveis)

## ✅ Requisitos Implementados

### Estrutura e Design da Interface

#### ✅ Home Page (Dashboard)
- Página inicial com boas-vindas ao usuário
- Exibição de informações sobre o saldo da conta corrente
- Extrato das últimas transações financeiras
- Seção para iniciar nova transação com opções para selecionar tipo e valor

#### ✅ Listagem de Transações
- Página completa que exibe todas as transações realizadas
- Opção para visualizar detalhes de cada transação
- Opção para editar transações existentes
- Opção para deletar transações com confirmação via modal

#### ✅ Adicionar Nova Transação
- Página dedicada para adicionar novas transações
- Formulário com campos para:
  - Tipo de transação (PIX ou Transferência Bancária)
  - Valor (com máscara de moeda brasileira)
  - Dados específicos conforme tipo (chave PIX, conta, agência, banco, nome)
- Integração com contexto de transações

#### ✅ Editar Transação
- Modal para editar informações de transação existente
- Formulário pré-preenchido com dados atuais
- Validação e atualização em tempo real

### Tecnologias Obrigatórias

#### ✅ Next.js
- Projeto configurado e organizado utilizando Next.js 15.5.3
- App Router com estrutura modular
- Otimizações de performance e SEO

#### ✅ Design System
- Sistema de componentes reutilizáveis e consistentes
- Componentes documentados e organizados
- Reutilização garantida em toda a aplicação
- Biblioteca de componentes incluindo:
  - Button
  - Input (com suporte a máscara de moeda)
  - CardBase
  - Modal
  - Toast
  - ProgressBar
  - Dropdown
  - Avatar

#### ✅ Dados Mockados
- Utilização de `@faker-js/faker` para geração de dados fictícios
- Context API para gerenciamento de estado
- Dados gerados dinamicamente baseados no usuário logado

## 🛠 Tecnologias Utilizadas

### Dependências Principais
- **Next.js** 15.5.3 - Framework React para produção
- **React** 19.1.0 - Biblioteca JavaScript para interfaces
- **TypeScript** 5 - Superset do JavaScript com tipagem estática
- **Tailwind CSS** 4 - Framework CSS utility-first
- **@faker-js/faker** 10.0.0 - Geração de dados mockados
- **recharts** 3.3.0 - Biblioteca de gráficos para React
- **react-icons** 5.5.0 - Ícones populares para React
- **clsx** 2.1.1 - Utilitário para construção de classes CSS condicionais

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para JavaScript/TypeScript
- **PostCSS** - Processador de CSS

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 20.x ou superior
- **npm** 10.x ou superior (ou yarn/pnpm/bun)

Você pode verificar suas versões com:

```bash
node --version
npm --version
```

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd tech-challange-financial
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o servidor de desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000)

### 4. Build para produção

```bash
npm run build
```

### 5. Execute o build de produção

```bash
npm start
```

## 📁 Estrutura do Projeto

```
tech-challange-financial/
├── src/
│   ├── app/                          # App Router do Next.js
│   │   ├── (public)/                 # Rotas públicas
│   │   │   └── home/                 # Página inicial pública
│   │   ├── (private)/                # Rotas privadas (requer autenticação)
│   │   │   ├── dashboard/            # Dashboard principal
│   │   │   ├── transacoes/           # Listagem de transações
│   │   │   ├── transferencias/       # Adicionar nova transação
│   │   │   └── investimentos/        # Página de investimentos
│   │   ├── layout.tsx                # Layout raiz
│   │   └── globals.css                # Estilos globais
│   ├── components/                   # Componentes compartilhados
│   │   ├── ui/                       # Design System
│   │   │   ├── button/               # Componente Button
│   │   │   ├── input/                # Componente Input
│   │   │   ├── card-base/            # Componente CardBase
│   │   │   ├── modal/                # Componente Modal
│   │   │   ├── toast/                # Componente Toast
│   │   │   ├── progress-bar/         # Componente ProgressBar
│   │   │   ├── dropdown/             # Componente Dropdown
│   │   │   └── avatar/               # Componente Avatar
│   │   └── layout/                   # Componentes de layout
│   ├── modules/                      # Módulos da aplicação
│   │   ├── dashboard/                # Módulo Dashboard
│   │   ├── transactions/             # Módulo de Transações
│   │   ├── transfers/                # Módulo de Transferências
│   │   ├── investments/               # Módulo de Investimentos
│   │   ├── home/                     # Módulo Home
│   │   └── private/                 # Módulo de área privada
│   ├── lib/                          # Utilitários e configurações
│   │   ├── transactions/             # Context de transações
│   │   ├── indexedDb/                # Context de autenticação
│   │   ├── faker/                    # Factories para dados mockados
│   │   ├── types/                    # Tipos TypeScript
│   │   └── utils/                     # Funções utilitárias
│   └── components/
├── public/                            # Arquivos estáticos
├── package.json                       # Dependências e scripts
├── tsconfig.json                      # Configuração TypeScript
├── next.config.ts                     # Configuração Next.js
├── tailwind.config.ts                 # Configuração Tailwind
└── README.md                          # Este arquivo
```

## 🎨 Design System

O projeto implementa um Design System completo com componentes reutilizáveis. Todos os componentes seguem os princípios de:

- **Consistência**: Design unificado em toda a aplicação
- **Reutilização**: Componentes genéricos e reutilizáveis
- **Acessibilidade**: Componentes seguem boas práticas de acessibilidade
- **Tipagem**: Todos os componentes são tipados com TypeScript

### Componentes Disponíveis

#### Button
Componente de botão com múltiplas variantes.

```tsx
import { Button, BUTTON_VARIANTS } from "@/components";

<Button variant={BUTTON_VARIANTS.primary}>Clique aqui</Button>
```

Variantes disponíveis: `primary`, `secondary`, `ghost`, `alert`

#### Input
Componente de input com suporte a máscaras.

```tsx
import { Input } from "@/components";

<Input 
  label="Valor" 
  currency 
  value={value} 
  onChange={handleChange} 
/>
```

Props especiais:
- `currency`: Ativa máscara de moeda brasileira (R$ 0,00)

#### CardBase
Componente de card base para exibir conteúdo agrupado.

```tsx
import { CardBase } from "@/components/ui/card-base/card-base";

<CardBase size="xl" colorSchema="light">
  Conteúdo do card
</CardBase>
```

#### Modal
Sistema de modais para diálogos e confirmações.

```tsx
import { useModal } from "@/components/ui/modal/hooks/use-modal-context";

const { open, close } = useModal();

open({
  title: "Título",
  content: <div>Conteúdo</div>
});
```

#### Toast
Sistema de notificações toast.

```tsx
import { useToastMethods } from "@/components/ui/toast/hooks/use-toast-methods";

const toast = useToastMethods();
toast.success("Mensagem de sucesso!", "bottom-right");
```

#### ProgressBar
Barra de progresso para métricas.

```tsx
import { ProgressBar } from "@/components";

<ProgressBar 
  value={75} 
  color="green" 
  label="75% da meta atingida" 
/>
```

## ✨ Funcionalidades

### Autenticação
- Sistema de autenticação simulado usando IndexedDB
- Persistência de dados do usuário
- Proteção de rotas privadas

### Dashboard
- Visualização do saldo bancário
- Histórico de variação mensal
- Entradas e saídas do mês
- Progresso da meta mensal
- Gráfico de evolução do saldo
- Extrato das últimas transações

### Transações
- **Visualizar**: Ver detalhes completos de uma transação
- **Editar**: Modificar informações de transações existentes
- **Deletar**: Remover transações com confirmação via modal
- **Filtrar**: Listagem ordenada por data (mais recente primeiro)

### Transferências
- **PIX**: Transferência via chave PIX
- **Transferência Bancária**: Transferência tradicional
- Máscara de valor em moeda brasileira
- Validação de formulários
- Feedback visual com toasts

### Investimentos
- Visualização de carteira de investimentos
- Gráficos de distribuição por tipo
- Evolução temporal dos investimentos
- Métricas de retorno

## 📊 Dados Mockados

O projeto utiliza **@faker-js/faker** para gerar dados mockados. Os dados são gerados dinamicamente com base no usuário logado e incluem:

- Transações financeiras (crédito/débito)
- Saldo bancário calculado
- Histórico de variação mensal
- Dados de investimentos
- Extrato bancário

### Localização dos Factories

- `src/lib/faker/transaction.factory.ts` - Geração de transações
- `src/lib/faker/investment.factory.ts` - Geração de investimentos

### Context API

Os dados são gerenciados através de Context API do React:

- `TransactionsContext` - Gerencia transações e saldo
- `AuthContext` - Gerencia autenticação e usuário

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento na porta 3000

# Build
npm run build        # Cria build de produção

# Produção
npm start            # Inicia servidor de produção

# Linting
npm run lint         # Executa ESLint
```

## 🎯 Rotas da Aplicação

### Rotas Públicas
- `/home` - Página inicial pública com boas-vindas

### Rotas Privadas (requer autenticação)
- `/dashboard` - Dashboard principal com saldo e extrato
- `/transacoes` - Listagem completa de transações
- `/transferencias` - Adicionar nova transação (PIX/Transferência)
- `/investimentos` - Visualização de investimentos

## 📝 Observações Importantes

1. **Dados Simulados**: Todos os dados são gerados via faker e não persistem após recarregar a página (exceto dados do usuário no IndexedDB)

2. **Autenticação**: O sistema usa uma autenticação simulada. Para testar, faça login na página inicial

3. **Responsividade**: A aplicação é totalmente responsiva e funciona em dispositivos móveis e desktop

4. **Acessibilidade**: Componentes seguem boas práticas de acessibilidade web

## 🤝 Contribuindo

Este é um projeto acadêmico desenvolvido para o Tech Challenge FIAP. Contribuições e sugestões são bem-vindas!

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do Tech Challenge FIAP.

---

**Desenvolvido com ❤️ para o Tech Challenge FIAP**
