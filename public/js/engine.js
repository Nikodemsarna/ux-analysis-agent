// Losowanie zadań i ocenianie odpowiedzi. Moduł nie dotyka DOM — działa też w Node (testy).
import {
  EMPATHY_QUADRANTS, PERSONAS, JOURNEY_STAGES, JOURNEYS, JOURNEY_MAP_LAYERS,
  JOURNEY_MAP_ITEMS, HEURISTICS, HEURISTIC_SCENARIOS, THEORY, DCJ_THEORY, DCJ_CONCEPTS,
  TOUCHPOINT_TYPES, TOUCHPOINT_ITEMS,
} from './data.js';

export const TOPICS = {
  empathy: 'Mapa empatii',
  journey: 'Digital Customer Journey',
  heuristics: 'Heurystyki Nielsena',
};

export const MODES = {
  dnd: 'Przeciągnij i upuść',
  fill: 'Uzupełnij',
  open: 'Wyjaśnij',
};

// ---------- narzędzia ----------

export function normalize(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[„”"“'’.,;:!?()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

export function matchesShortAnswer(input, { accept = [], stems = [] }) {
  const value = normalize(input);
  if (!value) return false;
  const words = value.split(' ');
  if (accept.some((a) => {
    const n = normalize(a);
    const tolerance = n.length >= 7 ? 2 : n.length >= 4 ? 1 : 0;
    return value === n || words.includes(n) || levenshtein(value, n) <= tolerance;
  })) return true;
  return stems.some((s) => words.some((w) => w.startsWith(normalize(s))));
}

export function keywordHits(text, groups) {
  const value = ` ${normalize(text)} `;
  return groups.map((g) => g.any.some((k) => value.includes(normalize(k))));
}

const rand = (n) => Math.floor(Math.random() * n);

export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const sample = (list, n) => shuffle(list).slice(0, n);

// Wybiera element, którego id nie pojawiło się jeszcze w sesji (jeśli to możliwe).
function pickFresh(list, used, key = (x) => x.id) {
  const fresh = list.filter((x) => !used.has(key(x)));
  const choice = (fresh.length ? fresh : list)[rand((fresh.length ? fresh : list).length)];
  used.add(key(choice));
  return choice;
}

function sampleFresh(list, n, used, key = (x) => x.id) {
  const fresh = shuffle(list.filter((x) => !used.has(key(x))));
  const rest = shuffle(list.filter((x) => used.has(key(x))));
  const chosen = [...fresh, ...rest].slice(0, n);
  chosen.forEach((x) => used.add(key(x)));
  return chosen;
}

let uid = 0;
const nextId = (prefix) => `${prefix}${++uid}`;

const heuristicLabel = (h) => `${h.n}. ${h.name}`;
const heuristicOptions = () => HEURISTICS.map((h) => ({ value: String(h.n), label: heuristicLabel(h) }));

// ---------- ocenianie ----------

function gradeDnd(task, answer = {}) {
  const details = task.items.map((item) => {
    const placed = answer[item.id] ?? null;
    return {
      id: item.id,
      ok: placed === item.target,
      text: item.text,
      expected: task.zones.find((z) => z.id === item.target).label,
      given: placed ? task.zones.find((z) => z.id === placed)?.label : null,
    };
  });
  const correct = details.filter((d) => d.ok).length;
  return { score: correct / details.length, correct, total: details.length, details };
}

function gradeField(field, value) {
  if (field.kind === 'select') {
    const ok = String(value ?? '') === field.correct;
    return { ok, score: ok ? 1 : 0, expected: field.options.find((o) => o.value === field.correct).label };
  }
  if (field.kind === 'text') {
    if (field.nameKeys) {
      const v = ` ${normalize(value)} `;
      const ok = field.nameKeys.every((group) => group.some((k) => v.includes(k)));
      return { ok, score: ok ? 1 : 0, expected: field.answer };
    }
    const ok = matchesShortAnswer(value, field);
    return { ok, score: ok ? 1 : 0, expected: field.answer };
  }
  // textarea — ocena przez wyszukiwanie kluczowych pojęć
  const words = normalize(value).split(' ').filter(Boolean).length;
  const hits = keywordHits(value, field.keywords);
  const found = hits.filter(Boolean).length;
  const need = field.need ?? Math.min(2, field.keywords.length);
  let score = Math.min(1, found / need);
  let note = null;
  if (words < field.minWords) {
    score = 0;
    note = `Odpowiedź jest za krótka (minimum ${field.minWords} słów).`;
  }
  return {
    ok: score >= 1,
    score,
    note,
    expected: field.model,
    concepts: field.keywords.map((g, i) => ({ label: g.label, hit: hits[i] && words >= field.minWords })),
    need,
  };
}

function gradeForm(task, answer = {}) {
  let total = 0;
  let weights = 0;
  const details = task.fields.map((f) => {
    const r = gradeField(f, answer[f.id]);
    const w = f.weight ?? 1;
    total += r.score * w;
    weights += w;
    return { id: f.id, ...r };
  });
  return { score: total / weights, details };
}

export function grade(task, answer) {
  return task.type === 'dnd' ? gradeDnd(task, answer) : gradeForm(task, answer);
}

// Wzorcowa odpowiedź — używana w testach i do podglądu „pokaż rozwiązanie”.
export function solution(task) {
  if (task.type === 'dnd') return Object.fromEntries(task.items.map((i) => [i.id, i.target]));
  return Object.fromEntries(task.fields.map((f) => {
    if (f.kind === 'select') return [f.id, f.correct];
    if (f.kind === 'textarea') return [f.id, f.model];
    return [f.id, f.answer];
  }));
}

// ---------- generatory ----------

const theoryRefs = (...ids) => ids.map((id) => DCJ_THEORY.find((t) => t.id === id));

function dndTask({ topic, title, instructions, context, zones, items, layout, theory, theoryAfterCheck }) {
  return {
    id: nextId('t'), topic, mode: 'dnd', type: 'dnd', title, instructions, context, layout, theory, theoryAfterCheck,
    zones,
    items: shuffle(items.map((it) => ({ id: nextId('i'), ...it }))),
  };
}

function formTask({ topic, mode, title, instructions, context, fields, theory, theoryAfterCheck }) {
  return {
    id: nextId('t'), topic, mode, type: 'form', title, instructions, context, theory, theoryAfterCheck,
    fields: fields.map((f) => ({ id: nextId('f'), minWords: 6, ...f })),
  };
}

const personaContext = (p) => ({ kind: 'persona', title: p.name, subtitle: p.role, text: p.context });

const GENERATORS = [
  {
    key: 'empathy-sort', topic: 'empathy', mode: 'dnd',
    make(used) {
      const persona = pickFresh(PERSONAS, used);
      const extended = Math.random() < 0.5;
      const zones = EMPATHY_QUADRANTS.slice(0, extended ? 6 : 4);
      const items = zones.flatMap((z) => sample(persona[z.id], 2)
        .map((text) => ({ text, target: z.id })));
      return dndTask({
        topic: 'empathy',
        title: extended ? 'Rozszerzona mapa empatii' : 'Mapa empatii — przyporządkuj obserwacje',
        instructions: 'Przeciągnij każdą notatkę z badań do właściwej części mapy empatii (albo kliknij notatkę, a potem pole).',
        context: [personaContext(persona)],
        zones, items, layout: 'grid',
      });
    },
  },
  {
    key: 'empathy-classify', topic: 'empathy', mode: 'fill',
    make(used) {
      const persona = pickFresh(PERSONAS, used);
      const zones = EMPATHY_QUADRANTS.slice(0, 4);
      const options = zones.map((z) => ({ value: z.id, label: z.label }));
      const picks = shuffle(zones).slice(0, 4).map((z) => ({ z, text: sample(persona[z.id], 1)[0] }));
      return formTask({
        topic: 'empathy', mode: 'fill',
        title: 'Która to ćwiartka mapy empatii?',
        instructions: 'Dla każdej notatki z wywiadu wybierz, do której ćwiartki mapy empatii należy.',
        context: [personaContext(persona)],
        fields: picks.map(({ z, text }) => ({ kind: 'select', prompt: text, options, correct: z.id })),
      });
    },
  },
  {
    key: 'empathy-insight', topic: 'empathy', mode: 'open',
    make(used) {
      const persona = pickFresh(PERSONAS, used);
      const rows = ['says', 'thinks', 'does', 'feels'].map((q) => ({
        label: EMPATHY_QUADRANTS.find((z) => z.id === q).label,
        items: sample(persona[q], 2),
      }));
      return formTask({
        topic: 'empathy', mode: 'open',
        title: 'Od mapy empatii do pytania „Jak moglibyśmy…?”',
        instructions: 'Przeanalizuj mapę empatii. Nazwij najważniejszy problem (pain point) użytkownika, a potem sformułuj pytanie „Jak moglibyśmy…?” (How Might We), które otworzy fazę generowania pomysłów.',
        context: [personaContext(persona), { kind: 'map', rows }],
        fields: [
          {
            kind: 'textarea', weight: 1,
            prompt: 'Najważniejszy problem (pain point) użytkownika i uzasadnienie na podstawie mapy:',
            keywords: persona.painKeywords, need: 1,
            model: `Np. „${persona.pains[0]}” — widać to w notatkach z mapy (co mówi, myśli i czuje użytkownik), a problem ten bezpośrednio blokuje jego cel.`,
          },
          {
            kind: 'textarea', weight: 1,
            prompt: 'Pytanie „Jak moglibyśmy…?”:',
            keywords: [
              { label: 'forma „Jak moglibyśmy…”', any: ['jak moglibysmy', 'jak mozemy', 'how might we'] },
              { label: 'odniesienie do problemu użytkownika', any: persona.painKeywords.flatMap((g) => g.any) },
            ],
            need: 2, minWords: 5,
            model: `Jak moglibyśmy sprawić, by ${persona.name.split(',')[0]} nie musiał(a) mierzyć się z problemem: ${persona.pains[0].toLowerCase()}?`,
          },
        ],
      });
    },
  },
  {
    key: 'journey-order', topic: 'journey', mode: 'dnd',
    make(used) {
      const j = pickFresh(JOURNEYS, used);
      const zones = JOURNEY_STAGES.map((s, i) => ({ id: s.id, label: `Krok ${i + 1}`, capacity: 1 }));
      const items = JOURNEY_STAGES.map((s) => ({ text: sample(j.actions[s.id], 1)[0], target: s.id }));
      return dndTask({
        topic: 'journey',
        title: 'Ułóż Digital Customer Journey w kolejności',
        instructions: 'Ułóż działania klienta w kolejności, w jakiej występują w Digital Customer Journey — od pierwszego kontaktu z marką do lojalności.',
        context: [{ kind: 'scenario', title: j.title, text: j.persona }],
        zones, items, layout: 'slots',
        theory: theoryRefs('definition', '5a'),
      });
    },
  },
  {
    key: 'journey-stages', topic: 'journey', mode: 'dnd',
    make(used) {
      const j = pickFresh(JOURNEYS, used);
      const zones = JOURNEY_STAGES.map((s) => ({ id: s.id, label: s.label, hint: s.hint }));
      const items = JOURNEY_STAGES.flatMap((s) => j.actions[s.id].map((text) => ({ text, target: s.id })));
      return dndTask({
        topic: 'journey',
        title: 'Przypisz działania do etapów Digital Customer Journey',
        instructions: 'Przeciągnij każde działanie do etapu Digital Customer Journey, w którym występuje.',
        context: [{ kind: 'scenario', title: j.title, text: j.persona }],
        zones, items, layout: 'columns',
        theory: theoryRefs('5a', 'mckinsey', 'zmot'),
      });
    },
  },
  {
    key: 'journey-layers', topic: 'journey', mode: 'dnd',
    make() {
      const items = JOURNEY_MAP_LAYERS.flatMap((l) => sample(JOURNEY_MAP_ITEMS[l.id], 2).map((text) => ({ text, target: l.id })));
      return dndTask({
        topic: 'journey',
        title: 'Warstwy mapy customer journey',
        instructions: 'Mapa customer journey ma kilka warstw (wierszy). Przyporządkuj każdą notatkę do właściwej warstwy.',
        context: [{ kind: 'scenario', title: 'Zakupy odzieży w sklepie internetowym', text: 'Notatki z warsztatu, na którym zespół tworzył mapę Digital Customer Journey klientki kupującej kurtkę online.' }],
        zones: JOURNEY_MAP_LAYERS, items, layout: 'columns',
        theory: theoryRefs('map'),
      });
    },
  },
  {
    key: 'journey-pain', topic: 'journey', mode: 'open',
    make(used) {
      const j = pickFresh(JOURNEYS, used, (x) => `pain-${x.id}`);
      const options = JOURNEY_STAGES.map((s) => ({ value: s.id, label: s.label }));
      return formTask({
        topic: 'journey', mode: 'open',
        title: 'Znajdź pain point i zaproponuj szansę',
        instructions: 'Przeczytaj opis mapy customer journey. Wskaż etap z największym problemem i zaproponuj konkretne usprawnienie (szansę).',
        theory: theoryRefs('map', 'peakend'),
        context: [
          { kind: 'scenario', title: j.title, text: j.persona },
          { kind: 'journey', steps: JOURNEY_STAGES.map((s) => ({ stage: s.label, text: j.pain.steps[s.id][0], emotion: j.pain.steps[s.id][1] })) },
        ],
        fields: [
          { kind: 'select', prompt: 'Na którym etapie występuje największy pain point?', options, correct: j.pain.stage, weight: 1 },
          { kind: 'textarea', prompt: 'Zaproponuj usprawnienie (szansę) dla tego etapu i krótko je uzasadnij:', keywords: j.pain.keywords, need: 2, model: j.pain.model, weight: 2 },
        ],
      });
    },
  },
  {
    key: 'journey-touchpoints', topic: 'journey', mode: 'dnd',
    make() {
      const items = TOUCHPOINT_TYPES.flatMap((t) => sample(TOUCHPOINT_ITEMS[t.id], 2).map((text) => ({ text, target: t.id })));
      return dndTask({
        topic: 'journey',
        title: 'Typy punktów styku w Digital Customer Journey',
        instructions: 'Przyporządkuj każdy punkt styku do kategorii według Lemon i Verhoef (2016): kto go kontroluje?',
        context: [{ kind: 'scenario', title: 'Zakup sprzętu elektronicznego online', text: 'Punkty styku zebrane podczas analizy ścieżki klientów sklepu internetowego z elektroniką.' }],
        zones: TOUCHPOINT_TYPES, items, layout: 'columns',
        theory: theoryRefs('touchpoints', 'digital'),
        theoryAfterCheck: true,
      });
    },
  },
  {
    key: 'journey-models', topic: 'journey', mode: 'dnd',
    make() {
      const concepts = sample(DCJ_CONCEPTS, 5);
      return dndTask({
        topic: 'journey',
        title: 'Teoria customer journey — dopasuj pojęcia',
        instructions: 'Przeciągnij każdą definicję na pojęcie lub model z teorii customer journey, który opisuje.',
        context: [],
        zones: concepts.map((c, i) => ({ id: `c${i}`, label: c.label, capacity: 1 })),
        items: concepts.map((c, i) => ({ text: c.def, target: `c${i}` })),
        layout: 'list',
        theory: theoryRefs('definition', '5a', 'mckinsey', 'zmot'),
        theoryAfterCheck: true,
      });
    },
  },
  {
    key: 'heuristics-match', topic: 'heuristics', mode: 'dnd',
    make(used) {
      const hs = sample(HEURISTICS, 5);
      const items = hs.map((h) => {
        const sc = pickFresh(HEURISTIC_SCENARIOS.filter((s) => s.h === h.n), used);
        return { text: sc.text, target: `h${h.n}` };
      });
      return dndTask({
        topic: 'heuristics',
        title: 'Dopasuj problem do heurystyki',
        instructions: 'Każdy opis to problem znaleziony podczas oceny heurystycznej. Przeciągnij go na heurystykę Nielsena, którą narusza.',
        context: [],
        zones: hs.sort((a, b) => a.n - b.n).map((h) => ({ id: `h${h.n}`, label: heuristicLabel(h), capacity: 1 })),
        items, layout: 'list',
      });
    },
  },
  {
    key: 'heuristics-identify', topic: 'heuristics', mode: 'fill',
    make(used) {
      const scenarios = sampleFresh(HEURISTIC_SCENARIOS, 20, used)
        .filter((s, i, arr) => arr.findIndex((x) => x.h === s.h) === i)
        .slice(0, 4);
      return formTask({
        topic: 'heuristics', mode: 'fill',
        title: 'Która heurystyka została naruszona?',
        instructions: 'Dla każdego problemu wybierz z listy heurystykę Nielsena, którą narusza.',
        context: [],
        fields: scenarios.map((s) => ({ kind: 'select', prompt: s.text, options: heuristicOptions(), correct: String(s.h) })),
      });
    },
  },
  {
    key: 'heuristics-names', topic: 'heuristics', mode: 'fill',
    make() {
      const hs = sample(HEURISTICS, 3).sort((a, b) => a.n - b.n);
      return formTask({
        topic: 'heuristics', mode: 'fill',
        title: 'Uzupełnij nazwy heurystyk',
        instructions: 'Wpisz nazwy heurystyk Nielsena o podanych numerach. Liczy się sens — drobne różnice w sformułowaniu są akceptowane.',
        context: [],
        fields: hs.map((h) => ({ kind: 'text', prompt: `Heurystyka nr ${h.n}: ___`, nameKeys: h.nameKeys, answer: h.name })),
      });
    },
  },
  {
    key: 'heuristics-fix', topic: 'heuristics', mode: 'open',
    make(used) {
      const sc = pickFresh(HEURISTIC_SCENARIOS, used);
      return formTask({
        topic: 'heuristics', mode: 'open',
        title: 'Diagnoza i rekomendacja',
        instructions: 'Wskaż naruszoną heurystykę i zaproponuj konkretną zmianę w projekcie, która usunie problem.',
        context: [{ kind: 'scenario', title: 'Problem zgłoszony w ocenie heurystycznej', text: sc.text }],
        fields: [
          { kind: 'select', prompt: 'Naruszona heurystyka:', options: heuristicOptions(), correct: String(sc.h), weight: 1 },
          { kind: 'textarea', prompt: 'Rekomendacja — co konkretnie zmienić i dlaczego:', keywords: sc.fix, need: sc.need ?? 2, model: sc.model, weight: 2 },
        ],
      });
    },
  },
  ...Object.keys(THEORY).map((topic) => ({
    key: `${topic}-theory`, topic, mode: 'fill',
    make(used) {
      const qs = sampleFresh(THEORY[topic], 4, used, (q) => q.text);
      return formTask({
        topic, mode: 'fill',
        title: `Uzupełnij luki: ${TOPICS[topic]}`,
        instructions: 'Wpisz brakujące słowo lub wyrażenie w każdej luce.',
        context: [],
        fields: qs.map((q) => ({ kind: 'text', prompt: q.text, accept: q.accept ?? [], stems: q.stems ?? [], answer: q.answer })),
        theory: topic === 'journey' ? theoryRefs('definition', 'zmot', 'mckinsey') : undefined,
        theoryAfterCheck: true,
      });
    },
  })),
];

export const GENERATOR_KEYS = GENERATORS.map((g) => g.key);

export function makeTask(key, used = new Set()) {
  const g = GENERATORS.find((x) => x.key === key);
  return { ...g.make(used), generator: key };
}

// Losuje zestaw zadań z wybranych tematów i rodzajów; unika powtórzeń tego samego typu pod rząd.
export function buildSession({ topics = Object.keys(TOPICS), modes = Object.keys(MODES), count = 6 } = {}) {
  const pool = GENERATORS.filter((g) => topics.includes(g.topic) && modes.includes(g.mode));
  if (!pool.length) return [];
  const used = new Set();
  const tasks = [];
  let bag = [];
  let last = null;
  while (tasks.length < count) {
    if (!bag.length) bag = shuffle(pool);
    let idx = bag.findIndex((g) => g.key !== last);
    if (idx < 0) idx = 0;
    const [g] = bag.splice(idx, 1);
    tasks.push(makeTask(g.key, used));
    last = g.key;
  }
  return tasks;
}

export function gradeLabel(percent) {
  if (percent >= 90) return { mark: '5', text: 'bardzo dobry' };
  if (percent >= 80) return { mark: '4+', text: 'dobry plus' };
  if (percent >= 70) return { mark: '4', text: 'dobry' };
  if (percent >= 60) return { mark: '3+', text: 'dostateczny plus' };
  if (percent >= 50) return { mark: '3', text: 'dostateczny' };
  return { mark: '2', text: 'niedostateczny' };
}

export { HEURISTICS, JOURNEY_STAGES, EMPATHY_QUADRANTS, DCJ_THEORY };
