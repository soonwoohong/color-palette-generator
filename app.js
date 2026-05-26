const UNIVERSAL_PROFILE = {
  label: "Universal color",
  seed: "#007c89",
  accent: "#e64b35",
  chroma: 56,
  minL: 26,
  maxL: 91,
  hueBreadth: 270,
};

const EXAMPLES = {
  vivid: {
    label: "Universal vivid color",
    seed: "#007c89",
    accent: "#e64b35",
    hueBreadth: 270,
    intensity: 88,
    contrast: 74,
    categorical: ["#007c89", "#e64b35", "#4c6ef5", "#9b5de5", "#f0a202", "#2a9d55", "#d64a8a", "#4d4d4d"],
    note: "A vivid general-purpose starting point for papers with several plot types.",
  },
  wong: {
    label: "Wong / Okabe-Ito accessible",
    seed: "#0072b2",
    accent: "#d55e00",
    hueBreadth: 300,
    intensity: 84,
    contrast: 78,
    categorical: ["#0072b2", "#e69f00", "#009e73", "#d55e00", "#cc79a7", "#56b4e9", "#f0e442", "#000000"],
    note: "Categorical anchors follow the widely used Wong / Okabe-Ito color-blind palette.",
    source: "https://www.nature.com/articles/nmeth.1618",
  },
  greenMagenta: {
    label: "Green-magenta fluorescence",
    seed: "#009e73",
    accent: "#cc79a7",
    hueBreadth: 250,
    intensity: 90,
    contrast: 76,
    note: "Inspired by accessible fluorescence pairings encouraged in Nature-family guidance.",
    source: "https://www.nature.com/nature/for-authors/initial-submission",
  },
  turquoiseRed: {
    label: "Turquoise-red contrast",
    seed: "#00a6a6",
    accent: "#d84a3a",
    hueBreadth: 265,
    intensity: 92,
    contrast: 76,
    note: "A vivid turquoise-red pairing, also aligned with accessible color-pair guidance.",
    source: "https://www.nature.com/ncomms/submit/how-to-submit",
  },
  yellowBlue: {
    label: "Yellow-blue contrast",
    seed: "#2d6cdf",
    accent: "#f0c808",
    hueBreadth: 285,
    intensity: 86,
    contrast: 82,
    note: "A high-contrast yellow-blue family for figures where warm/cool separation matters.",
    source: "https://www.nature.com/ncomms/submit/how-to-submit",
  },
  atlas: {
    label: "Single-cell atlas vivid",
    seed: "#7b61ff",
    accent: "#ff5a5f",
    hueBreadth: 315,
    intensity: 96,
    contrast: 72,
    categorical: ["#7b61ff", "#00a6a6", "#ff5a5f", "#2f9b4f", "#e6a700", "#9b5de5", "#00bbf9", "#f15bb5"],
    note: "A vivid, atlas-style set for many biological groups. It is source-informed, not copied from a single figure.",
  },
  custom: {
    label: "Custom",
    seed: "#007c89",
    accent: "#e64b35",
    hueBreadth: 270,
    intensity: 88,
    contrast: 74,
    note: "Custom palette generated from your chosen base and contrast colors.",
  },
};

const POPULAR_COLORS = [
  ["Teal", "#007c89"],
  ["Vermillion", "#e64b35"],
  ["Blue", "#4c6ef5"],
  ["Purple", "#7b61ff"],
  ["Magenta", "#d64a8a"],
  ["Green", "#2a9d55"],
  ["Gold", "#b77900"],
  ["Charcoal", "#4d4d4d"],
  ["Okabe blue", "#0072b2"],
  ["Okabe orange", "#d55e00"],
  ["Okabe green", "#009e73"],
  ["Okabe pink", "#cc79a7"],
  ["Cyan", "#008b9a"],
  ["Indigo", "#3b4cc0"],
  ["Wine", "#9d1b2b"],
  ["Slate", "#59656f"],
];

const ROLE_NAMES = {
  categorical: ["Primary", "Comparator", "Secondary", "Highlight", "Support", "Control"],
  sequential: ["Lowest", "Low", "Moderate", "High", "Highest"],
  diverging: ["Negative", "Low", "Neutral", "High", "Positive"],
};

const state = {
  examplePalette: "vivid",
  figureContext: "lines",
  count: 7,
  seedColor: EXAMPLES.vivid.seed,
  accentColor: EXAMPLES.vivid.accent,
  hueBreadth: EXAMPLES.vivid.hueBreadth,
  intensity: EXAMPLES.vivid.intensity,
  contrast: EXAMPLES.vivid.contrast,
  cvdSafe: true,
  printSafe: true,
  vividBoost: true,
  contrastBoost: true,
  invert: false,
  visionMode: "normal",
  background: "#ffffff",
  exportFormat: "hex",
  palettes: {
    categorical: [],
    sequential: [],
    diverging: [],
  },
  palette: [],
};

