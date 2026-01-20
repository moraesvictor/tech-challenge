# 🎥 Guia Passo a Passo para Vídeo Demonstrativo

## 📋 Preparação Antes de Gravar

### 1. Checklist de Preparação

- [ ] Projeto rodando localmente (`npm run dev`)
- [ ] Docker funcionando (opcional, para mostrar containerização)
- [ ] Conta de usuário criada para demonstração
- [ ] Dados de exemplo gerados
- [ ] Navegador limpo (sem extensões que possam interferir)
- [ ] Ferramenta de gravação configurada (OBS, Loom, etc.)
- [ ] Áudio testado (microfone funcionando)
- [ ] Tela em resolução adequada (1920x1080 recomendado)

### 2. Roteiro Sugerido (15-20 minutos)

1. **Introdução** (1-2 min)
2. **Visão Geral do Projeto** (2-3 min)
3. **Arquitetura de Microfrontends** (3-4 min)
4. **Autenticação e Autorização** (2-3 min)
5. **Funcionalidades Implementadas** (5-7 min)
6. **Docker e Deploy** (2-3 min)
7. **Conclusão** (1 min)

---

## 🎬 Roteiro Detalhado do Vídeo

### **PARTE 1: Introdução (1-2 minutos)**

#### O que falar:

> "Olá! Meu nome é [SEU NOME] e este é o vídeo demonstrativo do projeto Tech Challenge Financial, desenvolvido para a Fase 02 do Tech Challenge FIAP.
> 
> Neste vídeo, vou demonstrar todas as funcionalidades implementadas, explicar a arquitetura de microfrontends, mostrar como funciona a autenticação e autorização, e demonstrar o deploy em cloud.
> 
> Vamos começar!"

#### O que mostrar:

- Tela inicial do projeto
- README.md aberto (opcional)
- Estrutura de pastas do projeto

---

### **PARTE 2: Visão Geral do Projeto (2-3 minutos)**

#### O que falar:

> "O Tech Challenge Financial é uma aplicação de gerenciamento financeiro desenvolvida com Next.js 15, React 19, TypeScript e Tailwind CSS. O projeto implementa uma arquitetura modular preparada para evoluir para microfrontends completos.
> 
> Vamos ver a estrutura do projeto..."

#### O que mostrar:

1. **Abrir o terminal e mostrar a estrutura:**
```bash
cd tech-challange-financial
tree src/modules -L 2
# ou
ls -la src/modules
```

2. **Mostrar os módulos:**
```
src/modules/
├── dashboard/
├── transactions/
├── transfers/
├── investments/
├── home/
└── private/
```

3. **Explicar:**
> "Cada módulo é independente e pode ser desenvolvido separadamente. Isso prepara a aplicação para evoluir para microfrontends completos."

4. **Mostrar package.json:**
```bash
cat package.json
```

> "Aqui vemos as principais tecnologias: Next.js 15.5.3, React 19, TypeScript, Recoil para gestão de estado, e outras dependências."

---

### **PARTE 3: Arquitetura de Microfrontends (3-4 minutos)**

#### O que falar:

> "Agora vou explicar como foi implementada a arquitetura de microfrontends. O projeto utiliza uma arquitetura modular que serve como base para evoluir para microfrontends completos."

#### O que mostrar:

1. **Mostrar estrutura de um módulo:**
```bash
# Mostrar estrutura do módulo dashboard
ls -la src/modules/dashboard/
```

> "Cada módulo tem sua própria estrutura: componentes, hooks, e um container principal."

2. **Abrir um arquivo de container:**
```bash
code src/modules/dashboard/dashboard-container.tsx
# ou mostrar no editor
```

**Explicar:**
> "Este é o container do módulo Dashboard. Ele orquestra os componentes e utiliza o Context API para acessar dados compartilhados."

3. **Mostrar como os módulos se comunicam:**
```typescript
// Mostrar exemplo de uso do Context
const { transactions, bankBalance } = useTransactions();
```

> "Os módulos se comunicam através do Context API e Recoil. Quando um módulo atualiza uma transação, todos os outros módulos recebem a atualização automaticamente."

4. **Mostrar Design System:**
```bash
ls -la src/components/ui/
```

> "Todos os módulos compartilham o mesmo Design System, garantindo consistência visual. Componentes como Button, Input, Modal são reutilizáveis em todos os módulos."

5. **Mostrar documentação de microfrontends:**
```bash
cat docs/microfrontends.md | head -50
```

> "Temos documentação completa sobre a arquitetura. A estrutura atual permite que cada módulo seja extraído para um microfrontend independente usando Module Federation."

---

### **PARTE 4: Autenticação e Autorização (2-3 minutos)**

#### O que falar:

> "Agora vou mostrar como funciona a autenticação e autorização no projeto. Implementamos múltiplas camadas de segurança."

#### O que mostrar:

1. **Mostrar middleware:**
```bash
cat src/middleware.ts
```

