import { Html5Qrcode } from 'html5-qrcode';
import './styles.css';
import { eventConfig, textFor, animalName, workImagePaths } from './config/eventConfig.js';
import { initialState, loadState, saveState, sanitizeNickname, sanitizeMessage, validateStamp, addStamp, submissionNeedsUpdate } from './state.js';
import { createDrawingPad } from './drawingPad.js';
import { assetUrl, renderCompletedCard } from './cardRenderer.js';
import { submissionErrorKey, submitStampCard } from './submission.js';
import { resolveInitialParticipantView } from './accessPolicy.js';

const app = document.querySelector('#app');
const toastElement = document.querySelector('#toast');
let state = loadState();
let view = 'start';
let activeAnimal = null;
let drawingPad = null;
let qrScanner = null;
let scanLocked = false;
let storageWorks = testStorage();
let submissionPending = false;

const params = new URLSearchParams(location.search);
const requestedAnimalId = params.get('stamp');
const requestedToken = params.get('token');
const hasStampParams = requestedAnimalId || requestedToken;
let pendingAnimal = hasStampParams ? validateStamp(requestedAnimalId, requestedToken) : null;
let invalidStampRequest = Boolean(hasStampParams && !pendingAnimal);
const initialView = resolveInitialParticipantView({
  search: location.search,
  hasNickname: Boolean(state.nickname),
  hasPendingStamp: Boolean(pendingAnimal),
  hasInvalidStampRequest: invalidStampRequest,
});
if (initialView === 'claim-pending') claimPendingStamp();
else view = initialView;

function testStorage() {
  try { localStorage.setItem('__passport_test__', '1'); localStorage.removeItem('__passport_test__'); return true; } catch { return false; }
}

function h(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

function t(key) {
  return textFor(state.language, key)
    .replaceAll('{count}', String(eventConfig.animals.length))
    .replaceAll('{minimum}', String(eventConfig.submission.minimumStampCount))
    .replaceAll('{stampCount}', String(state.stamps.length));
}
function eventSubtitle() { return eventConfig.event.subtitle[state.language] || eventConfig.event.subtitle.en; }
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
  document.querySelector('#language')?.addEventListener('change', (event) => { state.language = event.target.value; persist(); stopQrScanner().finally(() => render()); });
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
  stopQrScanner();
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
    <img class="hero start-hero" src="${h(assetUrl(eventConfig.assets.hero))}" data-file="${h(eventConfig.assets.hero)}" alt="${h(t('heroAlt'))}">
    <img src="${h(assetUrl(eventConfig.assets.logo))}" data-file="${h(eventConfig.assets.logo)}" alt="${h(t('logoAlt'))}" style="width:min(70%,320px);display:block;margin:1rem auto">
    <h1>${h(eventConfig.event.name)}</h1><p class="subtitle">${h(eventSubtitle())}</p><p>${h(t('intro'))}</p>
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
  const personalization = eventConfig.placements.personalization;
  const placementStyle = (placement) => `left:${placement.x}%;top:${placement.y}%;width:${placement.maxWidth || 30}%;color:${placement.color};font-weight:${placement.fontWeight}`;
  const boxStyle = (box) => `left:${box.x}%;top:${box.y}%;width:${box.width}%;height:${box.height}%;--panel-fill:${personalization.fill};--panel-opacity:${personalization.fillOpacity};--panel-border:${personalization.border};--panel-divider:${personalization.divider}`;
  const personalizationMarkup = personalization
    ? `<div class="personalization-box handwriting-box" style="${boxStyle(personalization.handwritingBox)}"></div><div class="personalization-box details-box" style="${boxStyle(personalization.detailsBox)}"></div>`
    : '';
  const date = eventConfig.placements.date.enabled !== false && state.completedAt
    ? new Intl.DateTimeFormat(state.language, { dateStyle: 'medium' }).format(new Date(state.completedAt))
    : '';
  return `<div class="card-stage" style="--card-aspect:${Number(card.width) || 3}/${Number(card.height) || 4}" aria-label="${h(t('cardAria'))}">
    <img class="card-background" src="${h(assetUrl(card.image))}" data-file="${h(card.image)}" alt="${h(card.alt)}">
    ${personalizationMarkup}
    ${eventConfig.placements.eventName.enabled === false ? '' : `<div class="card-title" style="${placementStyle(eventConfig.placements.eventName)}">${h(eventConfig.event.name)}</div>`}<div class="card-nickname" style="${placementStyle(eventConfig.placements.nickname)}">${h(state.nickname)}</div>
    ${eventConfig.animals.map((animal) => {
      const style = `left:${animal.stampX}%;top:${animal.stampY}%;width:${animal.stampWidth}%;height:${animal.stampHeight}%;transform:translate(-50%,-50%) rotate(${animal.stampRotation}deg);z-index:${animal.stampZIndex};opacity:${animal.stampOpacity}`;
      return state.stamps.includes(animal.id)
        ? `<div class="stamp" style="${style}"><img src="${h(assetUrl(animal.stampImage))}" data-file="${h(animal.stampImage)}" alt="${h(animal.altText)}"></div>`
        : `<div class="stamp-slot" style="${style}" aria-label="${h(t('noStamp'))}">${h(animalName(animal, state.language))}</div>`;
    }).join('')}
    ${state.handwriting ? `<img class="handwriting-preview" src="${state.handwriting}" alt="${h(t('handwritingAlt'))}" style="left:${handwriting.x}%;top:${handwriting.y}%;width:${handwriting.width}%;height:${handwriting.height}%">` : ''}
    <div class="card-message" style="${placementStyle(eventConfig.placements.message)}">${h(state.textMessage)}</div><div class="card-date" style="${placementStyle(eventConfig.placements.date)}">${h(date)}</div>
  </div>`;
}

