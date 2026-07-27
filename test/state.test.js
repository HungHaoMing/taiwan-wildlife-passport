import { describe, expect, it } from 'vitest';
import { eventConfig } from '../src/config/eventConfig.js';
import { initialState, sanitizeNickname, sanitizeMessage, normalizeState, saveState, loadState, validateStamp, addStamp, exportState, importState, STORAGE_KEY } from '../src/state.js';

function memoryStorage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key), values };
}

describe('participant data', () => {
  it('accepts English, Traditional Chinese, and Japanese while stripping control characters and limiting nickname length', () => {
    expect(sanitizeNickname('  Alice台灣あいう  ')).toBe('Alice台灣あいう');
    expect(sanitizeNickname('<img onerror=alert(1)>')).toHaveLength(20);
    expect(sanitizeNickname('A\u0000B')).toBe('AB');
  });

  it('limits keyboard messages to 100 characters', () => {
    expect(sanitizeMessage('x'.repeat(140))).toHaveLength(100);
  });

  it('validates both animal id and its unique token', () => {
    const animal = eventConfig.animals[0];
    expect(validateStamp(animal.id, animal.token)?.id).toBe(animal.id);
    expect(validateStamp(animal.id, 'wrong')).toBeNull();
    expect(validateStamp('animal99', animal.token)).toBeNull();
  });

  it('adds six stamps in any order, prevents duplicates, and records completion', () => {
    let state = { ...initialState(), nickname: 'Tester' };
    const order = [4, 1, 5, 0, 3, 2];
    for (const index of order) state = addStamp(state, eventConfig.animals[index].id).state;
    expect(state.stamps).toHaveLength(6);
    expect(state.completedAt).not.toBe('');
    const duplicate = addStamp(state, eventConfig.animals[0].id);
    expect(duplicate.added).toBe(false);
    expect(duplicate.state.stamps).toHaveLength(6);
  });

  it('survives save and reload in the same browser storage', () => {
    const storage = memoryStorage();
    const source = { ...initialState(), nickname: '再開啟', stamps: ['animal03'], textMessage: 'Saved' };
    expect(saveState(source, storage)).toBe(true);
    expect(storage.values.has(STORAGE_KEY)).toBe(true);
    expect(loadState(storage)).toMatchObject({ nickname: '再開啟', stamps: ['animal03'], textMessage: 'Saved' });
  });

  it('normalizes tampered or old browser data safely', () => {
    expect(normalizeState({ nickname: 123, stamps: ['animal01', 'animal01', 'bad'], language: 'bad' })).toMatchObject({ nickname: '123', stamps: ['animal01'], language: 'en' });
  });

  it('exports and imports progress without a backend', () => {
    const source = { ...initialState(), nickname: 'Portable', stamps: ['animal02'] };
    expect(importState(exportState(source))).toMatchObject({ nickname: 'Portable', stamps: ['animal02'] });
    expect(() => importState('{"wrong":true}')).toThrow('invalid-import');
  });
});

describe('central configuration', () => {
  it('defines six independent assets, secure-looking tokens, and relative placements', () => {
    expect(eventConfig.animals).toHaveLength(6);
    expect(new Set(eventConfig.animals.map((animal) => animal.token)).size).toBe(6);
    for (const animal of eventConfig.animals) {
      expect(animal.token.length).toBeGreaterThanOrEqual(16);
      expect(animal.animalImage).toMatch(/^assets\//);
      expect(animal.stampImage).toMatch(/^assets\//);
      for (const value of [animal.stampX, animal.stampY, animal.stampWidth, animal.stampHeight]) expect(value).toBeGreaterThan(0);
    }
  });

  it('maps the supplied postcard and stamps in left-to-right animal order', () => {
    expect(eventConfig.cardDesigns[0]).toMatchObject({ image: 'assets/event/postcard.jpg', width: 1323, height: 901 });
    expect(eventConfig.output).toMatchObject({ width: 2646, height: 1802 });
    expect(eventConfig.animals.map((animal) => animal.nameZh)).toEqual([
      '臺灣黑熊', '臺灣獼猴', '臺灣雲豹', '帝雉', '白面鼯鼠', '臺灣琉璃小灰蝶',
    ]);
    expect(eventConfig.animals.map((animal) => animal.stampX)).toEqual([...eventConfig.animals.map((animal) => animal.stampX)].sort((a, b) => a - b));
    expect(eventConfig.animals.every((animal) => animal.stampImage.startsWith('assets/event/'))).toBe(true);
  });

  it('contains complete Japanese and Traditional Chinese interface translations', () => {
    const englishKeys = Object.keys(eventConfig.text.en).sort();
    expect(Object.keys(eventConfig.text.ja).sort()).toEqual(englishKeys);
    expect(Object.keys(eventConfig.text['zh-TW']).sort()).toEqual(englishKeys);
    expect(eventConfig.text.ja.start).not.toBe(eventConfig.text.en.start);
    expect(eventConfig.text['zh-TW'].start).not.toBe(eventConfig.text.en.start);
  });
});
