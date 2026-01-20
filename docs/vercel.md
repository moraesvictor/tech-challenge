# 🚀 Guia de Deploy na Vercel

Este guia explica como fazer o deploy do projeto Tech Challenge Financial na Vercel, plataforma recomendada para aplicações Next.js.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- **Conta na Vercel** - Crie em [vercel.com](https://vercel.com)
- **Repositório Git** - Projeto versionado no GitHub, GitLab ou Bitbucket
- **Node.js 20.x** - Para testes locais (opcional)

## 🎯 Por que Vercel?

A Vercel é a plataforma recomendada para projetos Next.js porque:

- ✅ **Integração Nativa**: Otimizações automáticas para Next.js
- ✅ **Deploy Automático**: Deploy a cada push no repositório
- ✅ **Preview Deployments**: Preview para cada Pull Request
- ✅ **Edge Network**: CDN global para performance máxima
- ✅ **SSL Automático**: Certificados HTTPS gratuitos
- ✅ **Zero Config**: Detecta Next.js automaticamente

## 🚀 Deploy Rápido

### Opção 1: Via Interface Web (Recomendado)

#### Passo 1: Conectar Repositório

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"** ou **"Import Project"**
3. Conecte seu repositório (GitHub/GitLab/Bitbucket)
4. Selecione o repositório do projeto

#### Passo 2: Configurar Projeto

A Vercel detecta automaticamente projetos Next.js. Verifique as configurações:

- **Framework Preset**: `Next.js` (detectado automaticamente)
- **Root Directory**: `./` (raiz do projeto)
- **Build Command**: `npm run build` (ou deixe vazio para usar padrão)
- **Output Directory**: `.next` (padrão do Next.js)
- **Install Command**: `npm install` (ou deixe vazio)

#### Passo 3: Variáveis de Ambiente (Opcional)

Se necessário, adicione variáveis de ambiente em **Environment Variables**:

```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

#### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (geralmente 2-5 minutos)
3. Acesse a URL fornecida pela Vercel

### Opção 2: Via CLI

#### Instalação da CLI

```bash
npm i -g vercel
```

#### Login

```bash
vercel login
```

Siga as instruções no terminal para autenticar.

#### Deploy de Produção

```bash
# Na raiz do projeto
vercel --prod
```

#### Deploy de Preview

```bash
# Deploy de preview (para testar antes de produção)
vercel
```

## 🔧 Configurações do Projeto

### Arquivo `next.config.ts`

O projeto já está configurado para funcionar tanto na Vercel quanto no Docker:

```typescript
const nextConfig: NextConfig = {
  // Standalone apenas para Docker, não para Vercel
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  // ... outras configurações
};
```

A configuração detecta automaticamente se está rodando na Vercel e ajusta o build accordingly.

### Arquivo `.vercelignore`

O arquivo `.vercelignore` foi criado para ignorar arquivos desnecessários no deploy:

```
node_modules
.next
.git
.env.local
docker-compose.yml
Dockerfile
docs
```

## 📊 Deploy Automático

### Deploy Contínuo

A Vercel faz deploy automático:

- **Branch Principal** (`main`/`master`): Deploy de produção
- **Outras Branches**: Deploy de preview
- **Pull Requests**: Deploy de preview com URL única

### Configurar Branch de Produção

1. Vá em **Settings** → **Git**
2. Selecione a branch de produção (geralmente `main` ou `master`)
3. Salve as alterações

## 🌐 Domínio Personalizado

### Adicionar Domínio

1. Vá em **Settings** → **Domains**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `app.seudominio.com`)
4. Siga as instruções de DNS

### Configuração DNS

A Vercel fornecerá instruções específicas. Geralmente:

- **Tipo**: `CNAME`
- **Nome**: `@` ou subdomínio
- **Valor**: `cname.vercel-dns.com`

## 🔍 Monitoramento e Logs

### Ver Logs do Deploy

1. Acesse o projeto na Vercel
2. Vá em **Deployments**
3. Clique no deployment desejado
4. Veja os logs do build e runtime

### Via CLI

```bash
# Ver logs de um deployment
vercel logs [deployment-url]

# Ver logs em tempo real
vercel logs --follow
```

## 🐛 Troubleshooting

### Erro: Build Failed

**Solução:**
1. Verifique os logs do build na Vercel
2. Teste localmente: `npm run build`
3. Verifique se todas as dependências estão em `package.json`
4. Certifique-se de que o Node.js está na versão correta (20.x)

### Erro: Module Not Found

**Solução:**
1. Verifique se todas as dependências estão instaladas
2. Execute `npm install` localmente para validar
3. Verifique se não há imports de arquivos que não existem

### Imagens Não Carregam

**Solução:**
1. Verifique `remotePatterns` no `next.config.ts`
2. Adicione os domínios necessários em `images.remotePatterns`
3. Certifique-se de usar `next/image` para otimização

### Erro: Standalone Output

**Solução:**
O arquivo `next.config.ts` já está configurado para detectar a Vercel automaticamente. Se ainda houver problemas:

1. Verifique se `process.env.VERCEL` está sendo detectado
2. Remova manualmente `output: "standalone"` se necessário

### Performance Lenta

**Solução:**
1. Verifique se está usando `next/image` para imagens
2. Use `next/link` para navegação
3. Implemente lazy loading onde apropriado
4. Verifique o uso de recursos na dashboard da Vercel

## 📈 Otimizações Automáticas

A Vercel aplica automaticamente:

- ✅ **Image Optimization**: Otimização automática de imagens via `next/image`
- ✅ **Font Optimization**: Otimização de fontes do Google Fonts
- ✅ **Code Splitting**: Divisão automática de código
- ✅ **Edge Caching**: Cache na edge network global
- ✅ **Compression**: Compressão Gzip/Brotli automática

## 🔐 Segurança

### Variáveis de Ambiente Sensíveis

1. Vá em **Settings** → **Environment Variables**
2. Adicione variáveis sensíveis (nunca commite no Git)
3. Configure para quais ambientes aplicar (Production, Preview, Development)

### Headers de Segurança

A Vercel aplica headers de segurança automaticamente. Para customizar, use `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};
```

## 🎯 Integração com Microfrontends (Futuro)

Quando implementar arquitetura de microfrontends:

### Module Federation

1. Instale dependências:
```bash
npm install @module-federation/nextjs-mf
```

2. Configure no `next.config.ts`:
```typescript
const ModuleFederationPlugin = require('@module-federation/nextjs-mf');

