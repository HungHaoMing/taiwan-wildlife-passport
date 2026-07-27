import { eventConfig, animalName } from './config/eventConfig.js';

export function assetUrl(path) { return new URL(path, document.baseURI).href; }

export function loadImage(path) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('image-load-failed'));
    image.src = path.startsWith('data:') ? path : assetUrl(path);
  });
}

function fitText(context, text, maxWidth, initialSize, weight) {
  let size = initialSize;
  do {
    context.font = `${weight} ${size}px system-ui, -apple-system, "Noto Sans", sans-serif`;
    if (context.measureText(text).width <= maxWidth) return size;
    size -= 2;
  } while (size > 14);
  return size;
}

function drawConfiguredText(context, text, placement, width, height) {
  if (!text || placement?.enabled === false) return;
  context.save();
  context.fillStyle = placement.color;
  context.textAlign = placement.align;
  context.textBaseline = 'middle';
  const x = width * placement.x / 100;
  const maxWidth = width * placement.maxWidth / 100;
  fitText(context, text, maxWidth, height * placement.fontSize / 100, placement.fontWeight);
  context.fillText(text, x, height * placement.y / 100, maxWidth);
  context.restore();
}

export async function renderCompletedCard(state) {
  const { width, height } = eventConfig.output;
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = '#f4f0e7'; context.fillRect(0, 0, width, height);
  const card = eventConfig.cardDesigns.find((item) => item.id === state.cardDesignId) || eventConfig.cardDesigns[0];
  try { context.drawImage(await loadImage(card.image), 0, 0, width, height); }
  catch {
    context.fillStyle = '#e6dfcf'; context.fillRect(0, 0, width, height);
    context.fillStyle = '#173f35'; context.textAlign = 'center'; context.font = '700 48px sans-serif';
    context.fillText('CARD BACKGROUND PLACEHOLDER', width / 2, height / 2);
  }
  for (const animal of [...eventConfig.animals].sort((a, b) => a.stampZIndex - b.stampZIndex)) {
    if (!state.stamps.includes(animal.id)) continue;
    const stampWidth = width * animal.stampWidth / 100;
    const stampHeight = height * animal.stampHeight / 100;
    const x = width * animal.stampX / 100;
    const y = height * animal.stampY / 100;
    context.save(); context.translate(x, y); context.rotate(animal.stampRotation * Math.PI / 180); context.globalAlpha = animal.stampOpacity;
    try { context.drawImage(await loadImage(animal.stampImage), -stampWidth / 2, -stampHeight / 2, stampWidth, stampHeight); }
    catch {
      context.strokeStyle = '#a34132'; context.lineWidth = 8; context.strokeRect(-stampWidth / 2, -stampHeight / 2, stampWidth, stampHeight);
      context.fillStyle = '#a34132'; context.textAlign = 'center'; context.textBaseline = 'middle'; context.font = `700 ${Math.max(18, stampHeight * .12)}px sans-serif`;
      context.fillText(animalName(animal, state.language), 0, 0, stampWidth * .85);
    }
    context.restore();
  }
  if (state.handwriting) {
    const p = eventConfig.placements.handwriting;
    try { context.drawImage(await loadImage(state.handwriting), width * p.x / 100, height * p.y / 100, width * p.width / 100, height * p.height / 100); } catch { /* optional */ }
  }
  drawConfiguredText(context, eventConfig.event.name, eventConfig.placements.eventName, width, height);
  drawConfiguredText(context, state.nickname, eventConfig.placements.nickname, width, height);
  drawConfiguredText(context, state.textMessage, eventConfig.placements.message, width, height);
  const date = state.completedAt ? new Intl.DateTimeFormat(state.language, { dateStyle: 'long' }).format(new Date(state.completedAt)) : '';
  drawConfiguredText(context, date, eventConfig.placements.date, width, height);
  return canvas;
}
