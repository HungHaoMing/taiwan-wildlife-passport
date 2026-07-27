import QRCode from 'qrcode';
import './styles.css';
import { eventConfig, textFor, animalName } from './config/eventConfig.js';
import { initialState, loadState, saveState, sanitizeNickname, sanitizeMessage, validateStamp, addStamp, exportState, importState } from './state.js';
import { createDrawingPad } from './drawingPad.js';
import { assetUrl, renderCompletedCard } from './cardRenderer.js';

const app = document.querySelector('#app');
const toastElement = document.querySelector('#toast');
let state = loadState();
let view = 'start';
let activeAnimal = null;
let drawingPad = null;
let staffUnlocked = false;
let storageWorks = testStorage();

const params = new URLSearchParams(location.search);
const requestedAnimalId = params.get('stamp');
const requestedToken = params.get('token');
const hasStampParams = requestedAnimalId || requestedToken;
let pendingAnimal = hasStampParams ? validateStamp(requestedAnimalId, requestedToken) : null;
let invalidStampRequest = Boolean(hasStampParams && !pendingAnimal);
if (params.get('view') === 'qr') view = 'qr';
else if (params.get(eventConfig.staff.queryKey) === '1') view = 'staff-login';
else if (state.nickname && pendingAnimal) claimPendingStamp();
else if (state.nickname && invalidStampRequest) view = 'invalid';
else if (state.nickname) view = 'card';

function testStorage() {
  try { localStorage.setItem('__passport_test__', '1'); localStorage.removeItem('__passport_test__'); return true; } catch { return false; }
}

function h(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

function t(key) { return textFor(state.language, key); }
function persist() { if (!saveState(state)) { storageWorks = false; toast(t('storageWarning'), 5000); } }
function toast(message, duration = 2600) { toastElement.textContent = message; toastElement.classList.add('show'); setTimeout(() => toastElement.classList.remove('show'), duration); }
function languageOptions() {
  const labels = { en: 'English', ja: '日本語', 'zh-TW': '繁體中文' };
  return eventConfig.event.languages.map((language) => `<option value="${language}" ${state.language === language ? 'selected' : ''}>${labels[language]}</option>`).join('');
}
function languageSelect() { return `<label class="visually-hidden" for="language">${h(t('language'))}</label><select id="language" class="language">${languageOptions()}</select>`; }
function topbar(title = eventConfig.event.name) { return `<header class="topbar"><h1>${h(title)}</h1>${languageSelect()}</header>`; }
function shell(content, wide = false) { app.className = `shell${wide ? ' wide' : ''}`; app.innerHTML = content; bindGlobal(); monitorImages(); }

function bindGlobal() {
  document.querySelector('#language')?.addEventListener('change', (event) => { state.language = event.target.value; persist(); render(); });
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => go(button.dataset.view)));
}

function monitorImages() {
  document.querySelectorAll('img').forEach((image) => image.addEventListener('error', () => {
    image.style.display = 'none';
    const fallback = document.createElement('div'); fallback.className = 'error-box'; fallback.textContent = `${t('imageError')} (${image.dataset.file || image.getAttribute('src')})`;
    image.insertAdjacentElement('afterend', fallback);
  }, { once: true }));
}

function go(next, options = {}) {
  drawingPad?.destroy(); drawingPad = null; view = next;
  if (options.animal) activeAnimal = options.animal;
  window.scrollTo({ top: 0, behavior: 'instant' }); render();
}

function claimPendingStamp() {
  if (!pendingAnimal) return;
  const result = addStamp(state, pendingAnimal.id); state = result.state; persist(); activeAnimal = pendingAnimal;
  pendingAnimal = null;
  history.replaceState({}, '', location.pathname + (location.hash || ''));
  view = result.added ? 'stamp-result' : 'duplicate';
  if (result.added && eventConfig.sound.enabled) {
    new Audio(assetUrl(eventConfig.sound.path)).play().catch(() => {});
  }
  if (result.completedNow) sessionStorage.setItem('passport-completed-now', '1');
}

