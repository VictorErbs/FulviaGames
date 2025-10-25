# Contribuindo para o FulviaGames — ITIL Quest

Este guia é um passo-a-passo rápido para clonar o projeto, rodar localmente e contribuir com mudanças via Git (branches e Pull Requests).

## Pré-requisitos

- Git instalado
- Node.js 18+ (recomendado)

## 1) Clonar o repositório

```powershell
# via HTTPS
git clone https://github.com/VictorErbs/FulviaGames.git
cd FulviaGames

# ou via SSH (se tiver chave configurada)
# git clone git@github.com:VictorErbs/FulviaGames.git
```

## 2) Rodar localmente (dev)

Abra dois terminais.

Terminal 1 — Backend (API):

```powershell
cd backend
npm install
npm start
# API em http://localhost:3000
```

Terminal 2 — Frontend (estático):

```powershell
cd frontend
npm install
npm run dev
# Front em http://localhost:5500
```

## 3) Fluxo de contribuição

1. Crie um branch para sua mudança (não faça commits diretos na `main`):

   ```powershell
   # na raiz do repo
   git checkout -b feature/nome-curto-mudanca
   # exemplos: feature/fase3-cenarios-extra, fix/validacao-phase2
   ```

2. Faça seus commits de forma atômica e descritiva (preferência por Conventional Commits):

   ```powershell
   git add .
   git commit -m "feat(frontend): adiciona destaque de acertos na Fase 2"
   # tipos comuns: feat, fix, docs, chore, refactor, test
   ```

3. Atualize seu branch se necessário:

   ```powershell
   git fetch origin
   git rebase origin/main
   # ou: git merge origin/main
   ```

4. Envie seu branch para o GitHub e abra um Pull Request:

   ```powershell
   git push -u origin feature/nome-curto-mudanca
   ```

   - Abra o PR no GitHub descrevendo claramente o que mudou, por quê e como testar.

### GitHub Desktop (sem linha de comando)

Se preferir, você pode fazer todo o fluxo pelo GitHub Desktop:

#### 1) Clonar o repositório (GitHub Desktop)

- Abra o GitHub Desktop e faça login.
- File > Clone repository… > URL > cole: `https://github.com/VictorErbs/FulviaGames.git` > Clone.
- Após clonar, clique em “Open in Visual Studio Code” (ou seu editor preferido).

#### 2) Criar um branch (GitHub Desktop)

- No topo, clique em “Current Branch” > “New Branch…”.
- Nomeie (ex.: `feature/fase3-cenarios-extra`) e clique em “Create Branch”.

#### 3) Editar e testar localmente (GitHub Desktop)

- Edite os arquivos nas pastas: `backend/src/**` (API) e `frontend/public/**` (UI).
- Rode localmente (no terminal do editor):
   - Backend: `cd backend && npm install && npm start` (<http://localhost:3000>)
   - Frontend: `cd frontend && npm install && npm run dev` (<http://localhost:5500>)

#### 4) Commitar as mudanças (GitHub Desktop)

- Volte ao GitHub Desktop: as mudanças aparecem em “Changes”.
- Escreva um Summary descritivo (ex.: `feat(frontend): adiciona destaque de acertos na Fase 2`).
- Clique em “Commit to `seu-branch`”.

#### 5) Enviar para o GitHub e abrir PR (GitHub Desktop)

- Clique em “Push origin”.
- Depois, clique em “Create Pull Request” (ou “View on GitHub” > “Compare & pull request”).
- Preencha a descrição do PR (o que mudou, por quê e como testar) e envie.

#### 6) Manter seu branch atualizado (GitHub Desktop)

- No GitHub Desktop, use “Fetch origin” para buscar mudanças.
- Em “Branch” > “Update from main” para atualizar seu branch (ou rebase/merge conforme preferência do time).

## 4) Onde alterar o código

- Backend (API): `backend/src/`
   - Dados do jogo: `backend/src/data/`
- Frontend (UI estática): `frontend/public/`

## 5) Dicas rápidas

- Antes do PR, valide localmente: a API responde e o front carrega e consome a API.
- Commits pequenos e claros facilitam o review.
- Se sua mudança impacta os dados (questões/cenários/práticas), deixe a explicação no PR.

