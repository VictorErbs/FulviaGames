# 🎮 ITIL Quest v2.0 - A Jornada do Serviço

Bem-vindo ao **ITIL Quest**, uma aventura gamificada para dominar os conceitos do ITIL 4! 🚀
Aqui, o aprendizado se transforma em uma jornada épica com níveis, conquistas, combos e muita diversão.

---

## ✨ O Que Há de Novo? (v2.0)

### 🌟 Sistema Lúdico Completo
- **XP e Níveis**: Evolua de "Aprendiz" a "Guru do ITIL" acumulando experiência.
- **Combos**: Acerte sequências para multiplicar seus pontos! 🔥
- **Conquistas**: Desbloqueie medalhas como "Velocista", "Mestre das Conexões" e "Persistente". 🏆
- **Feedback Encorajador**: O sistema celebra suas vitórias e te apoia nos erros.

### 📚 O Grimório do Conhecimento
- **Fase 1 (O Fluxo do Poder)**: Ordene as atividades da Cadeia de Valor de Serviço.
- **Fase 2 (A Teia de Conexões)**: Conecte as Práticas corretas às suas Atividades.
- **Fase 3 (O Oráculo das Decisões)**: Tome decisões estratégicas em cenários reais.

---

## 🚀 Como Iniciar Sua Aventura

### Pré-requisitos
- Node.js instalado
- Espírito de aventureiro! ⚔️

### 1. Iniciar o Oráculo (Backend)
O cérebro do jogo, onde a magia acontece.
```powershell
cd backend
npm install
npm start
```
*O servidor iniciará na porta 3000.*

### 2. Abrir o Portal (Frontend)
A interface onde sua jornada começa.
```powershell
cd frontend
npm install
npm run dev
```
*Acesse o jogo em: **http://localhost:8080***

---

## 🗺️ Mapa da Jornada

### 🏰 Fase 1: Sequência de Fluxo
Ordene as 6 atividades da Cadeia de Valor de Serviço.
- **Desafio**: Entender a lógica do fluxo de valor.
- **Recompensa**: XP base + Bônus de Combo.

### 🔗 Fase 2: Conexão de Conceitos
Associe as Práticas (ex: Service Desk, Gestão de Riscos) às suas Atividades principais.
- **Desafio**: Saber onde cada ferramenta se encaixa.
- **Dica**: Consulte o `PHASES_README.md` (agora nosso **Grimoire**) se estiver perdido!

### 🎭 Fase 3: Cenários de Decisão
Responda a situações do dia a dia de TI.
- **Desafio**: Aplicar o conhecimento em situações reais.
- **Exemplo**: "O servidor caiu! O que fazer primeiro?" (Dica: Entregar e Suportar!)

---

## 🛠️ Para Desenvolvedores e Mestres de Jogo

### Estrutura do Reino
```
FulviaGames/
├── backend/            # Onde a lógica reside
│   ├── src/server.js   # O coração do sistema
│   └── data/           # Os pergaminhos de conhecimento
└── frontend/           # O portal visual
    ├── public/         # HTML/CSS/JS (Vanilla Power!)
    └── scripts/        # Servidor de desenvolvimento
```

### Comandos Úteis
- **Reiniciar Servidor**: `npm start` (no backend) - Necessário após alterações de código.
- **Trocar Jogador**: Use o botão "👤 Trocar Jogador" na interface para reiniciar a sessão.

---

## 📜 Créditos

**Desenvolvido por**: Victor Erbs e seus capangas! 🧙‍♂️
**Versão**: 2.0 - Edição Lúdica
**Data**: Novembro de 2025

*Que seus deploys sejam suaves e seus incidentes sejam poucos!* 🍀

