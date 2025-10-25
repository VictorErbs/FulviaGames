import express from 'express';
import cors from 'cors';

import { ACTIVITIES, ACTIVITY_BY_ID } from './data/activities.js';
import { PRACTICES } from './data/practices.js';
import { PHASE1_QUESTIONS, shuffledChoicesForQuestion, compareOrder } from './data/phase1.js';
import { PHASE3_SCENARIOS } from './data/phase3.js';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const GAME_META = {
  title: 'ITIL Quest: A Jornada do Serviço',
  phases: [
    { id: 'phase1', label: 'Sequência de Fluxo (Ordenação)' },
    { id: 'phase2', label: 'Conexão de Conceitos (Associação)' },
    { id: 'phase3', label: 'Escolha do Caminho (Decisão)' }
  ],
  activities: ACTIVITIES
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/meta', (req, res) => {
  res.json(GAME_META);
});

app.get('/api/activities', (req, res) => {
  res.json(ACTIVITIES);
});

app.get('/api/phase1/questions', (req, res) => {
  const payload = PHASE1_QUESTIONS.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    choices: shuffledChoicesForQuestion(q.id)
  }));
  res.json(payload);
});

app.post('/api/phase1/validate', (req, res) => {
  const { questionId, answer } = req.body || {};
  const q = PHASE1_QUESTIONS.find(x => x.id === questionId);
  if (!q) return res.status(400).json({ error: 'questionId inválido' });
  if (!Array.isArray(answer) || answer.length !== q.correctOrder.length) {
    return res.status(400).json({ error: 'answer deve ser um array com 6 ids de atividades' });
  }
  const { isExact, diffs } = compareOrder(q.correctOrder, answer);
  res.json({ correct: isExact, diffs, correctOrder: q.correctOrder });
});

app.get('/api/phase2/options', (req, res) => {
  res.json({ activities: ACTIVITIES, practices: PRACTICES });
});

app.post('/api/phase2/validate', (req, res) => {
  const { activityId, selectedPracticeIds } = req.body || {};
  if (!ACTIVITY_BY_ID[activityId]) {
    return res.status(400).json({ error: 'activityId inválido' });
  }
  const validIds = new Set(PRACTICES.map(p => p.id));
  const submitted = Array.isArray(selectedPracticeIds) ? selectedPracticeIds.filter(id => validIds.has(id)) : [];
  const correctSet = new Set(PRACTICES.filter(p => p.primaryActivityId === activityId).map(p => p.id));

  const correctMatches = submitted.filter(id => correctSet.has(id));
  const wrongSelections = submitted.filter(id => !correctSet.has(id));
  const missed = [...correctSet].filter(id => !submitted.includes(id));
  const score = correctSet.size === 0 ? 0 : correctMatches.length / correctSet.size;

  res.json({ correctMatches, wrongSelections, missed, score });
});

app.get('/api/phase3/scenarios', (req, res) => {
  const payload = PHASE3_SCENARIOS.map(s => ({ id: s.id, input: s.input, options: ACTIVITIES }));
  res.json(payload);
});

app.post('/api/phase3/validate', (req, res) => {
  const { scenarioId, choiceActivityId } = req.body || {};
  const s = PHASE3_SCENARIOS.find(x => x.id === scenarioId);
  if (!s) return res.status(400).json({ error: 'scenarioId inválido' });
  if (!ACTIVITY_BY_ID[choiceActivityId]) {
    return res.status(400).json({ error: 'choiceActivityId inválido' });
  }
  const correct = s.correctActivityId === choiceActivityId;
  res.json({ correct, correctActivityId: s.correctActivityId, explanation: s.explanation, nextInput: correct ? s.nextInput : undefined });
});

app.use((req, res) => { res.status(404).json({ error: 'Not found' }); });

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`ITIL Quest backend listening on port ${PORT}`); });
