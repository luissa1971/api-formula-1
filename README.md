# 🏎️ API Fórmula 1 — Node.js + Fastify + TypeScript

Desafio de Projeto da **DIO (Digital Innovation One)**, baseado no repositório [node-formula-1](https://github.com/digitalinnovationone/node-formula-1).

O projeto original disponibilizava apenas rotas de leitura (GET). Nesta versão, o projeto foi **replicado e melhorado** com um **CRUD completo** (Create, Read, Update e Delete) para equipes e pilotos de Fórmula 1, mantendo a proposta de uma API leve, rápida e minimalista.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/) (v20+)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/) — framework web focado em performance
- [@fastify/cors](https://www.npmjs.com/package/@fastify/cors) — habilita CORS
- [tsx](https://www.npmjs.com/package/tsx) — executa TypeScript diretamente no Node
- [tsup](https://www.npmjs.com/package/tsup) — bundler para gerar a versão de produção

## ✨ Melhorias em relação ao projeto original

- CRUD completo para `/teams` e `/drivers` (POST, PUT e DELETE, além dos GET originais)
- Validação de corpo da requisição com retorno `400 Bad Request` quando faltam campos obrigatórios
- Correção do bug de IDs duplicados na lista de pilotos do projeto original
- Geração automática de ID para novos registros
- Porta configurável via variável de ambiente (`.env`)
- Tipagem das entidades (`Team` e `Driver`) com interfaces TypeScript

## 📦 Como executar

```bash
# Clone este repositório
git clone https://github.com/SEU-USUARIO/api-formula-1.git

# Entre na pasta
cd api-formula-1

# Instale as dependências
npm install

# Rode em modo de desenvolvimento (com reload automático)
npm run start:watch
```

O servidor sobe em `http://localhost:3333` (porta configurável no arquivo `.env`).

### Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `npm run start:dev` | Executa o servidor em modo desenvolvimento |
| `npm run start:watch` | Executa com reload automático a cada alteração |
| `npm run dist` | Compila o TypeScript para a pasta `dist/` |
| `npm run start:dist` | Compila e executa a versão de produção |

## 🔗 Rotas da API

### Equipes (`/teams`)

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/teams` | Lista todas as equipes |
| GET | `/teams/:id` | Busca uma equipe pelo ID |
| POST | `/teams` | Cadastra uma nova equipe |
| PUT | `/teams/:id` | Atualiza uma equipe existente |
| DELETE | `/teams/:id` | Remove uma equipe |

### Pilotos (`/drivers`)

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/drivers` | Lista todos os pilotos |
| GET | `/drivers/:id` | Busca um piloto pelo ID |
| POST | `/drivers` | Cadastra um novo piloto |
| PUT | `/drivers/:id` | Atualiza um piloto existente |
| DELETE | `/drivers/:id` | Remove um piloto |

### Exemplos de uso

```bash
# Listar equipes
curl http://localhost:3333/teams

# Cadastrar um piloto
curl -X POST http://localhost:3333/drivers \
  -H "Content-Type: application/json" \
  -d '{"name": "Ayrton Senna", "team": "McLaren"}'

# Atualizar o piloto de id 4
curl -X PUT http://localhost:3333/drivers/4 \
  -H "Content-Type: application/json" \
  -d '{"team": "Williams"}'

# Remover o piloto de id 4
curl -X DELETE http://localhost:3333/drivers/4
```

### Códigos de resposta

- `200 OK` — operação realizada com sucesso
- `201 Created` — recurso criado com sucesso
- `400 Bad Request` — corpo da requisição inválido ou incompleto
- `404 Not Found` — recurso não encontrado

## 🧠 Passo a passo da execução do desafio

1. Análise do projeto base da DIO (`node-formula-1`) para entender a estrutura: TypeScript + Fastify com dados em memória e rotas GET
2. Criação do repositório próprio com a mesma base de configuração (`tsconfig.json`, scripts com `tsx` e `tsup`)
3. Implementação do CRUD completo para as entidades `Team` e `Driver`
4. Adição de validações, tratamento de erros (404/400) e geração automática de IDs
5. Testes manuais de todas as rotas com `curl` (leitura, criação, atualização, remoção e casos de erro)
6. Elaboração deste README com a documentação da API

## 📌 Observações

- Os dados são armazenados **em memória**, ou seja, são reiniciados a cada restart do servidor. Uma evolução natural do projeto seria persistir os dados em um banco (SQLite, PostgreSQL etc.)
- Projeto desenvolvido para fins de estudo como parte da formação Node.js da DIO

---

Feito com dedicação por **Luis** 🏁