**Explicar:**
> "Este é o middleware do Next.js que protege as rotas no nível do servidor. Ele verifica cookies de autenticação antes mesmo da página ser renderizada."

2. **Mostrar rotas protegidas:**
```typescript
const privateRoutes = ['/dashboard', '/transacoes', '/transferencias', '/investimentos'];
```

> "Essas são as rotas privadas. Se o usuário não estiver autenticado, é redirecionado para a página inicial."

3. **Mostrar sistema de autenticação:**
```bash
cat src/lib/indexedDb/useAuthIndexedDb.ts | head -50
```

**Explicar:**
> "O sistema utiliza IndexedDB para armazenar usuários e SHA-256 para hash de senhas. Senhas nunca são armazenadas em texto plano."

4. **Demonstrar login:**
   - Abrir navegador
   - Ir para `/home`
   - Tentar acessar `/dashboard` sem login
   - Mostrar redirecionamento
   - Fazer login
   - Mostrar acesso permitido

5. **Mostrar headers de segurança:**
```bash
cat src/middleware.ts | grep -A 20 "securityHeaders"
```

> "Implementamos múltiplos headers de segurança: X-Frame-Options, Content-Security-Policy, e outros para proteção contra ataques comuns."

6. **Mostrar documentação de segurança:**
```bash
cat docs/security.md | head -100
```

> "Temos documentação completa sobre todas as práticas de segurança implementadas."

---

### **PARTE 5: Funcionalidades Implementadas (5-7 minutos)**

#### O que falar:

> "Agora vou demonstrar todas as funcionalidades implementadas conforme os requisitos do desafio."

#### 5.1 Dashboard com Gráficos (1-2 min)

**O que mostrar:**

1. **Acessar `/dashboard`**
2. **Mostrar gráficos:**
   - Gráfico de evolução do patrimônio
   - Gráfico de gastos por categoria (pizza)
   - Resumo financeiro

**O que falar:**
> "O dashboard inclui gráficos e análises financeiras detalhadas. Temos gráfico de evolução do patrimônio, gráfico de gastos por categoria, e resumo financeiro com comparação mensal."

3. **Mostrar personalização de widgets:**
   - Clicar em configurações
   - Mostrar opções de widgets
   - Ativar/desativar widgets
   - Mostrar que configuração persiste

**O que falar:**
> "Implementamos a funcionalidade Plus de personalização do dashboard. O usuário pode escolher quais widgets exibir, e a configuração é salva no localStorage."

#### 5.2 Listagem de Transações com Filtros (2 min)

**O que mostrar:**

1. **Acessar `/transacoes`**
2. **Mostrar filtros:**
   - Busca por descrição
   - Filtro por tipo (Receita/Despesa)
   - Filtro por categoria
   - Filtro por período

**O que falar:**
> "Implementamos filtros avançados na listagem de transações. O usuário pode buscar por descrição, filtrar por tipo, categoria e período. Os filtros podem ser combinados."

3. **Demonstrar scroll infinito:**
   - Rolar a página
   - Mostrar carregamento automático
   - Mostrar indicador de carregamento

**O que falar:**
> "Implementamos scroll infinito para otimizar o carregamento de grandes volumes de dados. As transações são carregadas automaticamente ao rolar a página, 20 por vez."

#### 5.3 Adicionar/Editar Transação (2-3 min)

**O que mostrar:**

1. **Acessar `/transferencias` ou clicar em "Nova Transação"**
2. **Mostrar validação avançada:**
   - Tentar salvar sem preencher campos
   - Mostrar mensagens de erro
   - Preencher com valor inválido
   - Mostrar validação de valor máximo
   - Tentar data futura
   - Mostrar validação de data

**O que falar:**
> "Implementamos validação avançada em tempo real. O sistema valida descrição, valor, data e outros campos, mostrando mensagens de erro imediatamente."

3. **Mostrar sugestões automáticas de categorias:**
   - Digitar "restaurante" na descrição
   - Mostrar sugestão de categoria "Alimentação"
   - Digitar "uber" na descrição
   - Mostrar sugestão de categoria "Transporte"

**O que falar:**
> "O sistema sugere automaticamente categorias baseado na descrição. Por exemplo, se digitar 'restaurante', sugere 'Alimentação'. Isso melhora a experiência do usuário."

4. **Mostrar upload de anexos:**
   - Clicar em "Anexar arquivo"
   - Selecionar uma imagem
   - Mostrar preview
   - Mostrar validação de tamanho
   - Tentar upload de arquivo muito grande
   - Mostrar mensagem de erro

**O que falar:**
> "Implementamos upload de anexos para recibos e documentos. O sistema suporta imagens e PDFs, com tamanho máximo de 5MB, e mostra preview de imagens."

5. **Salvar transação:**
   - Preencher formulário completo
   - Salvar
   - Mostrar toast de sucesso
   - Verificar que aparece na listagem

#### 5.4 Editar Transação (1 min)

**O que mostrar:**

