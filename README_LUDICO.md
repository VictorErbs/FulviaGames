# 🎮 ITIL Quest - Sistema Lúdico e Interativo

## 🚀 Como Executar

### Backend (Porta 3000)
```bash
cd backend
npm start
```

### Frontend (Porta 8080 ou qualquer servidor)
```bash
cd frontend
# Opção 1: Usar o servidor Node.js incluído
node scripts/server.js

# Opção 2: Usar Live Server do VS Code
# Clique com botão direito em index.html > Open with Live Server

# Opção 3: Usar Python
python -m http.server 8080 -d public
```

Acesse: http://localhost:8080 (ou a porta do seu servidor)

---

## ✨ Novos Recursos Lúdicos

### 🎮 Sistema de Jogador
- **Nome Personalizado**: Cada jogador tem seu nome
- **Nível e XP**: Suba de nível ganhando experiência
- **Rankings**: 🌱 Aprendiz → 🎯 Praticante → ⭐ Especialista → 🏆 Mestre → 🧙 Guru

### 🏆 Sistema de Conquistas
- **8 Conquistas Desbloqueáveis**:
  - 🚀 Primeiros Passos
  - ⭐ Sequência Perfeita
  - 🔗 Mestre das Conexões
  - 🎯 Decisão Sábia
  - 🔥 Mestre do Combo
  - 💪 Persistente
  - ⚡ Velocista
  - 🧙 Guru do ITIL

### 🔥 Sistema de Combos
- Acertos consecutivos aumentam o combo
- Combos multiplicam o XP ganho
- Visualização em tempo real

### 💡 Sistema de Dicas
- Dicas contextuais para cada questão
- Múltiplas dicas criativas
- Botão de dica em cada fase

### 💬 Feedback Encorajador
- Mensagens motivacionais personalizadas
- Emojis expressivos
- Sempre positivo e educativo

### 📊 Estatísticas Detalhadas
- Progresso por fase
- Tempo de jogo
- Taxa de acerto
- Combo máximo

### ✨ Easter Eggs
- **Botão de Motivação**: Mensagens inspiradoras
- **Botão de Piada**: Piadas sobre ITIL e TI
- **XP Bônus**: Ganhe XP extra explorando!

---

## 🎯 Como Jogar

### 1. Primeira Vez
1. Inicie o backend e frontend
2. Acesse o jogo no navegador
3. Digite seu nome na tela de boas-vindas
4. Clique em "🚀 Começar Aventura!"

### 2. Jogando

#### 🔄 Fase 1: Sequência de Fluxo
1. Selecione uma questão
2. Clique no botão "+" para adicionar atividades à sua resposta
3. Use ↑ e ↓ para reordenar
4. Use × para remover
5. Clique em "💡 Dica" se precisar de ajuda
6. Valide sua resposta quando tiver 6 atividades

#### 🔗 Fase 2: Conexão de Conceitos
1. Selecione uma atividade
2. Marque as práticas que pertencem a ela
3. Use "💡 Dica" para orientação
4. Valide suas escolhas

#### 🎭 Fase 3: Escolha do Caminho
1. Leia o cenário apresentado
2. Escolha a atividade mais adequada
3. Use "💡 Dica" para estratégias
4. Confirme sua decisão

### 3. Acompanhe seu Progresso
- **Painel do Jogador**: Veja seu nível, XP e conquistas
- **Aba Conquistas**: Veja todas as conquistas e seu progresso
- **Aba Estatísticas**: Analise seu desempenho detalhado

---

## 🎨 Visual e Animações

### Animações Incluídas
- ✨ Fade in suave ao carregar
- 🌟 Zoom in para conquistas
- 💫 Slide in para feedbacks
- 🎊 Level up espetacular com raios de luz
- 🔥 Pulse para combos
- 🌈 Transições suaves em todos os elementos

