# ITIL Quest: A Jornada do Serviço# ITIL Quest: A Jornada do Serviço — Backend



Jogo educativo de ITIL 4 para memorizar e entender a Cadeia de Valor e suas práticas.Este repositório contém apenas o back-end (API) para o jogo educativo de ITIL 4 descrito como “ITIL Flow Challenge / ITIL Quest”. O front-end será desenvolvido separadamente.



## Sobre o jogo## Principais funcionalidades



**ITIL Quest** é um jogo de quiz com três fases interativas:- Fase 1 (Ordenação): perguntas de arrastar-e-soltar para ordenar as 6 atividades da Cadeia de Valor.

- Fase 2 (Associação): selecionar práticas ITIL que pertencem primariamente a uma atividade.

- **Fase 1 (Ordenação)**: Ordene as 6 atividades da Cadeia de Valor em sequências lógicas de fluxo.- Fase 3 (Decisão): escolher a primeira atividade a ser acionada para um cenário textual (input) dado.

- **Fase 2 (Associação)**: Associe práticas ITIL à atividade primária a que mais contribuem.

- **Fase 3 (Decisão)**: Escolha qual atividade deve ser acionada primeiro em cenários reais.## Stack



## Estrutura do projeto- Node.js + Express

- CORS habilitado para consumo pelo front-end

Este repositório está organizado em duas pastas independentes:

## Como executar

- **`backend/`** — API REST (Node.js + Express) que valida as respostas e fornece as questões.

- **`frontend/`** — Interface estática básica (HTML/CSS/JS) que consome a API.1) Instale dependências:



## Como rodar```powershell

# FulviaGames — ITIL Quest

### Backend (API)

Este repositório agora está organizado em duas pastas:

```powershell

cd backend- `backend/` — API (Node.js + Express) para as fases do jogo.

npm install- `frontend/` — Front-end estático básico para validar a integração com a API.

npm start

# API disponível em http://localhost:3000 Para instruções detalhadas de desenvolvimento (como editar front e back), consulte `DEV_README.md` na raiz do projeto.

```

### Frontend (Dev)

```powershell
cd frontend
npm install
npm run dev
# Interface em http://localhost:5500
```

## Para desenvolvedores

Se você quer **editar conteúdo** (adicionar questões, cenários, práticas) ou **melhorar o front-end**, consulte o guia completo em:

👉 **[DEV_README.md](./DEV_README.md)**

## Licença

MIT