function renderStart() {
  const selected = state.cardDesignId;
  shell(`${topbar()}<section class="panel">
    <img class="hero" src="${h(assetUrl(eventConfig.assets.hero))}" data-file="${h(eventConfig.assets.hero)}" alt="${h(t('heroAlt'))}">
    <img src="${h(assetUrl(eventConfig.assets.logo))}" data-file="${h(eventConfig.assets.logo)}" alt="${h(t('logoAlt'))}" style="width:min(70%,320px);display:block;margin:1rem auto">
    <h1>${h(eventConfig.event.name)}</h1><p class="subtitle">${h(eventConfig.event.subtitle)}</p><p>${h(t('intro'))}</p>
    ${invalidStampRequest ? `<p class="error-box" role="alert">${h(t('invalidStamp'))}</p>` : ''}
    ${!storageWorks ? `<p class="error-box" role="alert">${h(t('storageWarning'))}</p>` : ''}
    <form id="start-form"><label for="nickname">${h(t('nickname'))}</label><input id="nickname" name="nickname" type="text" maxlength="20" required autocomplete="nickname" value="${h(state.nickname)}" aria-describedby="nickname-hint"><small id="nickname-hint">${h(t('nicknameHint'))}</small>
    <label>${h(t('chooseCard'))}</label><div class="card-options">${eventConfig.cardDesigns.map((card) => `<label class="card-option"><input type="radio" name="card" value="${h(card.id)}" ${card.id === selected ? 'checked' : ''}><span>${h(card.name[state.language] || card.name.en)}</span></label>`).join('')}</div>
    <button type="submit" style="width:100%;margin-top:1rem">${h(t('start'))}</button></form>
    <p class="privacy">${h(t('privacy'))}</p></section>`);
  document.querySelector('#start-form').addEventListener('submit', (event) => {
    event.preventDefault(); const nickname = sanitizeNickname(new FormData(event.currentTarget).get('nickname'));
    if (!nickname) { document.querySelector('#nickname').focus(); return; }
    state.nickname = nickname; state.cardDesignId = new FormData(event.currentTarget).get('card') || eventConfig.cardDesigns[0].id; persist();
    if (pendingAnimal) { claimPendingStamp(); render(); } else go('card');
  });
}

function cardMarkup() {
  const card = eventConfig.cardDesigns.find((item) => item.id === state.cardDesignId) || eventConfig.cardDesigns[0];
  const handwriting = eventConfig.placements.handwriting;
  const date = state.completedAt ? new Intl.DateTimeFormat(state.language, { dateStyle: 'medium' }).format(new Date(state.completedAt)) : '';
  return `<div class="card-stage" aria-label="${h(t('cardAria'))}">
    <img class="card-background" src="${h(assetUrl(card.image))}" data-file="${h(card.image)}" alt="${h(card.alt)}">
    <div class="card-title">${h(eventConfig.event.name)}</div><div class="card-nickname">${h(state.nickname)}</div>
    ${eventConfig.animals.map((animal) => {
      const style = `left:${animal.stampX}%;top:${animal.stampY}%;width:${animal.stampWidth}%;height:${animal.stampHeight}%;transform:translate(-50%,-50%) rotate(${animal.stampRotation}deg);z-index:${animal.stampZIndex};opacity:${animal.stampOpacity}`;
      return state.stamps.includes(animal.id)
        ? `<div class="stamp" style="${style}"><img src="${h(assetUrl(animal.stampImage))}" data-file="${h(animal.stampImage)}" alt="${h(animal.altText)}"></div>`
        : `<div class="stamp-slot" style="${style}" aria-label="${h(t('noStamp'))}">${h(animalName(animal, state.language))}</div>`;
    }).join('')}
    ${state.handwriting ? `<img class="handwriting-preview" src="${state.handwriting}" alt="${h(t('handwritingAlt'))}" style="left:${handwriting.x}%;top:${handwriting.y}%;width:${handwriting.width}%;height:${handwriting.height}%">` : ''}
    <div class="card-message">${h(state.textMessage)}</div><div class="card-date">${h(date)}</div>
  </div>`;
}

function renderCard() {
  const complete = state.stamps.length === eventConfig.animals.length;
  shell(`${topbar()}${cardMarkup()}<section class="panel">
    <div class="progress"><span>${h(t('progress'))}</span><strong>${state.stamps.length} / ${eventConfig.animals.length}</strong></div>
    <div class="actions">${complete ? `<button data-view="complete">${h(t('preview'))}</button>` : ''}<button class="secondary" id="edit-nickname">${h(t('editNickname'))}</button><button class="secondary" id="show-help">${h(t('instructions'))}</button></div>
  </section><section class="panel"><h2>${h(t('animals'))}</h2><div class="animal-grid">${eventConfig.animals.map((animal) => `<button class="animal-tile ${state.stamps.includes(animal.id) ? 'owned' : ''}" data-animal="${animal.id}"><span>${state.stamps.includes(animal.id) ? '✓' : '○'}</span> ${h(animalName(animal, state.language))}</button>`).join('')}</div></section>
  <section class="panel"><div class="actions"><button class="secondary" data-view="start">${h(t('home'))}</button><button class="secondary" data-view="staff-login">${h(t('staff'))}</button><button class="secondary" data-view="qr">${h(t('qrAdmin'))}</button><button class="danger" id="reset">${h(t('reset'))}</button></div><p class="privacy">${h(t('privacy'))}</p></section>`);
  document.querySelectorAll('[data-animal]').forEach((button) => button.addEventListener('click', () => go('animal', { animal: eventConfig.animals.find((a) => a.id === button.dataset.animal) })));
  document.querySelector('#edit-nickname').addEventListener('click', editNickname);
  document.querySelector('#show-help').addEventListener('click', () => modal(`<h2>${h(t('instructions'))}</h2><p>${h(t('useInstructions'))}</p><p>${h(t('privacy'))}</p>`));
  document.querySelector('#reset').addEventListener('click', resetAll);
  if (complete && sessionStorage.getItem('passport-completed-now')) { sessionStorage.removeItem('passport-completed-now'); setTimeout(() => go('complete'), 100); }
}

