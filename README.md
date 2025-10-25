# FulviaGames — ITIL Quest

Jogo educativo de ITIL 4 para memorizar e entender a Cadeia de Valor e suas práticas.

## Principais funcionalidades

**ITIL Quest** é um jogo de quiz com três fases interativas:

- Fase 1 (Ordenação): ordene as 6 atividades da Cadeia de Valor em um fluxo lógico.
- Fase 2 (Associação): associe práticas ITIL à atividade primária onde mais contribuem.
- Fase 3 (Decisão): escolha a atividade correta a partir de cenários reais (inputs).

## Stack

- Backend: Node.js + Express (CORS habilitado)
- Frontend: HTML/CSS/JavaScript estático

## Estrutura do projeto

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

README.md          # Este arquivo (visão geral)
DEV_README.md      # Guia detalhado para devs (como editar e expandir)
```

## Como executar (desenvolvimento)

### Backend (API)

```powershell
cd backend
npm install
npm start
# API disponível em http://localhost:3000
```

### Frontend (Dev)

```powershell
cd frontend
npm install
npm run dev
# Interface em http://localhost:5500
```

## API (resumo)

- GET /api/health — status da API
- GET /api/meta — metadados do jogo (título, fases, atividades)
- GET /api/activities — lista das 6 atividades

Fase 1 (Ordenação)

- GET /api/phase1/questions — questões com opções embaralhadas
- POST /api/phase1/validate — valida a ordem enviada

Fase 2 (Associação)

- GET /api/phase2/options — atividades e práticas
- POST /api/phase2/validate — valida práticas selecionadas para uma atividade

Fase 3 (Decisão)

- GET /api/phase3/scenarios — cenários (opções: 6 atividades)
- POST /api/phase3/validate — valida atividade escolhida

## Para desenvolvedores

Para adicionar questões, cenários, práticas ou evoluir o front/back, consulte:

👉 [DEV_README.md](./DEV_README.md)

## Licença

MIT