const els = {
  examplePalette: document.querySelector("#examplePalette"),
  sourceNote: document.querySelector("#sourceNote"),
  figureContext: document.querySelector("#figureContext"),
  count: document.querySelector("#count"),
  countLabel: document.querySelector("#countLabel"),
  seedColor: document.querySelector("#seedColor"),
  accentColor: document.querySelector("#accentColor"),
  seedHex: document.querySelector("#seedHex"),
  accentHex: document.querySelector("#accentHex"),
  popularColors: document.querySelector("#popularColors"),
  hueBreadth: document.querySelector("#hueBreadth"),
  intensity: document.querySelector("#intensity"),
  contrast: document.querySelector("#contrast"),
  cvdSafe: document.querySelector("#cvdSafe"),
  printSafe: document.querySelector("#printSafe"),
  vividBoost: document.querySelector("#vividBoost"),
  contrastBoost: document.querySelector("#contrastBoost"),
  invert: document.querySelector("#invert"),
  visionMode: document.querySelector("#visionMode"),
  background: document.querySelector("#background"),
  swatches: document.querySelector("#swatches"),
  simulations: document.querySelector("#simulations"),
  previewSvg: document.querySelector("#previewSvg"),
  paletteTitle: document.querySelector("#paletteTitle"),
  previewTitle: document.querySelector("#previewTitle"),
  qualityBadge: document.querySelector("#qualityBadge"),
  deltaMetric: document.querySelector("#deltaMetric"),
  cvdMetric: document.querySelector("#cvdMetric"),
  grayMetric: document.querySelector("#grayMetric"),
  contrastMetric: document.querySelector("#contrastMetric"),
  deltaStatus: document.querySelector("#deltaStatus"),
  cvdStatus: document.querySelector("#cvdStatus"),
  grayStatus: document.querySelector("#grayStatus"),
  contrastStatus: document.querySelector("#contrastStatus"),
  exportFormat: document.querySelector("#exportFormat"),
  exportText: document.querySelector("#exportText"),
  copyStatus: document.querySelector("#copyStatus"),
  copyHex: document.querySelector("#copyHex"),
  copyExport: document.querySelector("#copyExport"),
  downloadCsv: document.querySelector("#downloadCsv"),
  downloadSvg: document.querySelector("#downloadSvg"),
  randomize: document.querySelector("#randomize"),
  reset: document.querySelector("#reset"),
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function normalizeHue(hue) {
  return ((hue % 360) + 360) % 360;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "").trim();
  const value = clean.length === 3
    ? clean.split("").map((char) => char + char).join("")
    : clean;
  const int = Number.parseInt(value, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function normalizeHexInput(value) {
  const clean = value.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return `#${clean.split("").map((char) => char + char).join("")}`.toLowerCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    return `#${clean}`.toLowerCase();
  }
  return null;
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

function srgbToLinear(channel) {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(channel) {
  const c = channel <= 0.0031308
    ? 12.92 * channel
    : 1.055 * channel ** (1 / 2.4) - 0.055;
  return c * 255;
}

function rgbToXyz(rgb) {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  return {
    x: (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) * 100,
    y: (0.2126729 * r + 0.7151522 * g + 0.072175 * b) * 100,
    z: (0.0193339 * r + 0.119192 * g + 0.9503041 * b) * 100,
  };
}

function xyzToRgbRaw(xyz) {
  const x = xyz.x / 100;
  const y = xyz.y / 100;
  const z = xyz.z / 100;
  return {
    r: linearToSrgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z),
    g: linearToSrgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z),
    b: linearToSrgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
  };
}

function xyzToRgb(xyz) {
  const raw = xyzToRgbRaw(xyz);
  return {
    r: clamp(raw.r, 0, 255),
    g: clamp(raw.g, 0, 255),
    b: clamp(raw.b, 0, 255),
  };
}

function labPivot(value) {
  return value > 0.008856 ? Math.cbrt(value) : 7.787 * value + 16 / 116;
}

function labPivotInv(value) {
  const cube = value ** 3;
  return cube > 0.008856 ? cube : (value - 16 / 116) / 7.787;
}

function xyzToLab(xyz) {
  const x = labPivot(xyz.x / 95.047);
  const y = labPivot(xyz.y / 100);
  const z = labPivot(xyz.z / 108.883);
  return {
    L: 116 * y - 16,
    a: 500 * (x - y),
    b: 200 * (y - z),
  };
}

function labToXyz(lab) {
  const y = (lab.L + 16) / 116;
  const x = lab.a / 500 + y;
  const z = y - lab.b / 200;
  return {
    x: 95.047 * labPivotInv(x),
    y: 100 * labPivotInv(y),
    z: 108.883 * labPivotInv(z),
  };
}

function labToLch(lab) {
  return {
    L: lab.L,
    C: Math.sqrt(lab.a ** 2 + lab.b ** 2),
    h: normalizeHue((Math.atan2(lab.b, lab.a) * 180) / Math.PI),
  };
}

function lchToLab(lch) {
  const radians = (lch.h * Math.PI) / 180;
  return {
    L: lch.L,
    a: Math.cos(radians) * lch.C,
    b: Math.sin(radians) * lch.C,
  };
}

function rgbToLab(rgb) {
  return xyzToLab(rgbToXyz(rgb));
}

function rgbToLch(rgb) {
  return labToLch(rgbToLab(rgb));
}

function lchToRgbRaw(lch) {
  return xyzToRgbRaw(labToXyz(lchToLab(lch)));
}

function inGamut(rgb) {
  return rgb.r >= 0 && rgb.r <= 255 && rgb.g >= 0 && rgb.g <= 255 && rgb.b >= 0 && rgb.b <= 255;
}

function fitLch(L, C, h) {
  let fitted = { L: clamp(L, 5, 97), C: Math.max(C, 0), h: normalizeHue(h) };
  let rgb = lchToRgbRaw(fitted);
  while (!inGamut(rgb) && fitted.C > 0.5) {
    fitted = { ...fitted, C: fitted.C - 1.2 };
    rgb = lchToRgbRaw(fitted);
  }
  return rgbToHex(xyzToRgb(labToXyz(lchToLab(fitted))));
}

function interpolateLab(hexA, hexB, t) {
  const a = rgbToLab(hexToRgb(hexA));
  const b = rgbToLab(hexToRgb(hexB));
  return rgbToHex(xyzToRgb(labToXyz({
    L: lerp(a.L, b.L, t),
    a: lerp(a.a, b.a, t),
    b: lerp(a.b, b.b, t),
  })));
}

function deltaE(hexA, hexB) {
  const a = rgbToLab(hexToRgb(hexA));
  const b = rgbToLab(hexToRgb(hexB));
  return Math.sqrt((a.L - b.L) ** 2 + (a.a - b.a) ** 2 + (a.b - b.b) ** 2);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(hexA, hexB) {
  const a = relativeLuminance(hexA);
  const b = relativeLuminance(hexB);
  const light = Math.max(a, b);
  const dark = Math.min(a, b);
  return (light + 0.05) / (dark + 0.05);
}

function improveBackgroundContrast(hex, target = 2.85) {
  if (!state.contrastBoost || contrastRatio(hex, state.background) >= target) return hex;
  const lightBackground = relativeLuminance(state.background) > 0.45;
  const original = rgbToLch(hexToRgb(hex));
  let best = hex;
  for (let step = 1; step <= 22; step += 1) {
    const L = clamp(original.L + (lightBackground ? -step * 2.2 : step * 2.2), 12, 92);
    const C = original.C * (step > 12 ? 0.92 : 1);
    const candidate = fitLch(L, C, original.h);
    best = candidate;
    if (contrastRatio(candidate, state.background) >= target) return candidate;
  }
  return best;
}

function simulateCvd(hex, type) {
  if (type === "achromatopsia") return grayscaleHex(hex);
  const rgb = hexToRgb(hex);
  const matrices = {
    protanopia: [
      [0.567, 0.433, 0],
      [0.558, 0.442, 0],
      [0, 0.242, 0.758],
    ],
    deuteranopia: [
      [0.625, 0.375, 0],
      [0.7, 0.3, 0],
      [0, 0.3, 0.7],
    ],
    tritanopia: [
      [0.95, 0.05, 0],
      [0, 0.433, 0.567],
      [0, 0.475, 0.525],
    ],
  };
  const matrix = matrices[type];
  if (!matrix) return hex;
  return rgbToHex({
    r: matrix[0][0] * rgb.r + matrix[0][1] * rgb.g + matrix[0][2] * rgb.b,
    g: matrix[1][0] * rgb.r + matrix[1][1] * rgb.g + matrix[1][2] * rgb.b,
    b: matrix[2][0] * rgb.r + matrix[2][1] * rgb.g + matrix[2][2] * rgb.b,
  });
}

function grayscaleHex(hex) {
  const lum = relativeLuminance(hex);
  const value = Math.round(clamp(lum ** (1 / 2.2) * 255, 0, 255));
  return rgbToHex({ r: value, g: value, b: value });
}

function displayColor(hex) {
  return state.visionMode === "normal" ? hex : simulateCvd(hex, state.visionMode);
}

function minPairwise(values, metric) {
  if (values.length < 2) return 0;
  let min = Infinity;
  for (let i = 0; i < values.length; i += 1) {
    for (let j = i + 1; j < values.length; j += 1) {
      min = Math.min(min, metric(values[i], values[j]));
    }
  }
  return Number.isFinite(min) ? min : 0;
}

function effectivePairDistance(hexA, hexB) {
  const cvdTypes = ["protanopia", "deuteranopia", "tritanopia"];
  const cvdDelta = Math.min(
    ...cvdTypes.map((type) => deltaE(simulateCvd(hexA, type), simulateCvd(hexB, type))),
  );
  const selectedDelta = state.visionMode === "normal"
    ? Infinity
    : deltaE(displayColor(hexA), displayColor(hexB));
  const grayDelta = deltaE(grayscaleHex(hexA), grayscaleHex(hexB));
  return Math.min(deltaE(hexA, hexB), cvdDelta * 1.24, selectedDelta * 1.35, grayDelta * 2.1);
}

function currentExample() {
  return EXAMPLES[state.examplePalette] || EXAMPLES.vivid;
}

function baseChroma() {
  const vivid = state.vividBoost ? 1.16 : 0.84;
  return UNIVERSAL_PROFILE.chroma * (state.intensity / 100) * vivid;
}

function lightnessRange() {
  const contrastMix = state.contrast / 100;
  const lightBackground = relativeLuminance(state.background) > 0.45;
  if (lightBackground) {
    return {
      minL: lerp(42, UNIVERSAL_PROFILE.minL, contrastMix),
      maxL: lerp(76, 64, contrastMix),
      neutralL: lerp(86, 94, contrastMix),
    };
  }
  return {
    minL: lerp(54, 44, contrastMix),
    maxL: lerp(78, UNIVERSAL_PROFILE.maxL, contrastMix),
    neutralL: lerp(26, 16, contrastMix),
  };
}

function categoricalPalette() {
  const example = currentExample();
  const seed = rgbToLch(hexToRgb(state.seedColor));
  const { minL, maxL } = lightnessRange();
  const breadth = clamp(state.hueBreadth * (state.cvdSafe ? 1.12 : 1), 60, 340);
  const chroma = baseChroma();
  const hueOffsets = [0, 62, -62, 138, -138, 212, -212, 31, -31, 96, -96, 176, -176, 260, -260, 300, -300];
  const lightSteps = state.printSafe
    ? [0.02, 0.18, 0.34, 0.5, 0.66, 0.82, 0.96]
    : [0.12, 0.68, 0.32, 0.82, 0.48, 0.22, 0.76];
  const sourceColors = example.categorical || [];
  const candidates = new Map();

  sourceColors.forEach((hex) => candidates.set(hex.toLowerCase(), hex.toLowerCase()));
  hueOffsets.forEach((offset, hueIndex) => {
    const h = normalizeHue(seed.h + offset * (breadth / 300));
    lightSteps.forEach((step, lightIndex) => {
      const L = lerp(maxL, minL, step);
      const C = chroma * (0.88 + 0.16 * Math.sin((hueIndex + 1) * 1.31 + lightIndex * 0.7));
      const hex = fitLch(L, C, h);
      candidates.set(hex, hex);
    });
  });

  const pool = [...candidates.values()];
  const selected = sourceColors.length && state.examplePalette !== "custom"
    ? sourceColors.map((hex) => hex.toLowerCase()).slice(0, state.count)
    : [state.seedColor.toLowerCase()];
  if (!sourceColors.length && deltaE(state.seedColor, state.accentColor) > 18) {
    selected.push(state.accentColor.toLowerCase());
  }

  while (selected.length < state.count && pool.length > 0) {
    let bestIndex = 0;
    let bestScore = -Infinity;
    for (let i = 0; i < pool.length; i += 1) {
      const candidate = pool[i];
      if (selected.includes(candidate)) continue;
      const distance = Math.min(...selected.map((hex) => effectivePairDistance(hex, candidate)));
      const sourceBoost = sourceColors.includes(candidate) ? 3 : 0;
      const contrastHelp = Math.min(contrastRatio(candidate, state.background), 4.5) * 0.9;
      const score = distance + contrastHelp + sourceBoost;
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }
    selected.push(pool.splice(bestIndex, 1)[0]);
  }

  const colors = selected
    .slice(0, state.count)
    .map((hex) => improveBackgroundContrast(hex, 2.85));
  if (sourceColors.length && state.examplePalette !== "custom") return colors;
  if (!state.printSafe) return colors;
  return colors
    .map((hex) => ({ hex, lum: relativeLuminance(hex) }))
    .sort((a, b) => b.lum - a.lum)
    .map((item) => item.hex);
}

function sequentialPalette() {
  const seed = rgbToLch(hexToRgb(state.seedColor));
  const { minL, maxL } = lightnessRange();
  const hueDrift = clamp(state.hueBreadth / 20, 3, 18);
  const chroma = baseChroma();
  const colors = [];

  for (let i = 0; i < state.count; i += 1) {
    const t = state.count === 1 ? 1 : i / (state.count - 1);
    const eased = t ** 0.9;
    const L = lerp(maxL + 15, minL, eased);
    const C = chroma * (0.08 + 0.92 * eased);
    const h = normalizeHue(seed.h + lerp(-hueDrift, hueDrift, t));
    const target = i === 0 ? 1.25 : 1.55;
    colors.push(improveBackgroundContrast(fitLch(L, C, h), target));
  }
  return colors;
}

function divergingPalette() {
  const left = rgbToLch(hexToRgb(state.seedColor));
  let right = rgbToLch(hexToRgb(state.accentColor));
  if (deltaE(state.seedColor, state.accentColor) < 24) {
    right = { ...right, h: normalizeHue(left.h + 180) };
  }
  const { minL, neutralL } = lightnessRange();
  const chroma = baseChroma();
  const endL = relativeLuminance(state.background) > 0.45 ? minL + 2 : minL + 10;
  const leftHex = fitLch(endL, chroma, left.h);
  const rightHex = fitLch(endL, chroma, right.h);
  const midHex = fitLch(neutralL, state.vividBoost ? 6 : 3, normalizeHue((left.h + right.h) / 2));
  const colors = [];

  for (let i = 0; i < state.count; i += 1) {
    const t = state.count === 1 ? 0.5 : i / (state.count - 1);
    if (t < 0.5) {
      colors.push(interpolateLab(leftHex, midHex, t / 0.5));
    } else {
      colors.push(interpolateLab(midHex, rightHex, (t - 0.5) / 0.5));
    }
  }
  return colors.map((hex, index) => {
    const t = state.count === 1 ? 0.5 : index / (state.count - 1);
    const target = Math.abs(t - 0.5) < 0.08 ? 1.25 : 2.2;
    return improveBackgroundContrast(hex, target);
  });
}

function activeModeForContext() {
  if (state.figureContext === "heatmap") return "sequential";
  return "categorical";
}

function generateSystem() {
  const palettes = {
    categorical: categoricalPalette(),
    sequential: sequentialPalette(),
    diverging: divergingPalette(),
  };
  if (!state.invert) return palettes;
  return Object.fromEntries(
    Object.entries(palettes).map(([key, colors]) => [key, [...colors].reverse()]),
  );
}

function assessPalette(colors) {
  const normalDelta = minPairwise(colors, deltaE);
  const cvdTypes = ["protanopia", "deuteranopia", "tritanopia"];
  const cvdDelta = Math.min(
    ...cvdTypes.map((type) => minPairwise(colors.map((hex) => simulateCvd(hex, type)), deltaE)),
  );
  const selectedDelta = state.visionMode === "normal"
    ? cvdDelta
    : minPairwise(colors.map(displayColor), deltaE);
  const grayDelta = minPairwise(colors.map(grayscaleHex), deltaE);
  const contrast = Math.min(...colors.map((hex) => contrastRatio(hex, state.background)));
  const score = Math.round(
    clamp(normalDelta / 20, 0, 1) * 28
      + clamp(selectedDelta / 12, 0, 1) * 28
      + clamp(grayDelta / 8, 0, 1) * 20
      + clamp(contrast / 2.7, 0, 1) * 24,
  );

  return {
    normalDelta,
    cvdDelta,
    selectedDelta,
    grayDelta,
    contrast,
    score,
  };
}

function qualityLabel(metrics) {
  if (metrics.score >= 82 && metrics.selectedDelta >= 11 && metrics.grayDelta >= 6) {
    return { text: "Publication-ready", className: "" };
  }
  if (metrics.score >= 56) {
    return { text: "Needs review", className: "warn" };
  }
  return { text: "Risky palette", className: "risky" };
}

function roleFor(mode, index, paletteLength) {
  const names = ROLE_NAMES[mode];
  if (mode === "sequential") {
    const t = index / Math.max(1, paletteLength - 1);
    if (t < 0.15) return "Lowest";
    if (t < 0.4) return "Low";
    if (t < 0.65) return "Middle";
    if (t < 0.9) return "High";
    return "Highest";
  }
  if (mode === "diverging") {
    const t = index / Math.max(1, paletteLength - 1);
    if (t < 0.18) return "Negative";
    if (t < 0.42) return "Lower";
    if (t < 0.58) return "Neutral";
    if (t < 0.82) return "Higher";
    return "Positive";
  }
  return names[index % names.length];
}

function readableTextOn(hex) {
  return contrastRatio(hex, "#111820") > contrastRatio(hex, "#ffffff") ? "#111820" : "#ffffff";
}

function renderSwatches() {
  const groups = [
    ["categorical", "Categorical", "Groups, lines, bars"],
    ["sequential", "Sequential", "Ordered values"],
    ["diverging", "Diverging", "Centered contrasts"],
  ];
  els.swatches.innerHTML = "";
  groups.forEach(([mode, title, meta]) => {
    const colors = state.palettes[mode];
    const group = document.createElement("section");
    group.className = "palette-group";
    group.innerHTML = `
      <div class="palette-group-head">
        <span>${title}</span>
        <small>${meta}</small>
      </div>
      <div class="swatch-grid compact"></div>
    `;
    const grid = group.querySelector(".swatch-grid");
    colors.forEach((hex, index) => {
      const shown = displayColor(hex);
      const swatch = document.createElement("article");
      swatch.className = "swatch";
      swatch.innerHTML = `
        <div class="swatch-chip" style="background:${shown}">
          <span class="swatch-index" style="color:${readableTextOn(shown)}">${index + 1}</span>
          <span class="original-strip" style="background:${hex}"></span>
        </div>
        <div class="swatch-body">
          <span class="swatch-name">${roleFor(mode, index, colors.length)}</span>
          <span class="swatch-hex">${hex.toUpperCase()}</span>
        </div>
      `;
      swatch.addEventListener("click", () => {
        state.examplePalette = "custom";
        if (selectedColorTarget() === "accent") {
          state.accentColor = hex;
        } else {
          state.seedColor = hex;
        }
        update();
      });
      grid.append(swatch);
    });
    els.swatches.append(group);
  });
}

function renderMetrics(metrics) {
  const quality = qualityLabel(metrics);
  els.qualityBadge.textContent = quality.text;
  els.qualityBadge.className = `quality-badge ${quality.className}`.trim();
  els.deltaMetric.textContent = metrics.normalDelta.toFixed(1);
  els.cvdMetric.textContent = metrics.selectedDelta.toFixed(1);
  els.grayMetric.textContent = metrics.grayDelta.toFixed(1);
  els.contrastMetric.textContent = `${metrics.contrast.toFixed(1)}x`;
  els.deltaStatus.textContent = metrics.normalDelta >= 18
    ? "Distinct"
    : metrics.normalDelta >= 12
      ? "Moderate"
      : "Close colors";
  els.cvdStatus.textContent = metrics.selectedDelta >= 12
    ? "Robust"
    : metrics.selectedDelta >= 8
      ? "Use labels"
      : "Add labels";
  els.grayStatus.textContent = metrics.grayDelta >= 8
    ? "Grayscale safe"
    : metrics.grayDelta >= 4
      ? "Use markers"
      : "Needs markers";
  els.contrastStatus.textContent = metrics.contrast >= 3
    ? "Strong"
    : metrics.contrast >= 2.3
      ? "Good"
      : "Low on background";
}

function selectedColorTarget() {
  return document.querySelector('input[name="colorTarget"]:checked')?.value || "seed";
}

function renderPopularColors() {
  els.popularColors.innerHTML = "";
  const target = selectedColorTarget();
  POPULAR_COLORS.forEach(([name, hex]) => {
    const button = document.createElement("button");
    button.className = "popular-color";
    button.type = "button";
    button.title = `${name} ${hex}`;
    button.setAttribute("aria-label", `${name} ${hex}`);
    button.style.background = hex;
    const activeHex = target === "seed" ? state.seedColor : state.accentColor;
    button.classList.toggle("active", activeHex.toLowerCase() === hex.toLowerCase());
    button.addEventListener("click", () => {
      state.examplePalette = "custom";
      if (selectedColorTarget() === "seed") {
        state.seedColor = hex;
      } else {
        state.accentColor = hex;
      }
      update();
    });
    els.popularColors.append(button);
  });
}

function renderSourceNote() {
  const example = currentExample();
  const source = example.source
    ? ` <a href="${example.source}" target="_blank" rel="noreferrer">Source note</a>`
    : "";
  els.sourceNote.innerHTML = `<span>${example.note}</span>${source}`;
}

function svgEl(name, attrs = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function appendText(svg, attrs, text) {
  const element = svgEl("text", attrs);
  element.textContent = text;
  svg.append(element);
}

function clearSvg() {
  els.previewSvg.innerHTML = "";
  els.previewSvg.style.background = state.background;
}

function addAxes(svg) {
  for (let i = 0; i < 6; i += 1) {
    const y = 58 + i * 58;
    svg.append(svgEl("line", { x1: 70, y1: y, x2: 850, y2: y, class: "grid-line" }));
  }
  svg.append(svgEl("line", { x1: 72, y1: 366, x2: 850, y2: 366, class: "axis" }));
  svg.append(svgEl("line", { x1: 72, y1: 54, x2: 72, y2: 366, class: "axis" }));
  appendText(svg, { x: 72, y: 402, class: "chart-label" }, "Condition");
  appendText(svg, { x: 16, y: 64, class: "chart-label", transform: "rotate(-90 16 64)" }, "Response");
}

function renderLinePreview() {
  const svg = els.previewSvg;
  clearSvg();
  addAxes(svg);
  const colors = state.palettes.categorical.slice(0, Math.min(8, state.palettes.categorical.length));
  const width = 705;
  const x0 = 90;
  const yTop = 92;
  const yBottom = 336;

  colors.forEach((color, index) => {
    const shown = displayColor(color);
    const points = [];
    const baseline = colors.length === 1 ? 210 : lerp(yBottom, yTop, index / (colors.length - 1));
    const direction = index % 2 === 0 ? 1 : -1;
    const eventCenter = 0.18 + (index % 5) * 0.15;
    for (let step = 0; step < 8; step += 1) {
      const t = step / 7;
      const x = x0 + width * t;
      const wave = Math.sin(t * Math.PI * 2.4 + index * 0.72) * 14;
      const trend = lerp(-34, 34, t) * direction;
      const event = Math.exp(-((t - eventCenter) ** 2) / 0.012) * (index % 2 === 0 ? -34 : 30);
      const y = clamp(baseline + wave + trend + event, 66, 352);
      points.push([x, y]);
    }
    const pathData = points.map((point, step) => `${step ? "L" : "M"}${point[0].toFixed(1)},${point[1].toFixed(1)}`).join(" ");
    svg.append(svgEl("path", {
      d: pathData,
      fill: "none",
      stroke: shown,
      "stroke-width": index < 4 ? 4 : 3.2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      opacity: 0.96,
    }));
    points.forEach(([x, y], step) => {
      if (step % 2 === 1 && step !== points.length - 1) return;
      svg.append(svgEl("circle", {
        cx: x,
        cy: y,
        r: 4.2,
        fill: state.background,
        stroke: shown,
        "stroke-width": 2.4,
      }));
    });
    const last = points[points.length - 1];
    appendText(svg, {
      x: last[0] + 12,
      y: last[1] + 4,
      class: "chart-label",
      fill: shown,
    }, `G${index + 1}`);
  });
}

function renderScatterPreview() {
  const svg = els.previewSvg;
  clearSvg();
  addAxes(svg);
  state.palettes.categorical.forEach((color, index) => {
    const shown = displayColor(color);
    const centerX = 155 + (index % 4) * 178;
    const centerY = 135 + Math.floor(index / 4) * 98;
    for (let point = 0; point < 18; point += 1) {
      const angle = point * 2.34 + index * 0.6;
      const radius = 15 + (point % 6) * 5.8;
      const x = centerX + Math.cos(angle) * radius * (1.1 + (index % 3) * 0.18);
      const y = centerY + Math.sin(angle) * radius * (0.78 + (index % 4) * 0.06);
      svg.append(svgEl("circle", {
        cx: clamp(x, 82, 836),
        cy: clamp(y, 66, 354),
        r: 5.5,
        fill: shown,
        opacity: 0.82,
        stroke: state.background,
        "stroke-width": 1.4,
      }));
    }
  });
}

function renderHeatmapPreview() {
  const svg = els.previewSvg;
  clearSvg();
  const marginX = 86;
  const marginY = 58;
  const cols = 16;
  const rows = 8;
  const cellW = 44;
  const cellH = 34;
  const colors = state.palettes.sequential;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const t = (Math.sin(col * 0.55 + row * 0.9) + Math.cos(row * 0.7)) / 4 + 0.5;
      const index = clamp(Math.round(t * (colors.length - 1)), 0, colors.length - 1);
      svg.append(svgEl("rect", {
        x: marginX + col * cellW,
        y: marginY + row * cellH,
        width: cellW - 2,
        height: cellH - 2,
        rx: 2,
        fill: displayColor(colors[index]),
      }));
    }
  }
  appendText(svg, { x: 86, y: 380, class: "chart-label" }, "Expression z-score");
  colors.forEach((color, index) => {
    svg.append(svgEl("rect", {
      x: 510 + index * (300 / colors.length),
      y: 364,
      width: 300 / colors.length + 1,
      height: 18,
      fill: displayColor(color),
    }));
  });
}

function renderBarPreview() {
  const svg = els.previewSvg;
  clearSvg();
  addAxes(svg);
  const groups = 5;
  const barsPerGroup = Math.min(state.palettes.categorical.length, 5);
  const baseX = 104;
  const groupW = 138;
  const barW = Math.max(10, 86 / barsPerGroup);
  for (let group = 0; group < groups; group += 1) {
    for (let item = 0; item < barsPerGroup; item += 1) {
      const color = displayColor(state.palettes.categorical[item % state.palettes.categorical.length]);
      const value = 70 + 34 * Math.sin(group * 1.15 + item * 0.85) + item * 18 + group * 8;
      const h = clamp(value, 34, 260);
      const x = baseX + group * groupW + item * (barW + 4);
      const y = 366 - h;
      svg.append(svgEl("rect", {
        x,
        y,
        width: barW,
        height: h,
        rx: 3,
        fill: color,
      }));
    }
  }
}

function renderPreview() {
  const renderers = {
    lines: renderLinePreview,
    scatter: renderScatterPreview,
    heatmap: renderHeatmapPreview,
    bars: renderBarPreview,
  };
  const titles = {
    lines: "Multi-line plot",
    scatter: "Scatter groups",
    heatmap: "Heatmap or matrix",
    bars: "Grouped bars",
  };
  els.previewTitle.textContent = titles[state.figureContext];
  renderers[state.figureContext]();
}

function renderSimulations() {
  const rows = [
    ["Normal", "normal", (hex) => hex],
    ["Protanopia", "protanopia", (hex) => simulateCvd(hex, "protanopia")],
    ["Deuteranopia", "deuteranopia", (hex) => simulateCvd(hex, "deuteranopia")],
    ["Tritanopia", "tritanopia", (hex) => simulateCvd(hex, "tritanopia")],
    ["Grayscale", "achromatopsia", grayscaleHex],
  ];
  els.simulations.innerHTML = "";
  rows.forEach(([label, mode, mapper]) => {
    const row = document.createElement("div");
    row.className = `simulation-row ${state.visionMode === mode ? "active" : ""}`.trim();
    const strip = state.palette.map((hex) => `<span style="background:${mapper(hex)}"></span>`).join("");
    row.innerHTML = `
      <span class="simulation-label">${label}</span>
      <div class="simulation-strip">${strip}</div>
    `;
    els.simulations.append(row);
  });
}

function systemColors() {
  return Object.fromEntries(
    Object.entries(state.palettes).map(([mode, colors]) => [
      mode,
      colors.map((hex) => hex.toUpperCase()),
    ]),
  );
}

function exportString(format = state.exportFormat) {
  const palettes = systemColors();
  if (format === "python") {
    return [
      `publication_palettes = ${JSON.stringify(palettes, null, 2)}`,
      "",
      "publication_palette = publication_palettes['categorical']",
      "sequential_palette = publication_palettes['sequential']",
      "diverging_palette = publication_palettes['diverging']",
      "",
      "import matplotlib.pyplot as plt",
      "from cycler import cycler",
      "plt.rcParams['axes.prop_cycle'] = cycler(color=publication_palette)",
    ].join("\n");
  }
  if (format === "r") {
    const lines = Object.entries(palettes).map(([mode, colors]) => {
      return `  ${mode} = c(${colors.map((hex) => `"${hex}"`).join(", ")})`;
    });
    return [
      "publication_palettes <- list(",
      lines.join(",\n"),
      ")",
      "",
      "scale_color_manual(values = publication_palettes$categorical)",
      "scale_fill_manual(values = publication_palettes$categorical)",
    ].join("\n");
  }
  if (format === "css") {
    return Object.entries(palettes).flatMap(([mode, colors]) => {
      return colors.map((hex, index) => `--pub-${mode}-${index + 1}: ${hex};`);
    }).join("\n");
  }
  if (format === "json") {
    return JSON.stringify({
      system: currentExample().label,
      background: state.background,
      viewerMode: state.visionMode,
      palettes,
    }, null, 2);
  }
  return Object.entries(palettes).map(([mode, colors]) => {
    return [`[${mode[0].toUpperCase()}${mode.slice(1)}]`, ...colors].join("\n");
  }).join("\n\n");
}

function renderExport() {
  els.exportText.value = exportString();
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    els.copyStatus.textContent = "Copied";
  } catch {
    els.exportText.focus();
    els.exportText.select();
    document.execCommand("copy");
    els.copyStatus.textContent = "Copied";
  }
  window.setTimeout(() => {
    els.copyStatus.textContent = "";
  }, 1400);
}

