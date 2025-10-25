# ITIL Quest: A Jornada do Serviço — Backend

Este repositório contém apenas o back-end (API) para o jogo educativo de ITIL 4 descrito como “ITIL Flow Challenge / ITIL Quest”. O front-end será desenvolvido separadamente.

## Principais funcionalidades

- Fase 1 (Ordenação): perguntas de arrastar-e-soltar para ordenar as 6 atividades da Cadeia de Valor.
- Fase 2 (Associação): selecionar práticas ITIL que pertencem primariamente a uma atividade.
- Fase 3 (Decisão): escolher a primeira atividade a ser acionada para um cenário textual (input) dado.

## Stack

- Node.js + Express
- CORS habilitado para consumo pelo front-end

## Como executar

1) Instale dependências:

```powershell
# FulviaGames — ITIL Quest

Este repositório agora está organizado em duas pastas:

- `backend/` — API (Node.js + Express) para as fases do jogo.
- `frontend/` — Front-end estático básico para validar a integração com a API.

Para instruções detalhadas de desenvolvimento (como editar front e back), consulte `DEV_README.md` na raiz do projeto.
