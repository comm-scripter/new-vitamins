let measureCtx = null;

// Pixel width of `text` rendered with the given CSS font shorthand,
// e.g. measureTextWidth('Hope of Glory', '600 19px "DM Sans"').
export function measureTextWidth(text, font) {
  if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d');
  measureCtx.font = font;
  return measureCtx.measureText(text).width;
}

export function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// WCAG relative luminance of a hex color.
export function relativeLuminance(hex) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(l1, l2) {
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

// Picks whichever of `light`/`dark` stays readable against the worst-case
// spot in a (possibly multi-stop, e.g. gradient) background — some category
// gradients run from a pale stop to a saturated one, so we check every stop
// rather than just the average.
export function pickTextColor(bgColors, { light = '#ffffff', dark = '#1b1033' } = {}) {
  const colors = Array.isArray(bgColors) ? bgColors : [bgColors];
  const bgLums = colors.map(relativeLuminance);
  const minContrast = textLum => Math.min(...bgLums.map(bgLum => contrastRatio(bgLum, textLum)));
  return minContrast(relativeLuminance(light)) >= minContrast(relativeLuminance(dark)) ? light : dark;
}