function editNickname() {
  modal(`<h2>${h(t('editNickname'))}</h2><form id="nickname-form"><label for="nickname-edit">${h(t('nickname'))}</label><input id="nickname-edit" type="text" maxlength="20" required value="${h(state.nickname)}"><div class="actions"><button type="submit">${h(t('save'))}</button></div></form>`, () => {
    document.querySelector('#nickname-form').addEventListener('submit', (event) => { event.preventDefault(); const value = sanitizeNickname(document.querySelector('#nickname-edit').value); if (!value) return; state.nickname = value; persist(); closeModal(); render(); });
  });
}

function renderAnimal(result = false, duplicate = false) {
  const animal = activeAnimal || eventConfig.animals[0];
  shell(`${topbar()}<article class="panel">${result ? `<h1>${h(duplicate ? t('alreadyOwned') : t('stampAdded'))}</h1><div class="stamp-celebration" style="--stamp-duration:${eventConfig.stampAnimation.durationMs}ms"><img src="${h(assetUrl(animal.stampImage))}" data-file="${h(animal.stampImage)}" alt="${h(animal.altText)}"></div>` : `<img class="animal-detail-image" src="${h(assetUrl(animal.animalImage))}" data-file="${h(animal.animalImage)}" alt="${h(animal.altText)}">`}
    <h2>${h(animalName(animal, state.language))}</h2><p><em>${h(animal.scientificName)}</em></p><h3>${h(t('description'))}</h3><p>${h(animal.description[state.language] || animal.description.en)}</p><h3>${h(t('funFact'))}</h3><p>${h(animal.funFact[state.language] || animal.funFact.en)}</p>
    <button style="width:100%" data-view="card">${h(t('backToCard'))}</button></article>`);
  if (result && !duplicate && state.stamps.length === eventConfig.animals.length && sessionStorage.getItem('passport-completed-now')) {
    setTimeout(() => { if (view === 'stamp-result') { sessionStorage.removeItem('passport-completed-now'); go('complete'); } }, 1800);
  }
}

function renderInvalidStamp() {
  shell(`${topbar()}<section class="panel"><p class="error-box" role="alert">${h(t('invalidStamp'))}</p><button style="width:100%" data-view="card">${h(t('backToCard'))}</button></section>`);
}

function renderComplete() {
  if (state.stamps.length < eventConfig.animals.length) {
    shell(`${topbar()}<section class="panel"><p class="error-box">${h(t('notComplete'))}</p><button data-view="card">${h(t('backToCard'))}</button></section>`); return;
  }
  shell(`${topbar(t('completeTitle'))}<section class="panel"><img class="hero" src="${h(assetUrl(eventConfig.assets.completionBackground))}" data-file="${h(eventConfig.assets.completionBackground)}" alt="${h(t('completionAlt'))}"><p>${h(t('completeIntro'))}</p><label>${h(t('handwriting'))}</label><canvas id="drawing" class="drawing-pad" aria-label="${h(t('handwriting'))}"></canvas>
    <div class="actions"><button class="secondary" id="undo">${h(t('undo'))}</button><button class="secondary" id="clear">${h(t('clear'))}</button>${state.handwriting ? `<button class="secondary" id="rewrite">${h(t('redoWriting'))}</button>` : ''}</div>
    <label for="message">${h(t('message'))}</label><input id="message" type="text" maxlength="100" value="${h(state.textMessage)}"><small>${h(t('messageHint'))}</small>
    <div class="actions"><button id="save-completion">${h(t('save'))}</button><button class="secondary" data-view="card">${h(t('backToCard'))}</button></div></section>
    <section class="panel"><h2>${h(t('preview'))}</h2>${cardMarkup()}<div class="actions"><button id="download">${h(t('download'))}</button>${navigator.share ? `<button class="secondary" id="share">${h(t('share'))}</button>` : ''}<button class="secondary" id="open-image">${h(t('openImage'))}</button></div></section>`);
  drawingPad = createDrawingPad(document.querySelector('#drawing'), state.handwriting);
  document.querySelector('#undo').addEventListener('click', () => drawingPad.undo());
  document.querySelector('#clear').addEventListener('click', () => { if (confirm(t('confirmClear'))) drawingPad.clear(); });
  document.querySelector('#rewrite')?.addEventListener('click', () => { if (confirm(t('confirmEdit'))) { drawingPad.clear(); state.handwriting = ''; persist(); } });
  document.querySelector('#save-completion').addEventListener('click', () => {
    if ((state.handwriting || state.textMessage) && !confirm(t('confirmEdit'))) return;
    state.handwriting = drawingPad.dataUrl(); state.textMessage = sanitizeMessage(document.querySelector('#message').value); persist(); toast(t('saved')); renderComplete();
  });
  document.querySelector('#download').addEventListener('click', downloadCompleted);
  document.querySelector('#open-image').addEventListener('click', openCompletedImage);
  document.querySelector('#share')?.addEventListener('click', shareCompleted);
}

