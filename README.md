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

#### ✅ Logout
- Botão de sair disponível no header da área privada
- Modal de confirmação antes de realizar logout
- Redirecionamento automático para página inicial após logout

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
│   │   │   ├── avatar/               # Componente Avatar
│   │   │   ├── error-message/        # Componente ErrorMessage
│   │   │   └── loading-spinner/     # Componente LoadingSpinner
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

#### Logout Modal
Modal de confirmação para logout do usuário.

```tsx
import { LogoutModal } from "@/modules/private/private-header/private-header-container/components/logout-modal";
import { useModal } from "@/components/ui/modal/hooks/use-modal-context";
import { useAuth } from "@/lib/indexedDb/auth-context";
import { useRouter } from "next/navigation";

const { open, close } = useModal();
const { logout } = useAuth();
const router = useRouter();

const handleLogout = () => {
  open({
    title: "Confirmar saída",
    content: (
      <LogoutModal
        onConfirm={() => {
          logout();
          close();
          router.push("/home");
        }}
        onCancel={close}
      />
    ),
  });
};
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
- Logout com confirmação via modal
- Redirecionamento automático para página inicial após logout

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

## 🏗 Arquitetura e Padrões de Design

Este projeto implementa uma arquitetura modular e escalável seguindo os princípios de **Clean Architecture** e **Separation of Concerns**. A estrutura foi pensada para facilitar manutenção, testes e evolução do código.

### 🎯 Estrutura Arquitetural

#### 1. **Arquitetura Modular**
O projeto está organizado em **módulos independentes**, cada um representando uma funcionalidade completa:

```
src/modules/
├── dashboard/          # Módulo do Dashboard
├── transactions/       # Módulo de Transações
├── transfers/          # Módulo de Transferências
├── investments/        # Módulo de Investimentos
├── home/               # Módulo da Home Pública
└── private/            # Módulo de área privada
```

**Benefícios:**
- ✅ **Baixo Acoplamento**: Cada módulo é independente e pode ser desenvolvido/testado isoladamente
- ✅ **Alta Coesão**: Funcionalidades relacionadas estão agrupadas logicamente
- ✅ **Escalabilidade**: Novas funcionalidades podem ser adicionadas como novos módulos sem afetar o código existente
- ✅ **Manutenibilidade**: Fácil localizar e corrigir bugs em módulos específicos

#### 2. **Separação de Responsabilidades**

A arquitetura separa claramente as responsabilidades:

- **`components/ui/`**: Design System com componentes reutilizáveis e genéricos (Button, Input, Modal, etc.)
- **`modules/`**: Lógica de negócio e componentes específicos de cada feature
- **`lib/`**: Utilitários, contexts, factories e configurações compartilhadas
- **`app/`**: Rotas e layouts do Next.js (camada de apresentação)

**Benefícios:**
- ✅ **Reutilização**: Componentes UI podem ser usados em qualquer módulo
- ✅ **Testabilidade**: Cada camada pode ser testada independentemente
- ✅ **Clareza**: Fácil entender onde cada tipo de código deve estar

#### 3. **Container/Presentation Pattern**

Cada módulo utiliza o padrão **Container/Presentation**:

- **Containers** (`*-container.tsx`): Orquestram componentes e gerenciam estado
- **Components**: Componentes puros focados em apresentação
- **Hooks**: Lógica reutilizável isolada em hooks customizados

**Exemplo:**
```tsx
// Container orquestra componentes
<DashboardContainer>
  <DashboardBalanceCard />  // Componente de apresentação
  <DashboardBankStatement /> // Componente de apresentação