function submissionResultMarkup() {
  if (!state.redemptionCode) return '';
  const needsUpdate = submissionNeedsUpdate(state);
  return `<div class="submission-result${needsUpdate ? ' needs-update' : ''}" role="status">
    <strong>${h(needsUpdate ? t('submissionUpdateNeeded') : t('submissionSuccess'))}</strong>
    <span>${h(t('redemptionCode'))}</span><b>${h(state.redemptionCode)}</b><small>${h(t('showCodeHint'))}</small>
  </div>`;
}

function renderCard() {
  const complete = state.stamps.length >= eventConfig.submission.minimumStampCount;
  const needsUpdate = submissionNeedsUpdate(state);
  shell(`${topbar()}${cardMarkup()}<section class="panel">
    <div class="progress"><span>${h(t('progress'))}</span><strong>${state.stamps.length} / ${eventConfig.animals.length}</strong></div>
    ${submissionResultMarkup()}
    <div class="actions">${complete ? `<button data-view="complete">${h(needsUpdate ? t('submitAgain') : t('preview'))}</button>` : ''}<button class="secondary" id="edit-nickname">${h(t('editNickname'))}</button><button class="secondary" id="show-help">${h(t('instructions'))}</button></div>
  </section><section class="panel"><h2>${h(t('animals'))}</h2><div class="animal-grid">${eventConfig.animals.map((animal) => `<button class="animal-tile ${state.stamps.includes(animal.id) ? 'owned' : ''}" data-animal="${animal.id}"><span>${state.stamps.includes(animal.id) ? '✓' : '○'}</span> ${h(animalName(animal, state.language))}</button>`).join('')}</div></section>
  <section class="panel"><div class="actions"><button data-view="scan">${h(t('scanQr'))}</button><button class="secondary" data-view="start">${h(t('home'))}</button><button class="danger" id="reset">${h(t('reset'))}</button></div><p class="privacy">${h(t('privacy'))}</p></section>`);
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
  const images = workImagePaths(animal);
  const imageMarkup = `<div class="work-image-gallery${images.length > 1 ? ' multiple' : ''}">${images.map((image, index) => `<img class="animal-detail-image" src="${h(assetUrl(image))}" data-file="${h(image)}" alt="${h(`${animal.altText}${images.length > 1 ? `（${index + 1}/${images.length}）` : ''}`)}">`).join('')}</div>`;
  shell(`${topbar()}<article class="panel">${result ? `<h1>${h(duplicate ? t('alreadyOwned') : t('stampAdded'))}</h1>` : ''}${imageMarkup}
    <h2>${h(animalName(animal, state.language))}</h2>${animal.scientificName ? `<p><em>${h(animal.scientificName)}</em></p>` : ''}<h3>${h(t('description'))}</h3><p>${h(animal.description[state.language] || animal.description.en)}</p>
    <button style="width:100%" data-view="card">${h(t('backToCard'))}</button></article>`);
  if (result && !duplicate && state.stamps.length === eventConfig.animals.length && sessionStorage.getItem('passport-completed-now')) {
    setTimeout(() => { if (view === 'stamp-result') { sessionStorage.removeItem('passport-completed-now'); go('complete'); } }, 1800);
  }
}

