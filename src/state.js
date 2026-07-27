import { eventConfig } from './config/eventConfig.js';

export const STORAGE_KEY = 'taiwan-wildlife-passport-v1';

export function initialState() {
  return {
    version: 1, nickname: '', language: eventConfig.event.defaultLanguage,
    cardDesignId: eventConfig.cardDesigns[0]?.id || '', stamps: [],
    handwriting: '', textMessage: '', completedAt: '', updatedAt: new Date().toISOString(),
  };
}

export function sanitizeNickname(value) {
  return String(value ?? '').replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, 20);
}

export function sanitizeMessage(value) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, 100);
}

export function normalizeState(raw) {
  const clean = initialState();
  if (!raw || typeof raw !== 'object') return clean;
  clean.nickname = sanitizeNickname(raw.nickname);
  clean.language = eventConfig.event.languages.includes(raw.language) ? raw.language : clean.language;
  clean.cardDesignId = eventConfig.cardDesigns.some((card) => card.id === raw.cardDesignId) ? raw.cardDesignId : clean.cardDesignId;
  const validIds = new Set(eventConfig.animals.map((animal) => animal.id));
  clean.stamps = [...new Set(Array.isArray(raw.stamps) ? raw.stamps.filter((id) => validIds.has(id)) : [])];
  clean.handwriting = typeof raw.handwriting === 'string' && raw.handwriting.startsWith('data:image/png;base64,') ? raw.handwriting : '';
  clean.textMessage = sanitizeMessage(raw.textMessage);
  clean.completedAt = typeof raw.completedAt === 'string' ? raw.completedAt : '';
  clean.updatedAt = new Date().toISOString();
  return clean;
}

export function loadState(storage) {
  try { const target = storage || globalThis.localStorage; return normalizeState(JSON.parse(target.getItem(STORAGE_KEY) || 'null')); }
  catch { return initialState(); }
}

export function saveState(state, storage) {
  try {
    const target = storage || globalThis.localStorage;
    state.updatedAt = new Date().toISOString();
    target.setItem(STORAGE_KEY, JSON.stringify(normalizeState(state)));
    return true;
  } catch { return false; }
}

export function validateStamp(id, token) {
  return eventConfig.animals.find((animal) => animal.id === id && animal.token === token) || null;
}

export function addStamp(state, animalId) {
  if (state.stamps.includes(animalId)) return { state, added: false, completedNow: false };
  const next = normalizeState({ ...state, stamps: [...state.stamps, animalId] });
  const completedNow = next.stamps.length === eventConfig.animals.length;
  if (completedNow && !next.completedAt) next.completedAt = new Date().toISOString();
  return { state: next, added: true, completedNow };
}

export function exportState(state) {
  return JSON.stringify({ type: 'taiwan-wildlife-passport-progress', exportedAt: new Date().toISOString(), data: normalizeState(state) }, null, 2);
}

export function importState(text) {
  const parsed = JSON.parse(text);
  if (parsed?.type !== 'taiwan-wildlife-passport-progress' || !parsed.data) throw new Error('invalid-import');
  return normalizeState(parsed.data);
}