function download(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function svgPaletteFile() {
  const maxCount = Math.max(...Object.values(state.palettes).map((colors) => colors.length));
  const width = Math.max(460, 96 * maxCount);
  const rowHeight = 126;
  const rows = Object.entries(systemColors()).map(([mode, colors], row) => {
    const y = row * rowHeight;
    const swatches = colors.map((hex, index) => `
      <g transform="translate(${index * 96} ${y + 24})">
        <rect width="96" height="64" fill="${hex}"/>
        <text x="48" y="86" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#1c2429">${hex}</text>
      </g>`).join("");
    return `<text x="0" y="${y + 15}" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#1c2429">${mode}</text>${swatches}`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${rowHeight * 3}" viewBox="0 0 ${width} ${rowHeight * 3}">${rows}</svg>`;
}

function csvPaletteFile() {
  const rows = ["palette,index,role,hex"];
  Object.entries(systemColors()).forEach(([mode, colors]) => {
    colors.forEach((hex, index) => {
      rows.push(`${mode},${index + 1},${roleFor(mode, index, colors.length)},${hex}`);
    });
  });
  return rows.join("\n");
}

function updateTitles() {
  els.paletteTitle.textContent = `${currentExample().label} palette system`;
}

function updateControlsFromState() {
  els.examplePalette.value = state.examplePalette;
  els.figureContext.value = state.figureContext;
  els.count.value = state.count;
  els.countLabel.value = state.count;
  els.countLabel.textContent = state.count;
  els.seedColor.value = state.seedColor;
  els.accentColor.value = state.accentColor;
  els.seedHex.value = state.seedColor.toUpperCase();
  els.accentHex.value = state.accentColor.toUpperCase();
  els.hueBreadth.value = state.hueBreadth;
  els.intensity.value = state.intensity;
  els.contrast.value = state.contrast;
  els.cvdSafe.checked = state.cvdSafe;
  els.printSafe.checked = state.printSafe;
  els.vividBoost.checked = state.vividBoost;
  els.contrastBoost.checked = state.contrastBoost;
  els.invert.checked = state.invert;
  els.visionMode.value = state.visionMode;
  els.background.value = state.background;
  els.exportFormat.value = state.exportFormat;
  document.querySelectorAll(".view-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.figureContext);
  });
}

function update() {
  state.palettes = generateSystem();
  state.palette = state.palettes[activeModeForContext()];
  const metrics = assessPalette(state.palette);
  updateControlsFromState();
  updateTitles();
  renderSourceNote();
  renderPopularColors();
  renderSwatches();
  renderMetrics(metrics);
  renderPreview();
  renderSimulations();
  renderExport();
}

function applyExample(exampleName) {
  const example = EXAMPLES[exampleName] || EXAMPLES.vivid;
  state.examplePalette = exampleName;
  state.seedColor = example.seed;
  state.accentColor = example.accent;
  state.hueBreadth = example.hueBreadth;
  state.intensity = example.intensity;
  state.contrast = example.contrast;
}

function randomizePalette() {
  const seedHue = Math.floor(Math.random() * 360);
  const accentHue = normalizeHue(seedHue + 145 + Math.random() * 90);
  state.examplePalette = "custom";
  state.seedColor = fitLch(44, UNIVERSAL_PROFILE.chroma * 0.9, seedHue);
  state.accentColor = fitLch(46, UNIVERSAL_PROFILE.chroma * 0.95, accentHue);
  state.hueBreadth = Math.round(lerp(190, 330, Math.random()));
  state.intensity = Math.round(lerp(78, 100, Math.random()));
}

function markCustom() {
  state.examplePalette = "custom";
}

function bindEvents() {
  els.examplePalette.addEventListener("change", (event) => {
    applyExample(event.target.value);
    update();
  });
  els.figureContext.addEventListener("change", (event) => {
    state.figureContext = event.target.value;
    update();
  });
  document.querySelectorAll(".view-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.figureContext = button.dataset.view;
      update();
    });
  });
  [
    ["seedHex", "seedColor"],
    ["accentHex", "accentColor"],
  ].forEach(([elementKey, stateKey]) => {
    els[elementKey].addEventListener("input", (event) => {
      const hex = normalizeHexInput(event.target.value);
      event.target.classList.toggle("invalid", !hex);
      if (!hex) return;
      state[stateKey] = hex;
      markCustom();
      update();
    });
    els[elementKey].addEventListener("blur", (event) => {
      const hex = normalizeHexInput(event.target.value);
      event.target.classList.remove("invalid");
      event.target.value = (hex || state[stateKey]).toUpperCase();
    });
  });
  document.querySelectorAll('input[name="colorTarget"]').forEach((input) => {
    input.addEventListener("change", renderPopularColors);
  });
  [
    ["count", "count", Number, false],
    ["seedColor", "seedColor", String, true],
    ["accentColor", "accentColor", String, true],
    ["hueBreadth", "hueBreadth", Number, true],
    ["intensity", "intensity", Number, true],
    ["contrast", "contrast", Number, true],
    ["background", "background", String, false],
    ["visionMode", "visionMode", String, false],
    ["exportFormat", "exportFormat", String, false],
  ].forEach(([elementKey, stateKey, caster, customizes]) => {
    els[elementKey].addEventListener("input", (event) => {
      state[stateKey] = caster(event.target.value);
      if (customizes) markCustom();
      update();
    });
  });
  [
    ["cvdSafe", "cvdSafe", false],
    ["printSafe", "printSafe", false],
    ["vividBoost", "vividBoost", true],
    ["contrastBoost", "contrastBoost", false],
    ["invert", "invert", false],
  ].forEach(([elementKey, stateKey, customizes]) => {
    els[elementKey].addEventListener("change", (event) => {
      state[stateKey] = event.target.checked;
      if (customizes) markCustom();
      update();
    });
  });
  els.copyHex.addEventListener("click", () => copyText(exportString("hex")));
  els.copyExport.addEventListener("click", () => copyText(exportString()));
  els.downloadCsv.addEventListener("click", () => download("publication-palette-system.csv", csvPaletteFile(), "text/csv"));
  els.downloadSvg.addEventListener("click", () => download("publication-palette-system.svg", svgPaletteFile(), "image/svg+xml"));
  els.randomize.addEventListener("click", () => {
    randomizePalette();
    update();
  });
  els.reset.addEventListener("click", () => {
    Object.assign(state, {
      examplePalette: "vivid",
      figureContext: "lines",
      count: 7,
      seedColor: EXAMPLES.vivid.seed,
      accentColor: EXAMPLES.vivid.accent,
      hueBreadth: EXAMPLES.vivid.hueBreadth,
      intensity: EXAMPLES.vivid.intensity,
      contrast: EXAMPLES.vivid.contrast,
      cvdSafe: true,
      printSafe: true,
      vividBoost: true,
      contrastBoost: true,
      invert: false,
      visionMode: "normal",
      background: "#ffffff",
      exportFormat: "hex",
    });
    update();
  });
}

bindEvents();
update();
