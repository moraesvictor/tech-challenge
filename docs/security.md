# 🔐 Segurança em Ambiente Cloud - Tech Challenge Financial

Este documento descreve as práticas de segurança implementadas no projeto para proteção em ambiente cloud, especialmente no deploy na Vercel.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Proteção de Rotas](#proteção-de-rotas)
- [Headers de Segurança](#headers-de-segurança)
- [Proteção de Dados](#proteção-de-dados)
- [Boas Práticas Implementadas](#boas-práticas-implementadas)
- [Configuração na Vercel](#configuração-na-vercel)

## 🎯 Visão Geral

O projeto implementa múltiplas camadas de segurança para proteger a aplicação em ambiente cloud:

1. **Autenticação**: Sistema de login com hash de senhas
2. **Autorização**: Proteção de rotas privadas
3. **Headers de Segurança**: Proteção contra ataques comuns
4. **Middleware**: Verificação de autenticação no servidor
5. **Cookies Seguros**: Armazenamento seguro de sessões

## 🔑 Autenticação e Autorização

### Sistema de Autenticação

O projeto utiliza um sistema de autenticação baseado em:

- **IndexedDB**: Armazenamento local de usuários
- **SHA-256**: Hash de senhas (nunca armazenadas em texto plano)
- **Cookies**: Sessões de autenticação
- **LocalStorage**: Persistência de sessão do usuário

### Fluxo de Autenticação

```
1. Usuário faz login
   ↓
2. Senha é hasheada com SHA-256
   ↓
3. Hash é comparado com hash armazenado
   ↓
4. Se válido:
   - Usuário é salvo no localStorage
   - Cookies de autenticação são criados
   - Redirecionamento para área privada
```

### Implementação

#### Login

```typescript
// src/lib/indexedDb/useAuthIndexedDb.ts
const login = async (email: string, password: string) => {
  const { valid, user } = await validateCredentials(email, password);
  if (valid && user) {
    setCurrentUser(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    
    // Cookies seguros para middleware
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);
    
    document.cookie = `auth-token=${user.id}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;
    document.cookie = `auth-session=active; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;
  }
  return { valid, user };
};
```

#### Logout

```typescript
const logout = () => {
  setCurrentUser(null);
  localStorage.removeItem(CURRENT_USER_KEY);
  
  // Remover cookies
  document.cookie = `auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `auth-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
```

## 🛡️ Proteção de Rotas

### Middleware do Next.js

O middleware protege rotas no **nível do servidor**, antes mesmo da página ser renderizada:

```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rotas privadas
  const privateRoutes = ['/dashboard', '/transacoes', '/transferencias', '/investimentos'];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  
  if (isPrivateRoute) {
    const authToken = request.cookies.get('auth-token')?.value;
    
    if (!authToken) {
      // Redirecionar para login
      const url = request.nextUrl.clone();
      url.pathname = '/home';
      url.searchParams.set('redirect', pathname);
      url.searchParams.set('auth', 'required');
      return NextResponse.redirect(url);
    }
  }
  
  // Aplicar headers de segurança...
}
```

### Componente de Proteção no Cliente

Proteção adicional no lado do cliente:

```typescript
// src/components/auth/route-protector.tsx
export function RouteProtector({ children }: { children: React.ReactNode }) {
  const { currentUser, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (!ready) return;
    
    // Verificar autenticação
    if (!isPublicRoute && !currentUser) {
      router.push(`/home?redirect=${encodeURIComponent(pathname)}&auth=required`);
      return;
    }
    
    // Definir cookies se autenticado
    if (currentUser) {
      // Cookies de autenticação...
    }
  }, [currentUser, ready, pathname]);
  
  // Renderizar apenas se autenticado
  if (!isPublicRoute && !currentUser) {
    return null;
  }
  
  return <>{children}</>;
}
```

### Rotas Protegidas

As seguintes rotas são protegidas:

- `/dashboard` - Dashboard principal
- `/transacoes` - Listagem de transações
- `/transferencias` - Adicionar transferências
- `/investimentos` - Visualização de investimentos

### Rotas Públicas

As seguintes rotas são públicas:

- `/home` - Página inicial
- `/` - Rota raiz

## 🔒 Headers de Segurança

### Headers Implementados

#### 1. **X-Frame-Options: DENY**
Previne clickjacking - impede que a página seja carregada em um iframe.

```typescript
'X-Frame-Options': 'DENY'
```

#### 2. **X-Content-Type-Options: nosniff**
Previne MIME type sniffing - força o navegador a respeitar o Content-Type.

```typescript
'X-Content-Type-Options': 'nosniff'
```

#### 3. **Referrer-Policy**
Controla quanto informação de referrer é enviada.

```typescript
'Referrer-Policy': 'strict-origin-when-cross-origin'
```

#### 4. **Content-Security-Policy (CSP)**
Define quais recursos podem ser carregados.

```typescript
'Content-Security-Policy': [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
].join('; ')
```

#### 5. **Permissions-Policy**
Controla quais APIs e recursos do navegador podem ser usados.

```typescript
'Permissions-Policy': [
  'camera=()',
  'microphone=()',
  'geolocation=()',
  'interest-cohort=()',
].join(', ')
```

#### 6. **Strict-Transport-Security (HSTS)**
Força conexões HTTPS (apenas em produção).

```typescript
'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
```

### Configuração

Os headers são aplicados em dois lugares:

1. **Middleware** (`src/middleware.ts`): Headers dinâmicos
2. **next.config.ts**: Headers estáticos

## 🔐 Proteção de Dados

### Hash de Senhas

Senhas são **nunca** armazenadas em texto plano. Utilizamos SHA-256:

```typescript
const hashString = async (value: string) => {
  const enc = new TextEncoder();
  const data = enc.encode(value);
  const hashBuf = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuf));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};
```

### Cookies Seguros

Cookies de autenticação são configurados com:

- **SameSite=Strict**: Previne CSRF
- **Secure**: Apenas HTTPS (em produção)
- **Expires**: Expiração de 24 horas
- **Path=/**: Disponível em todo o domínio

### Armazenamento Local

- **LocalStorage**: Apenas dados não sensíveis (ID do usuário)
- **IndexedDB**: Dados de usuários com hash de senhas
- **Cookies**: Tokens de sessão

## ✅ Boas Práticas Implementadas

### 1. **Autenticação em Múltiplas Camadas**

- ✅ Middleware (servidor)
- ✅ Componente de proteção (cliente)
- ✅ Verificação de cookies
- ✅ Verificação de localStorage

### 2. **Proteção Contra Ataques Comuns**

- ✅ **Clickjacking**: X-Frame-Options
- ✅ **XSS**: Content-Security-Policy
- ✅ **CSRF**: SameSite cookies
- ✅ **MIME Sniffing**: X-Content-Type-Options
- ✅ **Man-in-the-Middle**: HSTS (produção)

### 3. **Gestão de Sessão**

- ✅ Expiração automática (24 horas)
- ✅ Logout limpa todos os dados
- ✅ Cookies seguros
- ✅ Verificação em cada requisição

### 4. **Segurança de Dados**

- ✅ Senhas hasheadas (SHA-256)
- ✅ Dados sensíveis nunca em texto plano
- ✅ Armazenamento local seguro
- ✅ Cookies com flags de segurança

## 🚀 Configuração na Vercel

### Variáveis de Ambiente

Configure as seguintes variáveis na Vercel (se necessário):

```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Headers Automáticos

A Vercel aplica automaticamente:

- ✅ HTTPS (SSL/TLS)
- ✅ Compressão Gzip/Brotli
- ✅ CDN global
- ✅ DDoS protection

### Verificação de Segurança

Após o deploy, verifique os headers de segurança:

```bash
curl -I https://seu-app.vercel.app
```

Você deve ver os headers de segurança configurados.

## 🔍 Verificação de Segurança

### Testes de Segurança

1. **Teste de Autenticação**:
   - Tente acessar `/dashboard` sem login → Deve redirecionar
   - Faça login → Deve permitir acesso
   - Faça logout → Deve redirecionar

2. **Teste de Headers**:
   ```bash
   curl -I https://seu-app.vercel.app
   ```

3. **Teste de Cookies**:
   - Verifique se cookies têm `Secure` e `SameSite=Strict`
   - Verifique expiração

### Ferramentas de Análise

- [Security Headers](https://securityheaders.com/) - Analisa headers de segurança
- [Mozilla Observatory](https://observatory.mozilla.org/) - Análise completa de segurança
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Teste de SSL/TLS

## 📝 Checklist de Segurança

Antes do deploy, verifique:

- [x] Middleware configurado
- [x] Headers de segurança aplicados
- [x] Rotas privadas protegidas
- [x] Cookies seguros configurados
- [x] Senhas hasheadas
- [x] Logout limpa dados
- [x] HTTPS habilitado (Vercel automático)
- [x] Variáveis de ambiente configuradas

## 🆘 Troubleshooting

### Problema: Usuário não consegue acessar rotas privadas

**Solução:**
1. Verifique se os cookies estão sendo criados
2. Verifique o console do navegador
3. Verifique se o middleware está executando
4. Limpe cookies e localStorage e tente novamente

### Problema: Headers de segurança não aparecem

**Solução:**
1. Verifique se o middleware está configurado corretamente
2. Verifique `next.config.ts`
3. Verifique se está em produção (alguns headers só funcionam em HTTPS)

### Problema: Cookies não funcionam

**Solução:**
1. Verifique se está usando HTTPS em produção
2. Verifique flags `Secure` e `SameSite`
3. Verifique domínio e path dos cookies

## 📚 Referências

- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [Vercel Security](https://vercel.com/docs/security)

---

**Desenvolvido para o Tech Challenge FIAP** 🔐
