import {
  TOPICS, MODES, buildSession, grade, solution, gradeLabel, normalize,
  HEURISTICS, JOURNEY_STAGES, EMPATHY_QUADRANTS,
} from './engine.js';

const app = document.getElementById('app');
const HISTORY_KEY = 'uxzeszyt.history';
const SETTINGS_KEY = 'uxzeszyt.settings';

const storage = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* tryb prywatny */ }
  },
};

const state = {
  settings: loadSettings(),
  tasks: [],
  index: 0,
  results: [],
  checked: false,
  selected: null,
};

// ---------- pomocnicze ----------

function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}


function loadSettings() {
  const s = storage.get(SETTINGS_KEY, {});
  const valid = (list, all) => (Array.isArray(list) ? list.filter((x) => all.includes(x)) : []);
  const topics = valid(s.topics, Object.keys(TOPICS));
  const modes = valid(s.modes, Object.keys(MODES));
  return {
    topics: topics.length ? topics : Object.keys(TOPICS),
    modes: modes.length ? modes : Object.keys(MODES),
    count: [5, 8, 12].includes(s.count) ? s.count : 5,
  };
}

const level = (score) => (score >= 0.999 ? 'ok' : score >= 0.5 ? 'partial' : 'bad');
const pct = (score) => Math.round(score * 100);

function setProgress() {
  const bar = document.getElementById('progress');
  if (!state.tasks.length) { bar.hidden = true; return; }
  bar.hidden = false;
  const done = state.results.filter((r) => r != null).length;
  document.getElementById('progress-text').textContent = `Zadanie ${Math.min(state.index + 1, state.tasks.length)} z ${state.tasks.length}`;
  document.getElementById('progress-fill').style.width = `${(done / state.tasks.length) * 100}%`;
}

