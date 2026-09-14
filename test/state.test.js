import { describe, expect, it } from 'vitest';
import { eventConfig } from '../src/config/eventConfig.js';
import { initialState, sanitizeNickname, sanitizeMessage, normalizeState, saveState, loadState, validateStamp, addStamp, submissionNeedsUpdate, exportState, importState, STORAGE_KEY } from '../src/state.js';

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

  it('adds all configured stamps in any order, prevents duplicates, and records completion', () => {
    let state = { ...initialState(), nickname: 'Tester' };
    const order = [4, 1, 6, 5, 0, 3, 2];
    for (const index of order) state = addStamp(state, eventConfig.animals[index].id).state;
    expect(state.stamps).toHaveLength(eventConfig.animals.length);
    expect(state.completedAt).not.toBe('');
    const duplicate = addStamp(state, eventConfig.animals[0].id);
    expect(duplicate.added).toBe(false);
    expect(duplicate.state.stamps).toHaveLength(eventConfig.animals.length);
  });

  it('survives save and reload in the same browser storage', () => {
    const storage = memoryStorage();
    const source = { ...initialState(), nickname: '再開啟', stamps: ['animal01', 'animal02', 'animal03', 'animal04', 'animal05'], textMessage: 'Saved', submissionId: 'submission-id', redemptionCode: '7K3M9Q', submissionStatus: 'pending', submittedStampCount: 5 };
    expect(saveState(source, storage)).toBe(true);
    expect(storage.values.has(STORAGE_KEY)).toBe(true);
    const loaded = loadState(storage);
    expect(loaded).toMatchObject({ nickname: '再開啟', textMessage: 'Saved', submissionId: 'submission-id', redemptionCode: '7K3M9Q', submissionStatus: 'pending', submittedStampCount: 5 });
    expect(loaded.participantId).toBe(source.participantId);
    expect(loaded.idempotencyKey).toBe(source.idempotencyKey);
  });

  it('marks a five-stamp pending submission for update after collecting the sixth or seventh stamp', () => {
    let state = { ...initialState(), nickname: '更新測試', stamps: ['animal01', 'animal02', 'animal03', 'animal04', 'animal05'], submissionId: 'submission-id', redemptionCode: '7K3M9Q', submissionStatus: 'pending', submittedStampCount: 5 };
    expect(submissionNeedsUpdate(state)).toBe(false);
    state = addStamp(state, 'animal06').state;
    expect(submissionNeedsUpdate(state)).toBe(true);
    state = addStamp(state, 'animal07').state;
    expect(submissionNeedsUpdate(state)).toBe(true);
    expect(submissionNeedsUpdate({ ...state, submittedStampCount: 7 })).toBe(false);
  });

  it('normalizes tampered or old browser data safely', () => {
    const normalized = normalizeState({ nickname: 123, stamps: ['animal01', 'animal01', 'bad'], language: 'bad', participantId: '../../bad', redemptionCode: '<script>' });
    expect(normalized).toMatchObject({ nickname: '123', stamps: ['animal01'], language: 'en', redemptionCode: '' });
    expect(normalized.participantId).toMatch(/^participant:[A-Za-z0-9-]+$/);
    expect(normalized.idempotencyKey).toMatch(/^submission:[A-Za-z0-9-]+$/);
  });

  it('exports and imports progress without a backend', () => {
    const source = { ...initialState(), nickname: 'Portable', stamps: ['animal02'] };
    expect(importState(exportState(source))).toMatchObject({ nickname: 'Portable', stamps: ['animal02'] });
    expect(() => importState('{"wrong":true}')).toThrow('invalid-import');
  });
});

describe('central configuration', () => {
  it('defines seven independent assets, secure-looking tokens, and relative placements', () => {
    expect(eventConfig.animals).toHaveLength(7);
    expect(new Set(eventConfig.animals.map((animal) => animal.token)).size).toBe(7);
    for (const animal of eventConfig.animals) {
      expect(animal.token.length).toBeGreaterThanOrEqual(16);
      expect(animal.animalImage).toMatch(/^assets\//);
      expect(animal.stampImage).toMatch(/^assets\//);
      for (const value of [animal.stampX, animal.stampY, animal.stampWidth, animal.stampHeight]) expect(value).toBeGreaterThan(0);
    }
  });

  it('maps the supplied 2026 TIE card and centers seven rotated stamps on its white spaces', () => {
    expect(eventConfig.cardDesigns[0]).toMatchObject({ image: 'assets/event/2026-tie/point-card-source.png', width: 1748, height: 1240 });
    expect(eventConfig.output).toMatchObject({ width: 3496, height: 2480 });
    expect(eventConfig.animals.map((animal) => animal.nameZh)).toEqual([
      '作品 1', '作品 2', '作品 3', '作品 4', '作品 5', '作品 6', '作品 7',
    ]);
    expect(eventConfig.animals.every((animal) => animal.stampRotation === 14.9)).toBe(true);
    expect(eventConfig.animals.every((animal) => animal.stampImage.startsWith('assets/event/'))).toBe(true);
    expect(eventConfig.animals.every((animal) => animal.stampImage.endsWith('.png'))).toBe(true);
    expect(eventConfig.placements.personalization).toBeNull();
    expect(eventConfig.submission).toMatchObject({
      apiBaseUrl: 'https://stamp-api.bbqhung.org',
      endpoint: '/api/v1/submissions',
      minimumStampCount: 5,
      maxImageBytes: 6 * 1024 * 1024,
    });
  });

  it('contains complete Japanese and Traditional Chinese interface translations', () => {
    const englishKeys = Object.keys(eventConfig.text.en).sort();
    expect(Object.keys(eventConfig.text.ja).sort()).toEqual(englishKeys);
    expect(Object.keys(eventConfig.text['zh-TW']).sort()).toEqual(englishKeys);
    expect(eventConfig.text.ja.start).not.toBe(eventConfig.text.en.start);
    expect(eventConfig.text['zh-TW'].start).not.toBe(eventConfig.text.en.start);
  });
});
