import { ACTIVITIES } from './activities.js';

export const PHASE1_QUESTIONS = [
  {
    id: 'svc-canonical',
    title: 'Ordem canônica de estudo',
    description: 'Ordene as 6 atividades para um fluxo completo de alto nível.',
    correctOrder: ['plan', 'engage', 'design-transition', 'obtain-build', 'deliver-support', 'improve']
  },
  {
    id: 'new-compliance-requirement',
    title: 'Novo requisito de conformidade',
    description: 'Um novo requisito regulatório surgiu. Monte o fluxo típico.',
    correctOrder: ['plan', 'engage', 'design-transition', 'obtain-build', 'deliver-support', 'improve']
  },
  {
    id: 'new-service-request',
    title: 'Novo serviço ao portfólio',
    description: 'Um novo serviço será criado. Monte um fluxo de ponta a ponta.',
    correctOrder: ['engage', 'plan', 'design-transition', 'obtain-build', 'deliver-support', 'improve']
  }
];

export function shuffledChoicesForQuestion(questionId) {
  const q = PHASE1_QUESTIONS.find(q => q.id === questionId);
  if (!q) return null;
  const arr = [...ACTIVITIES];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function compareOrder(expected, given) {
  const clean = (a) => Array.isArray(a) ? a.map(String) : [];
  const exp = clean(expected);
  const ans = clean(given);
  const sameLength = exp.length === ans.length;
  const isExact = sameLength && exp.every((v, i) => v === ans[i]);
  const diffs = exp.map((v, i) => ({ position: i, expected: v, got: ans[i] }));
  return { isExact, diffs };
}