function screen(...children) {
  app.replaceChildren(...children.filter(Boolean));
  setProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- ekran startowy ----------

function toggleGroup(label, options, selected, onChange) {
  return h('div', {},
    h('div', { class: 'label' }, label),
    h('div', { class: 'chips' }, Object.entries(options).map(([value, text]) => {
      const btn = h('button', {
        class: 'chip-toggle', type: 'button', 'aria-pressed': String(selected.includes(value)),
        onclick: () => {
          const on = btn.getAttribute('aria-pressed') !== 'true';
          btn.setAttribute('aria-pressed', String(on));
          onChange(value, on);
        },
      }, text);
      return btn;
    })));
}

function renderStart() {
  state.tasks = [];
  const s = state.settings;
  const startBtn = h('button', { class: 'btn btn-primary', type: 'button', onclick: startSession }, 'Losuj zadania →');
  const sync = () => { startBtn.disabled = !s.topics.length || !s.modes.length; };
  const toggle = (list) => (value, on) => {
    const i = s[list].indexOf(value);
    if (on && i < 0) s[list].push(value);
    if (!on && i >= 0) s[list].splice(i, 1);
    sync();
  };
  sync();

  const history = storage.get(HISTORY_KEY, []).slice(0, 5);

  screen(
    h('h1', {}, 'Zeszyt ćwiczeń UX'),
    h('p', { class: 'lead' }, 'Losowe zadania z mapy empatii, customer journey i heurystyk Nielsena. Przeciągaj, uzupełniaj i wyjaśniaj — każde zadanie dostaje ocenę i informację zwrotną.'),
    h('section', { class: 'card setup-grid' },
      toggleGroup('Tematy', TOPICS, s.topics, toggle('topics')),
      toggleGroup('Rodzaje zadań', MODES, s.modes, toggle('modes')),
      h('div', {},
        h('div', { class: 'label' }, 'Liczba zadań'),
        h('div', { class: 'chips' }, [5, 8, 12].map((n) => {
          const b = h('button', {
            class: 'chip-toggle', type: 'button', 'aria-pressed': String(s.count === n),
            onclick: () => {
              s.count = n;
              b.parentElement.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
            },
          }, String(n));
          return b;
        }))),
      h('div', { class: 'actions' }, startBtn),
    ),
    history.length ? h('section', { class: 'card history' },
      h('div', { class: 'label' }, 'Ostatnie wyniki'),
      h('ul', { class: 'summary-list' }, history.map((r) => h('li', {},
        h('span', {}, `${new Date(r.date).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' })} · ${r.count} zadań · ${r.topics.map((t) => TOPICS[t]).join(', ')}`),
        h('span', { class: `pct ${level(r.pct / 100)}` }, `${r.pct}% (${gradeLabel(r.pct).mark})`))))) : null,
    cheatsheet(),
  );
}

function cheatsheet() {
  return h('details', { class: 'card cheatsheet' },
    h('summary', {}, 'Ściąga: pojęcia i 10 heurystyk Nielsena'),
    h('h3', {}, 'Mapa empatii'),
    h('ul', {}, EMPATHY_QUADRANTS.map((q) => h('li', {}, h('strong', {}, q.label), ` — ${q.hint}`))),
    h('h3', {}, 'Etapy customer journey'),
    h('ol', {}, JOURNEY_STAGES.map((st) => h('li', {}, h('strong', {}, st.label), ` — ${st.hint}`))),
    h('h3', {}, 'Heurystyki Nielsena'),
    h('ol', {}, HEURISTICS.map((x) => h('li', {}, h('strong', {}, x.name), ` — ${x.desc}`))),
  );
}

// ---------- sesja ----------

function startSession() {
  storage.set(SETTINGS_KEY, state.settings);
  state.tasks = buildSession(state.settings);
  state.results = state.tasks.map(() => null);
  state.index = 0;
  renderTask();
}

function rerollTask() {
  const current = state.tasks[state.index];
  let next = null;
  for (let i = 0; i < 6 && (!next || next.generator === current.generator); i++) {
    [next] = buildSession({ ...state.settings, count: 1 });
  }
  state.tasks[state.index] = next;
  renderTask();
}

function goNext() {
  if (state.index < state.tasks.length - 1) {
    state.index += 1;
    renderTask();
  } else {
    renderSummary();
  }
}

// ---------- ekran zadania ----------

function renderContext(blocks) {
  return h('div', { class: 'context' }, blocks.map((b) => {
    if (b.kind === 'persona') {
      return h('div', { class: 'persona' },
        h('div', { class: 'avatar', 'aria-hidden': 'true' }, b.title.replace(/^Pan\s+/, '').charAt(0)),
        h('div', {}, h('strong', {}, b.title), h('span', { class: 'muted' }, ` · ${b.subtitle}`), h('p', {}, b.text)));
    }
    if (b.kind === 'scenario') {
      return h('div', { class: 'scenario' }, h('strong', {}, b.title), h('p', {}, b.text));
    }
    if (b.kind === 'map') {
      return h('div', { class: 'mini-map' }, b.rows.map((r) => h('div', {},
        h('strong', {}, r.label), h('ul', {}, r.items.map((t) => h('li', {}, t))))));
    }
    if (b.kind === 'journey') {
      return h('div', { class: 'journey-steps' }, b.steps.map((st) => h('div', { class: 'journey-step' },
        h('strong', {}, st.stage), h('span', {}, st.text), h('span', { class: 'emotion' }, `Emocje: ${st.emotion}`))));
    }
    return null;
  }));
}

function renderTask() {
  const task = state.tasks[state.index];
  state.checked = false;
  state.selected = null;

  const body = task.type === 'dnd' ? renderDnd(task) : renderForm(task);
  const banner = h('div', { hidden: true });
  const last = state.index === state.tasks.length - 1;

  const checkBtn = h('button', { class: 'btn btn-primary', type: 'button' }, 'Sprawdź');
  const nextBtn = h('button', { class: 'btn btn-primary', type: 'button', hidden: true, onclick: goNext }, last ? 'Zobacz podsumowanie →' : 'Następne zadanie →');
  const rerollBtn = h('button', { class: 'btn btn-ghost', type: 'button', onclick: rerollTask, title: 'Wylosuj inne zadanie w tym miejscu' }, '↻ Losuj inne');
  const solutionBtn = task.type === 'dnd'
    ? h('button', { class: 'btn btn-ghost', type: 'button', hidden: true, onclick: () => { body.showSolution(); solutionBtn.disabled = true; } }, 'Pokaż rozwiązanie')
    : null;
  const endBtn = h('button', {
    class: 'btn btn-ghost', type: 'button',
    onclick: () => { if (confirm('Zakończyć sesję? Niesprawdzone zadania nie zostaną policzone.')) renderSummary(); },
  }, 'Zakończ');

  checkBtn.addEventListener('click', () => {
    const answer = body.collect();
    if (body.isEmpty(answer) && !confirm('Nie udzielono odpowiedzi. Sprawdzić mimo to?')) return;
    const result = grade(task, answer);
    state.checked = true;
    state.results[state.index] = result.score;
    body.showResult(result);
    banner.replaceWith(resultBanner(result));
    checkBtn.hidden = true;
    rerollBtn.hidden = true;
    nextBtn.hidden = false;
    if (solutionBtn && result.score < 1) solutionBtn.hidden = false;
    setProgress();
    nextBtn.focus({ preventScroll: true });
  });

  screen(
    h('article', { class: 'card' },
      h('div', { class: 'task-meta' },
        h('span', { class: 'tag' }, TOPICS[task.topic]),
        h('span', { class: 'tag tag-mode' }, MODES[task.mode])),
      h('h2', {}, task.title),
      h('p', { class: 'instructions' }, task.instructions),
      renderContext(task.context),
      body.el,
      banner,
      h('div', { class: 'actions' }, endBtn, h('span', { class: 'spacer' }), rerollBtn, solutionBtn, checkBtn, nextBtn),
    ),
  );
}

function resultBanner(result) {
  const lv = level(result.score);
  const msg = { ok: 'Świetnie, wszystko poprawnie!', partial: 'Nieźle — przejrzyj uwagi poniżej.', bad: 'Warto wrócić do tego zagadnienia. Sprawdź poprawne odpowiedzi.' }[lv];
  const extra = result.total ? ` (${result.correct}/${result.total} poprawnie)` : '';
  return h('div', { class: `result-banner ${lv}`, role: 'status' },
    h('span', { class: 'score-big' }, `${pct(result.score)}%`),
    h('span', {}, msg + extra));
}

// ---------- przeciągnij i upuść ----------

function renderDnd(task) {
  const itemEls = new Map();
  const pool = h('div', { class: 'pool', 'aria-label': 'Elementy do rozmieszczenia' });
  const zoneBodies = new Map();

  const clearSelection = () => {
    state.selected?.classList.remove('selected');
    state.selected = null;
    root.querySelectorAll('.zone.target').forEach((z) => z.classList.remove('target'));
  };

  const place = (itemEl, zoneId) => {
    if (state.checked) return;
    const target = zoneId ? zoneBodies.get(zoneId) : pool;
    const zone = zoneId && task.zones.find((z) => z.id === zoneId);
    if (zone?.capacity && target.children.length >= zone.capacity) {
      const occupant = target.firstElementChild;
      if (occupant !== itemEl) pool.append(occupant);
    }
    target.append(itemEl);
    clearSelection();
  };

  for (const item of task.items) {
    const el = h('button', {
      class: 'item', type: 'button', draggable: 'true', dataset: { id: item.id },
      ondragstart: (e) => {
        if (state.checked) return e.preventDefault();
        e.dataTransfer.setData('text/plain', item.id);
        e.dataTransfer.effectAllowed = 'move';
        el.classList.add('dragging');
      },
      ondragend: () => el.classList.remove('dragging'),
      onclick: (e) => {
        e.stopPropagation();
        if (state.checked) return;
        if (state.selected === el) return clearSelection();
        clearSelection();
        state.selected = el;
        el.classList.add('selected');
        root.querySelectorAll('.zone').forEach((z) => z.classList.add('target'));
      },
    }, item.text);
    itemEls.set(item.id, el);
    pool.append(el);
  }

  const dropTarget = (el, zoneId) => {
    el.addEventListener('dragover', (e) => { if (!state.checked) { e.preventDefault(); el.classList.add('over'); } });
    el.addEventListener('dragleave', () => el.classList.remove('over'));
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      el.classList.remove('over');
      const itemEl = itemEls.get(e.dataTransfer.getData('text/plain'));
      if (itemEl) place(itemEl, zoneId);
    });
    const activate = () => { if (state.selected) place(state.selected, zoneId); };
    el.addEventListener('click', activate);
    return activate;
  };

  dropTarget(pool, null);

  const zones = h('div', { class: `zones ${task.layout}` }, task.zones.map((z) => {
    const body = h('div', { class: 'zone-body' });
    zoneBodies.set(z.id, body);
    const zoneEl = h('div', { class: 'zone', tabindex: '0', role: 'button', 'aria-label': `Upuść w: ${z.label}` },
      h('div', { class: 'zone-head' }, z.label, z.hint ? h('small', {}, z.hint) : null),
      body);
    const activate = dropTarget(zoneEl, z.id);
    zoneEl.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target === zoneEl) { e.preventDefault(); activate(); }
    });
    return zoneEl;
  }));

  const root = h('div', {},
    h('div', { class: 'label' }, 'Elementy'),
    pool,
    h('div', { class: 'label' }, task.layout === 'slots' ? 'Kolejność' : 'Pola docelowe'),
    zones);

  return {
    el: root,
    collect() {
      const answer = {};
      for (const [zoneId, body] of zoneBodies) {
        for (const el of body.children) answer[el.dataset.id] = zoneId;
      }
      return answer;
    },
    isEmpty: (a) => Object.keys(a).length === 0,
    showResult(result) {
      clearSelection();
      for (const d of result.details) {
        const el = itemEls.get(d.id);
        el.classList.add(d.ok ? 'ok' : 'bad');
        el.setAttribute('draggable', 'false');
        if (!d.ok) el.append(h('span', { class: 'fix' }, `Poprawnie: ${d.expected}`));
      }
    },
    showSolution() {
      const sol = solution(task);
      for (const [id, zoneId] of Object.entries(sol)) {
        const el = itemEls.get(id);
        zoneBodies.get(zoneId).append(el);
        const fix = el.querySelector('.fix');
        if (fix) fix.textContent = 'Tu powinno być — Twoja odpowiedź była inna';
      }
    },
  };
}