function renderInvalidStamp() {
  shell(`${topbar()}<section class="panel"><p class="error-box" role="alert">${h(t('invalidStamp'))}</p><button style="width:100%" data-view="card">${h(t('backToCard'))}</button></section>`);
}

async function renderScanner() {
  shell(`${topbar(t('scanTitle'))}<section class="panel"><p>${h(t('scanHelp'))}</p><div id="qr-reader" class="qr-reader" aria-label="${h(t('scanTitle'))}"></div><p id="scan-status" class="hint" role="status"></p><div class="actions"><button class="secondary" data-view="card">${h(t('stopScan'))}</button></div></section>`);
  scanLocked = false;
  qrScanner = new Html5Qrcode('qr-reader');
  try {
    await qrScanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: (width, height) => { const size = Math.floor(Math.min(width, height) * 0.72); return { width: size, height: size }; } },
      handleScannedCode,
      () => {},
    );
  } catch {
    qrScanner = null;
    const status = document.querySelector('#scan-status');
    if (status) { status.className = 'error-box'; status.textContent = t('cameraError'); }
  }
}

async function handleScannedCode(decodedText) {
  if (scanLocked) return;
  let animal = null;
  try {
    const scannedUrl = new URL(decodedText);
    animal = validateStamp(scannedUrl.searchParams.get('stamp'), scannedUrl.searchParams.get('token'));
  } catch { /* A non-URL QR code is not valid for this activity. */ }
  if (!animal) {
    const status = document.querySelector('#scan-status');
    if (status) { status.className = 'error-box'; status.textContent = t('scanInvalid'); }
    return;
  }
  scanLocked = true;
  const alreadyOwned = state.stamps.includes(animal.id);
  activeAnimal = animal;
  if (!alreadyOwned) {
    const result = addStamp(state, animal.id); state = result.state; persist();
    if (result.completedNow) sessionStorage.setItem('passport-completed-now', '1');
    if (eventConfig.sound.enabled) new Audio(assetUrl(eventConfig.sound.path)).play().catch(() => {});
  }
  await stopQrScanner();
  go(alreadyOwned ? 'duplicate' : 'stamp-result', { animal });
}

async function stopQrScanner() {
  const scanner = qrScanner;
  qrScanner = null;
  if (!scanner) return;
  try { await scanner.stop(); } catch { /* Camera may not have started. */ }
  try { scanner.clear(); } catch { /* The reader element may already be gone. */ }
}

function renderComplete() {
  if (state.stamps.length < eventConfig.submission.minimumStampCount) {
    shell(`${topbar()}<section class="panel"><p class="error-box">${h(t('notComplete'))}</p><button data-view="card">${h(t('backToCard'))}</button></section>`); return;
  }
  shell(`${topbar(t('completeTitle'))}<section class="panel">${cardMarkup()}<p>${h(t('completeIntro'))}</p><label>${h(t('handwriting'))}</label><canvas id="drawing" class="drawing-pad" aria-label="${h(t('handwriting'))}"></canvas>
    <div class="actions"><button class="secondary" id="undo">${h(t('undo'))}</button><button class="secondary" id="clear">${h(t('clear'))}</button>${state.handwriting ? `<button class="secondary" id="rewrite">${h(t('redoWriting'))}</button>` : ''}</div>
    <label for="message">${h(t('message'))}</label><input id="message" type="text" maxlength="100" value="${h(state.textMessage)}"><small>${h(t('messageHint'))}</small>
    <div class="actions"><button id="save-completion">${h(t('save'))}</button><button class="secondary" data-view="card">${h(t('backToCard'))}</button></div></section>
    <section class="panel"><h2>${h(t('preview'))}</h2>
      ${submissionResultMarkup()}
      <p id="submission-feedback" class="submission-feedback hint" aria-live="polite"></p>
      <div class="actions"><button id="submit-card" ${submissionPending ? 'disabled' : ''}>${h(submissionPending ? t('submitting') : state.redemptionCode ? t('submitAgain') : t('submitToServer'))}</button><button class="secondary" id="download">${h(t('download'))}</button>${navigator.share ? `<button class="secondary" id="share">${h(t('share'))}</button>` : ''}<button class="secondary" id="open-image">${h(t('openImage'))}</button></div><p class="hint">${h(t('submitHint'))}</p></section>`);
  drawingPad = createDrawingPad(document.querySelector('#drawing'), state.handwriting);
  document.querySelector('#undo').addEventListener('click', () => drawingPad.undo());
  document.querySelector('#clear').addEventListener('click', () => { if (confirm(t('confirmClear'))) drawingPad.clear(); });
  document.querySelector('#rewrite')?.addEventListener('click', () => { if (confirm(t('confirmEdit'))) { drawingPad.clear(); state.handwriting = ''; persist(); } });
  document.querySelector('#save-completion').addEventListener('click', () => {
    if ((state.handwriting || state.textMessage) && !confirm(t('confirmEdit'))) return;
    state.handwriting = drawingPad.dataUrl(); state.textMessage = sanitizeMessage(document.querySelector('#message').value); persist(); toast(t('saved')); renderComplete();
  });
  document.querySelector('#submit-card').addEventListener('click', submitCompleted);
  document.querySelector('#download').addEventListener('click', downloadCompleted);
  document.querySelector('#open-image').addEventListener('click', openCompletedImage);
  document.querySelector('#share')?.addEventListener('click', shareCompleted);
}

