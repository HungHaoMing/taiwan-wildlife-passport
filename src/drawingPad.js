export function createDrawingPad(canvas, initialDataUrl = '') {
  const context = canvas.getContext('2d');
  let drawing = false;
  let currentStroke = [];
  let strokes = [];
  let baseImage = null;
  let initialized = false;

  function sizeCanvas() {
    const saved = initialized && canvas.width ? canvas.toDataURL() : initialDataUrl;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    context.lineCap = 'round'; context.lineJoin = 'round'; context.strokeStyle = '#173f35'; context.lineWidth = 4 * ratio;
    if (saved) restore(saved, !initialized);
    initialized = true;
  }

  function restore(dataUrl, asBase = false) {
    if (!dataUrl) return;
    const image = new Image();
    image.onload = () => { if (asBase) baseImage = image; context.drawImage(image, 0, 0, canvas.width, canvas.height); };
    image.src = dataUrl;
  }

  function point(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
  }

  function moveTo(p) { context.moveTo(p.x * canvas.width, p.y * canvas.height); }
  function lineTo(p) { context.lineTo(p.x * canvas.width, p.y * canvas.height); }

  function redraw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (baseImage) context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    for (const stroke of strokes) {
      if (!stroke.length) continue;
      context.beginPath(); moveTo(stroke[0]);
      stroke.slice(1).forEach(lineTo); context.stroke();
    }
  }

  canvas.addEventListener('pointerdown', (event) => {
    event.preventDefault(); drawing = true; currentStroke = [point(event)]; strokes.push(currentStroke); canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!drawing) return; event.preventDefault(); const p = point(event); currentStroke.push(p);
    context.beginPath(); const previous = currentStroke[currentStroke.length - 2]; moveTo(previous); lineTo(p); context.stroke();
  });
  const stop = () => { drawing = false; };
  canvas.addEventListener('pointerup', stop); canvas.addEventListener('pointercancel', stop);
  sizeCanvas();
  const resize = () => sizeCanvas(); window.addEventListener('resize', resize);
  return {
    undo() { strokes.pop(); redraw(); },
    clear() { strokes = []; baseImage = null; context.clearRect(0, 0, canvas.width, canvas.height); },
    dataUrl() { return canvas.toDataURL('image/png'); },
    destroy() { window.removeEventListener('resize', resize); },
  };
}
