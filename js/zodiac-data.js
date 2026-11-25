const ZODIAC_ORDER = [
  "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
  "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig",
];

const ZODIAC_META = {
  Rat: {
    emoji: "🐀",
    traits: "Resourceful, witty, and quick-thinking with strong survival instincts.",
    colors: ["Gold", "Blue", "Green"],
    numbers: [2, 3, 6],
    directions: ["North", "Northwest"],
    element: "Water",
  },
  Ox: {
    emoji: "🐂",
    traits: "Diligent, dependable, and grounded with quiet determination.",
    colors: ["Yellow", "Green", "White"],
    numbers: [1, 4, 9],
    directions: ["Northeast", "Southwest"],
    element: "Earth",
  },
  Tiger: {
    emoji: "🐅",
    traits: "Brave, charismatic, and competitive with natural leadership.",
    colors: ["Blue", "Grey", "Orange"],
    numbers: [1, 3, 7],
    directions: ["East", "Northeast"],
    element: "Wood",
  },
  Rabbit: {
    emoji: "🐇",
    traits: "Gentle, empathetic, and diplomatic with refined taste.",
    colors: ["Red", "Pink", "Purple"],
    numbers: [3, 4, 9],
    directions: ["East", "South"],
    element: "Wood",
  },
  Dragon: {
    emoji: "🐉",
    traits: "Confident, ambitious, charismatic, and determined.",
    colors: ["Gold", "Green", "Red"],
    numbers: [1, 6, 8],
    directions: ["East", "Southeast"],
    element: "Earth",
  },
  Snake: {
    emoji: "🐍",
    traits: "Wise, intuitive, and elegant with a calm exterior.",
    colors: ["Black", "Red", "Gold"],
    numbers: [2, 8, 9],
    directions: ["South", "Southeast"],
    element: "Fire",
  },
  Horse: {
    emoji: "🐎",
    traits: "Energetic, independent, and warm-hearted.",
    colors: ["Yellow", "Brown", "Green"],
    numbers: [2, 3, 7],
    directions: ["South", "West"],
    element: "Fire",
  },
  Goat: {
    emoji: "🐐",
    traits: "Creative, calm, and compassionate with artistic sensibility.",
    colors: ["Brown", "Purple", "Green"],
    numbers: [3, 4, 9],
    directions: ["Southwest", "North"],
    element: "Earth",
  },
  Monkey: {
    emoji: "🐒",
    traits: "Clever, curious, and playful with sharp problem-solving skills.",
    colors: ["White", "Gold", "Blue"],
    numbers: [1, 7, 8],
    directions: ["West", "Northwest"],
    element: "Metal",
  },
  Rooster: {
    emoji: "🐓",
    traits: "Observant, hardworking, and candid with strong pride.",
    colors: ["Gold", "Brown", "Yellow"],
    numbers: [5, 7, 8],
    directions: ["West", "Southwest"],
    element: "Metal",
  },
  Dog: {
    emoji: "🐕",
    traits: "Loyal, honest, and protective with a strong sense of justice.",
    colors: ["Red", "Green", "Purple"],
    numbers: [3, 4, 9],
    directions: ["Northwest", "East"],
    element: "Earth",
  },
  Pig: {
    emoji: "🐷",
    traits: "Generous, optimistic, and honest with a love of comfort.",
    colors: ["Yellow", "Grey", "Brown"],
    numbers: [2, 5, 8],
    directions: ["Northeast", "Southeast"],
    element: "Water",
  },
};

const HEAVENLY_STEM_ELEMENTS = [
  "Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water",
];

function zodiacFromYear(year) {
  const n = Number(year);
  if (!Number.isFinite(n)) return "Dragon";
  const index = ((n - 4) % 12 + 12) % 12;
  return ZODIAC_ORDER[index];
}

function heavenlyStemElement(year) {
  const stemIndex = ((Number(year) - 4) % 10 + 10) % 10;
  return HEAVENLY_STEM_ELEMENTS[stemIndex] || "Earth";
}

const GOAL_FORTUNES = {
  wealth: {
    title: "Wealth",
    icon: "💰",
    text: "Financial opportunities favour steady planning. Place a small water feature or green plant in your wealth corner (southeast) to keep energy flowing toward savings and smart investments.",
  },
  career: {
    title: "Career",
    icon: "💼",
    text: "Professional growth aligns with visibility. Keep your workspace clutter-free and face your favourable direction when taking important calls or interviews.",
  },
  love: {
    title: "Love",
    icon: "❤️",
    text: "Relationships benefit from warmth and open communication. Pair soft lighting in the bedroom with pairs of objects (two candles, two cushions) to invite balanced partnership energy.",
  },
  health: {
    title: "Health",
    icon: "🌿",
    text: "Wellness improves when rest and movement are balanced. Air out your bedroom each morning and avoid storing items under the bed to support restorative sleep.",
  },
};

const CATEGORY_COPY = {
  wealth: "Financial opportunities and mindful money habits are highlighted this season. Avoid impulsive spending on inauspicious days.",
  career: "Recognition and collaboration are in focus. Network toward the east and keep your resume or portfolio in a tidy, well-lit area.",
  love: "Emotional openness attracts sincere connections. Remove sharp corners pointing at the bed where possible.",
  health: "Energy is steady when routines are gentle. Hydration and morning light support your elemental balance.",
};