1. **Na listagem de transações, clicar em editar**
2. **Mostrar modal de edição pré-preenchido**
3. **Editar alguns campos**
4. **Salvar**
5. **Verificar atualização**

**O que falar:**
> "O sistema permite editar transações existentes. O formulário vem pré-preenchido com os dados atuais, e as mesmas validações se aplicam."

---

### **PARTE 6: Docker e Deploy (2-3 minutos)**

#### O que falar:

> "Agora vou mostrar a containerização com Docker e o deploy em cloud."

#### O que mostrar:

1. **Mostrar Dockerfile:**
```bash
cat Dockerfile
```

**Explicar:**
> "Utilizamos multi-stage build para otimizar a imagem Docker. A imagem final contém apenas os arquivos necessários para produção."

2. **Mostrar docker-compose.yml:**
```bash
cat docker-compose.yml
```

**Explicar:**
> "O Docker Compose facilita a orquestração. Com um único comando, podemos subir toda a aplicação."

3. **Demonstrar build e execução (opcional):**
```bash
# Se tiver tempo, mostrar build
docker build -t tech-challenge-financial .

# Ou mostrar docker-compose
docker-compose up -d
```

4. **Mostrar deploy na Vercel:**
   - Abrir Vercel dashboard (ou mostrar screenshot)
   - Mostrar configuração do projeto
   - Mostrar URL de produção

**O que falar:**
> "O projeto está deployado na Vercel, plataforma recomendada para Next.js. O deploy é automático a cada push no repositório, e a Vercel fornece HTTPS, CDN global e proteção DDoS automaticamente."

5. **Mostrar documentação de deploy:**
```bash
cat docs/vercel.md | head -50
```

> "Temos documentação completa sobre o processo de deploy."

---

### **PARTE 7: Conclusão (1 minuto)**

#### O que falar:

> "Para concluir, o projeto Tech Challenge Financial implementa com sucesso todos os requisitos solicitados:
> 
> ✅ Dashboard com gráficos e personalização de widgets
> ✅ Filtros avançados e scroll infinito na listagem de transações
> ✅ Validação avançada, sugestões automáticas e upload de anexos
> ✅ Arquitetura modular preparada para microfrontends
> ✅ Autenticação e autorização com múltiplas camadas de segurança
> ✅ Containerização com Docker
> ✅ Deploy em cloud na Vercel
> 
> O código está disponível no repositório Git, e toda a documentação está na pasta `docs/`.
> 
> Obrigado por assistir!"

---

## 📝 Dicas para Gravação

### Dicas Técnicas

1. **Resolução de Tela:**
   - Use 1920x1080 para melhor qualidade
   - Aumente o tamanho da fonte no editor (18-20px)

2. **Velocidade de Demonstração:**
   - Vá devagar, mas não muito devagar
   - Pause entre seções
   - Explique o que está fazendo

3. **Áudio:**
   - Use um microfone de boa qualidade
   - Grave em ambiente silencioso
   - Teste o áudio antes de começar

4. **Edição:**
   - Corte pausas longas
   - Adicione legendas se necessário
   - Adicione zoom em partes importantes

### Dicas de Apresentação

1. **Fale claramente:**
   - Articule bem as palavras
   - Use tom de voz entusiasmado
   - Varie a entonação

2. **Seja objetivo:**
   - Não fique repetindo informações
   - Vá direto ao ponto
   - Mostre código quando relevante

3. **Demonstre confiança:**
   - Pratique antes de gravar
   - Conheça bem o projeto
   - Esteja preparado para imprevistos

4. **Interaja com o código:**
   - Aponte elementos na tela
   - Use cursor para destacar partes importantes
   - Mostre o que está acontecendo

---

## 🎯 Checklist Final Antes de Enviar

- [ ] Vídeo tem duração adequada (15-20 minutos)
- [ ] Áudio está claro e sem ruídos
- [ ] Todas as funcionalidades foram demonstradas
- [ ] Arquitetura de microfrontends foi explicada
- [ ] Autenticação e autorização foram demonstradas
- [ ] Docker foi mencionado (ou demonstrado)
- [ ] Deploy em cloud foi mencionado (ou demonstrado)
- [ ] Código está legível na gravação
- [ ] Vídeo está no formato solicitado
- [ ] Link do repositório está disponível

---

## 📚 Recursos Adicionais

### Documentação para Consulta Durante Gravação

- `README.md` - Visão geral do projeto
- `docs/apresentacao.md` - Apresentação completa
- `docs/microfrontends.md` - Arquitetura de microfrontends
- `docs/security.md` - Segurança e autenticação
- `docs/vercel.md` - Deploy na Vercel
- `docs/docker.md` - Docker e containerização

### Comandos Úteis

```bash
# Iniciar projeto
npm run dev

# Build
npm run build

# Docker
docker-compose up -d
docker-compose logs -f

# Ver estrutura
tree src/modules -L 2
ls -la src/components/ui/
```

---

**Boa sorte com a gravação!** 🎥🚀