</DashboardContainer>
```

**Benefícios:**
- ✅ **Separação clara**: Lógica separada da apresentação
- ✅ **Reutilização**: Componentes podem ser reutilizados com diferentes containers
- ✅ **Testes simplificados**: Componentes puros são mais fáceis de testar

#### 4. **Context API para Gerenciamento de Estado Global**

O projeto utiliza **React Context API** para gerenciar estado compartilhado:

- **`TransactionsContext`**: Gerencia transações, saldo e histórico
- **`AuthContext`**: Gerencia autenticação e dados do usuário
- **`ModalContext`**: Gerencia abertura/fechamento de modais
- **`ToastContext`**: Gerencia notificações toast

**Benefícios:**
- ✅ **Estado Global Organizado**: Estado compartilhado centralizado e acessível
- ✅ **Sem Prop Drilling**: Evita passar props por múltiplos níveis
- ✅ **Performance**: Contextos isolados permitem re-renders otimizados
- ✅ **Manutenibilidade**: Lógica de estado centralizada e fácil de gerenciar

#### 5. **Hooks Customizados**

A lógica de negócio é encapsulada em **hooks customizados**:

```tsx
// Exemplo: use-bank-balance.ts
export const useBankBalance = () => {
  const { bankBalance } = useTransactions();
  return bankBalance;
};
```

**Benefícios:**
- ✅ **Reutilização**: Lógica pode ser compartilhada entre componentes
- ✅ **Testabilidade**: Hooks podem ser testados isoladamente
- ✅ **Legibilidade**: Componentes ficam mais limpos e focados em UI
- ✅ **Manutenibilidade**: Mudanças na lógica ficam centralizadas nos hooks

#### 6. **Factory Pattern para Dados Mockados**

O projeto utiliza o padrão **Factory** para gerar dados mockados:

- **`transaction.factory.ts`**: Gera transações financeiras
- **`investment.factory.ts`**: Gera dados de investimentos

**Benefícios:**
- ✅ **Flexibilidade**: Fácil ajustar quantidade e tipo de dados gerados
- ✅ **Consistência**: Dados seguem sempre o mesmo padrão
- ✅ **Testabilidade**: Fácil criar dados de teste para diferentes cenários
- ✅ **Manutenibilidade**: Mudanças no schema são feitas em um único lugar

#### 7. **App Router com Route Groups**

O Next.js App Router utiliza **Route Groups** para organizar rotas:

- **`(public)/`**: Rotas públicas (não requerem autenticação)
- **`(private)/`**: Rotas privadas (protegidas por autenticação)

**Benefícios:**
- ✅ **Organização Clara**: Rotas agrupadas por funcionalidade
- ✅ **Layouts Específicos**: Cada grupo pode ter seu próprio layout
- ✅ **Proteção de Rotas**: Fácil aplicar middleware/autenticação por grupo
- ✅ **URLs Limpas**: Route Groups não aparecem na URL (ex: `/dashboard` não é `/private/dashboard`)

#### 8. **Design System Centralizado**

O Design System está centralizado em `components/ui/`:

- Todos os componentes seguem os mesmos padrões de design
- Consistência visual garantida em toda a aplicação
- Fácil manutenção e evolução do design

**Benefícios:**
- ✅ **Consistência Visual**: Interface unificada e profissional
- ✅ **Manutenibilidade**: Mudanças de design em um lugar refletem em toda a app
- ✅ **Produtividade**: Desenvolvedores não precisam recriar componentes
- ✅ **Acessibilidade**: Padrões de acessibilidade aplicados centralmente

### 📊 Fluxo de Dados

```
User Action
    ↓
Component (UI)
    ↓
Custom Hook (lógica de negócio)
    ↓
Context API (estado global)
    ↓
Factory (dados mockados)
    ↓
UI Update
```

### 🎨 Princípios Aplicados

1. **SOLID**: Princípios SOLID aplicados na organização do código
2. **DRY (Don't Repeat Yourself)**: Código reutilizado através de componentes e hooks
3. **Single Responsibility**: Cada arquivo/classe tem uma responsabilidade única
4. **Separation of Concerns**: Separação clara entre UI, lógica e dados
5. **Type Safety**: TypeScript garante type safety em toda a aplicação

### 🚀 Benefícios Gerais da Arquitetura

- **Escalabilidade**: Fácil adicionar novas funcionalidades sem quebrar código existente
- **Manutenibilidade**: Código organizado facilita correções e melhorias
- **Colaboração**: Múltiplos desenvolvedores podem trabalhar em módulos diferentes sem conflitos
- **Performance**: Estrutura otimizada permite lazy loading e code splitting eficiente
- **Testabilidade**: Cada camada pode ser testada independentemente
- **Documentação Implícita**: A estrutura do projeto documenta a arquitetura automaticamente

---

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