const FENG_SHUI_TIPS = {
  north: "North door: strengthen career flow with a small mirror or water motif near the entrance — keep the path clear.",
  northeast: "Northeast door: education and wisdom sector — add earthy tones and organised bookshelves near the entry.",
  east: "East door: family and health sector — fresh plants near the door invite growth and vitality.",
  southeast: "Southeast door: classic wealth sector — keep the entrance bright; a healthy plant supports prosperity.",
  south: "South door: fame and reputation — warm lighting at the door builds confidence for public-facing goals.",
  southwest: "Southwest door: relationships — pairs of welcoming objects near the door harmonise partnership energy.",
  west: "West door: creativity and children — display art or metal accents with rounded shapes.",
  northwest: "Northwest door: helpful people and travel — metal decor or circular motifs attract support.",
};

const BEDROOM_TIPS = {
  north: "North bedroom: prioritise calm blues and good curtains for restorative sleep.",
  east: "East bedroom: morning light is supportive — use breathable fabrics.",
  south: "South bedroom: cool tones balance fire energy — limit electronics at night.",
  west: "West bedroom: soft metallics and uncluttered surfaces aid relaxation.",
  center: "Central bedroom: use grounding earth tones and avoid blocking chi with heavy storage overhead.",
};

function buildReport(data, { sample = false } = {}) {
  const sign = zodiacFromYear(data.birthYear);
  const meta = ZODIAC_META[sign];
  const element = heavenlyStemElement(data.birthYear);
  const goal = data.goal || "wealth";
  const primary = GOAL_FORTUNES[goal];
  const door = data.doorDirection || "east";
  const bedroom = data.bedroom || "east";
  const luckScore = 68 + ((Number(data.birthYear) + sign.length) % 25);

  const categories = ["wealth", "career", "love", "health"].map((key) => ({
    key,
    title: key.charAt(0).toUpperCase() + key.slice(1),
    icon: GOAL_FORTUNES[key].icon,
    text: CATEGORY_COPY[key],
    emphasis: key === goal,
  }));

  return {
    sample,
    userName: data.fullName || "Guest",
    birthYear: data.birthYear || "—",
    location: data.location || "—",
    sign,
    emoji: meta.emoji,
    element,
    traits: meta.traits,
    luckScore,
    colors: meta.colors,
    numbers: meta.numbers,
    directions: meta.directions,
    luckyElement: meta.element,
    primaryGoal: primary,
    categories,
    homeTips: [
      FENG_SHUI_TIPS[door],
      BEDROOM_TIPS[bedroom],
      `Main focus (${primary.title}): ${primary.text}`,
    ],
  };
}

function renderReportHtml(report) {
  const luck = report.luckScore;
  const categoryHtml = report.categories
    .map(
      (c) => `
      <div class="fortune-row${c.emphasis ? " fortune-row-emphasis" : ""}">
        <span class="fortune-icon" aria-hidden="true">${c.icon}</span>
        <div>
          <h4>${c.title}${c.emphasis ? " · Your focus" : ""}</h4>
          <p>${c.text}</p>
        </div>
      </div>`
    )
    .join("");

  const luckyGrid = [
    { label: "Lucky colours", value: report.colors.join(", "), icon: "🎨" },
    { label: "Lucky numbers", value: report.numbers.join(", "), icon: "🔢" },
    { label: "Favourable directions", value: report.directions.join(", "), icon: "🧭" },
    { label: "Lucky element", value: report.luckyElement, icon: "🪨" },
  ]
    .map(
      (item) => `
      <div class="lucky-tile" title="${item.label}">
        <span class="lucky-tile-icon">${item.icon}</span>
        <span class="lucky-tile-label">${item.label}</span>
        <span class="lucky-tile-value">${item.value}</span>
      </div>`
    )
    .join("");

  const tipsHtml = report.homeTips.map((t) => `<li>${t}</li>`).join("");

  return `
    <header class="report-head">
      <div class="zodiac-badge">
        <span class="zodiac-emoji">${report.emoji}</span>
        <div>
          <p class="report-kicker">Your Chinese Zodiac</p>
          <h3>${report.sign}</h3>
          <p class="report-meta">Birth year <strong>${report.birthYear}</strong> · Element <strong>${report.element}</strong></p>
        </div>
      </div>
      ${report.sample ? "" : `<p class="report-for">Prepared for <strong>${escapeHtml(report.userName)}</strong> · ${escapeHtml(report.location)}</p>`}
      <div class="luck-pill">Luck meter <strong>${luck}%</strong></div>
    </header>
    <p class="report-traits">${report.traits}</p>
    <h4 class="report-section-title">Your lucky profile</h4>
    <div class="lucky-grid">${luckyGrid}</div>
    <h4 class="report-section-title">Your fortune categories</h4>
    <div class="fortune-list">${categoryHtml}</div>
    <h4 class="report-section-title">Suggested home improvements</h4>
    <ul class="tips-list">${tipsHtml}</ul>
    <p class="report-bonus">🐱 <strong>Plus:</strong> Save or share this report — email delivery &amp; PDF export in the production app.</p>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}