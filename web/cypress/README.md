# Projeto de Testes Automatizados — WebDojo

Documentação completa do projeto de testes automatizados com Cypress para a aplicação **WebDojo**, plataforma de treinamento exclusiva do curso **Ninja do Cypress** by Fernando Papito.

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Cypress](#configuração-do-cypress)
- [Como Executar os Testes](#como-executar-os-testes)
- [Cenários de Teste](#cenários-de-teste)
- [Comandos Customizados](#comandos-customizados)
- [Actions](#actions)
- [Fixtures](#fixtures)
- [Utilitários](#utilitários)
- [Infraestrutura Docker](#infraestrutura-docker)

---

## Sobre o Projeto

O **WebDojo** é uma aplicação web desenvolvida como campo de treinamento para testes automatizados com Cypress. Este repositório contém os testes E2E (end-to-end) que cobrem os principais fluxos da aplicação, incluindo autenticação, formulários complexos, manipulação de tabelas, integração com APIs externas e interações avançadas no DOM.

A aplicação é uma SPA (Single Page Application) servida localmente na porta `3000`, construída com Vite e servida via pacote `serve`.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [Cypress](https://www.cypress.io/) | ^15.15.0 | Framework principal de testes E2E |
| [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) | ^1.15.0 | Simulação de eventos reais do navegador (hover, drag) |
| [serve](https://github.com/vercel/serve) | ^14.2.4 | Servidor HTTP para a aplicação compilada |
| Node.js | 22+ | Runtime JavaScript |
| Yarn | 1.22.22+ | Gerenciador de pacotes |
| Docker & Docker Compose | — | Banco de dados PostgreSQL em container |

---

## Pré-requisitos

Antes de executar os testes, certifique-se de ter instalado:

- **Node.js** v22 ou superior
- **Yarn** v1.22+
- **Docker** e **Docker Compose** (para infraestrutura de banco de dados)
- **Git**

Instale as dependências do projeto:

```bash
cd web
yarn install
```

Inicie o servidor da aplicação:

```bash
yarn dev
```

> A aplicação estará disponível em `http://localhost:3000`.

---

## Estrutura do Projeto

```
webdojo/
├── api/                          # Placeholder da API (reservado)
├── web/                          # Aplicação web + testes
│   ├── dist/                     # Build da SPA (pré-compilado com Vite)
│   ├── cypress/
│   │   ├── e2e/                  # Especificações de teste (10 arquivos)
│   │   │   ├── alert.cy.js
│   │   │   ├── cep.cy.js
│   │   │   ├── consultancy.cy.js
│   │   │   ├── github.cy.js
│   │   │   ├── hover.cy.js
│   │   │   ├── iFrame.cy.js
│   │   │   ├── kanban.cy.js
│   │   │   ├── link.cy.js
│   │   │   ├── login.cy.js
│   │   │   └── upload.cy.js
│   │   ├── fixtures/             # Dados de teste (JSON + PDF)
│   │   │   ├── cep.json
│   │   │   ├── consultancy.json
│   │   │   ├── document.pdf
│   │   │   └── github.json
│   │   ├── support/
│   │   │   ├── actions/          # Comandos de ação reutilizáveis
│   │   │   │   ├── consultancy.actions.js
│   │   │   │   └── github.actions.js
│   │   │   ├── commands.js       # Comandos customizados globais
│   │   │   ├── e2e.js            # Ponto de entrada do suporte E2E
│   │   │   └── utils.js          # Funções utilitárias
│   │   ├── screenshots/          # Capturas geradas automaticamente
│   │   ├── videos/               # Vídeos gerados automaticamente
│   │   └── downloads/            # Arquivos baixados durante os testes
│   ├── cypress.config.js         # Configuração principal do Cypress
│   └── package.json
├── docker-compose.yaml           # Serviços PostgreSQL e PgAdmin
└── README.md
```

---

## Configuração do Cypress

**Arquivo:** `web/cypress.config.js`

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  env: {
    username: 'papito@webdojo.com',
    password: 'katana123'
  },

  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: false
  },
});
```

| Configuração | Valor | Descrição |
|---|---|---|
| `baseUrl` | `http://localhost:3000` | URL base da aplicação |
| `viewportWidth` | `1440` | Largura padrão da viewport (desktop) |
| `viewportHeight` | `900` | Altura padrão da viewport (desktop) |
| `video` | `false` | Gravação de vídeo desativada |
| `env.username` | `papito@webdojo.com` | Credencial de login dos testes |
| `env.password` | `katana123` | Senha de login dos testes |
| `allowCypressEnv` | `false` | Bloqueia sobrescrita de variáveis via `CYPRESS_*` |

---

## Como Executar os Testes

### Abrir o Cypress Test Runner (modo interativo)

```bash
cd web
npx cypress open
```

### Executar todos os testes em modo headless (Chrome)

```bash
cd web
yarn test
# ou
npx cypress run --browser chrome
```

### Executar suite específica

```bash
# Apenas testes de login
yarn test:login

# Apenas testes de login em viewport mobile (iPhone XR)
yarn test:login:mobile
```

### Executar spec individual

```bash
npx cypress run --spec cypress/e2e/github.cy.js
```

---

## Cenários de Teste

### `login.cy.js` — Autenticação

> Viewport configurado para iPhone XR (414x896) em todos os cenários.

| # | Cenário | Tipo |
|---|---|---|
| 1 | Deve logar com sucesso | Positivo |
| 2 | Não deve logar com senha inválida | Negativo |
| 3 | Não deve logar com email inválido | Negativo |

**Validações do cenário de sucesso:**
- Nome do usuário exibido: `"Fernando Papito"`
- Mensagem de boas-vindas em pt-BR
- Cookie `login_date` presente com data formatada (`dd/mm/aaaa`)
- Token no `localStorage` validado com regex: `/^[a-f0-9]{32}$/`

---

### `alert.cy.js` — Alertas JavaScript

| # | Cenário | Tipo |
|---|---|---|
| 1 | Deve validar o texto do alert box | Positivo |
| 2 | Deve confirmar o dialog com OK | Positivo |
| 3 | Deve cancelar o dialog | Positivo |
| 4 | Deve interagir com prompt (skipped) | — |

**Mensagens validadas:**
- Alert: `"Olá QA, eu sou um Alert Box!"`
- Confirm OK: `"Você clicou em Ok!"`
- Confirm Cancel: `"Você cancelou!"`

---

### `cep.cy.js` — Consulta de CEP

| # | Cenário | Tipo |
|---|---|---|
| 1 | Deve validar a consulta do CEP | Positivo (com mock) |

**Estratégia:** Intercepta a chamada real à API `viacep.com.br` e retorna dados mockados via `cy.intercept()`.

**Dados do fixture (`cep.json`):**

```json
{
  "cep": "04534011",
  "street": "Rua Joaquim Floriano",
  "neighborhood": "Itaim Bibi",
  "city": "São Paulo",
  "state": "SP"
}
```

---

### `consultancy.cy.js` — Formulário de Consultoria

| # | Cenário | Tipo |
|---|---|---|
| 1 | Deve solicitar consultoria individual | Positivo |
| 2 | Deve solicitar consultoria In Company | Positivo |
| 3 | Deve validar os campos obrigatórios | Negativo |

**Interações cobertas:**
- Inputs de texto (nome, email, telefone)
- Select de tipo de consultoria
- Radio buttons (CPF / CNPJ)
- Checkboxes com seleção aleatória (canais de descoberta)
- Upload de arquivo PDF (`document.pdf`)
- Textarea de descrição
- Campo de tags com seleção aleatória (tecnologias)
- Checkbox de termos de uso

**Validação de erro:** Campos obrigatórios com borda na cor `#f87171` (vermelho Tailwind).

---

### `github.cy.js` — Tabela de Perfis do GitHub

| # | Cenário | Tipo |
|---|---|---|
| 1 | Deve criar um novo perfil no GitHub | Positivo (CRUD - Create) |
| 2 | Deve poder remover um perfil | Positivo (CRUD - Delete) |
| 3 | Deve validar o link do perfil | Positivo |

**Dados do fixture (`github.json`):** 3 usuários cadastrados e validados na tabela.

**Validação de link:**
- `href`: `https://github.com/{username}`
- `target`: `_blank`

---

### `hover.cy.js` — Mouseover

| # | Cenário | Tipo |
|---|---|---|
| 1 | Deve exibir o hover ao passar o mouse sobre o elemento | Positivo |

**Estratégia:** Utiliza `realHover()` da biblioteca `cypress-real-events` para simular eventos reais do browser, sem simulação sintética do Cypress padrão.

**Validação:** Texto `"Isso é Mouseover!"` exibido após o hover no link do Instagram.

---

### `iFrame.cy.js` — Interação com iFrame

| # | Cenário | Tipo |
|---|---|---|
| 1 | Deve poder clicar no video de exemplo | Positivo |

**Estratégia:** Acessa o `contentDocument.body` do iframe identificado pelo atributo `title="Video Player"`, clica no botão play e valida o aparecimento do botão de pause.

---

### `kanban.cy.js` — Drag & Drop

| # | Cenário | Tipo |
|---|---|---|
| 1 | Deve mover uma tarefa de To Do para Done e atualizar o board | Positivo |

**Estratégia:** Drag & Drop nativo HTML5. A tarefa `"Documentar API"` é arrastada da coluna **To Do** para a coluna **Done**.

**Validações:**
- Contador da coluna Done incrementado para `(4)`
- Tarefa `"Documentar API"` presente na coluna Done
- Descrição correta: `"Criar documentação da API com Swagger"`

---

### `link.cy.js` — Validação de Links

| # | Cenário | Tipo |
|---|---|---|
| 1 | Validando o link do Instagram | Positivo |
| 2 | Acessando link do Termo de Uso removendo o target blank | Positivo |

**Estratégia do cenário 2:** Remove o atributo `target` do link via `cy.invoke('removeAttr', 'target')` para evitar abertura em nova aba, permitindo a navegação e validação da página de Termos.

---

## Comandos Customizados

Definidos em `support/commands.js`, disponíveis globalmente via `cy.*`.

### `cy.start()`

Navega para a página inicial da aplicação.

```javascript
cy.start()
// equivale a cy.visit('/')
```

---

### `cy.submitLoginForm(email, password)`

Preenche e submete o formulário de login.

```javascript
cy.submitLoginForm('papito@webdojo.com', 'katana123')
```

---

### `cy.login(ui = false)`

Realiza login de duas formas:

| Modo | Comportamento |
|---|---|
| `ui = false` (padrão) | Login **programático**: insere token no `localStorage` e seta cookie `login_date`. Mais rápido — recomendado para testes que não testam o login em si. |
| `ui = true` | Login via **interface**: usa `cy.submitLoginForm()`. Ideal para testes de autenticação. |

```javascript
cy.login()          // programático (rápido)
cy.login(true)      // via UI
```

---

### `cy.goTo(buttonName, pageTitle)`

Navega para uma seção clicando no botão do menu e valida o título da página.

```javascript
cy.goTo('Formulários', 'Consultoria')
cy.goTo('Tabela', 'Perfis do GitHub')
cy.goTo('Alertas JS', 'JavaScript Alerts')
```

---

## Actions

Módulos de ações reutilizáveis para fluxos complexos, organizados em `support/actions/`.

### `consultancy.actions.js`

#### `cy.fillConsultancyForm(form)`

Preenche o formulário de consultoria completo com os dados do objeto `form`.

**Campos preenchidos:**
- `form.name` — nome
- `form.email` — email
- `form.phone` — telefone
- `form.type` — tipo de consultoria (select)
- `form.personType` — tipo de pessoa (radio: CPF / CNPJ)
- `form.document` — número do documento (CPF ou CNPJ)
- Canais de descoberta — seleção aleatória via `getDiscoveryChannels()`
- Upload do arquivo `document.pdf`
- `form.description` — descrição (textarea)
- Tecnologias — seleção aleatória via `getTechs()`
- Termos de uso — checkbox

#### `cy.submitConsultancyForm()`

Clica no botão `"Enviar formulário"`.

#### `cy.validateConsultacyModal()`

Valida o modal de sucesso com timeout de 7 segundos.

```
"Sua solicitação de consultoria foi enviada com sucesso!
 Em breve, nossa equipe entrará em contato através do email fornecido."
```

---

### `github.actions.js`

#### `cy.FillUserForm(form)`

Preenche o formulário de novo perfil do GitHub.

| Campo | Propriedade |
|---|---|
| Nome | `form.name` |
| Username | `form.username` |
| Perfil | `form.perfil` |

#### `cy.SubmitUserForm()`

Submete o formulário de perfil.

#### `cy.ValidateUserInTable(data)`

Valida que o usuário está exibido na tabela com nome, username e perfil corretos.

#### `cy.RemoveUserList(data)`

Clica no botão de remoção do usuário na tabela.

#### `cy.ValidateRemovedUserList(data)`

Valida que o usuário foi removido da tabela.

#### `cy.ValidateLinkGitHubUser(data)`

Valida atributos do link do perfil:
- `href`: `https://github.com/{data.username}`
- `target`: `_blank`

---

## Fixtures

Arquivos de dados de teste localizados em `cypress/fixtures/`.

### `cep.json`

```json
{
  "cep": "04534011",
  "street": "Rua Joaquim Floriano",
  "neighborhood": "Itaim Bibi",
  "city": "São Paulo",
  "state": "SP"
}
```

### `github.json`

```json
{
  "Users": [
    { "name": "Vinicius Rezende",  "username": "ViniciusRezendeHubsoft", "perfil": "Q.A." },
    { "name": "Fernando Papito",   "username": "papitodev",              "perfil": "Desenvolvedor" },
    { "name": "Fernando Papito",   "username": "qapapito",               "perfil": "Desenvolvedor" }
  ]
}
```

### `consultancy.json`

Contém dois objetos: `personal` (CPF) e `company` (CNPJ).

**`personal`:**

| Campo | Valor |
|---|---|
| name | Vinicius Rezende |
| email | vinicius.rezende@example.com.br |
| phone | 11999999999 |
| type | Individual |
| personType | CPF |
| document | 17937827092 |
| discoveryChannels | Instagram, LinkedIn, Udemy, YouTube, Indicação de Amigo |
| techs | Python, Java, C#, Ruby, JavaScript, TypeScript, Go, PHP, Cypress, Selenium, Playwright, Appium |
| terms | true |

**`company`:**

| Campo | Valor |
|---|---|
| name | Vinicius Rezende |
| email | vinicius.rezende@example.com.br |
| phone | 11999999999 |
| type | In Company |
| personType | CNPJ |
| document | 24321414000180 |
| discoveryChannels | LinkedIn |
| techs | (mesmas 12 tecnologias) |
| terms | true |

### `document.pdf`

Arquivo PDF binário utilizado nos testes de upload de arquivo no formulário de consultoria.

---

## Utilitários

Funções auxiliares em `support/utils.js`.

### `dateFormatter(date)`

Formata uma data no padrão brasileiro (`dd/m/aaaa`).

```javascript
import { dateFormatter } from './utils'

dateFormatter(new Date()) // "21/6/2026"
```

Utilizado em `commands.js` para gerar o valor do cookie `login_date` no login programático.

### `class RandomArrays`

Retorna um subconjunto aleatório de um array.

```javascript
const ra = new RandomArrays(array)
ra.getRandomArray() // retorna subset aleatório
```

### `getDiscoveryChannels(consultancy)`

Retorna seleção aleatória dos canais de descoberta definidos no fixture de consultoria.

### `getTechs(consultancy)`

Retorna seleção aleatória das tecnologias definidas no fixture de consultoria.

> A aleatoriedade em `getDiscoveryChannels` e `getTechs` garante que os testes cubram combinações variadas de checkboxes a cada execução.

---

## Infraestrutura Docker

O arquivo `docker-compose.yaml` na raiz do projeto provisiona a infraestrutura de banco de dados necessária para a API.

### Serviços

#### `dojo-db` — PostgreSQL

| Parâmetro | Valor |
|---|---|
| Imagem | `postgres:13` |
| Porta | `5432` |
| Usuário | `dba` |
| Senha | `dba` |
| Banco de dados | `UserDB` |
| Timezone | `America/Sao_Paulo` |

#### `dojo-dbadm` — PgAdmin 4

| Parâmetro | Valor |
|---|---|
| Imagem | `dpage/pgadmin4` |
| Porta | `15432` → `80` (container) |
| Email | `dba@pgadmin.com` |
| Senha | `dba` |
| Timezone | `America/Sao_Paulo` |

**Acesso ao PgAdmin:** `http://localhost:15432`

### Subir os serviços

```bash
docker-compose up -d
```

### Derrubar os serviços

```bash
docker-compose down
```

---

## Cobertura de Funcionalidades

| Funcionalidade | Spec | Técnica Cypress |
|---|---|---|
| Autenticação (login / logout) | `login.cy.js` | `localStorage`, cookies, viewport mobile |
| Alertas JavaScript | `alert.cy.js` | `cy.on('window:alert')`, `cy.on('window:confirm')` |
| Integração com API externa (CEP) | `cep.cy.js` | `cy.intercept()` (mock de resposta) |
| Formulário complexo | `consultancy.cy.js` | Upload, select, radio, checkbox, tags, textarea |
| Tabela CRUD | `github.cy.js` | Criação, remoção e validação de linhas |
| Eventos reais de mouse | `hover.cy.js` | `realHover()` (cypress-real-events) |
| iFrame | `iFrame.cy.js` | `contentDocument.body` |
| Drag & Drop | `kanban.cy.js` | Eventos HTML5 nativos |
| Validação de links | `link.cy.js` | `invoke('removeAttr')`, atributos `href` / `target` |

---

> Projeto educacional exclusivo do curso **Ninja do Cypress** — Fernando Papito.