async function completedBlob() {
  const canvas = await renderCompletedCard({ ...state, textMessage: sanitizeMessage(document.querySelector('#message')?.value ?? state.textMessage) });
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve({ blob, canvas }) : reject(new Error('png-failed')), 'image/png'));
}
async function downloadCompleted() {
  try {
    const { blob } = await completedBlob(); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `${eventConfig.output.filePrefix}-${new Date().toISOString().slice(0, 10)}.png`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 3000);
  } catch { toast(t('exportError'), 5000); }
}
async function openCompletedImage() {
  try { const { canvas } = await completedBlob(); modal(`<h2>${h(t('openImage'))}</h2><p>${h(t('longPressSave'))}</p><img src="${canvas.toDataURL('image/png')}" alt="${h(t('preview'))}">`); } catch { toast(t('exportError'), 5000); }
}
async function shareCompleted() {
  try { const { blob } = await completedBlob(); const file = new File([blob], 'wildlife-passport.png', { type: 'image/png' }); if (navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], title: eventConfig.event.name }); else await openCompletedImage(); } catch (error) { if (error.name !== 'AbortError') toast(t('exportError'), 5000); }
}

function renderStaffLogin() {
  if (staffUnlocked) return renderStaff();
  shell(`${topbar(t('staff'))}<section class="panel"><p class="privacy">${h(t('staffSecurity'))}</p><form id="pin-form"><label for="pin">${h(t('staffPin'))}</label><input id="pin" type="password" inputmode="numeric" autocomplete="off"><button style="width:100%;margin-top:1rem">${h(t('enter'))}</button></form><div class="actions"><button class="secondary" data-view="card">${h(t('backToCard'))}</button></div></section>`);
  document.querySelector('#pin-form').addEventListener('submit', (event) => { event.preventDefault(); if (document.querySelector('#pin').value === eventConfig.staff.pin) { staffUnlocked = true; go('staff'); } else toast(t('wrongPin')); });
}

function renderStaff() {
  shell(`${topbar(t('staff'))}<section class="panel"><p><strong>${h(state.nickname || '—')}</strong> · ${state.stamps.length} / 6</p><div class="staff-list">${eventConfig.animals.map((animal) => { const owned = state.stamps.includes(animal.id); return `<div class="staff-row"><span>${owned ? '✓' : '○'} ${h(animalName(animal, state.language))}</span><button class="${owned ? 'danger' : 'secondary'}" data-toggle-stamp="${animal.id}">${h(owned ? t('remove') : t('add'))}</button></div>`; }).join('')}</div><div class="actions"><button class="secondary" id="staff-nickname">${h(t('editNickname'))}</button><button class="secondary" id="clear-messages">${h(t('clearMessages'))}</button><button class="secondary" id="export-data">${h(t('exportData'))}</button><button class="secondary" id="import-data">${h(t('importData'))}</button><input id="import-file" type="file" accept="application/json" hidden><button class="danger" id="staff-reset">${h(t('reset'))}</button><button data-view="card">${h(t('exitStaff'))}</button></div></section>`);
  document.querySelectorAll('[data-toggle-stamp]').forEach((button) => button.addEventListener('click', () => {
    const id = button.dataset.toggleStamp; state.stamps = state.stamps.includes(id) ? state.stamps.filter((stamp) => stamp !== id) : [...state.stamps, id];
    if (state.stamps.length === 6 && !state.completedAt) state.completedAt = new Date().toISOString(); persist(); renderStaff();
  }));
  document.querySelector('#staff-nickname').addEventListener('click', editNickname);
  document.querySelector('#clear-messages').addEventListener('click', () => { if (confirm(t('confirmClear'))) { state.handwriting = ''; state.textMessage = ''; persist(); renderStaff(); } });
  document.querySelector('#export-data').addEventListener('click', exportProgress);
  document.querySelector('#import-data').addEventListener('click', () => document.querySelector('#import-file').click());
  document.querySelector('#import-file').addEventListener('change', importProgressFile);
  document.querySelector('#staff-reset').addEventListener('click', resetAll);
}

