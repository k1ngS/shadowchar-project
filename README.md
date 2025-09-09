# Shadowchar: Ficha Automatizada para Shadow of the Demon Lord

Este projeto visa desenvolver uma ficha de personagem automatizada e editável para o sistema de RPG **Shadow of the Demon Lord**, integrada a uma aplicação web. O objetivo é permitir que mestres e jogadores gerenciem personagens de forma eficiente e automatizada, facilitando a criação, o acompanhamento e a validação das regras do jogo.

## 🏗️ Arquitetura do Projeto

O projeto é dividido em duas aplicações principais:

```
shadowchar-project/
├── shadowchar-frontend/    # Frontend em Angular
└── shadowchar-backend/     # Backend em NestJS
```

### Frontend (Angular 20)
- **Framework**: Angular 20.2.0 com TypeScript
- **Arquitetura**: Componentes standalone com roteamento
- **HTTP Client**: Para comunicação com a API
- **Estrutura modular**: Features organizadas por funcionalidade

### Backend (NestJS)
- **Framework**: NestJS 11 com TypeScript
- **Arquitetura**: Modular com controllers, services e DTOs
- **API**: RESTful endpoints para gerenciamento de personagens
- **Banco de dados**: Em memória (para desenvolvimento inicial)

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular**: 20.2.0 - Framework principal
- **TypeScript**: 5.9.2 - Linguagem de programação
- **RxJS**: 7.8.0 - Programação reativa
- **Angular Router**: Roteamento SPA
- **Jasmine & Karma**: Testes unitários

### Backend
- **NestJS**: 11.0.1 - Framework Node.js
- **TypeScript**: 5.7.3 - Linguagem de programação
- **RxJS**: 7.8.1 - Programação reativa
- **Jest**: 30.0.0 - Framework de testes
- **ESLint & Prettier**: Qualidade e formatação de código

## 📋 Funcionalidades Implementadas

### ✅ **Listagem de Personagens**
- Visualização de personagens existentes
- Interface responsiva com loading states
- Integração completa frontend-backend

### ✅ **API RESTful**
- Endpoints para CRUD de personagens
- Estrutura modular e escalável
- DTOs para validação de dados

### ✅ **Estrutura Base**
- Configuração completa do projeto
- Sistema de roteamento
- Comunicação HTTP entre camadas
- Testes unitários configurados

## 🔄 Estado Atual do Desenvolvimento

### **Implementado**
- [x] Setup inicial do projeto (Frontend + Backend)
- [x] Estrutura modular do NestJS
- [x] Componentes Angular standalone
- [x] Service de personagens no frontend
- [x] Controller e Service de personagens no backend
- [x] Listagem básica de personagens
- [x] Comunicação HTTP entre camadas

### **Em Desenvolvimento/Planejado**
- [ ] Modelo completo de personagem (atributos, ancestralidade, caminhos)
- [ ] Persistência em banco de dados
- [ ] Criação de personagens com wizard
- [ ] Cálculos automatizados de características derivadas
- [ ] Validação de regras do jogo
- [ ] Sistema de autenticação
- [ ] Exportação de fichas (PDF/JSON)
- [ ] Interface de edição de personagens
- [ ] Gerenciamento de inventário e magias

## 🛠️ Como Executar o Projeto

### **Pré-requisitos**
- Node.js (versão 18 ou superior)
- npm ou yarn

### **Backend (NestJS)**

```bash
cd shadowchar-backend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev

# O backend estará disponível em http://localhost:3000
```

### **Frontend (Angular)**

```bash
cd shadowchar-frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
ng serve

# O frontend estará disponível em http://localhost:4200
```

### **Executando Ambos**

1. Em um terminal, execute o backend
2. Em outro terminal, execute o frontend
3. Acesse `http://localhost:4200` para ver a aplicação

## 📁 Estrutura do Código

### **Backend Structure**
```
shadowchar-backend/src/
├── app.module.ts           # Módulo principal
├── main.ts                 # Ponto de entrada
└── characters/             # Módulo de personagens
    ├── characters.controller.ts
    ├── characters.service.ts
    ├── characters.module.ts
    ├── dto/                # Data Transfer Objects
    │   ├── create-character.dto.ts
    │   └── update-character.dto.ts
    └── entities/           # Entidades de domínio
        └── character.entity.ts
```

### **Frontend Structure**
```
shadowchar-frontend/src/app/
├── app.ts                  # Componente raiz
├── app.routes.ts           # Configuração de rotas
├── features/               # Features da aplicação
│   ├── character.ts        # Service de personagens
│   └── character-list/     # Componente de listagem
│       ├── character-list.ts
│       └── character-list.html
└── layout/                 # Componentes de layout
    └── header/
        ├── header.ts
        └── header.html
```

## 🧪 Testes

### **Backend**
```bash
cd shadowchar-backend

# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

### **Frontend**
```bash
cd shadowchar-frontend

# Testes unitários
ng test
```

## 📦 Scripts Disponíveis

### **Backend**
- `npm run start:dev` - Execução em modo desenvolvimento
- `npm run build` - Build para produção
- `npm run test` - Execução dos testes
- `npm run lint` - Verificação de código

### **Frontend**
- `ng serve` - Servidor de desenvolvimento
- `ng build` - Build para produção
- `ng test` - Execução dos testes
- `ng generate` - Geração de código

## 🎯 Próximos Passos

1. **Implementar modelo completo de personagem**
   - Atributos (Força, Agilidade, Intelecto, Vontade)
   - Características derivadas (Vida, Insanidade, Defesa, Velocidade)
   - Ancestralidade e caminhos

2. **Adicionar persistência**
   - Configurar banco de dados (PostgreSQL/MongoDB)
   - Implementar repositories e entities

3. **Criar wizard de criação de personagens**
   - Fluxo step-by-step
   - Validações de regras
   - Cálculos automáticos

4. **Sistema de autenticação**
   - Registro e login de usuários
   - Gerenciamento de sessões
   - Proteção de rotas

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📚 Recursos Úteis

- [Shadow of the Demon Lord RPG](https://schwalbentertainment.com/shadow-of-the-demon-lord/)
- [Documentação do NestJS](https://docs.nestjs.com/)
- [Documentação do Angular](https://angular.dev/)
- [Guia de TypeScript](https://www.typescriptlang.org/docs/)
