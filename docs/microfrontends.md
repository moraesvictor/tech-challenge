# 🏗️ Arquitetura de Microfrontends - Tech Challenge Financial

Este documento explica a arquitetura modular implementada no projeto e como ela prepara a aplicação para evoluir para uma arquitetura de microfrontends completa.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura Modular Atual](#arquitetura-modular-atual)
- [Preparação para Microfrontends](#preparação-para-microfrontends)
- [Como Funciona a Integração](#como-funciona-a-integração)
- [Estrutura dos Módulos](#estrutura-dos-módulos)
- [Comunicação Entre Módulos](#comunicação-entre-módulos)
- [Evolução para Microfrontends Completos](#evolução-para-microfrontends-completos)
- [Como Explicar na Apresentação](#como-explicar-na-apresentação)

## 🎯 Visão Geral

O projeto **Tech Challenge Financial** implementa uma **arquitetura modular** que serve como base sólida para evoluir para uma arquitetura de **microfrontends**. Esta abordagem permite:

- ✅ **Desenvolvimento Independente**: Cada módulo pode ser desenvolvido e testado isoladamente
- ✅ **Deploy Independente**: Preparado para deploy separado de cada módulo
- ✅ **Escalabilidade**: Fácil adicionar novos módulos sem afetar os existentes
- ✅ **Manutenibilidade**: Código organizado e fácil de manter
- ✅ **Colaboração**: Múltiplos times podem trabalhar em módulos diferentes

## 🏛️ Arquitetura Modular Atual

### Estrutura do Projeto

O projeto está organizado em **módulos independentes**, cada um representando uma funcionalidade completa:

```
src/
├── app/                          # Shell/Container (Next.js App Router)
│   ├── (public)/                 # Rotas públicas
│   │   └── home/                 # Página inicial
│   ├── (private)/                # Rotas privadas
│   │   ├── dashboard/            # Rota do Dashboard
│   │   ├── transacoes/           # Rota de Transações
│   │   ├── transferencias/       # Rota de Transferências
│   │   └── investimentos/        # Rota de Investimentos
│   └── layout.tsx                # Layout raiz
│
├── modules/                      # Módulos da aplicação (Microfrontends)
│   ├── dashboard/                # Módulo Dashboard
│   │   ├── components/           # Componentes específicos
│   │   ├── hooks/                # Hooks customizados
│   │   └── dashboard-container.tsx
│   │
│   ├── transactions/             # Módulo de Transações
│   │   ├── components/
│   │   ├── hooks/
│   │   └── transactions-container.tsx
│   │
│   ├── transfers/                # Módulo de Transferências
│   │   ├── components/
│   │   ├── hooks/
│   │   └── transfers-container.tsx
│   │
│   ├── investments/              # Módulo de Investimentos
│   │   ├── components/
│   │   ├── hooks/
│   │   └── investments-container.tsx
│   │
│   ├── home/                     # Módulo Home
│   └── private/                  # Módulo de área privada
│
├── components/                   # Design System (Compartilhado)
│   └── ui/                       # Componentes reutilizáveis
│       ├── button/
│       ├── input/
│       ├── modal/
│       └── ...
│
└── lib/                          # Utilitários compartilhados
    ├── transactions/             # Context de transações
    ├── indexedDb/                # Context de autenticação
    └── types/                    # Tipos TypeScript compartilhados
```

### Características da Arquitetura Modular

#### 1. **Isolamento de Módulos**

Cada módulo é **independente** e contém:
- Sua própria lógica de negócio
- Componentes específicos da funcionalidade
- Hooks customizados
- Tipos TypeScript (quando necessário)

**Exemplo - Módulo Dashboard:**
```
src/modules/dashboard/
├── components/
│   ├── dashboard-balance-card/
│   ├── dashboard-bank-statement/
│   └── dashboard-charts/
├── hooks/
│   ├── use-bank-balance.ts
│   └── use-dashboard-data.ts
└── dashboard-container.tsx
```

#### 2. **Design System Compartilhado**

Todos os módulos compartilham o **Design System** centralizado:

```
src/components/ui/
├── button/          # Usado por todos os módulos
├── input/           # Usado por todos os módulos
├── modal/           # Usado por todos os módulos
└── ...
```

**Benefícios:**
- ✅ Consistência visual em toda a aplicação
- ✅ Componentes reutilizáveis
- ✅ Fácil manutenção do design

#### 3. **Comunicação via Context API**

Os módulos se comunicam através de **Contexts compartilhados**:

```typescript
// lib/transactions/transactions-context.tsx
export const TransactionsContext = createContext({
  transactions: [],
  bankBalance: 0,
  addTransaction: () => {},
  // ...
});

// Usado em qualquer módulo
const { transactions, addTransaction } = useTransactions();
```

**Contexts Disponíveis:**
- `TransactionsContext` - Gerencia transações e saldo
- `AuthContext` - Gerencia autenticação
- `ModalContext` - Gerencia modais
- `ToastContext` - Gerencia notificações

#### 4. **Gestão de Estado com Recoil**

Para estado mais complexo, utilizamos **Recoil**:

```typescript
// lib/recoil/atoms.ts
export const transactionsAtom = atom({
  key: 'transactions',
  default: []
});

// Usado em qualquer módulo
const [transactions, setTransactions] = useRecoilState(transactionsAtom);
```

## 🔗 Como Funciona a Integração

### Fluxo de Integração Atual

```
┌─────────────────────────────────────────────────────────┐
│                    Shell (Next.js App)                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │              App Router (Rotas)                  │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Route Groups: (public) / (private)       │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│        ┌─────────────────┼─────────────────┐           │
│        ▼                 ▼                 ▼           │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐       │
│  │ Dashboard│    │Transactions│    │ Transfers│       │
│  │  Module  │    │   Module   │    │  Module  │       │
│  └──────────┘    └──────────┘    └──────────┘       │
│        │                 │                 │           │
│        └─────────────────┼─────────────────┘           │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │      Design System (Componentes Compartilhados)   │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │    Contexts Compartilhados (Estado Global)       │  │
│  │  - TransactionsContext                           │  │
│  │  - AuthContext                                   │  │
│  │  - ModalContext                                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Exemplo Prático de Integração

#### 1. **Rota no App Router**

```typescript
// src/app/(private)/dashboard/page.tsx
import { DashboardContainer } from '@/modules/dashboard/dashboard-container';

export default function DashboardPage() {
  return <DashboardContainer />;
}
```

#### 2. **Container do Módulo**

```typescript
// src/modules/dashboard/dashboard-container.tsx
'use client';

import { useTransactions } from '@/lib/transactions/transactions-context';
import { DashboardBalanceCard } from './components/dashboard-balance-card';
import { DashboardBankStatement } from './components/dashboard-bank-statement';

export function DashboardContainer() {
  const { bankBalance, transactions } = useTransactions();
  
  return (
    <div>
      <DashboardBalanceCard balance={bankBalance} />
      <DashboardBankStatement transactions={transactions} />
    </div>
  );
}
```

#### 3. **Componente do Módulo**

```typescript
// src/modules/dashboard/components/dashboard-balance-card/index.tsx
import { CardBase } from '@/components/ui/card-base';
import { useBankBalance } from '../../hooks/use-bank-balance';

export function DashboardBalanceCard() {
  const balance = useBankBalance();
  
  return (
    <CardBase>
      <h2>Saldo Atual</h2>
      <p>R$ {balance.toFixed(2)}</p>
    </CardBase>
  );
}
```

## 📦 Estrutura dos Módulos

### Padrão Container/Presentation

Cada módulo segue o padrão **Container/Presentation**:

#### **Container** (`*-container.tsx`)
- Orquestra componentes
- Gerencia estado local
- Faz chamadas a hooks e contexts
- Lógica de negócio

#### **Components**
- Componentes puros de apresentação
- Recebem props
- Focados em UI
- Fáceis de testar

#### **Hooks**
- Lógica reutilizável
- Encapsulam chamadas a contexts
- Facilitam testes

### Exemplo Completo: Módulo Transactions

```
src/modules/transactions/
├── components/
│   ├── transaction-list/
│   │   ├── index.tsx
│   │   └── transaction-item.tsx
│   ├── transaction-filters/
│   │   └── index.tsx
│   └── transaction-modal/
│       └── index.tsx
│
├── hooks/
│   ├── use-transactions.ts
│   ├── use-transaction-filters.ts
│   └── use-transaction-actions.ts
│
├── types/
│   └── transaction.types.ts
│
└── transactions-container.tsx
```

## 🔄 Comunicação Entre Módulos

### 1. **Via Context API (Estado Global)**

```typescript
// Módulo A (Dashboard) atualiza transação
const { addTransaction } = useTransactions();
addTransaction(newTransaction);

// Módulo B (Transactions) recebe atualização automaticamente
const { transactions } = useTransactions();
// transactions já contém a nova transação
```

### 2. **Via Recoil Atoms (Estado Complexo)**

```typescript
// Módulo A atualiza atom
const [uiState, setUIState] = useRecoilState(uiStateAtom);
setUIState({ ...uiState, sidebarOpen: true });

// Módulo B lê o mesmo atom
const [uiState] = useRecoilState(uiStateAtom);
// uiState.sidebarOpen === true
```

### 3. **Via Props (Comunicação Direta)**

```typescript
// Shell passa dados para módulo
<DashboardContainer userId={user.id} />
```

### 4. **Via Custom Events (Comunicação Desacoplada)**

```typescript
// Módulo A dispara evento
window.dispatchEvent(new CustomEvent('transaction-added', {
  detail: { transaction }
}));

// Módulo B escuta evento
useEffect(() => {
  const handler = (e) => {
    // Processar evento
  };
  window.addEventListener('transaction-added', handler);
  return () => window.removeEventListener('transaction-added', handler);
}, []);
```

## 🚀 Evolução para Microfrontends Completos

### Fase Atual: Arquitetura Modular Monolítica

✅ **Implementado:**
- Módulos isolados e independentes
- Design System compartilhado
- Comunicação via Context API e Recoil
- Estrutura preparada para separação

### Fase Futura: Microfrontends com Module Federation

#### 1. **Instalação de Dependências**

```bash
npm install @module-federation/nextjs-mf
```

#### 2. **Configuração no next.config.ts**

```typescript
// next.config.ts
const ModuleFederationPlugin = require('@module-federation/nextjs-mf');

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: 'shell', // Aplicação host
          remotes: {
            // Microfrontends remotos
            dashboard: 'dashboard@https://dashboard.vercel.app/remoteEntry.js',
            transactions: 'transactions@https://transactions.vercel.app/remoteEntry.js',
            transfers: 'transfers@https://transfers.vercel.app/remoteEntry.js',
            investments: 'investments@https://investments.vercel.app/remoteEntry.js',
          },
          shared: {
            react: { singleton: true, requiredVersion: '^19.1.0' },
            'react-dom': { singleton: true, requiredVersion: '^19.1.0' },
            'next': { singleton: true },
          },
        })
      );
    }
    return config;
  },
};
```

#### 3. **Estrutura de Deploy**

```
┌─────────────────────────────────────────────────┐
│           Shell (Host Application)               │
│         https://app.vercel.app                   │
│  - Gerencia rotas                                │
│  - Carrega microfrontends remotos               │
│  - Design System compartilhado                   │
└─────────────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
┌───────────┐ ┌───────────┐ ┌───────────┐
│ Dashboard │ │Transactions│ │ Transfers │
│  MF App   │ │   MF App   │ │  MF App   │
│vercel.app │ │vercel.app │ │vercel.app │
└───────────┘ └───────────┘ └───────────┘
```

#### 4. **Carregamento Dinâmico de Microfrontends**

```typescript
// src/app/(private)/dashboard/page.tsx
import dynamic from 'next/dynamic';

const DashboardMF = dynamic(
  () => import('dashboard/DashboardContainer'),
  { ssr: false }
);

export default function DashboardPage() {
  return <DashboardMF />;
}
```

#### 5. **Comunicação Entre Microfrontends**

```typescript
// Usando Custom Events
window.dispatchEvent(new CustomEvent('microfrontend-event', {
  detail: { type: 'transaction-added', data: transaction }
}));

// Ou via Context compartilhado (se no mesmo domínio)
// Ou via API compartilhada
```

## 🎤 Como Explicar na Apresentação

### 1. **Introdução à Arquitetura**

> "Implementamos uma **arquitetura modular** que prepara a aplicação para evoluir para **microfrontends**. Cada funcionalidade está organizada em módulos independentes que podem ser desenvolvidos, testados e, futuramente, deployados separadamente."

### 2. **Demonstrar a Estrutura**

Mostre a estrutura de pastas:

```
src/modules/
├── dashboard/      ← Módulo independente
├── transactions/   ← Módulo independente
├── transfers/      ← Módulo independente
└── investments/    ← Módulo independente
```

### 3. **Explicar os Benefícios**

**Desenvolvimento Independente:**
> "Cada módulo pode ser desenvolvido por times diferentes, sem interferência. O módulo de Dashboard pode ser atualizado sem afetar o módulo de Transações."

**Escalabilidade:**
> "Novos módulos podem ser adicionados facilmente. Por exemplo, podemos adicionar um módulo de 'Relatórios' sem modificar código existente."

**Manutenibilidade:**
> "Cada módulo tem sua própria responsabilidade. Se houver um bug no módulo de Transferências, sabemos exatamente onde procurar."

### 4. **Mostrar a Comunicação**

Demonstre como os módulos se comunicam:

```typescript
// Dashboard atualiza uma transação
const { addTransaction } = useTransactions();

// Transactions recebe automaticamente
const { transactions } = useTransactions();
```

### 5. **Evolução para Microfrontends**

Explique a evolução futura:

> "A estrutura atual permite que cada módulo seja extraído para um microfrontend independente usando **Module Federation**. Cada módulo poderia ter seu próprio repositório, seu próprio deploy na Vercel, e ser carregado dinamicamente pela aplicação shell."

### 6. **Demonstrar no Código**

Mostre um exemplo de container de módulo:

```typescript
// src/modules/dashboard/dashboard-container.tsx
export function DashboardContainer() {
  const { bankBalance } = useTransactions();
  // Lógica isolada do módulo
  return <DashboardView balance={bankBalance} />;
}
```

### 7. **Design System Compartilhado**

> "Todos os módulos compartilham o mesmo **Design System**, garantindo consistência visual. Os componentes UI estão centralizados e podem ser usados por qualquer módulo."

### 8. **Gestão de Estado**

> "Utilizamos **Recoil** para gestão de estado complexa e **Context API** para estado compartilhado. Isso permite que os módulos se comuniquem de forma desacoplada."

## 📊 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    APLICAÇÃO SHELL                          │
│              (Next.js App Router - Host)                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Design System Compartilhado             │  │
│  │  (Button, Input, Modal, Card, etc.)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Contexts & Recoil (Estado Global)            │  │
│  │  - TransactionsContext                               │  │
│  │  - AuthContext                                       │  │
│  │  - Recoil Atoms                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│        ┌──────────────────┼──────────────────┐               │
│        ▼                  ▼                  ▼               │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐         │
│  │ Dashboard│      │Transactions│      │ Transfers│         │
│  │  Module  │      │   Module   │      │  Module  │         │
│  │          │      │            │      │          │         │
│  │ - Hooks  │      │ - Hooks    │      │ - Hooks  │         │
│  │ - Comps  │      │ - Comps    │      │ - Comps  │         │
│  │ - Logic  │      │ - Logic    │      │ - Logic  │         │
│  └──────────┘      └──────────┘      └──────────┘         │
│        │                  │                  │               │
│        └──────────────────┼──────────────────┘               │
│                           ▼                                   │
│              ┌─────────────────────────┐                      │
│              │   API / Backend         │                      │
│              └─────────────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

## ✅ Checklist de Implementação

### Arquitetura Modular (Implementado)

- [x] Módulos isolados e independentes
- [x] Design System centralizado
- [x] Context API para estado compartilhado
- [x] Recoil para estado complexo
- [x] Padrão Container/Presentation
- [x] Hooks customizados por módulo
- [x] TypeScript para type safety

### Microfrontends Completos (Futuro)

- [ ] Module Federation configurado
- [ ] Cada módulo em repositório separado
- [ ] Deploy independente de cada módulo
- [ ] Remote Entry configurado
- [ ] Comunicação entre microfrontends
- [ ] Versionamento de microfrontends
- [ ] Testes de integração

## 📚 Referências

- [Module Federation Documentation](https://module-federation.github.io/)
- [Next.js Module Federation](https://github.com/module-federation/nextjs-mf)
- [Microfrontends Architecture](https://micro-frontends.org/)
- [Single SPA](https://single-spa.js.org/)

---

**Desenvolvido para o Tech Challenge FIAP** 🚀