const nextConfig = {
  webpack: (config, options) => {
    config.plugins.push(
      new ModuleFederationPlugin({
        name: 'host',
        remotes: {
          // Conectar microfrontends remotos
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      })
    );
    return config;
  },
};
```

3. Deploy cada microfrontend separadamente na Vercel
4. Configure URLs dos remotes no host

## 📝 Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] Build local funciona: `npm run build`
- [ ] Testes passam (se houver)
- [ ] Variáveis de ambiente configuradas
- [ ] `.vercelignore` criado
- [ ] `next.config.ts` ajustado para Vercel
- [ ] Repositório conectado na Vercel
- [ ] Branch de produção configurada
- [ ] Domínio personalizado configurado (se aplicável)

## 🆘 Suporte

### Recursos da Vercel

- [Documentação Oficial](https://vercel.com/docs)
- [Next.js na Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Troubleshooting Guide](https://vercel.com/docs/troubleshooting)

### Comandos Úteis

```bash
# Deploy de produção
vercel --prod

# Deploy de preview
vercel

# Ver logs
vercel logs

# Listar projetos
vercel ls

# Remover projeto
vercel remove
```

## 📚 Referências

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI](https://vercel.com/docs/cli)

---

**Desenvolvido para o Tech Challenge FIAP** 🚀
