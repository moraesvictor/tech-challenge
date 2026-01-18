# 🐳 Guia de Execução com Docker

Este guia explica como executar o projeto Tech Challenge Financial usando Docker e Docker Compose.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Docker** 20.10 ou superior
- **Docker Compose** 2.0 ou superior

### Verificar Instalação

```bash
docker --version
docker-compose --version
```

Se não tiver instalado, consulte a [documentação oficial do Docker](https://docs.docker.com/get-docker/).

## 🚀 Execução Rápida

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd tech-challange-financial
```

### 2. Execute com Docker Compose

```bash
docker-compose up -d
```

Este comando irá:
- Construir a imagem Docker da aplicação
- Criar e iniciar o container
- Expor a aplicação na porta 3000

### 3. Acesse a Aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

## 📖 Comandos Úteis

### Ver Logs da Aplicação

```bash
docker-compose logs -f
```

Para ver apenas os logs do serviço `app`:
```bash
docker-compose logs -f app
```

### Parar os Containers

```bash
docker-compose down
```

### Parar e Remover Volumes

```bash
docker-compose down -v
```

### Reconstruir a Imagem

Se você fez alterações no código e precisa reconstruir a imagem:

```bash
docker-compose up -d --build
```

### Executar em Modo Detached (Background)

```bash
docker-compose up -d
```

### Ver Status dos Containers

```bash
docker-compose ps
```

### Acessar o Container

Para acessar o shell do container:

```bash
docker-compose exec app sh
```

## 🔧 Execução Manual com Docker

Se preferir não usar Docker Compose, você pode executar manualmente:

### 1. Construir a Imagem

```bash
docker build -t tech-challenge-financial .
```

### 2. Executar o Container

```bash
docker run -d \
  --name tech-challenge-financial \
  -p 3000:3000 \
  tech-challenge-financial
```

### 3. Ver Logs

```bash
docker logs -f tech-challenge-financial
```

### 4. Parar e Remover

```bash
docker stop tech-challenge-financial
docker rm tech-challenge-financial
```

## 🏗️ Estrutura do Dockerfile

O Dockerfile utiliza uma estratégia de **multi-stage build** para otimizar o tamanho da imagem final:

1. **Stage `deps`**: Instala apenas as dependências do projeto
2. **Stage `builder`**: Constrói a aplicação Next.js
3. **Stage `runner`**: Cria a imagem final de produção com apenas os arquivos necessários

### Otimizações Implementadas

- Uso de `node:20-alpine` para imagem base menor
- Build standalone do Next.js para reduzir tamanho
- Usuário não-root para segurança
- Variáveis de ambiente otimizadas

## 🔍 Troubleshooting

### Porta 3000 já está em uso

Se a porta 3000 já estiver em uso, você pode alterar a porta no `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Altere 3001 para a porta desejada
```

### Erro ao construir a imagem

Se encontrar erros durante o build:

1. Verifique se o Docker está rodando:
   ```bash
   docker info
   ```

2. Limpe o cache do Docker:
   ```bash
   docker system prune -a
   ```

3. Reconstrua sem cache:
   ```bash
   docker-compose build --no-cache
   ```

### Container para de funcionar

1. Verifique os logs:
   ```bash
   docker-compose logs app
   ```

2. Verifique o status:
   ```bash
   docker-compose ps
   ```

3. Reinicie o container:
   ```bash
   docker-compose restart
   ```

### Problemas de permissão

Se encontrar problemas de permissão no Linux:

```bash
sudo docker-compose up -d
```

Ou adicione seu usuário ao grupo docker:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

## 🌐 Deploy em Produção

### Variáveis de Ambiente

Para produção, você pode criar um arquivo `.env` ou definir variáveis no `docker-compose.yml`:

```yaml
services:
  app:
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
      - PORT=3000
```

### Usando Docker Compose para Produção

Crie um arquivo `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: tech-challenge-financial-prod
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: always
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

Execute com:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Monitoramento

### Ver uso de recursos

```bash
docker stats tech-challenge-financial
```

### Inspecionar o container

```bash
docker inspect tech-challenge-financial
```

## 🔐 Segurança

- A aplicação roda como usuário `nextjs` (não root)
- Portas expostas apenas quando necessário
- Variáveis de ambiente para configurações sensíveis
- Build otimizado para reduzir superfície de ataque

## 📝 Notas Importantes

1. **Dados Mockados**: Os dados são gerados dinamicamente e não persistem entre reinicializações do container (exceto dados do usuário no IndexedDB do navegador).

2. **Hot Reload**: Em desenvolvimento, use `npm run dev` localmente. O Docker é otimizado para produção.

3. **Build Time**: O primeiro build pode levar alguns minutos. Builds subsequentes serão mais rápidos devido ao cache do Docker.

4. **Espaço em Disco**: Certifique-se de ter pelo menos 1GB de espaço livre para a imagem Docker.

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs: `docker-compose logs -f`
2. Consulte a documentação do Docker: https://docs.docker.com/
3. Verifique issues no repositório do projeto

## 📚 Referências

- [Documentação do Docker](https://docs.docker.com/)
- [Documentação do Docker Compose](https://docs.docker.com/compose/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