async function completedBlob() {
  const canvas = await renderCompletedCard({ ...state, textMessage: sanitizeMessage(document.querySelector('#message')?.value ?? state.textMessage) });
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve({ blob, canvas }) : reject(new Error('png-failed')), 'image/png'));
}
function createSubmissionCanvas(source, targetWidth, targetHeight) {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext('2d');
  context.fillStyle = '#dcebef';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const scale = Math.min(canvas.width / source.width, canvas.height / source.height);
  const width = source.width * scale;
  const height = source.height * scale;
  context.drawImage(source, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  return canvas;
}

function canvasBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('image-encode-failed')), type, quality));
}

async function submissionBlob(source) {
  const canvas = createSubmissionCanvas(source, eventConfig.submission.imageWidth, eventConfig.submission.imageHeight);
  const blob = await canvasBlob(canvas, 'image/jpeg', eventConfig.submission.jpegQuality);
  if (blob.size > eventConfig.submission.maxImageBytes) throw new Error('image-too-large');
  return blob;
}

async function submitCompleted() {
  const button = document.querySelector('#submit-card');
  if (!button || submissionPending) return;
  submissionPending = true;
  button.disabled = true;
  button.textContent = t('submitting');
  const feedback = document.querySelector('#submission-feedback');
  if (feedback) feedback.textContent = t('submitting');
  try {
    state.handwriting = drawingPad?.dataUrl() || state.handwriting;
    state.textMessage = sanitizeMessage(document.querySelector('#message')?.value ?? state.textMessage);
    if (!state.completedAt) state.completedAt = new Date().toISOString();
    persist();
    const { canvas } = await completedBlob();
    const result = await submitStampCard({
      apiBaseUrl: eventConfig.submission.apiBaseUrl,
      endpoint: eventConfig.submission.endpoint,
      participantId: state.participantId,
      nickname: state.nickname,
      stampCount: state.stamps.length,
      submittedAt: new Date().toISOString(),
      imageBlob: await submissionBlob(canvas),
      idempotencyKey: state.idempotencyKey,
    });
    state.submissionId = result.submissionId;
    state.redemptionCode = result.redemptionCode;
    state.submissionStatus = result.status;
    state.submittedStampCount = state.stamps.length;
    persist();
    toast(result.updated ? t('submissionUpdated') : t('submissionSuccess'), 5000);
    renderComplete();
  } catch (error) {
    const message = error?.message === 'image-too-large' ? t('imageTooLarge') : t(submissionErrorKey(error));
    toast(message, 6000);
    const currentFeedback = document.querySelector('#submission-feedback');
    if (currentFeedback) { currentFeedback.className = 'submission-feedback error-box'; currentFeedback.textContent = message; }
  } finally {
    submissionPending = false;
    const currentButton = document.querySelector('#submit-card');
    if (currentButton) { currentButton.disabled = false; currentButton.textContent = state.redemptionCode ? t('submitAgain') : t('submitToServer'); }
  }
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
  try { const { blob } = await completedBlob(); const file = new File([blob], `${eventConfig.output.filePrefix}.png`, { type: 'image/png' }); if (navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], title: eventConfig.event.name }); else await openCompletedImage(); } catch (error) { if (error.name !== 'AbortError') toast(t('exportError'), 5000); }
}

function resetAll() {
  if (!confirm(t('confirmReset1')) || !confirm(t('confirmReset2'))) return;
  state = initialState(); persist(); go('start');
}

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
  else if (view === 'scan') renderScanner();
  else if (view === 'complete') renderComplete();
}

window.addEventListener('popstate', () => { if (state.nickname) go('card'); else go('start'); });
if ('serviceWorker' in navigator && import.meta.env.PROD) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
render();