### Cores e Temas
- **Primário**: Roxo/Azul (#6366f1 - #8b5cf6)
- **Sucesso**: Verde (#10b981)
- **Aviso**: Dourado (#f59e0b)
- **Erro**: Vermelho (#ef4444)
- **Fundo**: Gradiente roxo mágico

---

## 💾 Persistência de Dados

O sistema salva automaticamente:
- ✅ ID do jogador (LocalStorage)
- ✅ Progresso no backend (memória do servidor)
- ⚠️ **Nota**: Dados são perdidos se o servidor reiniciar

Para persistência permanente, seria necessário adicionar um banco de dados.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** + **Express**
- **CORS** para comunicação frontend/backend
- Sistema de sessões em memória

### Frontend
- **HTML5** semântico
- **CSS3** com animações e gradientes
- **JavaScript Vanilla** (ES6+)
- **Fetch API** para comunicação

---

## 🎓 Fluxo de Dados

```
┌─────────────┐
│  Frontend   │
│  (Client)   │
└──────┬──────┘
       │
       │ HTTP Requests (fetch)
       │
       ▼
┌─────────────┐
│  Backend    │
│  (Express)  │
└──────┬──────┘
       │
       │ Processa
       │
       ▼
┌─────────────┐
│   Estado    │
│ (playerSessions) │
└─────────────┘
       │
       │ Retorna
       │
       ▼
┌─────────────┐
│   Frontend  │
│  (Update UI)│
└─────────────┘
```

---

## 📝 Endpoints da API

### Jogador
- `POST /api/player/init` - Criar/carregar jogador
- `GET /api/player/:id/stats` - Estatísticas
- `GET /api/player/:id/achievements` - Conquistas

### Fases
- `GET /api/phase1/questions` - Questões Fase 1
- `POST /api/phase1/validate` - Validar Fase 1
- `GET /api/phase1/hint/:id` - Dica Fase 1

- `GET /api/phase2/options` - Opções Fase 2
- `POST /api/phase2/validate` - Validar Fase 2
- `GET /api/phase2/hint` - Dica Fase 2

- `GET /api/phase3/scenarios` - Cenários Fase 3
- `POST /api/phase3/validate` - Validar Fase 3
- `GET /api/phase3/hint` - Dica Fase 3

### Easter Eggs
- `GET /api/easteregg/motivate` - Motivação
- `GET /api/easteregg/joke` - Piada
- `GET /api/leaderboard` - Ranking

---

## 🐛 Solução de Problemas

### Backend não inicia
```bash
cd backend
npm install
npm start
```

### Frontend não carrega dados
1. Verifique se o backend está rodando na porta 3000
2. Verifique o console do navegador (F12)
3. Verifique se não há erro de CORS

### LocalStorage cheio
```javascript
// No console do navegador:
localStorage.clear()
// Recarregue a página
```

### Resetar progresso
```javascript
// No console do navegador:
localStorage.removeItem('itil-quest-player-id')
// Recarregue a página
```

---

## 🎯 Próximos Passos (Melhorias Futuras)

### Curto Prazo
- [ ] Adicionar sons e música
- [ ] Adicionar mais questões
- [ ] Sistema de leaderboard global
- [ ] Compartilhar conquistas nas redes sociais

### Médio Prazo
- [ ] Banco de dados (MongoDB/PostgreSQL)
- [ ] Autenticação de usuários
- [ ] Modo multiplayer/desafios
- [ ] Sistema de badges personalizados

### Longo Prazo
- [ ] Mobile app (React Native)
- [ ] Modo offline (PWA)
- [ ] IA para gerar questões dinâmicas
- [ ] Integração com plataformas de aprendizado

---

## 👥 Contribuindo

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é para fins educacionais.

---

## 🎊 Créditos

Desenvolvido com ❤️ e muito ☕ para tornar o aprendizado de ITIL uma experiência incrível e gamificada!

**Bora jogar? 🎮✨**
