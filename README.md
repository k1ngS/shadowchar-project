# Shadowchar: Ficha Automatizada para Shadow of the Demon Lord

> Um projeto full-stack para criar e gerenciar fichas de personagem para o RPG "Shadow of the Demon Lord", construído com NestJS e Angular.

## ✨ Visão Geral

Este projeto visa desenvolver uma ficha de personagem automatizada e editável para o sistema de RPG *Shadow of the Demon Lord*, integrada a um website. O objetivo é permitir que mestres e jogadores gerenciem personagens de forma eficiente e automatizada, facilitando a criação, o acompanhamento e a validação das regras do jogo.

## 🚀 Tecnologias Utilizadas

### **Backend**

* **Framework:** [NestJS](https://nestjs.com/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Banco de Dados / ORM:** [PostgreSQL](https://www.postgresql.org/) com [Prisma](https://www.prisma.io/)
* **Autenticação:** [Passport.js](http://www.passportjs.org/) (Estratégias Local e JWT)
* **Documentação da API:** [Swagger (OpenAPI)](https://swagger.io/)

### **Frontend**

* **Framework:** [Angular](https://angular.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **UI/UX:** [Angular Material](https://material.angular.io/)
* **Gerenciamento de Estado:** [RxJS](https://rxjs.dev/)

#### **Ferramentas e Infraestrutura**

* **Containerização:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
* **Controle de Versão:** [Git](https://git-scm.com/) & [GitHub](https://github.com)
* **Gerenciamento de Projeto:** [JIRA](https://www.atlassian.com/software/jira)

## ✅ Funcionalidades Implementadas

* **Autenticação de Usuários Completa:**
  * [x] Registro de novas contas com e-mail e senha.
  * [x] Login seguro com geração de token JWT.
  * [x] Proteção de rotas no backend e no frontend (Guards).
  * [x] Envio automático de token em requisições (HTTP Interceptor).
  * [x] Página de perfil para visualizar dados do usuário logado.
  * [x] Funcionalidade de Logout.

* **Gerenciamento de Personagens (CRUD Completo):**
  * [x] Criação, visualização, edição e deleção de personagens.
  * [x] **Multitenancy:** Cada usuário só pode ver e gerenciar seus próprios personagens.

* **Ficha de Personagem Automatizada:**
  * [x] Cálculo e exibição de atributos derivados (Vida, Defesa, etc.).
  * [x] Gerenciamento de Talentos (adicionar e listar).

* **API e Documentação:**
  * [x] API RESTful segura e bem estruturada.
  * [x] Documentação interativa da API com Swagger UI.

* **Interface de Usuário (UI/UX):**
  * [x] Interface moderna e responsiva com Angular Material.
  * [x] Notificações "toast" para feedback de ações do usuário.
  * [x] Layout consistente com tema, cards e componentes profissionais.

## 📝 Funcionalidades Planejadas (Roadmap)

* [ ] Gerenciamento de Magias.
* [ ] Gerenciamento de Inventário.
* [ ] Assistente de criação de personagem passo a passo (Wizard).
* [ ] Implementação de Refresh Tokens para sessão persistente.
* [ ] Sistema de Níveis e Caminhos (Novato, Experiente, Mestre).
* [ ] Exportação da ficha de personagem para PDF/JSON.

## 🏁 Começando (Getting Started)

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 20.x ou superior)
* [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose
* [Angular CLI](https://angular.dev/cli) (`npm install -g @angular/cli`)
* [NestJS CLI](https://docs.nestjs.com/cli/overview) (`npm install -g @nestjs/cli`)

### Configuração do Backend

1. **Navegue até a pasta do backend:**

    ```bash
    cd shadowchar-backend
    ```

2. **Crie e configure as variáveis de ambiente:**
    * Crie uma cópia do arquivo de exemplo: `cp .env.example .env` (Você precisará criar o arquivo `.env.example` primeiro).
    * Preencha as variáveis no arquivo `.env`, como `DATABASE_URL` e `JWT_SECRET`.
3. **Inicie o banco de dados com Docker:**
    * A partir da pasta **raiz** do projeto (`shadowchar-project`), rode:

    ```bash
    docker compose up -d
    ```

4. **Instale as dependências:**

    ```bash
    npm install
    ```

5. **Execute as migrações do banco de dados:**

    ```bash
    npx prisma migrate dev
    ```

6. **Inicie o servidor do backend:**

    ```bash
    npm run start:dev
    ```

    * A API estará rodando em `http://localhost:3000`.

### Configuração do Frontend

1. **Navegue até a pasta do frontend (em um novo terminal):**

    ```bash
    cd shadowchar-frontend
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Inicie o servidor do frontend:**

    ```bash
    ng serve
    ```

    * A aplicação estará acessível em `http://localhost:4200`.

## 📖 Documentação da API

Com o servidor do backend rodando, a documentação interativa da API (Swagger UI) está disponível em:
[http://localhost:3000/api](http://localhost:3000/api)
