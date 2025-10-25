const API_BASE = 'http://localhost:3000/api';

const els = {
  views: {
    phase1: document.getElementById('phase1'),
    phase2: document.getElementById('phase2'),
    phase3: document.getElementById('phase3')
  },
  statusText: document.getElementById('status-text'),
  p1Question: document.getElementById('p1-question'),
  p1Choices: document.getElementById('p1-choices'),
  p1Answer: document.getElementById('p1-answer'),
  p1Reset: document.getElementById('p1-reset'),
  p1Validate: document.getElementById('p1-validate'),
  p1Result: document.getElementById('p1-result'),
  p2Activity: document.getElementById('p2-activity'),
  p2Practices: document.getElementById('p2-practices'),
  p2Validate: document.getElementById('p2-validate'),
  p2Result: document.getElementById('p2-result'),
  p3Scenario: document.getElementById('p3-scenario'),
  p3Input: document.getElementById('p3-input'),
  p3Options: document.getElementById('p3-options'),
  p3Validate: document.getElementById('p3-validate'),
  p3Result: document.getElementById('p3-result'),
};

const state = {
  meta: null,
  p1Questions: [],
  p1Answer: [],
  p2Data: { activities: [], practices: [] },
  p3Scenarios: [],
  p3Choice: null,
};

function showView(viewId) {
  for (const id of Object.keys(els.views)) {
    els.views[id].classList.toggle('hidden', id !== viewId);
  }
}

function setStatus(text) {
  els.statusText.textContent = text || '';
}

async function getJson(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

(function initNav() {
  document.querySelectorAll('nav [data-view]').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });
})();

async function init() {
  try {
    setStatus('Carregando metadados…');
    state.meta = await getJson('/meta');
    setStatus('Carregando dados das fases…');
    const [p1Qs, p2Opts, p3Scens] = await Promise.all([
      getJson('/phase1/questions'),
      getJson('/phase2/options'),
      getJson('/phase3/scenarios'),
    ]);

    state.p1Questions = p1Qs;
    els.p1Question.innerHTML = '';
    for (const q of state.p1Questions) {
      const opt = document.createElement('option');
      opt.value = q.id;
      opt.textContent = q.title;
      els.p1Question.appendChild(opt);
    }
    els.p1Question.addEventListener('change', renderP1Choices);
    els.p1Reset.addEventListener('click', () => { state.p1Answer = []; renderP1Answer(); });
    els.p1Validate.addEventListener('click', validateP1);
    renderP1Choices();

    state.p2Data = p2Opts;
    els.p2Activity.innerHTML = '';
    for (const act of state.p2Data.activities) {
      const opt = document.createElement('option');
      opt.value = act.id;
      opt.textContent = `${act.label}`;
      els.p2Activity.appendChild(opt);
    }
    renderP2Practices();
    els.p2Activity.addEventListener('change', () => { els.p2Result.textContent = ''; renderP2Practices(); });
    els.p2Validate.addEventListener('click', validateP2);

    state.p3Scenarios = p3Scens;
    els.p3Scenario.innerHTML = '';
    for (const s of state.p3Scenarios) {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.input.slice(0, 80) + (s.input.length > 80 ? '…' : '');
      els.p3Scenario.appendChild(opt);
    }
    els.p3Scenario.addEventListener('change', renderP3Scenario);
    els.p3Validate.addEventListener('click', validateP3);
    renderP3Scenario();

    setStatus('Pronto. Selecione uma fase acima.');
    showView('phase1');
  } catch (err) {
    console.error(err);
    setStatus('Erro ao carregar. Verifique se a API está em execução.');
  }
}

function currentP1Question() {
  const id = els.p1Question.value;
  return state.p1Questions.find(q => q.id === id) || state.p1Questions[0];
}

function renderP1Choices() {
  const q = currentP1Question();
  state.p1Answer = [];
  els.p1Answer.innerHTML = '';
  els.p1Choices.innerHTML = '';
  els.p1Result.textContent = '';
  (q?.choices || []).forEach(act => {
    const li = document.createElement('li');
    li.textContent = act.label;
    const addBtn = document.createElement('button');
    addBtn.textContent = '+';
    addBtn.addEventListener('click', () => {
      if (!state.p1Answer.includes(act.id)) {
        state.p1Answer.push(act.id);
        renderP1Answer();
      }
    });
    li.appendChild(addBtn);
    els.p1Choices.appendChild(li);
  });
  els.p1Validate.disabled = true;
}