function exportProgress() {
  const blob = new Blob([exportState(state)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'wildlife-passport-progress.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function importProgressFile(event) {
  try { state = importState(await event.target.files[0].text()); persist(); toast(t('saved')); render(); } catch { toast(t('importError'), 5000); }
}
function resetAll() {
  if (!confirm(t('confirmReset1')) || !confirm(t('confirmReset2'))) return;
  state = initialState(); persist(); staffUnlocked = false; go('start');
}

async function renderQr() {
  shell(`${topbar(t('qrAdmin'))}<section class="panel no-print"><p>${h(t('qrIntro'))}</p><div class="actions"><button id="print">${h(t('print'))}</button><button class="secondary" data-view="card">${h(t('backToCard'))}</button></div></section><section class="qr-grid">${eventConfig.animals.map((animal) => {
    const url = stationUrl(animal); return `<article class="qr-card"><h2>${h(animalName(animal, state.language))}</h2><canvas id="qr-${animal.id}" aria-label="${h(t('qrAria'))} ${h(animalName(animal, state.language))}"></canvas><p class="url">${h(url)}</p><div class="actions no-print"><button class="secondary" data-copy="${h(url)}">${h(t('copy'))}</button><button data-qr-download="${animal.id}">${h(t('qrDownload'))}</button></div></article>`;
  }).join('')}</section>`, true);
  await Promise.all(eventConfig.animals.map((animal) => QRCode.toCanvas(document.querySelector(`#qr-${animal.id}`), stationUrl(animal), { width: 520, margin: 2, errorCorrectionLevel: 'M', color: { dark: '#102e27', light: '#ffffff' } })));
  document.querySelector('#print').addEventListener('click', () => window.print());
  document.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(button.dataset.copy); toast(t('copied')); } catch { modal(`<p class="url">${h(button.dataset.copy)}</p>`); } }));
  document.querySelectorAll('[data-qr-download]').forEach((button) => button.addEventListener('click', () => { const canvas = document.querySelector(`#qr-${button.dataset.qrDownload}`); const link = document.createElement('a'); link.href = canvas.toDataURL('image/png'); link.download = `qr-${button.dataset.qrDownload}.png`; link.click(); }));
}
function stationUrl(animal) { const url = new URL(location.pathname, location.origin); url.searchParams.set('stamp', animal.id); url.searchParams.set('token', animal.token); return url.href; }

function modal(content, afterOpen) {
  closeModal(); const wrapper = document.createElement('div'); wrapper.className = 'modal'; wrapper.id = 'modal'; wrapper.setAttribute('role', 'dialog'); wrapper.setAttribute('aria-modal', 'true'); wrapper.innerHTML = `<div class="modal-card">${content}<button class="secondary" id="modal-close" style="width:100%;margin-top:1rem">${h(t('close'))}</button></div>`; document.body.append(wrapper);
  wrapper.addEventListener('click', (event) => { if (event.target === wrapper) closeModal(); }); document.querySelector('#modal-close').addEventListener('click', closeModal); afterOpen?.();
}
function closeModal() { document.querySelector('#modal')?.remove(); }

function render() {
  if (view === 'start') renderStart();
  else if (view === 'card') renderCard();
  else if (view === 'animal') renderAnimal();
  else if (view === 'stamp-result') renderAnimal(true, false);
  else if (view === 'duplicate') renderAnimal(true, true);
  else if (view === 'invalid') renderInvalidStamp();
  else if (view === 'complete') renderComplete();
  else if (view === 'staff-login') renderStaffLogin();
  else if (view === 'staff') renderStaff();
  else if (view === 'qr') renderQr().catch(() => toast(t('exportError'), 5000));
}

window.addEventListener('popstate', () => { if (state.nickname) go('card'); else go('start'); });
if ('serviceWorker' in navigator && import.meta.env.PROD) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
render();