// ---------- pola do uzupełnienia i wyjaśnienia ----------

function renderForm(task) {
  const inputs = new Map();
  const wrappers = new Map();

  const fields = task.fields.map((f) => {
    let control;
    let content;
    if (f.kind === 'select') {
      control = h('select', { 'aria-label': f.prompt },
        h('option', { value: '' }, '— wybierz —'),
        f.options.map((o) => h('option', { value: o.value }, o.label)));
      content = [h('div', { class: 'field-prompt' }, f.prompt), control];
    } else if (f.kind === 'text') {
      control = h('input', { type: 'text', autocomplete: 'off', spellcheck: 'false', 'aria-label': f.prompt.replace('___', '…') });
      const [before, after = ''] = f.prompt.split('___');
      content = [h('div', { class: 'cloze' }, before, control, after)];
    } else {
      control = h('textarea', { 'aria-label': f.prompt, placeholder: 'Napisz pełnymi zdaniami…' });
      const counter = h('div', { class: 'word-count' }, `0 słów (min. ${f.minWords})`);
      control.addEventListener('input', () => {
        const n = normalize(control.value).split(' ').filter(Boolean).length;
        counter.textContent = `${n} słów (min. ${f.minWords})`;
      });
      content = [h('div', { class: 'field-prompt' }, f.prompt), control, counter];
    }
    inputs.set(f.id, control);
    const wrap = h('div', { class: 'field' }, content);
    wrappers.set(f.id, wrap);
    return wrap;
  });

  return {
    el: h('div', {}, fields),
    collect: () => Object.fromEntries([...inputs].map(([id, el]) => [id, el.value])),
    isEmpty: (a) => Object.values(a).every((v) => !String(v).trim()),
    showResult(result) {
      for (const d of result.details) {
        const f = task.fields.find((x) => x.id === d.id);
        const wrap = wrappers.get(d.id);
        const lv = level(d.score);
        inputs.get(d.id).disabled = true;
        wrap.classList.add(lv);
        let fb;
        if (f.kind === 'textarea') {
          fb = h('div', { class: `feedback ${lv}` },
            h('strong', {}, `Ocena odpowiedzi: ${pct(d.score)}%`),
            d.note ? h('div', {}, d.note) : null,
            h('div', { class: 'model' }, `Kluczowe pojęcia (wystarczy ${d.need} z ${d.concepts.length}):`),
            h('ul', { class: 'concepts' }, d.concepts.map((c) => h('li', { class: c.hit ? 'hit' : 'miss' }, c.label))),
            h('div', { class: 'model' }, h('strong', {}, 'Przykładowa odpowiedź: '), d.expected));
        } else if (d.ok) {
          fb = h('div', { class: 'feedback ok' }, '✓ Dobrze!');
        } else {
          fb = h('div', { class: 'feedback bad' }, '✗ Poprawna odpowiedź: ', h('strong', {}, d.expected));
        }
        wrap.append(fb);
      }
    },
  };
}

