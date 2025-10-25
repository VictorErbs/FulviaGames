# Guia para Desenvolvedores — ITIL Quest

Este guia explica como rodar, editar e expandir o back-end (API) e o front-end básico do ITIL Quest.

## Estrutura

```text
backend/           # API Express (Node.js)
  package.json
  src/
    server.js
    data/
      activities.js
      practices.js
      phase1.js
      phase3.js

frontend/          # Front-end estático (HTML/CSS/JS)
  package.json
  public/
    index.html
    styles.css
    app.js
  scripts/
    server.js      # Servidor estático para desenvolvimento

.gitignore
README.md          # Visão geral do projeto
DEV_README.md      # Este arquivo
```

## Requisitos

- Node.js 18+ recomendado.

## Como rodar em desenvolvimento

Abra dois terminais.

Terminal 1 — API (backend):

```powershell
cd backend
npm install
npm start
# A API sobe em http://localhost:3000
```

Terminal 2 — Front-end (servidor estático):

```powershell
cd frontend
npm install
npm run dev
# O front abre em http://localhost:5500
```

O front já consome a API em `http://localhost:3000/api`.

## Editando o back-end

Arquivos principais:

- `backend/src/server.js`: define os endpoints da API.
- `backend/src/data/activities.js`: define as 6 atividades (id/label).
- `backend/src/data/practices.js`: define práticas e a atividade primária a que mais contribuem.
- `backend/src/data/phase1.js`: questões da Fase 1 (ordenação) + utilitários de comparação.
- `backend/src/data/phase3.js`: cenários da Fase 3 (decisão).

Adicionar uma nova questão (Fase 1):

1. Edite `backend/src/data/phase1.js` e inclua um objeto no array `PHASE1_QUESTIONS` com `id`, `title`, `description`, `correctOrder` (array de ids de atividades).
2. Reinicie a API (se necessário) e atualize o front.

Adicionar/ajustar práticas (Fase 2):

1. Edite `backend/src/data/practices.js` e ajuste `primaryActivityId` (um dos ids de atividade).
2. A validação usa esse mapeamento para calcular acertos, erros e itens faltantes.

Adicionar um novo cenário (Fase 3):

1. Edite `backend/src/data/phase3.js` e inclua um objeto com `id`, `input`, `correctActivityId`, `explanation`, `nextInput`.

Boas práticas:

- Mantenha ids estáveis (snake/kebab case em inglês curto) e labels em PT-BR.
- Se quiser suportar “contribuições secundárias”, adicione um novo campo (ex.: `secondaryActivityIds`) e adapte `server.js` na lógica de validação da Fase 2.

## Editando o front-end

Arquivos principais:

- `frontend/public/index.html`: layout básico e seções das fases.
- `frontend/public/styles.css`: estilos simples.
- `frontend/public/app.js`: integra com a API e controla a UI.

Trocar a URL da API:

- Em `frontend/public/app.js`, altere a constante `API_BASE`.

Melhorias simples sugeridas:

- Fase 1: implementar drag-and-drop nativo e destaque de posições corretas/erradas.
- Fase 2: destacar práticas corretas/erradas com cores.
- Fase 3: exibir histórico de escolhas e trilha de “next inputs”.

## Convenções e decisões

- Os fluxos/cenários são pedagógicos: ITIL 4 permite múltiplos value streams; as sequências aqui são simplificadas.
- Mapeamento “primário” de práticas: cada prática foi atribuída à atividade onde contribui mais comumente para fins de jogo.

## Testes e qualidade (opcional)

- Sugestão: adicionar Jest no backend para testar a função `compareOrder` e a validação da Fase 2.
- Linters/formatadores podem ser adicionados conforme preferência da equipe.

## Deploy (sugestão simples)

- Backend: qualquer host Node (Render, Railway, Azure App Service, etc.).
- Frontend: hospedar conteúdo estático (Netlify, GitHub Pages, Vercel) — ajustar `API_BASE` para a URL pública.
