# ⚡ Quick Start - Docker

Guia rápido para executar o projeto com Docker.

## 🚀 Execução em 3 Passos

### 1. Subir os containers

```bash
docker-compose up -d
```

### 2. Verificar se está rodando

```bash
docker-compose ps
```

### 3. Acessar a aplicação

Abra no navegador: **http://localhost:3000**

## 📝 Comandos Essenciais

| Comando | Descrição |
|---------|-----------|
| `docker-compose up -d` | Inicia os containers em background |
| `docker-compose down` | Para e remove os containers |
| `docker-compose logs -f` | Ver logs em tempo real |
| `docker-compose restart` | Reinicia os containers |
| `docker-compose up -d --build` | Reconstroi e inicia |

## 🔍 Verificar Logs

```bash
docker-compose logs -f app
```

## 🛑 Parar a Aplicação

```bash
docker-compose down
```

## 🔄 Reconstruir após Mudanças

```bash
docker-compose up -d --build
```

## ❓ Problemas?

- **Porta ocupada?** Altere a porta no `docker-compose.yml`
- **Erro no build?** Execute: `docker-compose build --no-cache`
- **Container não inicia?** Verifique logs: `docker-compose logs app`

Para mais detalhes, consulte o [Guia Completo de Docker](./docker.md).
