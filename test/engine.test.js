import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  GENERATOR_KEYS, makeTask, grade, solution, buildSession, matchesShortAnswer, normalize, TOPICS, MODES,
} from '../public/js/engine.js';

test('każdy generator tworzy zadanie, które wzorcowa odpowiedź zalicza na 100%', () => {
  for (const key of GENERATOR_KEYS) {
    for (let i = 0; i < 60; i++) {
      const task = makeTask(key);
      const result = grade(task, solution(task));
      assert.equal(result.score, 1, `${key}: ${JSON.stringify(result.details.filter((d) => !d.ok))}`);
    }
  }
});

test('pusta odpowiedź daje 0 punktów', () => {
  for (const key of GENERATOR_KEYS) {
    const task = makeTask(key);
    assert.equal(grade(task, {}).score, 0, key);
  }
});

test('zadania przeciągania mają poprawne strefy i unikalne elementy', () => {
  for (const key of GENERATOR_KEYS) {
    const task = makeTask(key);
    if (task.type !== 'dnd') continue;
    const zoneIds = new Set(task.zones.map((z) => z.id));
    for (const item of task.items) assert.ok(zoneIds.has(item.target), key);
    assert.equal(new Set(task.items.map((i) => i.text)).size, task.items.length, key);
  }
});

test('sesja respektuje filtry i liczbę zadań', () => {
  const tasks = buildSession({ topics: ['heuristics'], modes: ['fill'], count: 7 });
  assert.equal(tasks.length, 7);
  assert.ok(tasks.every((t) => t.topic === 'heuristics' && t.mode === 'fill'));
  const all = buildSession({ topics: Object.keys(TOPICS), modes: Object.keys(MODES), count: 10 });
  for (let i = 1; i < all.length; i++) assert.notEqual(all[i].generator, all[i - 1].generator);
  assert.deepEqual(buildSession({ topics: [], count: 3 }), []);
});

test('krótkie odpowiedzi tolerują literówki i odmianę', () => {
  assert.equal(normalize('Łódź  Żółć'), 'lodz zolc');
  assert.ok(matchesShortAnswer('Nielsen', { accept: ['nielsen'] }));
  assert.ok(matchesShortAnswer('Nielson', { accept: ['nielsen'] }));
  assert.ok(matchesShortAnswer('personę', { stems: ['person'] }));
  assert.ok(!matchesShortAnswer('Norman', { accept: ['nielsen'] }));
});

test('ocena opisowa: częściowe punkty i minimalna długość', () => {
  const task = makeTask('heuristics-fix');
  const field = task.fields[1];
  const short = grade(task, { [field.id]: field.model.split(' ').slice(0, 3).join(' ') });
  assert.equal(short.details[1].score, 0);
  const sel = grade(task, { [task.fields[0].id]: task.fields[0].correct, [field.id]: 'nie wiem co tu napisać, nic mi nie przychodzi do głowy' });
  assert.ok(sel.score > 0 && sel.score < 1);
});

test('zadania Digital Customer Journey mają odwołania do teorii ze źródłami', () => {
  for (const key of GENERATOR_KEYS.filter((k) => k.startsWith('journey-'))) {
    const task = makeTask(key);
    assert.ok(task.theory?.length, key);
    for (const t of task.theory) assert.ok(t && t.name && t.text && t.source, key);
  }
});

test('każdy model teoretyczny DCJ jest opisany w 2–3 zdaniach', async () => {
  const { DCJ_THEORY, DCJ_CONCEPTS, THEORY } = await import('../public/js/data.js');
  const ids = new Set(DCJ_THEORY.map((t) => t.id));
  for (const t of DCJ_THEORY) {
    const sentences = t.text.split(/(?<=[.!?])\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ„])/).filter(Boolean);
    assert.ok(sentences.length >= 2 && sentences.length <= 3, `${t.id}: ${sentences.length} zdań`);
  }
  for (const c of DCJ_CONCEPTS) assert.ok(ids.has(c.theory), c.label);
  for (const q of THEORY.journey) assert.ok(ids.has(q.theory), q.text);
});
