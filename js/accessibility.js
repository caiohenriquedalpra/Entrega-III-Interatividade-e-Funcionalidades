const MIN_FONT_SCALE = 100;
const MAX_FONT_SCALE = 150;
const FONT_STEP = 10;

/** Connects the font-size and high-contrast controls in the page header. */
export const setupAccessibilityControls = () => {
  const decreaseButton = document.getElementById('decrease-font');
  const increaseButton = document.getElementById('increase-font');
  const contrastButton = document.getElementById('toggle-contrast');
  const status = document.getElementById('accessibility-status');
  const root = document.documentElement;

  let fontScale = MIN_FONT_SCALE;
  let highContrast = false;

  decreaseButton?.addEventListener('click', () => {
    fontScale = Math.max(MIN_FONT_SCALE, fontScale - FONT_STEP);
    root.style.setProperty('--font-scale', `${fontScale}%`);
    if (status) status.textContent = `Tamanho do texto: ${fontScale} por cento.`;
  });

  increaseButton?.addEventListener('click', () => {
    fontScale = Math.min(MAX_FONT_SCALE, fontScale + FONT_STEP);
    root.style.setProperty('--font-scale', `${fontScale}%`);
    if (status) status.textContent = `Tamanho do texto: ${fontScale} por cento.`;
  });

  contrastButton?.addEventListener('click', () => {
    highContrast = !highContrast;
    document.body.classList.toggle('high-contrast', highContrast);
    contrastButton.setAttribute('aria-pressed', String(highContrast));
    if (status) status.textContent = highContrast
      ? 'Modo de alto contraste ativado.'
      : 'Modo de alto contraste desativado.';
  });
};