function renderP1Answer() {
  els.p1Answer.innerHTML = '';
  state.p1Answer.forEach((id, idx) => {
    const act = (state.meta.activities || []).find(a => a.id === id);
    const li = document.createElement('li');
    li.textContent = `${idx + 1}. ${act?.label || id}`;
    const up = document.createElement('button');
    up.textContent = '↑';
    up.addEventListener('click', () => {
      if (idx > 0) {
        [state.p1Answer[idx - 1], state.p1Answer[idx]] = [state.p1Answer[idx], state.p1Answer[idx - 1]];
        renderP1Answer();
      }
    });
    const down = document.createElement('button');
    down.textContent = '↓';
    down.addEventListener('click', () => {
      if (idx < state.p1Answer.length - 1) {
        [state.p1Answer[idx + 1], state.p1Answer[idx]] = [state.p1Answer[idx], state.p1Answer[idx + 1]];
        renderP1Answer();
      }
    });
    const remove = document.createElement('button');
    remove.textContent = 'x';
    remove.addEventListener('click', () => {
      state.p1Answer = state.p1Answer.filter(v => v !== id);
      renderP1Answer();
    });
    li.append(up, down, remove);
    els.p1Answer.appendChild(li);
  });
  els.p1Validate.disabled = state.p1Answer.length !== 6;
}

async function validateP1() {
  const q = currentP1Question();
  try {
    const res = await getJson('/phase1/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: q.id, answer: state.p1Answer })
    });
    els.p1Result.innerHTML = `Resultado: <strong>${res.correct ? 'Correto' : 'Incorreto'}</strong>`;
    if (!res.correct && Array.isArray(res.diffs)) {
      const diffs = res.diffs
        .map(d => `${d.position + 1}: esperado ${labelOf(d.expected)}, recebeu ${labelOf(d.got)}`)
        .join('<br/>');
      els.p1Result.innerHTML += `<div class="mt">Diferenças:<br/>${diffs}</div>`;
    }
  } catch {
    els.p1Result.textContent = 'Erro ao validar.';
  }
}

function labelOf(activityId) {
  const act = (state.meta.activities || []).find(a => a.id === activityId);
  return act ? act.label : activityId;
}

function renderP2Practices() {
  const data = state.p2Data;
  els.p2Practices.innerHTML = '';
  data.practices.forEach(p => {
    const id = `p2p-${p.id}`;
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = p.id;
    checkbox.id = id;
    label.htmlFor = id;
    label.textContent = p.label;
    label.prepend(checkbox);
    els.p2Practices.appendChild(label);
  });
}

async function validateP2() {
  try {
    const activityId = els.p2Activity.value;
    const selected = Array.from(els.p2Practices.querySelectorAll('input[type="checkbox"]:checked')).map(i => i.value);
    const res = await getJson('/phase2/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activityId, selectedPracticeIds: selected })
    });
    els.p2Result.innerHTML = `
      <div>Acertos: ${res.correctMatches.length}</div>
      <div>Erros: ${res.wrongSelections.length}</div>
      <div>Faltaram: ${res.missed.length}</div>
      <div>Score: ${(res.score * 100).toFixed(0)}%</div>
    `;
  } catch {
    els.p2Result.textContent = 'Erro ao validar.';
  }
}

function renderP3Scenario() {
  const id = els.p3Scenario.value;
  const s = state.p3Scenarios.find(x => x.id === id) || state.p3Scenarios[0];
  els.p3Input.textContent = s?.input || '';
  els.p3Options.innerHTML = '';
  state.p3Choice = null;
  els.p3Validate.disabled = true;

  (state.meta.activities || []).forEach(a => {
    const b = document.createElement('button');
    b.textContent = a.label;
    b.addEventListener('click', () => {
      state.p3Choice = a.id;
      els.p3Validate.disabled = false;
      els.p3Options.querySelectorAll('button').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
    });
    els.p3Options.appendChild(b);
  });
}

async function validateP3() {
  try {
    const scenarioId = els.p3Scenario.value;
    const res = await getJson('/phase3/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId, choiceActivityId: state.p3Choice })
    });
    els.p3Result.innerHTML = `
      <div>Resultado: <strong>${res.correct ? 'Correto' : 'Incorreto'}</strong></div>
      <div>Resposta correta: ${labelOf(res.correctActivityId)}</div>
      <div>Explicação: ${res.explanation}</div>
      ${res.nextInput ? `<div>Próximo input: ${res.nextInput}</div>` : ''}
    `;
  } catch {
    els.p3Result.textContent = 'Erro ao validar.';
  }
}

init();