// ---------- podsumowanie ----------

function renderSummary() {
  const scored = state.results.map((r, i) => ({ r, t: state.tasks[i] })).filter((x) => x.r != null);
  if (!scored.length) return renderStart();
  const avg = scored.reduce((s, x) => s + x.r, 0) / scored.length;
  const p = pct(avg);
  const g = gradeLabel(p);

  const history = storage.get(HISTORY_KEY, []);
  history.unshift({ date: Date.now(), pct: p, count: scored.length, topics: [...new Set(scored.map((x) => x.t.topic))] });
  storage.set(HISTORY_KEY, history.slice(0, 20));

  const byTopic = Object.keys(TOPICS).map((topic) => {
    const xs = scored.filter((x) => x.t.topic === topic);
    return xs.length ? { topic, score: xs.reduce((s, x) => s + x.r, 0) / xs.length } : null;
  }).filter(Boolean);

  state.tasks = [];
  screen(
    h('h1', {}, 'Podsumowanie'),
    h('section', { class: 'card summary-score' },
      h('div', { class: 'ring', style: `--p:${p}` }, h('div', {}, `${p}%`)),
      h('div', {},
        h('div', { class: 'label' }, 'Ocena'),
        h('div', { class: 'mark' }, g.mark),
        h('div', { class: 'muted' }, `${g.text} · ${scored.length} ${scored.length === 1 ? 'zadanie' : 'zadań'} sprawdzonych`))),
    byTopic.length > 1 ? h('section', { class: 'card' },
      h('div', { class: 'label' }, 'Wynik według tematu'),
      h('ul', { class: 'summary-list' }, byTopic.map((b) => h('li', {},
        h('span', {}, TOPICS[b.topic]), h('span', { class: `pct ${level(b.score)}` }, `${pct(b.score)}%`))))) : null,
    h('section', { class: 'card' },
      h('div', { class: 'label' }, 'Zadania'),
      h('ul', { class: 'summary-list' }, scored.map(({ r, t }) => h('li', {},
        h('span', {}, t.title, h('span', { class: 'muted' }, ` · ${MODES[t.mode]}`)),
        h('span', { class: `pct ${level(r)}` }, `${pct(r)}%`))))),
    h('div', { class: 'actions' },
      h('button', { class: 'btn btn-ghost', type: 'button', onclick: renderStart }, 'Zmień ustawienia'),
      h('button', { class: 'btn btn-primary', type: 'button', onclick: startSession }, 'Nowy zestaw zadań →')),
  );
}

document.getElementById('home-link').addEventListener('click', (e) => {
  e.preventDefault();
  if (state.tasks.length && !confirm('Wrócić do strony startowej? Bieżąca sesja zostanie przerwana.')) return;
  renderStart();
});

renderStart();
