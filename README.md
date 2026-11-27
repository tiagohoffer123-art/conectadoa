# ConectaDoa

Sistema de gestão de doações para ONGs. Projeto Integrador Extensionista II (ADS).

Cadastro de doadores, registro de doações com vários itens e login de voluntário.
Roda em ambiente local: frontend com Vite, API com Node.js e Express, banco MySQL ou MariaDB.

## Pré-requisitos

- Node.js 22 ou mais recente
- MySQL 8 ou MariaDB 10.4 (ou mais recentes) rodando na máquina (o XAMPP serve)
- Git

## Como rodar

1. Clone o repositório e entre na pasta:

   ```
   git clone https://github.com/tiagohoffer123-art/conectadoa.git
   cd conectadoa
   ```

2. Instale as dependências:

   ```
   npm install
   ```

3. Crie o banco e os dados de exemplo. No cliente do MySQL (`mysql -u root -p`):

   ```
   SOURCE database/schema.sql;
   SOURCE database/seed.sql;
   ```

   No XAMPP também funciona pelo phpMyAdmin (aba Importar), um arquivo de cada vez, nessa ordem.

4. Copie `.env.example` para `.env` e preencha a senha do banco e o `JWT_SECRET`:

   ```
   cp .env.example .env
   ```

   No Windows (PowerShell): `Copy-Item .env.example .env`

5. Em um terminal, inicie a API:

   ```
   npm run api
   ```

6. Em outro terminal, inicie o frontend:

   ```
   npm run dev
   ```

7. Abra http://localhost:5173 e entre com o usuário de demonstração.

## Usuário de demonstração

| E-mail                 | Senha         |
| ---------------------- | ------------- |
| voluntario@exemplo.com | conectadoa123 |

Para trocar a senha, gere um novo hash com `node server/gerar-hash.js NOVA_SENHA`
e substitua o valor de `senha_hash` no `database/seed.sql`.

## Variáveis de ambiente

| Variável                 | Para que serve                                           |
| ------------------------ | -------------------------------------------------------- |
| `PORT`                   | Porta da API (padrão 3000)                               |
| `DB_HOST`, `DB_PORT`     | Endereço do banco. Use `127.0.0.1` em vez de `localhost` |
| `DB_USER`, `DB_PASSWORD` | Usuário e senha do banco (no XAMPP: `root` e vazio)      |
| `DB_NAME`                | Nome do banco (`conectadoa`)                             |
| `JWT_SECRET`             | Segredo que assina os tokens de login                    |
| `JWT_EXPIRES_IN`         | Validade do token (padrão `8h`)                          |

## Rotas da API

| Método           | Rota              | Token? |
| ---------------- | ----------------- | ------ |
| GET              | /api/health       | não    |
| POST             | /api/auth/login   | não    |
| GET, POST        | /api/doadores     | sim    |
| GET, PUT, DELETE | /api/doadores/:id | sim    |
| GET              | /api/itens        | sim    |
| GET, POST        | /api/doacoes      | sim    |

Sem token, as rotas protegidas respondem `401`. Testes manuais em `api.http`
(extensão REST Client do VS Code).

## Backup do banco

```
mysqldump -u root -p conectadoa > backup.sql
```

Para restaurar: `mysql -u root -p conectadoa < backup.sql`
(no PowerShell: `Get-Content backup.sql | mysql -u root -p conectadoa`).

## Estrutura

```
database/   schema.sql e seed.sql
server/     API Express (index.js, db.js, auth.js, validacao.js, routes/)
src/        frontend (main.js, api.js, ui.js, pages/, style.css)
```
